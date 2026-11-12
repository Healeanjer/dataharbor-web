import type { CSSProperties } from 'react';
export function Icon({
  name = 'grid',
  size = 20,
  className,
  style,
}: {
  name?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  let drawing;
  switch (name) {
    case 'arrow':
      drawing = (
        <>
          <path d="M4 12h15M14 6l6 6-6 6" />
        </>
      );
      break;
    case 'up':
      drawing = (
        <>
          <path d="M12 20V4M6 10l6-6 6 6" />
        </>
      );
      break;
    case 'out':
      drawing = (
        <>
          <path d="M6 18 18 6M7 6h11v11" />
        </>
      );
      break;
    case 'down':
      drawing = <path d="m6 9 6 6 6-6" />;
      break;
    case 'left':
      drawing = <path d="m14 5-7 7 7 7" />;
      break;
    case 'right':
      drawing = <path d="m10 5 7 7-7 7" />;
      break;
    case 'close':
      drawing = <path d="m6 6 12 12M18 6 6 18" />;
      break;
    case 'menu':
      drawing = <path d="M4 6h16M4 12h16M4 18h16" />;
      break;
    case 'check':
      drawing = <path d="m5 12 4 4L19 6" />;
      break;
    case 'plus':
      drawing = <path d="M12 5v14M5 12h14" />;
      break;
    case 'globe':
      drawing = (
        <>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18M5 6.5h14M5 17.5h14" />
        </>
      );
      break;
    case 'shield':
      drawing = (
        <>
          <path d="M12 3 4 6v6c0 4 5 7 8 9 3-2 8-5 8-9V6l-8-3Z" />
          <path d="m8 12 3 3 5-6" />
        </>
      );
      break;
    case 'server':
      drawing = (
        <>
          <rect x="4" y="3" width="16" height="7" rx="2" />
          <rect x="4" y="14" width="16" height="7" rx="2" />
          <path d="M8 6.5h.1M8 17.5h.1M13 6.5h4M13 17.5h4" />
        </>
      );
      break;
    case 'layers':
      drawing = (
        <>
          <path d="m12 3 10 5-10 5L2 8l10-5ZM3 13l9 5 9-5M3 18l9 5 9-5" />
        </>
      );
      break;
    case 'folder':
      drawing = <path d="M3 7V5h7l3 3h8v12H3V7Z" />;
      break;
    case 'book':
      drawing = (
        <>
          <path d="M12 6C9 3 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-2-1-7-1-10 2ZM12 6v15" />
        </>
      );
      break;
    case 'chart':
      drawing = (
        <>
          <path d="M4 3v17h17M8 16v-4M13 16V8M18 16V5" />
        </>
      );
      break;
    case 'network':
      drawing = (
        <>
          <rect x="8" y="2" width="8" height="6" rx="1" />
          <path d="M12 8v5M4 17v-4h16v4" />
          <rect x="1" y="17" width="6" height="5" rx="1" />
          <rect x="17" y="17" width="6" height="5" rx="1" />
        </>
      );
      break;
    case 'file':
      drawing = (
        <>
          <path d="M5 2h9l5 5v15H5V2ZM14 2v6h5M8 12h8M8 16h8" />
        </>
      );
      break;
    case 'qr':
      drawing = (
        <>
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="15" y="3" width="6" height="6" rx="1" />
          <rect x="3" y="15" width="6" height="6" rx="1" />
          <path d="M15 14h6v3h-3v4h-4v-4M12 3v8M3 12h7M12 15v7M21 20v2" />
        </>
      );
      break;
    default:
      drawing = (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </>
      );
  }
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {drawing}
    </svg>
  );
}
