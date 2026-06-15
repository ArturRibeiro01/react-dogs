export const isDevelopmentEnvironment = (baseUrl = import.meta.env.BASE_URL) =>
  baseUrl === '/' || baseUrl.includes('/dev/');
