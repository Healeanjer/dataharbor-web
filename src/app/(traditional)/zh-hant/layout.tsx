import { SiteDocument, rootMetadata } from '@/server/Site';
export const metadata = rootMetadata('zh-hant');
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="zh-hant">{children}</SiteDocument>;
}
