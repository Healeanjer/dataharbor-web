/** Static, multilingual website with language-specific document layouts. */
export default {
  output: 'export',
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, ''),
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: { globalNotFound: true },
};
