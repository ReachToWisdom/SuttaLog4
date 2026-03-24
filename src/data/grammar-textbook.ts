// 교재(De Silva Pali Primer) 예문 데이터
// 경전에 없거나 부족한 문법을 보충하는 교재 기반 과
import type { Step } from './types'

// ── 3과: 구격 (-ena/-ehi) — 행복경에 부족 ──
export const GRAMMAR_03_INSTRUMENTAL: Step[] = [
  { type: 'intro', title: '3과: 구격', subtitle: '~에 의해, ~(으)로 (-ena/-ehi)', description: '행위의 수단·도구·동행을 나타냅니다.\n"톱으로 자른다", "친구와 함께"', icon: '📐' },
  { type: 'teach', word: '-ena', pronKo: '에나', meaning: '~(으)로, ~에 의해 (단수)', icon: '📐' },
  { type: 'teach', word: '-ehi', pronKo: '에히', meaning: '~들(으)로, ~들에 의해 (복수)', icon: '📐' },
  { type: 'teach', word: 'kakacena', pronKo: '까까게나', meaning: '톱으로', grammar: '구격 단수 (kakaca+ena)' },
  { type: 'teach', word: 'hatthena', pronKo: '핫테나', meaning: '손으로', grammar: '구격 단수 (hattha+ena)' },
  { type: 'teach', word: 'rathena', pronKo: '라테나', meaning: '마차로', grammar: '구격 단수 (ratha+ena)' },
  { type: 'verse', pali: 'Kassako kakacena rukkhaṃ chindati.', pronKo: '깟사꼬 까까게나 룩캉 친다띠', translation: '농부는 톱으로 나무를 자른다.', words: [
    { pali: 'Kassako', pronKo: '깟사꼬', meaning: '농부는', grammar: '주격 단수' },
    { pali: 'kakacena', pronKo: '까까게나', meaning: '톱으로', grammar: '구격 단수' },
    { pali: 'rukkhaṃ', pronKo: '룩캉', meaning: '나무를', grammar: '목적격 단수' },
    { pali: 'chindati', pronKo: '친다띠', meaning: '자르다', grammar: '현재 3인칭 단수' },
  ]},
  { type: 'verse', pali: 'Samaṇo narena saddhiṃ gāmaṃ gacchati.', pronKo: '사마노 나레나 삿딩 가-망 갓차띠', translation: '사문은 사람과 함께 마을로 간다.', words: [
    { pali: 'Samaṇo', pronKo: '사마노', meaning: '사문은', grammar: '주격 단수' },
    { pali: 'narena', pronKo: '나레나', meaning: '사람과', grammar: '구격 단수' },
    { pali: 'saddhiṃ', pronKo: '삿딩', meaning: '함께', grammar: '불변어' },
    { pali: 'gāmaṃ', pronKo: '가-망', meaning: '마을을', grammar: '목적격 단수' },
    { pali: 'gacchati', pronKo: '갓차띠', meaning: '가다', grammar: '현재 3인칭 단수' },
  ]},
  { type: 'quiz', question: '"kakacena"의 뜻은?', options: ['톱으로', '톱을', '톱의', '톱에서'], answer: 0, explanation: { correct: 'kakacena = kakaca(톱) + ena(구격) = "톱으로"' } },
  { type: 'quiz', question: '"narena saddhiṃ"의 뜻은?', options: ['사람과 함께', '사람을 위해', '사람에게서', '사람의'], answer: 0, explanation: { correct: 'narena(구격) + saddhiṃ(함께) = "사람과 함께"' } },
]

