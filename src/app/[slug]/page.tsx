import { configs } from '@/configs';
import WelcomePage from '@/components/WelcomePage';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return Object.keys(configs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = configs[slug];
  if (!config) return {};
  return { title: `🎉 ${config.name}님 ${config.company} 입사 환영합니다!!!` };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = configs[slug];
  if (!config) notFound();
  return <WelcomePage config={config} />;
}
