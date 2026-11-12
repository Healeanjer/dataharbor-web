import { SiteDocument, rootMetadata } from '@/server/Site';
export const metadata = rootMetadata('en');
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