// ── 4과: 탈격 (-ā/-mhā) — 행복경에 부족 ──
export const GRAMMAR_04_ABLATIVE: Step[] = [
  { type: 'intro', title: '4과: 탈격', subtitle: '~로부터, ~에서 (-ā/-mhā/-smā)', description: '분리·출발·원인을 나타냅니다.\n"나무에서 떨어지다", "마을로부터 떠나다"', icon: '📐' },
  { type: 'teach', word: '-mhā / -smā', pronKo: '마- / 스마-', meaning: '~로부터 (단수)', icon: '📐' },
  { type: 'teach', word: 'rukkhasmā', pronKo: '룩카스마-', meaning: '나무로부터', grammar: '탈격 단수' },
  { type: 'teach', word: 'gāmamhā', pronKo: '가-마마-', meaning: '마을로부터', grammar: '탈격 단수' },
  { type: 'verse', pali: 'Kassako rukkhasmā patati.', pronKo: '깟사꼬 룩카스마- 빠따띠', translation: '농부는 나무에서 떨어진다.', words: [
    { pali: 'Kassako', pronKo: '깟사꼬', meaning: '농부는', grammar: '주격 단수' },
    { pali: 'rukkhasmā', pronKo: '룩카스마-', meaning: '나무에서', grammar: '탈격 단수' },
    { pali: 'patati', pronKo: '빠따띠', meaning: '떨어지다', grammar: '현재 3인칭 단수' },
  ]},
  { type: 'verse', pali: 'Putto mātulamhā pañhaṃ pucchati.', pronKo: '뿟또 마-뚤라마- 빤항 뿟차띠', translation: '아들은 삼촌에게서 질문을 묻는다.', words: [
    { pali: 'Putto', pronKo: '뿟또', meaning: '아들은', grammar: '주격 단수' },
    { pali: 'mātulamhā', pronKo: '마-뚤라마-', meaning: '삼촌에게서', grammar: '탈격 단수' },
    { pali: 'pañhaṃ', pronKo: '빤항', meaning: '질문을', grammar: '목적격 단수' },
    { pali: 'pucchati', pronKo: '뿟차띠', meaning: '묻다', grammar: '현재 3인칭 단수' },
  ]},
  { type: 'quiz', question: '"rukkhasmā patati"의 뜻은?', options: ['나무에서 떨어진다', '나무를 자른다', '나무에 오른다', '나무로 간다'], answer: 0, explanation: { correct: 'rukkhasmā(탈격: 나무에서) + patati(떨어지다)' } },
]

// ── 5과: 여격 (-ssa/-āya) — 행복경에 부족 ──
export const GRAMMAR_05_DATIVE: Step[] = [
  { type: 'intro', title: '5과: 여격', subtitle: '~에게 (-ssa/-āya)', description: '대상·수혜자를 나타냅니다.\n"바라문에게 준다", "붓다에게 공양하다"', icon: '📐' },
  { type: 'teach', word: '-ssa / -āya', pronKo: '싸 / 아-야', meaning: '~에게 (단수)', icon: '📐' },
  { type: 'teach', word: 'brāhmaṇassa', pronKo: '브라-마낫사', meaning: '바라문에게', grammar: '여격 단수' },
  { type: 'teach', word: 'dadāti', pronKo: '다다-띠', meaning: '주다', grammar: '현재 3인칭 단수' },
  { type: 'verse', pali: 'Upāsako brāhmaṇassa dānaṃ dadāti.', pronKo: '우빠-사꼬 브라-마낫사 다-낭 다다-띠', translation: '우바새는 바라문에게 보시를 준다.', words: [
    { pali: 'Upāsako', pronKo: '우빠-사꼬', meaning: '우바새는', grammar: '주격 단수' },
    { pali: 'brāhmaṇassa', pronKo: '브라-마낫사', meaning: '바라문에게', grammar: '여격 단수' },
    { pali: 'dānaṃ', pronKo: '다-낭', meaning: '보시를', grammar: '목적격 단수' },
    { pali: 'dadāti', pronKo: '다다-띠', meaning: '주다', grammar: '현재 3인칭 단수' },
  ]},
  { type: 'quiz', question: '"brāhmaṇassa dānaṃ dadāti"의 뜻은?', options: ['바라문에게 보시를 준다', '바라문의 보시를 받는다', '바라문에서 보시를 가져온다', '바라문은 보시를 한다'], answer: 0, explanation: { correct: 'brāhmaṇassa(여격) + dānaṃ(보시를) + dadāti(주다)' } },
]

