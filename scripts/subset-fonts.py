"""Regenerate self-hosted fonts: pip install fonttools brotli in a temporary venv.
Usage: python scripts/subset-fonts.py /path/to/source-font-directory
Directory must contain regular.ttf and bold.ttf (Noto Sans SC Google Fonts).
Sources and license recorded in public/fonts/README.md.
"""
from pathlib import Path
import json, sys
from fontTools.ttLib import TTFont
from fontTools import subset
root=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1]);out=root/'public/fonts';out.mkdir(exist_ok=True)
texts=[]
for p in (root/'src').rglob('*'):
 if p.suffix in {'.tsx','.ts','.json'}:
  texts.append(json.dumps(json.loads(p.read_text()),ensure_ascii=False) if p.suffix=='.json' else p.read_text())
chars={ord(c) for c in ''.join(texts)}|set(range(32,127))
for weight,name in [(400,'regular'),(700,'bold')]:
 for part,unicodes in [('latin',{c for c in chars if c<0x3000}),('cjk',{c for c in chars if c>=0x3000})]:
  font=TTFont(source/(name+'.ttf'))
  options=subset.Options();options.flavor='woff2';options.name_IDs=['*'];options.name_legacy=True
  sub=subset.Subsetter(options=options);sub.populate(unicodes=unicodes);sub.subset(font);font.flavor='woff2';font.save(out/f'site-{part}-{weight}.woff2')
print(f'Subset {len(chars)} code points; WOFF2 total {sum(p.stat().st_size for p in out.glob("*.woff2"))} bytes.')
