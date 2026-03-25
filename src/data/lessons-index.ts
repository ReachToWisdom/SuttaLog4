// 단원 목록 + 경전 순서 배치
// 문법 힌트 ON/OFF에 따라 스텝 동적 구성
import type { LessonInfo, Step, VerseWord } from './types'
import { VOWELS, ALL_CONSONANTS } from './alphabet'
import {
  VERSE_0 as M_V0, VERSE_0_WORDS as M_W0,
  VERSE_1 as M_V1, VERSE_1_WORDS as M_W1,
  VERSE_2 as M_V2, VERSE_2_WORDS as M_W2,
  VERSE_3 as M_V3, VERSE_3_WORDS as M_W3,
  VERSE_4 as M_V4, VERSE_4_WORDS as M_W4,
  VERSE_5 as M_V5, VERSE_5_WORDS as M_W5,
  VERSE_6 as M_V6, VERSE_6_WORDS as M_W6,
  VERSE_7 as M_V7, VERSE_7_WORDS as M_W7,
  VERSE_8 as M_V8, VERSE_8_WORDS as M_W8,
  VERSE_9 as M_V9, VERSE_9_WORDS as M_W9,
  VERSE_10 as M_V10, VERSE_10_WORDS as M_W10,
  VERSE_11 as M_V11, VERSE_11_WORDS as M_W11,
  VERSE_12 as M_V12, VERSE_12_WORDS as M_W12,
} from './mangala-words'
import {
  ALL_VERSES as RATANA_VERSES,
  ALL_RATANA_WORDS,
} from './ratana-words'
import {
  ALL_VERSES as METTA_VERSES,
  ALL_METTA_WORDS,
} from './metta-words'
import {
  ALL_VERSES as DHAMMACAKKA_VERSES,
  ALL_DHAMMACAKKA_WORDS,
} from './dhammacakka-words'
import {
  ALL_VERSES as ANATTA_VERSES,
  ALL_ANATTA_WORDS,
} from './anatta-words'
import {
  ALL_VERSES as DHAMMAPADA_VERSES,
  ALL_DHAMMAPADA_WORDS,
} from './dhammapada-words'
import {
  KAYA_VERSES,
  ALL_KAYA_WORDS,
} from './satipatthana-kaya'
import {
  DHAMMA_VERSES,
  ALL_DHAMMA_WORDS,
} from './satipatthana-dhamma'
import { genMeaningQuiz, genReverseQuiz } from './quiz-generator'
import { getGrammarHintEnabled } from '../config'
import { DECLENSION_INTRO } from './grammar-textbook'
import { TEXTBOOK_LESSONS } from './textbook-index'

// ── 유틸리티 ──

