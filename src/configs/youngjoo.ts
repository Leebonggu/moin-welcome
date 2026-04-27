import { PersonConfig } from './types';

const youngjoo: PersonConfig = {
  company: 'MOIN',
  name: '윤영주',
  team: 'HR Team',
  joinDate: '2026.04.27',
  subtitle: 'HR팀 신입 등장!!!!!!!!!!',
  intro: '안녕하세요! 4월 27일에 입사한 HR팀 윤영주입니다 😊😊\n모인에서 멋진 분들과 함께하게 되어서 매우 기쁘고\n앞으로 잘 부탁드립니다 🎉',
  career: [
    { icon: '🏢', name: 'HR Team',    desc: 'HUMAN RESOURCES' },
    { icon: '💼', name: '모인 합류',   desc: 'MOIN FAMILY 2026' },
    { icon: '😎', name: '이런사람도 입사함!!!', desc: 'YES, FOR REAL 🔥' },
  ],
  hobbies: [
    { icon: '🩰', name: '발레',     desc: '4년차 발레리나 🩰\n자세교정·근력·유연성 ALL IN',  color: 'var(--neon-pink)' },
    { icon: '🐟', name: '회 러버',  desc: '3주에 3번 회 먹음 ✅\n회 없인 못 살아',            color: 'var(--neon-cyan)' },
    { icon: '💪', name: '건강체력왕', desc: '발레 + 회 = 최강 조합\n모인의 건강 대표 선수',   color: 'var(--neon-purple)' },
  ],
  welcomeLines: [
    '<span class="accent accent-yellow">발레도 하고 회도 먹고</span>',
    '이제 <span class="accent accent-pink">HR까지!!!</span>',
    '모인에 멋진 분들이 많다고 하셨는데',
    '<span class="accent accent-green">영주님도 그 중 한 명입니다!!! ⭐</span>',
    'HR팀이 든든하게',
    '<span class="accent accent-cyan">곁에 있을게요!!!! 💪💪💪</span>',
    '이런사람도 입사했다구요?',
    '<span class="accent accent-yellow">이런사람이 있어야 회사가 삽니다!!! 🫡🫡🫡</span>',
  ],
  marquee: [
    '🎉 윤영주님 모인 입사 축하드립니다 🎉',
    '🩰 4년차 발레리나 HR팀 등장 🩰',
    '🐟 3주에 회 3번은 기본 중의 기본 🐟',
    '💥 이런사람도 입사함!!! 다행이다!!! 💥',
    '🎊 모인 HR팀에 오신 것을 환영합니다 🎊',
  ],
  finalShout: '영주님 없인 모인 HR도 없다!!!!!!',
};

export default youngjoo;
