/** GitHub project sites use a subdirectory; local and custom-domain builds use the root. */
export const siteBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
export function sitePath(path: string) {
  if (!siteBasePath || !path.startsWith('/') || path.startsWith('//')) return path;
  if (path === siteBasePath || path.startsWith(siteBasePath + '/')) return path;
  return siteBasePath + path;
}
export function withoutBasePath(path: string) {
  return siteBasePath && (path === siteBasePath || path.startsWith(siteBasePath + '/'))
    ? path.slice(siteBasePath.length) || '/'
    : path;
}
