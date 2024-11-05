# Supabase public URL and anonymous key for accessing your Supabase project.
NEXT_PUBLIC_SUPABASE_URL=https://hlxsztkqfvxjbrwmmfww.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhseHN6dGtxZnZ4amJyd21tZnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5MjE5NjQsImV4cCI6MjA0NDQ5Nzk2NH0.0abdxWp9HfoDrj2_tI70EUko_I_6ZD3oOi6xmY1FaOg

# Google OAuth client ID for authenticating users via Google in your project.
NEXT_PUBLIC_GOOGLE_CLIENT_ID="442990247161-gmhvqk1dp4i21pdh4796r6skc18tmcca.apps.googleusercontent.com"        

# Connection pooling with Supavisor: used for handling multiple simultaneous connections to the database efficiently.
# DATABASE_URL="postgresql://postgres.hlxsztkqfvxjbrwmmfww:Arbounix159865@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
# DIRECT_URL="postgresql://postgres.hlxsztkqfvxjbrwmmfww:Arbounix159865@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"




# Direct connection to the database (used for migrations or direct SQL execution).

DATABASE_URL="postgresql://postgres:root@localhost:5432/freelances"
DIRECT_URL="postgresql://postgres:root@localhost:5432/freelances"
# DATABASE_URL="postgresql://postgres.hlxsztkqfvxjbrwmmfww:Arbounix159865@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
# Cloudinary configuration for handling media uploads in your project.
CLOUDINARY_CLOUD_NAME='dlyf0syzk'
CLOUDINARY_API_KEY='269219317964892'
CLOUDINARY_API_SECRET='muK4dWIgKvLt6My3hgA1SToqLbo'

# Vercel deployment URL (optional, can be used for preview builds).
# VERCEL_URL=""