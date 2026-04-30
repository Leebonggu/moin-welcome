'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#ff006e','#ffbe0b','#06d6a0','#00f5d4','#8338ec','#fb5607','#fff','#ff99cc','#ffd700'];
const FLOAT_EMOJIS = ['🔨','💪','🍺','🍻','👷','❤️','🫡','💥','⭐','🌟','✨','🎉'];
const BURST_EMOJIS = ['💥','🍺','🔨','💪','❤️','⭐','🍻'];
const LETTER_COLORS = ['#ff006e','#ffbe0b','#06d6a0','#00f5d4','#8338ec','#fb5607','#fff'];

class Particle {
  x: number; y: number; color: string;
  vx: number; vy: number; life: number; decay: number;
  size: number; gravity: number; trail: { x: number; y: number }[];
  constructor(x: number, y: number, color: string) {
    this.x = x; this.y = y; this.color = color;
    const angle = Math.random() * Math.PI * 2, speed = 2 + Math.random() * 6;
    this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed - 2;
    this.life = 1; this.decay = 0.012 + Math.random() * 0.018;
    this.size = 2 + Math.random() * 4; this.gravity = 0.12; this.trail = [];
  }
  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 6) this.trail.shift();
    this.vy += this.gravity; this.x += this.vx; this.y += this.vy;
    this.vx *= 0.97; this.life -= this.decay;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    for (let i = 0; i < this.trail.length; i++) {
      ctx.globalAlpha = (i / this.trail.length) * this.life * 0.5;
      ctx.fillStyle = this.color;
      ctx.beginPath(); ctx.arc(this.trail[i].x, this.trail[i].y, this.size * 0.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = this.life; ctx.fillStyle = this.color;
    ctx.shadowColor = this.color; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
}

class Rocket {
  x: number; y: number; vx: number; vy: number;
  targetY: number; color: string; exploded: boolean; trail: { x: number; y: number }[];
  constructor(ox?: number, oy?: number, w?: number, h?: number) {
    const W = w ?? window.innerWidth, H = h ?? window.innerHeight;
    this.x = ox ?? (0.15 * W + Math.random() * W * 0.7);
    this.y = oy ?? H;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = -(8 + Math.random() * 7);
    this.targetY = H * (0.1 + Math.random() * 0.45);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.exploded = ox !== undefined;
    this.trail = [];
  }
  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 10) this.trail.shift();
    this.x += this.vx; this.y += this.vy; this.vy += 0.18;
    if (this.vy >= 0 || this.y <= this.targetY) this.exploded = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    for (let i = 0; i < this.trail.length; i++) {
      ctx.globalAlpha = (i / this.trail.length) * 0.6;
      ctx.fillStyle = this.color; ctx.shadowColor = this.color; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1; ctx.fillStyle = '#fff';
    ctx.shadowColor = this.color; ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.arc(this.x, this.y, 3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  burst(): Particle[] {
    const c1 = COLORS[Math.floor(Math.random() * COLORS.length)];
    const c2 = COLORS[Math.floor(Math.random() * COLORS.length)];
    return Array.from({ length: 80 + Math.floor(Math.random() * 60) }, () =>
      new Particle(this.x, this.y, Math.random() < 0.5 ? c1 : c2)
    );
  }
}

const MARQUEE_ITEMS = [
  '사랑합니다 💖', '노동절 기념 🔨', '시원한 노동주 🍺', '통영닷찌 📍',
  '오늘 18:30 🕕', '1명 모집 👤', '많관부 🫡', '개발팀 일동 💪',
];

const CEO_POSITIONS = [
  { size: 100, style: { right: '3%', top: '10%' }, delay: '-1s', dur: '8s' },
  { size: 75,  style: { left: '3%', top: '55%' },  delay: '-4s', dur: '6s' },
  { size: 90,  style: { right: '18%', bottom: '10%' }, delay: '-5s', dur: '9s' },
];

export default function NodongPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    let particles: Particle[] = [];
    let rockets: Rocket[] = [];
    let lastLaunch = 0;
    let raf: number;

    function loop(ts: number) {
      raf = requestAnimationFrame(loop);
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);
      if (ts - lastLaunch > 600 + Math.random() * 600) {
        rockets.push(new Rocket());
        lastLaunch = ts;
      }
      rockets = rockets.filter(r => { r.update(); if (r.exploded) { particles.push(...r.burst()); return false; } r.draw(ctx); return true; });
      particles = particles.filter(p => { p.update(); p.draw(ctx); return p.life > 0; });
    }
    requestAnimationFrame(loop);

    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const r = new Rocket(0.1 * canvas!.width + Math.random() * canvas!.width * 0.8, canvas!.height * (0.2 + Math.random() * 0.5));
          particles.push(...r.burst());
        }, i * 180);
      }
    }, 500);

    const floaterContainer = document.getElementById('nd-floaters');
    const floaterInterval = setInterval(() => {
      if (!floaterContainer) return;
      const el = document.createElement('div');
      el.className = 'float-emoji';
      el.textContent = FLOAT_EMOJIS[Math.floor(Math.random() * FLOAT_EMOJIS.length)];
      el.style.left = (5 + Math.random() * 90) + 'vw';
      el.style.bottom = '-40px';
      el.style.fontSize = (20 + Math.random() * 28) + 'px';
      const dur = 4 + Math.random() * 5;
      el.style.animationDuration = dur + 's';
      floaterContainer.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 100);
    }, 400);

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        const el = document.createElement('div');
        el.className = 'click-burst';
        el.textContent = BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)];
        el.style.left = (e.clientX - 12) + 'px';
        el.style.top = (e.clientY - 12) + 'px';
        el.style.animationDuration = (0.5 + Math.random() * 0.4) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 900);
      }
      const r = new Rocket(e.clientX, e.clientY);
      particles.push(...r.burst());
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(floaterInterval);
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const titleLetters = '노동주하실분?'.split('').map((c, i) => (
    <span key={i} style={{ animationDelay: `${i * 0.08}s`, color: LETTER_COLORS[i % LETTER_COLORS.length] }}>{c}</span>
  ));

  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((m, i) => (
    <span key={i} className="marquee-item">{m}</span>
  ));

  return (
    <>
      <style>{`
        .nd-spot-num {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(72px, 18vw, 120px);
          color: #ff006e;
          text-shadow: 6px 6px 0 #000;
          line-height: 1;
          -webkit-text-stroke: 3px #000;
          animation: badgePulse 0.6s ease infinite;
          display: block;
        }
        .nd-spot-label {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(20px, 5vw, 36px);
          color: #fff;
          text-shadow: 3px 3px 0 #000;
          animation: colorCycle 0.5s linear infinite;
        }
        .nd-cta {
          display: block;
          background: var(--neon-green);
          color: #000;
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(18px, 4vw, 28px);
          text-align: center;
          padding: 20px;
          border-radius: 14px;
          border: 4px solid #000;
          box-shadow: 6px 6px 0 #000;
          text-decoration: none;
          letter-spacing: 2px;
          margin-bottom: 16px;
          animation: badgePulse 0.9s ease infinite;
          transition: transform 0.1s;
        }
        .nd-cta:hover { transform: scale(1.03) rotate(-0.5deg); }
        .nd-info-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 2px solid rgba(255,255,255,0.1);
        }
        .nd-info-row:last-child { border-bottom: none; }
        .nd-info-icon {
          font-size: 32px;
          flex-shrink: 0;
          animation: iconBop 1s ease infinite alternate;
        }
        .nd-info-title {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(18px, 4vw, 26px);
          color: #ffbe0b;
          text-shadow: 2px 2px 0 #000;
          display: block;
        }
        .nd-info-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          letter-spacing: 1px;
        }
        .nd-announce {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(22px, 5vw, 40px);
          color: #fff;
          text-shadow: 3px 3px 0 #000;
          line-height: 1.6;
          text-align: center;
        }
        .nd-announce .hl { color: var(--neon-yellow); }
        .nd-announce .hl2 { color: var(--neon-pink); font-size: 1.4em; }
        .nd-love {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(20px, 4vw, 32px);
          color: var(--neon-green);
          text-align: center;
          margin-top: 14px;
          animation: colorCycle 0.5s linear infinite;
          letter-spacing: 3px;
        }
      `}</style>

      <div className="bg-chaos" />
      <div className="noise" />

      {/* CEO floating bg */}
      {CEO_POSITIONS.map((c, i) => (
        <div
          key={i}
          className="ceo-bg-item"
          style={{ ...c.style, width: c.size, height: c.size, animationDuration: c.dur, animationDelay: c.delay }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ceo.png" alt="대표님" />
        </div>
      ))}

      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none' }} />
      <div id="nd-floaters" />

      <div className="container">

        {/* HEADER */}
        <div className="header-zone">
          <div className="daebak">🚨 노동절 긴급모집 🚨</div>
          <div className="stars-row">
            {([['#ff006e','#fff'],['#ffbe0b','#000'],['#06d6a0','#000']] as [string,string][]).map(([fill, txt], i) => (
              <div key={i} className="starburst" style={{ animationDelay: `${-i * 0.7}s`, width: 80 - i * 10, height: 80 - i * 10 }}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill={fill} stroke="#000" strokeWidth="2" />
                  <text x="50" y="62" textAnchor="middle" fontSize="28" fill={txt}>🍺</text>
                </svg>
              </div>
            ))}
          </div>
          <div className="main-title">{titleLetters}</div>
          <div className="subtitle-bang">개발팀 노동절 기념 사랑합니다</div>
          <div className="explode-divider">🔨💪🍺🔨💪🍺🔨💪🍺</div>
        </div>

        {/* MARQUEE */}
        <div className="marquee-wrap">
          <div className="marquee-inner">{marqueeItems}</div>
        </div>

        {/* 모집공고 카드 */}
        <div className="chaos-card card-pink" style={{ marginBottom: 16 }}>
          <div className="card-label label-pink">✦ 모집 공고 ✦</div>
          <div style={{ padding: '10px 0' }}>
            <div className="nd-announce">
              개발팀에서 노동절 기념<br />
              저녁에 시원하게 <span className="hl">노동주</span>하실<br />
              <span className="hl2">1명</span> 모십니다
            </div>
            <div className="nd-love">사랑합니다 💖 사랑합니다</div>
          </div>
        </div>

        {/* 이벤트 정보 + 모집 현황 */}
        <div className="two-col" style={{ marginBottom: 16 }}>

          {/* 이벤트 정보 */}
          <div className="chaos-card card-yellow">
            <div className="card-label label-yellow">✦ 이벤트 정보 ✦</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div className="nd-info-row">
                <span className="nd-info-icon">📍</span>
                <div>
                  <span className="nd-info-title">통영닷찌</span>
                  <span className="nd-info-sub">장소 사랑합니다</span>
                </div>
              </div>
              <div className="nd-info-row">
                <span className="nd-info-icon">🕕</span>
                <div>
                  <span className="nd-info-title">18:30 ~ 21:30</span>
                  <span className="nd-info-sub">시간 사랑합니다</span>
                </div>
              </div>
              <div className="nd-info-row">
                <span className="nd-info-icon">👤</span>
                <div>
                  <span className="nd-info-title">1명 사랑합니다</span>
                  <span className="nd-info-sub">인원 사랑합니다</span>
                </div>
              </div>
            </div>
          </div>

          {/* 모집 현황 */}
          <div className="chaos-card card-green">
            <div className="card-label label-green">✦ 모집 현황 ✦</div>
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <span className="nd-spot-num">1</span>
              <div className="nd-spot-label">자리 남음!!!</div>
              <div style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
                marginTop: 10,
                letterSpacing: 2,
              }}>
                모집인원 / 1명
              </div>
              <div style={{
                display: 'inline-block',
                background: '#ff006e',
                color: '#fff',
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: 14,
                padding: '4px 14px',
                borderRadius: 100,
                border: '2px solid #000',
                marginTop: 10,
                animation: 'shake 0.3s ease infinite',
              }}>
                🔴 모집중
              </div>
            </div>
          </div>
        </div>

        {/* 지도 CTA */}
        <a
          href="https://naver.me/IMyTCyvu"
          target="_blank"
          rel="noopener noreferrer"
          className="nd-cta"
        >
          📍 통영닷찌 지도 보기 사랑합니다
        </a>

        {/* 마무리 카드 */}
        <div className="chaos-card card-purple" style={{ textAlign: 'center' }}>
          <div className="card-label label-purple">✦ 개발팀 일동 ✦</div>
          <div className="explode-divider" style={{ fontSize: 36 }}>🔨💪🍺🔨💪🍺🔨💪🍺</div>
          <div className="exclamation-row">많관부 사랑합니다!!!!!</div>
          <div className="exclamation-row" style={{ fontSize: 'clamp(16px,3.5vw,28px)', color: 'var(--neon-yellow)' }}>
            사랑합니다 사랑합니다 사랑합니다
          </div>
          <div className="explode-divider">💖🔨💖💪💖🍺💖🔨💖</div>
          <div className="footer-note">2026-04-30 | 개발팀 | 🫡</div>
        </div>

        <div style={{ height: 60 }} />
      </div>
    </>
  );
}
