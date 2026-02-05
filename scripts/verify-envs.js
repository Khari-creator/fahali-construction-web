const fs = require('fs');
const path = require('path');

const required = [
  'DATABASE_URL',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE',
  'SUPABASE_STORAGE_BUCKET',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
];

function loadEnv(file) {
  if (!fs.existsSync(file)) return {};
  const content = fs.readFileSync(file, 'utf8');
  return content.split(/\r?\n/).reduce((acc, line) => {
    const m = line.match(/^\s*([A-Z0-9_]+)=(.*)$/);
    if (m) acc[m[1]] = m[2].replace(/^"|"$/g, '');
    return acc;
  }, {});
}

const local = loadEnv(path.resolve(process.cwd(), '.env.local'));
const env = loadEnv(path.resolve(process.cwd(), '.env'));
const merged = { ...env, ...local };

const missing = required.filter((k) => !merged[k]);
if (missing.length) {
  console.error('Missing env vars:', missing.join(', '));
  process.exit(1);
}
console.log('All required environment variables present.');
