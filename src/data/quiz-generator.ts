// 퀴즈 자동 생성 — 해석 중심 (문법 퀴즈 제거)
import type { QuizStep, MatchReverseStep, Explanation } from './types'
import type { VerseWord } from './types'

// ── 격변화 함정 사전 ──
const CASE_DISTRACTORS: Record<string, { text: string; why: string }[]> = {
  'me': [
    { text: 'mayā', why: 'mayā는 "나에 의해"이고, me는 "나는/나에게"입니다' },
    { text: 'mama', why: 'mama는 "나의"이고, me는 "나는/나에게"입니다' },
    { text: 'maṃ', why: 'maṃ은 "나를"이고, me는 "나는/나에게"입니다' },
  ],
  'sutaṃ': [
    { text: 'sutassa', why: 'sutassa는 "들은 것의"입니다' },
    { text: 'sutena', why: 'sutena는 "들은 것에 의해"입니다' },
    { text: 'suttaṃ', why: 'suttaṃ은 "경전을"이지 "들은 것"이 아닙니다' },
  ],
  'bhagavā': [
    { text: 'bhagavato', why: 'bhagavato는 "세존의/세존에게"입니다' },
    { text: 'bhagavantaṃ', why: 'bhagavantaṃ은 "세존을"입니다' },
    { text: 'bhagavatā', why: 'bhagavatā는 "세존에 의해"입니다' },
  ],
  'devā': [
    { text: 'devānaṃ', why: 'devānaṃ은 "천신들의"입니다' },
    { text: 'devaṃ', why: 'devaṃ은 "천신을"입니다' },
    { text: 'devehi', why: 'devehi는 "천신들에 의해"입니다' },
  ],
  'maṅgalāni': [
    { text: 'maṅgalaṃ', why: 'maṅgalaṃ은 "행복을(단수)"입니다' },
    { text: 'maṅgalassa', why: 'maṅgalassa는 "행복의"입니다' },
    { text: 'maṅgalehi', why: 'maṅgalehi는 "행복들에 의해"입니다' },
  ],
  'viharati': [
    { text: 'viharanti', why: 'viharanti는 "~들이 머무시다(복수)"입니다' },
    { text: 'vihari', why: 'vihari는 "머무셨다(과거형)"입니다' },
    { text: 'viharāma', why: 'viharāma는 "우리는 머문다"입니다' },
  ],
  'dhammaṃ': [
    { text: 'dhammo', why: 'dhammo는 "법이(주격)"입니다' },
    { text: 'dhamme', why: 'dhamme는 "법에서(처소격)"입니다' },
    { text: 'dhammena', why: 'dhammena는 "법에 의해(구격)"입니다' },
  ],
  'dukkhaṃ': [
    { text: 'dukkhassa', why: 'dukkhassa는 "고통의"입니다' },
    { text: 'dukkhena', why: 'dukkhena는 "고통에 의해"입니다' },
    { text: 'dukkhe', why: 'dukkhe는 "고통에서"입니다' },
  ],
  'rūpaṃ': [
    { text: 'rūpassa', why: 'rūpassa는 "물질의"입니다' },
    { text: 'rūpena', why: 'rūpena는 "물질에 의해"입니다' },
    { text: 'rūpe', why: 'rūpe는 "물질에서"입니다' },
  ],
  'aniccaṃ': [
    { text: 'niccaṃ', why: 'niccaṃ은 "영원한"이고 aniccaṃ은 "무상한"입니다 — 정반대!' },
    { text: 'aniccā', why: 'aniccā는 복수형입니다' },
    { text: 'aniccena', why: 'aniccena는 "무상한 것에 의해"입니다' },
  ],
  'anattā': [
    { text: 'attā', why: 'attā는 "자아"이고, anattā는 "무아" — 정반대!' },
    { text: 'anattaṃ', why: 'anattaṃ은 "무아를"입니다' },
    { text: 'anattatā', why: 'anattatā는 "무아성(추상명사)"입니다' },
  ],
  'bhikkhave': [
    { text: 'bhikkhū', why: 'bhikkhū는 "비구들이(주격)"입니다' },
    { text: 'bhikkhunaṃ', why: 'bhikkhunaṃ은 "비구들의"입니다' },
    { text: 'bhikkhūhi', why: 'bhikkhūhi는 "비구들에 의해"입니다' },
  ],
  'kāye': [
    { text: 'kāyo', why: 'kāyo는 "몸이(주격)"입니다' },
    { text: 'kāyaṃ', why: 'kāyaṃ은 "몸을(목적격)"입니다' },
    { text: 'kāyassa', why: 'kāyassa는 "몸의(소유격)"입니다' },
  ],
  'taṇhā': [
    { text: 'taṇhaṃ', why: 'taṇhaṃ은 "갈애를"입니다' },
    { text: 'taṇhāya', why: 'taṇhāya는 "갈애에 의해/갈애를 위해"입니다' },
    { text: 'taṇhāsu', why: 'taṇhāsu는 "갈애들에서"입니다' },
  ],
}