/** 배열 셔플 */
function shuffle<T>(arr: T[]): T[] {
  const r = [...arr]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

/** verse 데이터에서 핵심 단어 추출 (important 우선, 최대 N개) */
function pickKeyWords(words: VerseWord[], max = 3): VerseWord[] {
  const important = words.filter(w => w.important)
  const rest = words.filter(w => !w.important)
  return [...shuffle(important), ...shuffle(rest)].slice(0, max)
}

/** 한 게송에 대한 스텝 생성 (verse + teach + quiz) */
function buildVerseSteps(
  verse: { pali: string; pronKo: string; translation: string; grammarNotes?: string[] },
  words: VerseWord[],
  allWords: VerseWord[],
  note?: string,
): Step[] {
  const steps: Step[] = []
  const showGrammar = getGrammarHintEnabled()

  // 경전 원문
  steps.push({
    type: 'verse',
    pali: verse.pali,
    pronKo: verse.pronKo,
    translation: verse.translation,
    words,
    grammarNotes: showGrammar ? verse.grammarNotes : undefined,
    note,
  })

  // 핵심 단어 2-3개
  const keyWords = pickKeyWords(words, 3)
  for (const w of keyWords) {
    steps.push({
      type: 'teach',
      word: w.pali,
      pronKo: w.pronKo,
      meaning: w.meaning,
      grammar: showGrammar ? w.grammar : undefined,
      icon: '📿',
    })
  }

  // 해석 퀴즈 1-2개
  if (keyWords.length >= 1) {
    steps.push(genMeaningQuiz(keyWords[0], allWords.length >= 4 ? allWords : words))
  }
  if (keyWords.length >= 2) {
    steps.push(genReverseQuiz(keyWords[1], allWords.length >= 4 ? allWords : words))
  }

  return steps
}

/** 여러 게송으로 한 과 구성 */
function buildSuttaLesson(
  id: string,
  title: string,
  subtitle: string,
  icon: string,
  category: LessonInfo['category'],
  verses: { verse: { pali: string; pronKo: string; translation: string; grammarNotes?: string[] }; words: VerseWord[] }[],
  allWords: VerseWord[],
  grammarHint?: string,
): LessonInfo {
  const steps: Step[] = []

  // 과 소개
  steps.push({
    type: 'intro',
    title,
    subtitle,
    description: grammarHint && getGrammarHintEnabled()
      ? grammarHint
      : `${subtitle}을(를) 배웁니다.`,
    icon,
  })

  // 각 게송별 스텝
  for (let i = 0; i < verses.length; i++) {
    const { verse, words } = verses[i]
    const note = verses.length > 1 ? `${i + 1}/${verses.length}` : undefined
    steps.push(...buildVerseSteps(verse, words, allWords, note))
  }

  return { id, title, subtitle, icon, category, steps }
}

// ══════════════════════════════════════════
// 1과: 자모와 발음
// ══════════════════════════════════════════
export function buildAlphabet(): LessonInfo {
  const steps: Step[] = []

  steps.push({
    type: 'intro',
    title: '자모와 발음',
    subtitle: '모음 8자 + 자음 33자',
    description: '빠알리어의 각 글자가 어떻게 발음되는지 배웁니다.',
    icon: '🔤',
  })

  // 모음
  for (const v of VOWELS) {
    steps.push({
      type: 'teach',
      word: v.roman,
      pronKo: v.pronKo,
      meaning: v.pronDesc ?? v.pronKo,
      icon: '🔊',
      verseLine: v.example ? `예: ${v.example} [${v.examplePronKo ?? ''}]` : undefined,
      verseLineKo: v.exampleMeaning,
    })
  }

  // 모음 퀴즈
  for (const v of shuffle(VOWELS)) {
    const wrongs = shuffle(VOWELS.filter(w => w.roman !== v.roman)).slice(0, 3).map(w => w.pronKo)
    const opts = shuffle([v.pronKo, ...wrongs])
    steps.push({
      type: 'quiz',
      question: `"${v.roman}"의 발음은?`,
      options: opts,
      answer: opts.indexOf(v.pronKo),
      explanation: { correct: `${v.roman}은 "${v.pronKo}"로 발음합니다.` },
    })
  }

  // 자음 (5개씩)
  const groups = [
    ALL_CONSONANTS.slice(0, 5), ALL_CONSONANTS.slice(5, 10),
    ALL_CONSONANTS.slice(10, 15), ALL_CONSONANTS.slice(15, 20),
    ALL_CONSONANTS.slice(20, 25), ALL_CONSONANTS.slice(25),
  ]
  for (const group of groups) {
    for (const c of group) {
      steps.push({
        type: 'teach',
        word: c.roman,
        pronKo: c.pronKo,
        meaning: c.pronDesc ?? c.pronKo,
        icon: '🔊',
        verseLine: c.example ? `예: ${c.example} [${c.examplePronKo ?? ''}]` : undefined,
        verseLineKo: c.exampleMeaning,
      })
    }
    for (const c of shuffle(group)) {
      const wrongs = shuffle(ALL_CONSONANTS.filter(w => w.roman !== c.roman)).slice(0, 3).map(w => w.pronKo)
      const opts = shuffle([c.pronKo, ...wrongs])
      steps.push({
        type: 'quiz',
        question: `"${c.roman}"의 발음은?`,
        options: opts,
        answer: opts.indexOf(c.pronKo),
        explanation: { correct: `${c.roman}은 "${c.pronKo}"로 발음합니다.` },
      })
    }
  }

  return { id: 'alphabet', title: '자모와 발음', subtitle: '모음 8 + 자음 33', icon: '🔤', category: 'basic', steps }
}

// ══════════════════════════════════════════
// 행복경 (5과)
// ══════════════════════════════════════════
const MANGALA_ALL_WORDS = [...M_W0, ...M_W1, ...M_W2, ...M_W3, ...M_W4, ...M_W5, ...M_W6, ...M_W7, ...M_W8, ...M_W9, ...M_W10, ...M_W11, ...M_W12]

function buildMangala01(): LessonInfo {
  return buildSuttaLesson('mangala-01', '행복경 (1)', '서문 + 제1게송', '🪷', 'mangala',
    [{ verse: M_V0, words: M_W0 }, { verse: M_V1, words: M_W1 }],
    MANGALA_ALL_WORDS,
    '경전 도입부 "이와 같이 나는 들었다"와 천신의 질문을 읽습니다.\n처소격(-yaṃ, -e)이 장소를 나타냅니다.',
  )
}

function buildMangala02(): LessonInfo {
  return buildSuttaLesson('mangala-02', '행복경 (2)', '제2-3게송', '🪷', 'mangala',
    [{ verse: M_V2, words: M_W2 }, { verse: M_V3, words: M_W3 }],
    MANGALA_ALL_WORDS,
    '어리석은 이를 피하고 현명한 이를 가까이하는 행복.\n부정 접두사 a-와 연성법(sandhi)을 봅니다.',
  )
}

function buildMangala03(): LessonInfo {
  return buildSuttaLesson('mangala-03', '행복경 (3)', '제4-6게송', '🪷', 'mangala',
    [{ verse: M_V4, words: M_W4 }, { verse: M_V5, words: M_W5 }, { verse: M_V6, words: M_W6 }],
    MANGALA_ALL_WORDS,
    '알맞은 땅에 사는 것, 많이 배움, 올바른 생계의 행복.',
  )
}

function buildMangala04(): LessonInfo {
  return buildSuttaLesson('mangala-04', '행복경 (4)', '제7-9게송', '🪷', 'mangala',
    [{ verse: M_V7, words: M_W7 }, { verse: M_V8, words: M_W8 }, { verse: M_V9, words: M_W9 }],
    MANGALA_ALL_WORDS,
    '공경, 겸손, 만족, 감사의 행복.\n절대분사(-tvā)가 등장합니다.',
  )
}

function buildMangala05(): LessonInfo {
  return buildSuttaLesson('mangala-05', '행복경 (5)', '제10-12게송', '🪷', 'mangala',
    [{ verse: M_V10, words: M_W10 }, { verse: M_V11, words: M_W11 }, { verse: M_V12, words: M_W12 }],
    MANGALA_ALL_WORDS,
    '인욕, 사문 만남, 법담, 열반 — 최상의 행복.\n과거분사(-ta)와 의무분사(-tabba)를 봅니다.',
  )
}

// ══════════════════════════════════════════
// 보배경 (4과)
// ══════════════════════════════════════════
function buildRatanaLessons(): LessonInfo[] {
  const v = RATANA_VERSES
  const lessons: LessonInfo[] = []
  const ranges = [
    { id: 'ratana-01', title: '보배경 (1)', sub: '제1-4게송', from: 0, to: 4 },
    { id: 'ratana-02', title: '보배경 (2)', sub: '제5-9게송', from: 4, to: 9 },
    { id: 'ratana-03', title: '보배경 (3)', sub: '제10-13게송', from: 9, to: 13 },
    { id: 'ratana-04', title: '보배경 (4)', sub: '제14-17게송', from: 13, to: 17 },
  ]
  for (const r of ranges) {
    const verses = v.slice(r.from, r.to).map(verse => ({ verse, words: verse.words }))
    lessons.push(buildSuttaLesson(r.id, r.title, r.sub, '💎', 'ratana', verses, ALL_RATANA_WORDS))
  }
  return lessons
}

// ══════════════════════════════════════════
// 자비경 (2과)
// ══════════════════════════════════════════
function buildMettaLessons(): LessonInfo[] {
  const v = METTA_VERSES
  return [
    buildSuttaLesson('metta-01', '자비경 (1)', '제1-5게송', '💗', 'metta',
      v.slice(0, 5).map(verse => ({ verse, words: verse.words })), ALL_METTA_WORDS),
    buildSuttaLesson('metta-02', '자비경 (2)', '제6-10게송', '💗', 'metta',
      v.slice(5).map(verse => ({ verse, words: verse.words })), ALL_METTA_WORDS),
  ]
}

// ══════════════════════════════════════════
// 전법륜경 (4과)
// ══════════════════════════════════════════
function buildDhammacakkaLessons(): LessonInfo[] {
  const v = DHAMMACAKKA_VERSES
  const total = v.length
  const size = Math.ceil(total / 4)
  const lessons: LessonInfo[] = []
  for (let i = 0; i < 4; i++) {
    const from = i * size
    const to = Math.min(from + size, total)
    if (from >= total) break
    lessons.push(buildSuttaLesson(
      `dhammacakka-0${i + 1}`, `전법륜경 (${i + 1})`, `제${from + 1}-${to}단락`, '☸️', 'dhammacakka',
      v.slice(from, to).map(verse => ({ verse, words: verse.words })), ALL_DHAMMACAKKA_WORDS,
    ))
  }
  return lessons
}

// ══════════════════════════════════════════
// 무아경 (4과)
// ══════════════════════════════════════════
function buildAnattaLessons(): LessonInfo[] {
  const v = ANATTA_VERSES
  const total = v.length
  const size = Math.ceil(total / 4)
  const lessons: LessonInfo[] = []
  for (let i = 0; i < 4; i++) {
    const from = i * size
    const to = Math.min(from + size, total)
    if (from >= total) break
    lessons.push(buildSuttaLesson(
      `anatta-0${i + 1}`, `무아경 (${i + 1})`, `제${from + 1}-${to}단락`, '🔥', 'anatta',
      v.slice(from, to).map(verse => ({ verse, words: verse.words })), ALL_ANATTA_WORDS,
    ))
  }
  return lessons
}

// ══════════════════════════════════════════
// 법구경 (2과)
// ══════════════════════════════════════════
function buildDhammapadaLessons(): LessonInfo[] {
  const v = DHAMMAPADA_VERSES
  const mid = Math.ceil(v.length / 2)
  return [
    buildSuttaLesson('dhammapada-01', '법구경 (1)', `제1-${mid}선`, '📜', 'dhammapada',
      v.slice(0, mid).map(verse => ({ verse, words: verse.words })), ALL_DHAMMAPADA_WORDS),
    buildSuttaLesson('dhammapada-02', '법구경 (2)', `제${mid + 1}-${v.length}선`, '📜', 'dhammapada',
      v.slice(mid).map(verse => ({ verse, words: verse.words })), ALL_DHAMMAPADA_WORDS),
  ]
}

// ══════════════════════════════════════════
// 사념처경 신념처 (4과)
// ══════════════════════════════════════════
function buildKayaLessons(): LessonInfo[] {
  const v = KAYA_VERSES
  const total = v.length
  const size = Math.ceil(total / 4)
  const lessons: LessonInfo[] = []
  for (let i = 0; i < 4; i++) {
    const from = i * size
    const to = Math.min(from + size, total)
    if (from >= total) break
    // KAYA_VERSES는 { verse: VERSE_N, words } 중첩 구조
    lessons.push(buildSuttaLesson(
      `satipatthana-0${i + 1}`, `사념처경 신념처 (${i + 1})`, `제${from + 1}-${to}단락`, '🧘', 'satipatthana-kaya',
      v.slice(from, to).map(item => ({ verse: item.verse, words: item.words })), ALL_KAYA_WORDS,
    ))
  }
  return lessons
}

// ══════════════════════════════════════════
// 사념처경 수심법념처 (4과)
// ══════════════════════════════════════════
function buildDhammaLessons(): LessonInfo[] {
  const v = DHAMMA_VERSES
  const total = v.length
  const size = Math.ceil(total / 4)
  const lessons: LessonInfo[] = []
  for (let i = 0; i < 4; i++) {
    const from = i * size
    const to = Math.min(from + size, total)
    if (from >= total) break
    lessons.push(buildSuttaLesson(
      `satipatthana-0${i + 5}`, `사념처경 수심법 (${i + 1})`, `제${from + 1}-${to}단락`, '🧘', 'satipatthana-dhamma',
      v.slice(from, to).map(verse => ({ verse, words: verse.words })), ALL_DHAMMA_WORDS,
    ))
  }
  return lessons
}

// ══════════════════════════════════════════
// 전체 과 목록 (경전 순서)
// ══════════════════════════════════════════

// ══════════════════════════════════════════
// 교재 보충 과 (경전에 없는 문법)
// ══════════════════════════════════════════
function makeTextbookLesson(id: string, title: string, subtitle: string, icon: string, category: LessonInfo['category'], steps: Step[]): LessonInfo {
  return { id, title, subtitle, icon, category, steps }
}

// 교재 과 ID → TEXTBOOK_LESSONS에서 찾기
function tb(id: string): LessonInfo {
  const found = TEXTBOOK_LESSONS.find(l => l.id === id)
  if (!found) throw new Error(`교재 과 ${id} 없음`)
  return found
}

/** 전체 과 목록 — 교재 32과 전체 + 격변화 도표 + 경전 독해 */
export function buildAllLessons(): LessonInfo[] {
  return [
    // ══ 1장: 자모와 발음 ══
    tb('tb-00'),                 // 교재 자모와 발음 (전체)
    tb('tb-sandhi'),             // 교재 연성법 (전체)
    // 격변화 도표 (전체 19개)
    makeTextbookLesson('declension-ref', '격변화 도표 (전체)', '§1~§28 · 19개 도표', '📐', 'basic', DECLENSION_INTRO),

    // ══ 2장: 남성명사 격변화 (1-8과) ══
    tb('tb-01'),                 // 1과: 주격 + 동사
    tb('tb-02'),                 // 2과: 목적격
    buildMangala01(),            // ★ 행복경 (1) — 주격/목적격 실전
    tb('tb-03'),                 // 3과: 구격
    tb('tb-04'),                 // 4과: 탈격
    tb('tb-05'),                 // 5과: 여격
    tb('tb-06'),                 // 6과: 소유격
    buildMangala02(),            // ★ 행복경 (2) — 소유격/구격 실전
    tb('tb-07'),                 // 7과: 처소격
    tb('tb-08'),                 // 8과: 호격 + 중성명사
    buildMangala03(),            // ★ 행복경 (3) — 격변화 종합

    // ══ 3장: 동사 활용 (9-13과) ══
    tb('tb-09'),                 // 9과: 절대분사
    buildMangala04(),            // ★ 행복경 (4) — 절대분사 실전
    tb('tb-10'),                 // 10-11과: 부정사 + 현재분사
    tb('tb-11'),                 // 12과: 동사 인칭변화
    tb('tb-12'),                 // 13과: -e/-nā 어간
    buildMangala05(),            // ★ 행복경 (5) — 마무리

    // ══ 4장: 시제 변화 (14-17과) ══
    tb('tb-13'),                 // 14과: 미래형
    tb('tb-14'),                 // 15과: 원망형
    tb('tb-15'),                 // 16과: 명령형
    tb('tb-16'),                 // 17과: 과거형

    // ══ 5장: 여성명사 (18과) ══
    tb('tb-17'),                 // 18과: -ā 여성명사

    // ★ 보배경 · 자비경 독해
    ...buildRatanaLessons(),
    ...buildMettaLessons(),

    // ══ 6장: 분사 (19-22과) ══
    tb('tb-18'),                 // 19과: 과거분사
    tb('tb-19'),                 // 20과: -i/-ī 여성명사
    tb('tb-20'),                 // 21과: 현재분사 여성형
    tb('tb-21'),                 // 22과: 미래수동분사

    // ★ 전법륜경 독해
    ...buildDhammacakkaLessons(),

    // ══ 7장: 사역·기타 명사 (23-29과) ══
    tb('tb-22'),                 // 23과: 사역형
    tb('tb-23'),                 // 24-26과: 기타 명사
    tb('tb-24'),                 // 27과: -u/-ū 남성명사
    tb('tb-25'),                 // 28과: 친족명사
    tb('tb-26'),                 // 29과: -i/-u 중성명사

    // ★ 무아경 독해
    ...buildAnattaLessons(),

    // ══ 8장: 형용사·대명사 (30-32과) ══
    tb('tb-27'),                 // 30과: -vantu/-mantu
    tb('tb-28'),                 // 31과: 인칭대명사
    tb('tb-29'),                 // 32과: 관계·지시·의문대명사

    // ★ 법구경 독해
    ...buildDhammapadaLessons(),

    // ★ 사념처경 독해
    ...buildKayaLessons(),
    ...buildDhammaLessons(),
  ]
}

/** 과 ID로 찾기 */
export function getLessonById(id: string): LessonInfo | undefined {
  return buildAllLessons().find(l => l.id === id)
}

/** 카테고리 정의 */
export const CATEGORIES = [
  { key: 'basic', label: '기초 + 문법', icon: '📐' },
  { key: 'mangala', label: '행복경', icon: '🪷' },
  { key: 'ratana', label: '보배경', icon: '💎' },
  { key: 'metta', label: '자비경', icon: '💗' },
  { key: 'dhammacakka', label: '전법륜경', icon: '☸️' },
  { key: 'anatta', label: '무아경', icon: '🔥' },
  { key: 'dhammapada', label: '법구경', icon: '📜' },
  { key: 'satipatthana-kaya', label: '사념처경 신념처', icon: '🧘' },
  { key: 'satipatthana-dhamma', label: '사념처경 수심법', icon: '🧘' },
] as const
