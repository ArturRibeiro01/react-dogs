const apiUrl = process.env.VITE_DOGS_API_URL || 'http://localhost:3333';
const url = new URL(`${apiUrl.replace(/\/$/, '')}/health`);

try {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Dogs API responded with ${response.status}`);
  }

  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Dogs API health response is not an object');
    }
  }

  console.log(`Dogs API health check passed: ${response.status} ${url}`);
} catch (error) {
  console.error(`Dogs API health check failed: ${error.message}`);
  process.exitCode = 1;
}
