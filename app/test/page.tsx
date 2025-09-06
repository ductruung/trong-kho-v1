import { createClient } from '@/app/utils/supabase/server'

export default async function TestPage() {
  const supabase = await createClient();

  const { data } = await supabase.from("orders").select();

  console.log("supabase: ", supabase);
  console.log("data: ", data);

  return <h1>Test</h1>
}