// ── 8과: 호격 (-a/-ā) — 행복경에 없음 ──
export const GRAMMAR_08_VOCATIVE: Step[] = [
  { type: 'intro', title: '8과: 호격', subtitle: '~이여 (-a/-ā)', description: '부르는 대상을 나타냅니다.\n"비구들이여!", "사문이여!"', icon: '📐' },
  { type: 'teach', word: 'bhikkhu → bhikkhu', pronKo: '빅쿠', meaning: '비구여! (단수 호격)', icon: '📐' },
  { type: 'teach', word: 'bhikkhū → bhikkhave', pronKo: '빅카웨', meaning: '비구들이여! (복수 호격)', icon: '📐' },
  { type: 'teach', word: 'nara → nara', pronKo: '나라', meaning: '사람이여! (단수 호격 = 어간)', icon: '📐' },
  { type: 'verse', pali: 'Suṇātha bhikkhave! Dhammaṃ desessāmi.', pronKo: '수나-타 빅카웨! 담망 데셋사-미', translation: '비구들이여, 들으라! 법을 설하겠다.', words: [
    { pali: 'Suṇātha', pronKo: '수나-타', meaning: '들으라', grammar: '명령형 2인칭 복수' },
    { pali: 'bhikkhave', pronKo: '빅카웨', meaning: '비구들이여', grammar: '호격 복수', important: true },
    { pali: 'Dhammaṃ', pronKo: '담망', meaning: '법을', grammar: '목적격 단수' },
    { pali: 'desessāmi', pronKo: '데셋사-미', meaning: '설하겠다', grammar: '미래형 1인칭 단수' },
  ]},
  { type: 'quiz', question: '"bhikkhave"의 뜻은?', options: ['비구들이여', '비구들은', '비구들의', '비구들에게'], answer: 0, explanation: { correct: 'bhikkhave = bhikkhu의 호격 복수, 경전에서 가장 자주 나오는 호격' } },
  { type: 'match-reverse', meaning: '비구들이여', options: ['bhikkhave', 'bhikkhū', 'bhikkhunaṃ', 'bhikkhūhi'], answer: 0, explanation: { correct: '"비구들이여" = bhikkhave (호격 복수)' } },
]

// ── 10과: 부정사 (-tuṃ) — 행복경에 없음 ──
export const GRAMMAR_10_INFINITIVE: Step[] = [
  { type: 'intro', title: '10과: 부정사', subtitle: '~하기 위해 (-tuṃ)', description: '"~하기 위해", "~하려고"를 뜻합니다.\ngantuṃ(가기 위해), bhuñjituṃ(먹기 위해)', icon: '📐' },
  { type: 'teach', word: '-tuṃ / -ituṃ', pronKo: '뚱 / 이뚱', meaning: '~하기 위해 (부정사 어미)', icon: '📐' },
  { type: 'teach', word: 'gantuṃ', pronKo: '간뚱', meaning: '가기 위해', grammar: '부정사 (gacchati → gantuṃ)' },
  { type: 'teach', word: 'bhuñjituṃ', pronKo: '분지뚱', meaning: '먹기 위해', grammar: '부정사 (bhuñjati → bhuñjituṃ)' },
  { type: 'verse', pali: 'Dārako bhattaṃ bhuñjituṃ icchati.', pronKo: '다-라꼬 밧땅 분지뚱 잇차띠', translation: '아이는 밥을 먹기를 원한다.', words: [
    { pali: 'Dārako', pronKo: '다-라꼬', meaning: '아이는', grammar: '주격 단수' },
    { pali: 'bhattaṃ', pronKo: '밧땅', meaning: '밥을', grammar: '목적격 단수' },
    { pali: 'bhuñjituṃ', pronKo: '분지뚱', meaning: '먹기를', grammar: '부정사' },
    { pali: 'icchati', pronKo: '잇차띠', meaning: '원하다', grammar: '현재 3인칭 단수' },
  ]},
  { type: 'quiz', question: '"bhuñjituṃ icchati"의 뜻은?', options: ['먹기를 원한다', '먹고 나서 간다', '먹으면서 앉다', '먹었다'], answer: 0, explanation: { correct: 'bhuñjituṃ(부정사: 먹기를) + icchati(원하다)' } },
]

