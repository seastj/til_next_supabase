import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const supabase = await createClient();
  // 세션 정보가 있는지 없는지 기다림
  const { data } = await supabase.auth.getSession();
  // 세션정보를 가져왔는데 null 이 아니라면 회원이다.
  if (data.session) redirect('/');
  return <>{children}</>;
}
