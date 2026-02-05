const fetch = global.fetch || require('node-fetch');

async function run() {
  try {
    const body = {
      title: `E2E Node Test ${Date.now()}`,
      slug: `e2e-node-test-${Date.now()}`,
      category: 'Testing',
      imageUrl: 'https://via.placeholder.com/1200x800',
    };

    const postRes = await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const postJson = await postRes.json();
    console.log('POST response:', JSON.stringify(postJson, null, 2));

    const getRes = await fetch('http://localhost:3000/api/projects');
    const getJson = await getRes.json();
    console.log('GET response (projects count):', getJson.count || (getJson.projects && getJson.projects.length));
  } catch (err) {
    console.error('E2E test error:', err);
    process.exit(1);
  }
}

run();