// ── 13과: 특수동사 + 인칭변화 — 행복경에 부족 ──
export const GRAMMAR_13_SPECIAL_VERBS: Step[] = [
  { type: 'intro', title: '13과: 특수동사와 인칭변화', subtitle: 'atthi(있다), karoti(하다), 삼귀의', description: '경전에서 가장 자주 나오는 동사들.\n"~이 있다", "~을 하다", 삼귀의', icon: '📐' },
  { type: 'teach', word: 'atthi', pronKo: '앗티', meaning: '있다, ~이다', grammar: '3인칭 단수 (복수: santi)' },
  { type: 'teach', word: 'karoti', pronKo: '까로띠', meaning: '하다, 행하다', grammar: '3인칭 단수 (복수: karonti)' },
  { type: 'teach', word: 'gacchāmi', pronKo: '갓차-미', meaning: '나는 간다', grammar: '1인칭 단수 (-āmi)' },
  { type: 'verse', pali: 'Buddhaṃ saraṇaṃ gacchāmi.\nDhammaṃ saraṇaṃ gacchāmi.\nSaṅghaṃ saraṇaṃ gacchāmi.', pronKo: '붓당 사라낭 갓차-미\n담망 사라낭 갓차-미\n상강 사라낭 갓차-미', translation: '부처님께 귀의합니다.\n법에 귀의합니다.\n승가에 귀의합니다.', words: [
    { pali: 'Buddhaṃ', pronKo: '붓당', meaning: '부처님을', grammar: '목적격 단수', important: true },
    { pali: 'saraṇaṃ', pronKo: '사라낭', meaning: '귀의처를', grammar: '목적격 단수 (중성)' },
    { pali: 'gacchāmi', pronKo: '갓차-미', meaning: '간다 (귀의한다)', grammar: '1인칭 단수', important: true },
    { pali: 'Dhammaṃ', pronKo: '담망', meaning: '법을', grammar: '목적격 단수' },
    { pali: 'Saṅghaṃ', pronKo: '상강', meaning: '승가를', grammar: '목적격 단수' },
  ]},
  { type: 'verse', pali: 'Buddho dhammaṃ deseti.\nBhikkhū dhammaṃ suṇanti.', pronKo: '붓토 담망 데세띠\n빅쿠- 담망 수난띠', translation: '부처님은 법을 가르치신다.\n비구들은 법을 듣는다.', words: [
    { pali: 'Buddho', pronKo: '붓토', meaning: '부처님은', grammar: '주격 단수' },
    { pali: 'deseti', pronKo: '데세띠', meaning: '가르치다', grammar: '-e어간 동사' },
    { pali: 'Bhikkhū', pronKo: '빅쿠-', meaning: '비구들은', grammar: '주격 복수' },
    { pali: 'suṇanti', pronKo: '수난띠', meaning: '듣다', grammar: '-nā어간 동사 복수' },
  ]},
  { type: 'quiz', question: '"Buddhaṃ saraṇaṃ gacchāmi"의 뜻은?', options: ['부처님께 귀의합니다', '부처님은 가신다', '부처님의 길을 간다', '부처님을 본다'], answer: 0, explanation: { correct: 'Buddhaṃ(부처님을) + saraṇaṃ(귀의처) + gacchāmi(나는 간다) = 삼귀의' } },
  { type: 'match-reverse', meaning: '있다, ~이다', options: ['atthi', 'hoti', 'karoti', 'gacchati'], answer: 0, explanation: { correct: 'atthi = "있다/~이다" (3인칭 단수)' } },
]

// ── 18과: ā-여성명사 — 보배경/자비경 전에 필요 ──
export const GRAMMAR_18_FEMININE: Step[] = [
  { type: 'intro', title: '18과: ā-여성명사', subtitle: 'vedanā, paññā, taṇhā', description: 'ā로 끝나는 여성명사의 격변화.\n오온의 vedanā(느낌), saññā(인식) 등', icon: '📐' },
  { type: 'teach', word: 'vedanā', pronKo: '웨다나-', meaning: '느낌, 감수', grammar: 'ā-여성명사 주격 단수' },
  { type: 'teach', word: 'paññā', pronKo: '빤냐-', meaning: '지혜', grammar: 'ā-여성명사 주격 단수' },
  { type: 'teach', word: 'taṇhā', pronKo: '딴하-', meaning: '갈애, 갈망', grammar: 'ā-여성명사 주격 단수' },
  { type: 'verse', pali: 'Paññā jīvitamhā seṭṭhā.', pronKo: '빤냐- 지-위따마- 셋타-', translation: '지혜는 생명보다 뛰어나다.', words: [
    { pali: 'Paññā', pronKo: '빤냐-', meaning: '지혜는', grammar: 'ā-여성 주격 단수' },
    { pali: 'jīvitamhā', pronKo: '지-위따마-', meaning: '생명보다', grammar: '탈격(비교)' },
    { pali: 'seṭṭhā', pronKo: '셋타-', meaning: '뛰어나다', grammar: '형용사 여성 주격' },
  ]},
  { type: 'quiz', question: '"vedanā"의 뜻은?', options: ['느낌', '지혜', '갈애', '인식'], answer: 0, explanation: { correct: 'vedanā = 느낌, 감수 (오온 중 하나)' } },
]
