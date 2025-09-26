import { createClient } from '@/app/utils/supabase/server'

export default async function TestPage() {
  const supabase = await createClient();

  const { data } = await supabase.from("orders").select();

  return <h1>Test</h1>
}