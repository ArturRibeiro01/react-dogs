const apiUrl = process.env.VITE_API_URL || 'https://dogsapi.origamid.dev/json';
const url = new URL('/api/photo/', apiUrl);

url.searchParams.set('_page', '1');
url.searchParams.set('_total', '1');
url.searchParams.set('_user', '0');

try {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API responded with ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('API health response is not an array');
  }

  console.log(`API health check passed: ${response.status} ${url}`);
} catch (error) {
  console.error(`API health check failed: ${error.message}`);
  process.exitCode = 1;
}
