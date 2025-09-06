import { createClient } from '@/app/utils/supabase/server'

export async function POST(request: Request, ctx: RouteContext<"/api/orders/checkin/[id]">) {
  const supabase = await createClient();
  const { id } = await ctx.params;
  const { data: order } = await 
    supabase
    .from("orders")
    .update({ 
      status: "checked in",
      updated_at: new Date()
    })
    .eq("id", id)
    .select();
  
  return new Response(JSON.stringify(order), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}