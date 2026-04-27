import { PersonConfig } from './types';
import boram from './boram';
import youngjoo from './youngjoo';

// 새 사람 추가 방법:
// 1. src/configs/홍길동.ts 파일 생성 (boram.ts 복사해서 수정)
// 2. 아래 registry에 한 줄 추가
// 3. git push → Vercel 자동 배포
// → URL: yoursite.vercel.app/홍길동

export const configs: Record<string, PersonConfig> = {
  boram,
  youngjoo,
};
