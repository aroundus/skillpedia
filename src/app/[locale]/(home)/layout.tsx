import { Layout } from '@/widgets/layout/ui';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Layout.Header />
      {children}
    </>
  );
}
