import { renderPage, staticPaths, pageMetadata, type PageParams } from '@/server/Site';
export const dynamicParams = false;
export function generateStaticParams() {
  return staticPaths();
}
export async function generateMetadata({ params }: PageParams) {
  return pageMetadata('zh-hant', params);
}
export default async function Page({ params }: PageParams) {
  return renderPage('zh-hant', params);
}