// ── 유틸리티 ──

/** 배열 셔플 (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** 해당 단어를 제외한 나머지에서 랜덤 N개 선택 */
function pickRandom<T>(arr: T[], exclude: T, count: number): T[] {
  const filtered = arr.filter(item => item !== exclude)
  return shuffle(filtered).slice(0, count)
}

// ── 퀴즈 생성 함수 (해석 중심) ──

/** 단어 뜻 퀴즈: 빠알리 보고 → 한글 뜻 맞추기 */
export function genMeaningQuiz(target: VerseWord, allWords: VerseWord[]): QuizStep {
  const wrongOptions = pickRandom(allWords, target, 3).map(w => w.meaning)
  const options = shuffle([target.meaning, ...wrongOptions])
  return {
    type: 'quiz',
    question: `"${target.pali}"의 뜻은?`,
    options,
    answer: options.indexOf(target.meaning),
    explanation: {
      correct: `${target.pali} (${target.pronKo}) = "${target.meaning}"`,
    },
  }
}

/** 역방향 퀴즈: 뜻 보고 → 빠알리 맞추기 (격변화 함정) */
export function genReverseQuiz(target: VerseWord, allWords: VerseWord[]): MatchReverseStep {
  const caseTraps = CASE_DISTRACTORS[target.pali]
  let options: string[]
  let explanation: Explanation

  if (caseTraps && caseTraps.length >= 2) {
    const traps = shuffle(caseTraps).slice(0, 2)
    const generalWrong = pickRandom(allWords, target, 1).map(w => w.pali)
    options = shuffle([target.pali, ...traps.map(t => t.text), ...generalWrong])
    explanation = {
      correct: `정답: "${target.pali}" = ${target.meaning}`,
      detail: traps.map(t => `• ${t.text}: ${t.why}`).join('\n'),
    }
  } else {
    const wrongOptions = pickRandom(allWords, target, 3).map(w => w.pali)
    options = shuffle([target.pali, ...wrongOptions])
    explanation = {
      correct: `"${target.meaning}" = ${target.pali} (${target.pronKo})`,
    }
  }

  return {
    type: 'match-reverse',
    meaning: target.meaning,
    options,
    answer: options.indexOf(target.pali),
    explanation,
  }
}

/** 무작위 혼합 퀴즈 (뜻+역방향 랜덤, 모든 단어 최소 1개) */
export function generateMixedQuizzes(words: VerseWord[]): (QuizStep | MatchReverseStep)[] {
  const all: (QuizStep | MatchReverseStep)[] = []
  for (const word of words) {
    const useReverse = Math.random() > 0.5
    if (useReverse) {
      all.push(genReverseQuiz(word, words))
    } else {
      all.push(genMeaningQuiz(word, words))
    }
  }
  return shuffle(all)
}
