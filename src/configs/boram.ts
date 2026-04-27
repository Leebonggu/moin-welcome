import { PersonConfig } from './types';

const boram: PersonConfig = {
  company: 'MOIN',
  name: '정보람',
  team: 'Growth Team',
  joinDate: '2026.04.27',
  subtitle: 'Growth팀 신입 등장!!!!!!!!!!',
  intro: '안녕하세요, 오늘 Growth팀으로 입사한 정보람입니다.\n여행 플랫폼과 교육 신사업팀에서 근무한 경험이 있습니다.\n핀테크 기업은 처음이라 긴장되지만 잘 적응해보도록 하겠습니다. 잘 부탁드립니다! 🫡',
  career: [
    { icon: '✈️', name: '여행 플랫폼',  desc: 'TRAVEL PLATFORM' },
    { icon: '📚', name: '교육 신사업팀', desc: 'EDU NEW BIZ' },
    { icon: '💸', name: '핀테크 NEW!!!', desc: 'FINTECH FIRST TIME 🔥' },
  ],
  hobbies: [
    { icon: '🏛️', name: '전시 & 건축', desc: '데미안 허스트 전시 다녀옴 ✅\n예술 감각 장착 완료', color: 'var(--neon-purple)' },
    { icon: '🌸', name: '향수 러버',    desc: 'APFR 디퓨저 신규 구매 ✅\n감성 레벨 MAX',         color: 'var(--neon-pink)' },
    { icon: '📐', name: '공간과 미학',  desc: '건축 + 향 + 예술\n= 보람님만의 감성 세계',         color: 'var(--neon-cyan)' },
  ],
  welcomeLines: [
    '<span class="accent accent-yellow">여행도 알고 교육도 알고</span>',
    '이제 <span class="accent accent-pink">핀테크까지!!!</span>',
    '핀테크가 처음이라 긴장되신다고요?',
    '<span class="accent accent-green">긴장 NO! 설렘 YES!</span>',
    '모인 Growth팀이 든든하게',
    '<span class="accent accent-cyan">옆에 있을게요!!!! 💪💪💪</span>',
    '잘 적응하실 거라 100% 확신합니다!!!',
    '<span class="accent accent-yellow">믿어요 보람님!!! 🫡🫡🫡</span>',
  ],
  marquee: [
    '🎉 정보람님 모인 입사 축하드립니다 🎉',
    '💥 Growth팀에 오신 것을 환영합니다 💥',
    '🚀 핀테크 신입 등장!!! 두려움 금지!!! 🚀',
    '🎊 모인과 함께라면 두려울게 없다!!! 🎊',
    '⭐ 잘 부탁드립니다!!! 잘 부탁드립니다!!! ⭐',
  ],
  finalShout: '보람님 없인 모인도 없다!!!!!!',
};

export default boram;
