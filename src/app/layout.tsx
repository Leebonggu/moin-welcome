import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '입사 환영합니다!!!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
