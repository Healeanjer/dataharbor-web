import { SiteDocument, rootMetadata } from '@/server/Site';
export const metadata = rootMetadata('zh-CN');
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="zh-CN">{children}</SiteDocument>;
}
