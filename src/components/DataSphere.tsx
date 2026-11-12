'use client';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/i18n/context';

/** Original 2D canvas projection of a rotating Fibonacci sphere. No globe library or map assets. */
export function DataSphere() {
  const { t } = useLanguage();
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const points = Array.from({ length: 700 }, (_, i) => {
      const y = 1 - (2 * (i + 0.5)) / 700,
        r = Math.sqrt(1 - y * y),
        a = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(a) * r, y, z: Math.sin(a) * r };
    });
    let size = 0,
      angle = 0.4,
      frame = 0,
      shown = false,
      last = 0,
      drag: number | null = null;
    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      size = bounds.width;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = size * ratio;
      canvas!.height = size * ratio;
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }
    function draw() {
      if (!size) return;
      const c = context!,
        center = size / 2,
        radius = size * 0.39;
      c.clearRect(0, 0, size, size);
      const gradient = c.createRadialGradient(
        center - radius * 0.4,
        center - radius * 0.3,
        0,
        center,
        center,
        radius * 1.4
      );
      gradient.addColorStop(0, 'rgba(74,174,153,.12)');
      gradient.addColorStop(1, 'rgba(23,62,88,0)');
      c.fillStyle = gradient;
      c.beginPath();
      c.arc(center, center, radius * 1.35, 0, Math.PI * 2);
      c.fill();
      const transformed = points
        .map((p) => {
          const x = p.x * Math.cos(angle) + p.z * Math.sin(angle),
            z = -p.x * Math.sin(angle) + p.z * Math.cos(angle);
          return { x, y: p.y * 0.94 + z * 0.14, z };
        })
        .sort((a, b) => a.z - b.z);
      for (const p of transformed) {
        const front = (p.z + 1) / 2;
        c.fillStyle = `rgba(${p.z > 0.65 ? '42,151,131' : '35,89,125'},${0.1 + front * 0.72})`;
        c.beginPath();
        c.arc(center + p.x * radius, center + p.y * radius, 0.7 + front * 1.1, 0, Math.PI * 2);
        c.fill();
      }
      c.strokeStyle = 'rgba(48,105,133,.18)';
      c.lineWidth = 1;
      for (const tilt of [-0.4, 0.4]) {
        c.save();
        c.translate(center, center);
        c.rotate(tilt);
        c.beginPath();
        c.ellipse(0, 0, radius * 1.12, radius * 0.35, 0, 0, Math.PI * 2);
        c.stroke();
        c.restore();
      }
      const node = transformed[560];
      if (node) {
        c.fillStyle = '#38a48d';
        c.beginPath();
        c.arc(center + node.x * radius, center + node.y * radius, 4, 0, Math.PI * 2);
        c.fill();
      }
    }
    function tick(now: number) {
      frame = 0;
      if (!shown || document.hidden) return;
      const delta = Math.min(now - last, 40);
      last = now;
      if (drag === null && !reduced) angle += delta * 0.0001;
      draw();
      if (!reduced) frame = requestAnimationFrame(tick);
    }
    function run() {
      cancelAnimationFrame(frame);
      if (shown && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }
    const observer = new IntersectionObserver(
      (entries) => {
        shown = entries[0].isIntersecting;
        run();
      },
      { rootMargin: '100px' }
    );
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener('visibilitychange', run);
    const down = (event: PointerEvent) => {
      drag = event.clientX;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = 'grabbing';
    };
    const move = (event: PointerEvent) => {
      if (drag === null) return;
      angle += (event.clientX - drag) / 180;
      drag = event.clientX;
      draw();
    };
    const up = () => {
      drag = null;
      canvas.style.cursor = 'grab';
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', run);
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="data-sphere"
      role="img"
      aria-label={t('数据连接示意，支持拖动旋转')}
    />
  );
}
