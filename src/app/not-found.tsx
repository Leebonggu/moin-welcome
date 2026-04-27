import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', background: '#000', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
      fontFamily: "'Noto Sans KR', sans-serif", color: '#fff',
    }}>
      <div style={{ fontSize: 72 }}>🤔</div>
      <div style={{ fontFamily: 'Black Han Sans, sans-serif', fontSize: 32, textShadow: '3px 3px 0 #ff006e' }}>
        아직 환영 페이지가 없어요
      </div>
      <Link href="/" style={{ color: '#ffbe0b', fontSize: 18, textDecoration: 'none', fontWeight: 700 }}>
        ← 전체 목록 보기
      </Link>
    </div>
  );
}
