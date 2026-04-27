import { configs } from '@/configs';
import Link from 'next/link';

export default function Home() {
  const people = Object.entries(configs);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          min-height: 100vh;
          background: #000;
          font-family: 'Noto Sans KR', sans-serif;
        }
        .bg {
          position: fixed; inset: 0;
          background: linear-gradient(135deg, #ff006e, #ffbe0b, #06d6a0, #118ab2, #8338ec, #fb5607, #ff006e);
          background-size: 400% 400%;
          animation: bgShift 4s ease infinite;
          z-index: 0;
        }
        @keyframes bgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .wrap {
          position: relative; z-index: 10;
          max-width: 680px; margin: 0 auto; padding: 60px 20px;
        }
        .title {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(32px, 7vw, 64px);
          color: #fff;
          text-shadow: 4px 4px 0 #000;
          text-align: center;
          margin-bottom: 8px;
          -webkit-text-stroke: 2px #000;
        }
        .subtitle {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(14px, 3vw, 20px);
          color: #ffbe0b;
          text-align: center;
          margin-bottom: 48px;
          letter-spacing: 2px;
          text-shadow: 2px 2px 0 #000;
        }
        .list { display: flex; flex-direction: column; gap: 14px; }
        .card {
          background: rgba(0,0,0,0.75);
          border: 3px solid;
          border-radius: 14px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .card:hover { transform: scale(1.02) rotate(-0.5deg); }
        .card:nth-child(3n+1) { border-color: #ff006e; box-shadow: 0 0 20px rgba(255,0,110,0.4); }
        .card:nth-child(3n+2) { border-color: #06d6a0; box-shadow: 0 0 20px rgba(6,214,160,0.4); }
        .card:nth-child(3n)   { border-color: #8338ec; box-shadow: 0 0 20px rgba(131,56,236,0.4); }
        .card-left { display: flex; align-items: center; gap: 14px; }
        .avatar {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, #ff006e, #8338ec);
          border-radius: 50%;
          border: 3px solid #000;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Black Han Sans', sans-serif;
          font-size: 20px; color: #fff;
          text-shadow: 1px 1px 0 #000;
          flex-shrink: 0;
        }
        .name {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(20px, 4vw, 28px);
          color: #fff;
          text-shadow: 2px 2px 0 #000;
          display: block;
        }
        .meta {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 1px;
          display: block;
          margin-top: 2px;
        }
        .arrow {
          font-family: 'Black Han Sans', sans-serif;
          font-size: 22px;
          color: #ffbe0b;
          text-shadow: 2px 2px 0 #000;
          flex-shrink: 0;
          animation: arrowBop 0.8s ease infinite alternate;
        }
        @keyframes arrowBop {
          from { transform: translateX(0); }
          to   { transform: translateX(6px); }
        }
        .count {
          font-family: 'Black Han Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          text-align: center;
          margin-top: 32px;
          letter-spacing: 2px;
        }
      `}</style>

      <div className="bg" />
      <div className="wrap">
        <div className="title">🎉 MOIN 환영합니다</div>
        <div className="subtitle">✦ 새 가족 목록 ✦</div>

        <div className="list">
          {people.map(([slug, cfg]) => (
            <Link key={slug} href={`/${slug}`} className="card">
              <div className="card-left">
                <div className="avatar">{cfg.name[0]}</div>
                <div>
                  <span className="name">{cfg.name} 님</span>
                  <span className="meta">{cfg.team} &nbsp;|&nbsp; {cfg.joinDate}</span>
                </div>
              </div>
              <span className="arrow">→</span>
            </Link>
          ))}
        </div>

        <div className="count">총 {people.length}명의 새 가족 🎊</div>
      </div>
    </>
  );
}
