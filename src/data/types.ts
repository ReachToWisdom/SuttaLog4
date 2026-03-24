// 학습 스텝 타입 정의 (간소화 — 해석 중심)

// ── 공통 해설 ──
export interface Explanation {
  correct: string    // 정답 해설
  detail?: string    // 상세 설명 (선택)
  tip?: string       // 암기 팁 (선택)
}

// ── 함정 선택지 ──
export interface Distractor {
  text: string       // 선택지 텍스트
  why?: string       // 왜 오답인지
}

// ── 스텝 타입 ──

/** 단원 시작 소개 */
export interface IntroStep {
  type: 'intro'
  title: string
  subtitle: string
  description: string
  icon: string
}

/** 단어/발음 카드 학습 (문법 힌트에도 재활용) */
export interface TeachStep {
  type: 'teach'
  word: string           // 빠알리어
  pronKo: string         // 한글 발음
  pronEn?: string        // 영어 발음
  meaning: string        // 뜻
  grammar?: string       // 문법 태그 (문법 힌트 ON 시 표시)
  root?: string          // 어근
  icon?: string
  verseLine?: string     // 이 단어가 나오는 경전 구절
  verseLineKo?: string   // 구절 한글 번역
}

/** 경전 원문 표시 + 단어별 터치 */
export interface VerseStep {
  type: 'verse'
  pali: string
  pronKo: string
  translation: string
  words: VerseWord[]     // 단어별 정보
  grammarNotes?: string[] // 문법 분석 (문법 힌트 ON 시 표시)
  note?: string
}

export interface VerseWord {
  pali: string
  pronKo: string
  pronEn?: string
  meaning: string
  grammar?: string
  /** 복습 우선순위: true면 다음 단원에서도 복습 대상 */
  important?: boolean
}

/** 4지선다 해석 퀴즈 */
export interface QuizStep {
  type: 'quiz'
  question: string
  options: string[]
  answer: number         // 정답 인덱스
  explanation: Explanation
  hint?: string
}

/** 뜻 보고 빠알리어 맞추기 */
export interface MatchReverseStep {
  type: 'match-reverse'
  meaning: string        // 보여줄 한글 뜻
  options: string[]      // 빠알리어 선택지
  answer: number
  explanation: Explanation
}

/** 독해 조립: 빠알리어 보고 → 한글 조각으로 문장 조립 */
export interface ArrangeReadingStep {
  type: 'arrange-reading'
  pali: string           // 빠알리 원문
  pieces: string[]       // 한글 조각 (정답 순서)
  distractors: Distractor[]  // 함정 조각
  explanation: Explanation
}

// ── 유니온 타입 ──
export type Step =
  | IntroStep
  | TeachStep
  | VerseStep
  | QuizStep
  | MatchReverseStep
  | ArrangeReadingStep

// ── 단원 메타데이터 ──
export interface LessonInfo {
  id: string
  title: string
  subtitle: string
  icon: string
  category: 'basic' | 'mangala' | 'ratana' | 'metta' | 'dhammacakka' | 'anatta' | 'dhammapada' | 'satipatthana-kaya' | 'satipatthana-dhamma'
  steps: Step[]
}

// ── 자모 데이터 ──
export interface PaliLetter {
  roman: string
  pronKo: string
  pronDesc?: string
  example?: string
  examplePronKo?: string
  exampleMeaning?: string
}
