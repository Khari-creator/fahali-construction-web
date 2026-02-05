const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
// load .env.local first (secrets), then fallback to .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'project-images';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE in environment');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

async function main() {
  try {
    // Try to create the bucket; if it exists, supabase returns an error we can ignore
    const { data, error } = await supabase.storage.createBucket(BUCKET, { public: true });

    if (error) {
      // If bucket already exists, log and exit normally
      if (error.message && error.message.includes('already exists')) {
        console.log(`Bucket '${BUCKET}' already exists.`);
        process.exit(0);
      }

      console.error('Error creating bucket:', error);
      process.exit(1);
    }

    console.log(`Created bucket: ${BUCKET}`, data);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

main();
