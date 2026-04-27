'use client';

import { useEffect, useRef } from 'react';
import { PersonConfig } from '@/configs/types';

// ── Bonobo SVG ──────────────────────────────────────────────
function BonoboBoy({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* ears */}
      <circle cx="20" cy="30" r="15" fill="#4A90D9" />
      <circle cx="80" cy="30" r="15" fill="#4A90D9" />
      <circle cx="20" cy="30" r="9"  fill="#6EB3F7" />
      <circle cx="80" cy="30" r="9"  fill="#6EB3F7" />
      {/* body */}
      <ellipse cx="50" cy="60" rx="44" ry="40" fill="#4A90D9" />
      {/* belly */}
      <ellipse cx="50" cy="68" rx="27" ry="27" fill="#D6ECFF" />
      {/* eyes */}
      <circle cx="37" cy="50" r="9"  fill="white" />
      <circle cx="63" cy="50" r="9"  fill="white" />
      <circle cx="39" cy="52" r="5"  fill="#111" />
      <circle cx="65" cy="52" r="5"  fill="#111" />
      <circle cx="40" cy="50" r="2"  fill="white" />
      <circle cx="66" cy="50" r="2"  fill="white" />
      {/* nose */}
      <ellipse cx="50" cy="62" rx="8" ry="6" fill="#111" />
      <circle  cx="47" cy="60" r="2" fill="#333" />
      {/* smile */}
      <path d="M 43 70 Q 50 76 57 70" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const BONOBO_POSITIONS = [
  { size: 130, style: { left:  '2%',  top: '10%' }, delay: '0s',   dur: '7s' },
  { size:  85, style: { right: '4%',  top: '38%' }, delay: '-2.5s', dur: '9s' },
  { size: 105, style: { left:  '8%',  bottom: '15%' }, delay: '-4s', dur: '6s' },
  { size:  65, style: { right: '10%', bottom: '25%' }, delay: '-1.5s', dur: '8s' },
  { size:  90, style: { left:  '42%', top: '3%'  }, delay: '-3s',  dur: '10s' },
  { size:  75, style: { right: '30%', bottom: '8%' }, delay: '-5s', dur: '7.5s' },
];

// ── Fireworks ────────────────────────────────────────────────
const COLORS = ['#ff006e','#ffbe0b','#06d6a0','#00f5d4','#8338ec','#fb5607','#fff','#ff99cc','#ffd700'];

class Particle {
  x: number; y: number; color: string;
  vx: number; vy: number; life: number; decay: number;
  size: number; gravity: number; trail: {x:number;y:number}[];
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
  targetY: number; color: string; exploded: boolean; trail: {x:number;y:number}[];
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

// ── Letter colours ───────────────────────────────────────────
const LETTER_COLORS = ['#ff006e','#ffbe0b','#06d6a0','#00f5d4','#8338ec','#fb5607','#fff'];
const FLOAT_EMOJIS   = ['🎉','🎊','💥','🎆','🎇','⭐','🌟','💫','✨','🫡','💸','🚀'];
const BURST_EMOJIS   = ['💥','🎉','🎊','⭐','🌟','✨','💫','🎆','🔥','💸'];

// ── Main Component ───────────────────────────────────────────
export default function WelcomePage({ config }: { config: PersonConfig }) {
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

    // initial burst
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const r = new Rocket(0.1 * canvas!.width + Math.random() * canvas!.width * 0.8, canvas!.height * (0.2 + Math.random() * 0.5));
          particles.push(...r.burst());
        }, i * 180);
      }
    }, 500);

    // floaters
    const floaterContainer = document.getElementById('floaters');
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

    // click burst
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        const el = document.createElement('div');
        el.className = 'click-burst';
        el.textContent = BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)];
        el.style.left = (e.clientX - 12) + 'px';
        el.style.top  = (e.clientY - 12) + 'px';
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

  const welcomeLetters = '환영합니다'.split('').map((c, i) => (
    <span key={i} style={{ animationDelay: `${i * 0.06}s`, color: LETTER_COLORS[i % LETTER_COLORS.length] }}>{c}</span>
  ));
  const nameLetters = config.name.split('').map((c, i) => (
    <span key={i} style={{ animationDelay: `${(i + 6) * 0.06}s`, color: LETTER_COLORS[(i + 3) % LETTER_COLORS.length] }}>{c}</span>
  ));

  const marqueeItems = [...config.marquee, ...config.marquee].map((m, i) => (
    <span key={i} className="marquee-item">{m}</span>
  ));

  return (
    <>
      <div className="bg-chaos" />
      <div className="noise" />

      {/* Bonobo background characters */}
      {BONOBO_POSITIONS.map((b, i) => (
        <div
          key={i}
          className="bonobo-bg-item"
          style={{ ...b.style, animationDuration: b.dur, animationDelay: b.delay }}
        >
          <BonoboBoy size={b.size} />
        </div>
      ))}

      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none' }} />
      <div id="floaters" />

      <div className="container">
        {/* HEADER */}
        <div className="header-zone">
          <div className="daebak">🚨 대박이당!!!!! 🚨</div>
          <div className="stars-row">
            {[['#ff006e','#fff'],['#ffbe0b','#000'],['#06d6a0','#000']].map(([fill,txt], i) => (
              <div key={i} className="starburst" style={{ animationDelay: `${-i*0.7}s`, width: 80 - i*10, height: 80 - i*10 }}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill={fill} stroke="#000" strokeWidth="2"/>
                  <text x="50" y="58" textAnchor="middle" fontSize="20" fill={txt}>★</text>
                </svg>
              </div>
            ))}
          </div>
          <div className="main-title">
            {welcomeLetters}
            <span style={{ color: '#fff' }}>&nbsp;</span>
            {nameLetters}
            <span style={{ animationDelay: '0.54s', color: '#06d6a0' }}>님</span>
          </div>
          <div className="subtitle-bang">{config.subtitle}</div>
          <div className="explode-divider">🎆🎇💥🎆🎇💥🎆🎇💥</div>
        </div>

        {/* MARQUEE */}
        <div className="marquee-wrap">
          <div className="marquee-inner">{marqueeItems}</div>
        </div>

        {/* NAME CARD */}
        <div className="chaos-card card-pink" style={{ marginBottom: 16 }}>
          <div className="card-label label-pink">✦ 새 가족 소개 ✦</div>
          <div className="name-hero">
            <span className="name-highlight">{config.name}</span> 님
          </div>
          <div className="badge-row">
            <span className="team-badge">🚀 {config.team}</span>
            <span className="team-badge purple">📅 {config.joinDate} 입사</span>
            <span className="moin-badge">{config.company}</span>
          </div>
          <div className="join-date">✦ 오늘부터 {config.company} 가족 ✦ 이제 우리 편 ✦</div>
        </div>

        {/* INTRO */}
        <div className="chaos-card card-yellow" style={{ marginBottom: 16 }}>
          <div className="card-label label-yellow">✦ 자기소개 ✦</div>
          <div className="intro-box">
            {config.intro.split('\n').map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </div>

        {/* CAREER + WELCOME */}
        <div className="two-col" style={{ marginBottom: 16 }}>
          <div className="chaos-card card-green">
            <div className="card-label label-green">✦ 커리어 트랙 ✦</div>
            <ul className="career-list">
              {config.career.map((c, i) => (
                <li key={i} className="career-item">
                  <span className="career-icon">{c.icon}</span>
                  <div>
                    <strong className="career-name">{c.name}</strong>
                    <span className="career-desc">{c.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="chaos-card card-blue">
            <div className="card-label label-cyan">✦ 환영 메세지 ✦</div>
            <div className="welcome-msg">
              {config.welcomeLines.map((line, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </div>
          </div>
        </div>

        {/* HOBBIES */}
        <div className="chaos-card card-yellow" style={{ marginBottom: 16 }}>
          <div className="card-label label-yellow">✦ {config.name.slice(-2)}님의 세계 ✦</div>
          <div className="hobby-grid">
            {config.hobbies.map((h, i) => (
              <div key={i} className="hobby-pill" style={{ borderColor: h.color }}>
                <span className="hobby-icon">{h.icon}</span>
                <div>
                  <span className="hobby-name">{h.name}</span>
                  <span className="hobby-desc">
                    {h.desc.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL */}
        <div className="chaos-card card-purple" style={{ textAlign: 'center' }}>
          <div className="card-label label-purple">✦ {config.company} {config.team} 일동 ✦</div>
          <div className="explode-divider" style={{ fontSize: 36 }}>🎆💥🎇🎆💥🎇🎆💥🎇</div>
          <div className="exclamation-row">환영합니다!!!!!! 🎊🎊🎊</div>
          <div className="exclamation-row" style={{ fontSize: 'clamp(18px,3.5vw,32px)', color: 'var(--neon-yellow)' }}>
            {config.finalShout}
          </div>
          <div className="explode-divider">💥🎆💥🎇💥🎆💥🎇💥</div>
          <div className="footer-note">{config.joinDate} | {config.company} {config.team} | 🫡</div>
        </div>
        <div style={{ height: 60 }} />
      </div>
    </>
  );
}
