"""Check static route parity, locale consistency, links, assets and screenshot integrity."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib,json,re,os
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/os.environ.get('VERIFY_DIRECTORY','out')
BASE=os.environ.get('NEXT_PUBLIC_BASE_PATH','').rstrip('/')
def local_path(value):
 if BASE and (value==BASE or value.startswith(BASE+'/')):return value[len(BASE):] or '/'
 return value
VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Page(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.stack=[];self.ids=set();self.links=[];self.images=[];self.lang='';self.h1=0;self.chinese=[];self.skip=None
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if tag=='html':self.lang=d.get('lang','')
  if tag=='h1':self.h1+=1
  if d.get('id'):self.ids.add(d['id'])
  if 'language-popover' in d.get('class',''):self.skip=len(self.stack)
  if tag=='a':self.links.append((d.get('href',''),bool(d.get('hreflang'))))
  if tag=='img':self.images.append(d.get('src',''))
  if self.skip is None:
   for key in ['aria-label','alt','title']:
    if re.search(r'[\u3400-\u9fff]',d.get(key,'')):self.chinese.append(d[key])
  if tag not in VOID:self.stack.append(tag)
 def handle_endtag(self,tag):
  if tag in self.stack:self.stack=self.stack[:len(self.stack)-1-self.stack[::-1].index(tag)]
  if self.skip is not None and len(self.stack)<=self.skip:self.skip=None
 def handle_data(self,text):
  if self.skip is None and not any(tag in self.stack for tag in ['script','style','noscript']) and re.search(r'[\u3400-\u9fff]',text):self.chinese.append(text.strip())
pages={}
for file in OUT.rglob('*.html'):
 p=Page();p.feed(file.read_text());pages[file]=p
base=[p for p in pages if p.name=='index.html' and p.relative_to(OUT).parts[0] not in {'en','zh-hant','_not-found','404'}]
issues=[];checked=0;links=0
for locale,lang,prefix in [('zh-CN','zh-CN',''),('en','en','en'),('zh-hant','zh-Hant','zh-hant')]:
 for original in base:
  file=OUT/prefix/original.relative_to(OUT);page=pages.get(file)
  if not page:issues.append(f'Missing translated page {file}');continue
  checked+=1
  if page.lang!=lang:issues.append(f'Wrong document language {file}: {page.lang}')
  if page.h1!=1:issues.append(f'Expected one H1 {file}: {page.h1}')
  if locale=='en' and page.chinese:issues.append(f'Untranslated Chinese {file}: {page.chinese[:3]}')
  for image in page.images:
   if image.startswith('/') and not (OUT/local_path(image).lstrip('/')).exists():issues.append(f'Missing image {file}: {image}')
  for value,languageLink in page.links:
   u=urlsplit(value)
   if BASE and u.path.startswith('/') and not (u.path==BASE or u.path.startswith(BASE+'/')):issues.append(f'Base path lost {file}: {value}')
   u=u._replace(path=local_path(u.path))
   if u.scheme or u.netloc or not value:continue
   if not u.path:target=file
   elif u.path.startswith('/'):
    target=OUT/u.path.lstrip('/')
    if u.path.endswith('/') or target.is_dir():target=target/'index.html'
   else:issues.append(f'Unexpected relative link {file}: {value}');continue
   links+=1
   if not target.exists():issues.append(f'Broken link {file}: {value}');continue
   if not languageLink and u.path.startswith('/'):
    if prefix and not u.path.startswith('/'+prefix+'/'):issues.append(f'Locale lost {file}: {value}')
    if not prefix and u.path.startswith(('/en/','/zh-hant/')):issues.append(f'Unexpected locale change {file}: {value}')
   if u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:issues.append(f'Missing anchor {file}: {value}')
for image in json.loads((ROOT/'ASSET_MANIFEST.json').read_text()):
 file=ROOT/'public/media/screens'/image['file']
 if hashlib.sha256(file.read_bytes()).hexdigest()!=image['sha256']:issues.append(f'Screenshot modified: {file.name}')
report={'pages':checked,'links':links,'screenshots':16,'issues':issues}
(ROOT/'VERIFICATION.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(f'Checked {checked} pages, {links} local links and 16 screenshot hashes: {len(issues)} issues.')
for issue in issues[:40]:print(issue)
raise SystemExit(bool(issues))
