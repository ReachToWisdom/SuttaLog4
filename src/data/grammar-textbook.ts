// 교재(De Silva Pali Primer) 예문 데이터
// 경전에 없거나 부족한 문법을 보충하는 교재 기반 과
import type { Step } from './types'

// ══════════════════════════════════════════
// 자모표 레퍼런스 — 학습 전 교재 요약
// ══════════════════════════════════════════
export const ALPHABET_REFERENCE: Step[] = [
  {
    type: 'intro',
    title: '자모와 발음',
    subtitle: '빠알리 프라이머 1장',
    description: '빠알리어는 8개의 모음과 33개의 자음,\n즉 41개의 자모로 구성합니다.',
    icon: '📖',
  },
  {
    type: 'verse',
    pali: '모음: a, ā, i, ī, u, ū, e, o',
    pronKo: '아, 아-, 이, 이-, 우, 우-, 에, 오',
    translation: '단모음 a, i, u는 짧게 발음한다.\n장모음 ā, ī, ū는 길게 발음한다.\ne, o는 중간정도 길이로 발음한다.',
    words: [
      { pali: 'a', pronKo: '아', meaning: '짧은 아' },
      { pali: 'ā', pronKo: '아-', meaning: '긴 아' },
      { pali: 'i', pronKo: '이', meaning: '짧은 이' },
      { pali: 'ī', pronKo: '이-', meaning: '긴 이' },
      { pali: 'u', pronKo: '우', meaning: '짧은 우' },
      { pali: 'ū', pronKo: '우-', meaning: '긴 우' },
      { pali: 'e', pronKo: '에', meaning: '에' },
      { pali: 'o', pronKo: '오', meaning: '오' },
    ],
    note: '모음 8자',
  },
  {
    type: 'verse',
    pali: '후음: ka kha ga gha ṅa\n구개음: ca cha ja jha ña\n반설음: ṭa ṭha ḍa ḍha ṇa\n치음: ta tha da dha na\n순음: pa pha ba bha ma',
    pronKo: '까 카 가 가 응아\n짜 차 자 자 냐\n따 타 다 다 나\n따 타 다 다 나\n빠 파 바 바 마',
    translation: '자음 25자 — 5행(후음·구개음·반설음·치음·순음) × 5열(무성무기·무성대기·유성무기·유성대기·비음)',
    words: [
      { pali: 'ka', pronKo: '까', meaning: '후음 무성무기' },
      { pali: 'ca', pronKo: '짜', meaning: '구개음 무성무기' },
      { pali: 'ṭa', pronKo: '따', meaning: '반설음 무성무기' },
      { pali: 'ta', pronKo: '따', meaning: '치음 무성무기' },
      { pali: 'pa', pronKo: '빠', meaning: '순음 무성무기' },
    ],
    note: '자음 25자 (5행×5열)',
  },
  {
    type: 'verse',
    pali: '반모음: ya ra la ḷa va\n치찰음: sa\n기음: ha\n억제음: ṃ (Anusvāra)',
    pronKo: '야 라 라 라 와\n싸\n하\n응',
    translation: '나머지 자음 8자.\n복자음이 뒤에 오면 앞 모음을 짧게 발음.\n예: mettā, khetta, koṭṭha, sotthi',
    words: [
      { pali: 'ya', pronKo: '야', meaning: '반모음' },
      { pali: 'ra', pronKo: '라', meaning: '반모음' },
      { pali: 'sa', pronKo: '싸', meaning: '치찰음' },
      { pali: 'ha', pronKo: '하', meaning: '기음' },
      { pali: 'ṃ', pronKo: '응', meaning: '억제음 (아누스바라)' },
    ],
    note: '나머지 자음 8자',
  },
]

// ══════════════════════════════════════════
// 연성법 (Sandhi) — 빠알리 프라이머 2장
// ══════════════════════════════════════════
export const SANDHI_LESSON: Step[] = [
  {
    type: 'intro',
    title: '연성법 (Sandhi)',
    subtitle: '단어 연결 규칙 — 빠알리 프라이머 2장',
    description: '두 단어가 만날 때 소리가 변하는 규칙.\n경전에서 단어 경계를 파악하는 핵심 열쇠.',
    icon: '🔗',
  },
  // ① 앞 모음 탈락
  {
    type: 'teach',
    word: 'natthi',
    pronKo: '낫티',
    meaning: '없다 (na + atthi)',
    icon: '🔗',
    verseLine: 'na + atthi → natthi',
    verseLineKo: '앞 모음 탈락: 앞 단어 끝 모음이 빠짐',
  },
  {
    type: 'verse',
    pali: 'na + atthi → natthi\neva + idaṃ → evidaṃ\nsaññā + uppādo → saññuppādo',
    pronKo: '나 + 앗티 → 낫티\n에와 + 이당 → 에위당\n산냐- + 웁빠-도 → 산눕빠-도',
    translation: '① 앞 모음 탈락 (가장 흔한 패턴)\n없다 = 아니다 + 있다\n바로 이것 = 바로 + 이것\n인식의 생겨남',
    words: [
      { pali: 'natthi', pronKo: '낫티', meaning: '없다', grammar: 'na + atthi (앞 모음 탈락)' },
      { pali: 'evidaṃ', pronKo: '에위당', meaning: '바로 이것', grammar: 'eva + idaṃ' },
    ],
    note: '① 앞 모음 탈락 — 가장 흔한 연성법',
  },
  // ③ 혼유
  {
    type: 'teach',
    word: 'svākkhāto',
    pronKo: '스왁카-또',
    meaning: '잘 설해진 (su + akkhāto)',
    icon: '🔗',
    verseLine: 'su + akkhāto → svākkhāto',
    verseLineKo: '혼유: 두 모음이 합쳐서 새로운 소리',
  },
  // ⑩ 자음 연성법: niggahīta (ṃ)
  {
    type: 'verse',
    pali: 'taṃ + ca → tañca\nevaṃ + me → evaṃ me\nDhammaṃ + care → Dhammaṃ care',
    pronKo: '땅 + 짜 → 딴짜\n에왕 + 메 → 에왕 메\n담망 + 짜레 → 담망 짜레',
    translation: '⑩ 억제음(ṃ) 뒤에 자음이 올 때\nṃ + ca → ñca (비음 동화)\n경전 도입부 "Evaṃ me sutaṃ"에서도 ṃ 유지',
    words: [
      { pali: 'tañca', pronKo: '딴짜', meaning: '그것과 (taṃ + ca)', grammar: 'ṃ→ñ 비음동화' },
      { pali: 'evaṃ', pronKo: '에왕', meaning: '이와 같이', grammar: '억제음 유지' },
    ],
    note: '⑩ 억제음(ṃ) + 자음 → 비음 동화',
  },
  // 연성법 핵심 정리
  {
    type: 'verse',
    pali: '경전 실례:\nmaṅgalamuttamaṃ = maṅgalaṃ + uttamaṃ\npaṇḍitānañca = paṇḍitānaṃ + ca\npūjanīyānaṃ = pūjeti + nīya + ānaṃ',
    pronKo: '망갈라뭇따망 = 망갈랑 + 웃따망\n빤디따-난짜 = 빤디따-낭 + 짜\n뿌-자니-야-낭',
    translation: '행복경 연성법 실례:\n최상의 행복을 = 행복 + 최상의\n현명한 이들의+그리고 = ṃ→ñ 동화\n공양받아야 할 이들의',
    words: [
      { pali: 'maṅgalamuttamaṃ', pronKo: '망갈라뭇따망', meaning: '최상의 행복을', grammar: 'maṅgalaṃ + uttamaṃ 연성' },
      { pali: 'paṇḍitānañca', pronKo: '빤디따-난짜', meaning: '현명한 이들의 그리고', grammar: 'paṇḍitānaṃ + ca 비음동화' },
    ],
    note: '행복경에서 자주 나오는 연성법',
  },
  // 퀴즈
  {
    type: 'quiz',
    question: '"natthi"는 어떤 두 단어가 합쳐진 것인가?',
    options: ['na + atthi', 'nā + thi', 'nat + thi', 'na + tthi'],
    answer: 0,
    explanation: { correct: 'natthi = na(아니다) + atthi(있다) — 앞 모음 a 탈락' },
  },
  {
    type: 'quiz',
    question: '"paṇḍitānañca"는 어떤 연성법인가?',
    options: ['ṃ + ca → ñca (비음동화)', '모음 탈락', '모음 장음화', '자음 중복'],
    answer: 0,
    explanation: { correct: 'paṇḍitānaṃ + ca → paṇḍitānañca — 억제음 ṃ이 ñ으로 변환' },
  },
  {
    type: 'match-reverse',
    meaning: '없다 (na + atthi)',
    options: ['natthi', 'nātthi', 'natthī', 'naṭṭhi'],
    answer: 0,
    explanation: { correct: '"없다" = natthi (na + atthi, 앞 모음 탈락)' },
  },
]

// ══════════════════════════════════════════
// 격변화 도표 인트로 — 교재 §1~§3 핵심
// ══════════════════════════════════════════
export const DECLENSION_INTRO: Step[] = [
  {
    type: 'intro',
    title: '격변화 도표',
    subtitle: '명사의 8가지 격 — 빠알리 프라이머 §1',
    description: '빠알리어 명사는 8가지 격으로 변합니다.\n주격(~은), 목적격(~을), 구격(~으로),\n탈격(~로부터), 여격(~에게), 소유격(~의),\n처소격(~에서), 호격(~이여)',
    icon: '📐',
  },
  {
    type: 'verse',
    pali: '§1 -a 남성 격변화 (deva = 신)',
    pronKo: '',
    translation: '주격: devo / devā\n목적격: devaṃ / deve\n구격: devena / devehi\n탈격: devā, devasmā / devehi\n여격: devassa / devānaṃ\n소유격: devassa / devānaṃ\n처소격: deve, devasmiṃ / devesu\n호격: deva / devā',
    words: [
      { pali: 'devo', pronKo: '데워', meaning: '신은 (주격 단)', grammar: '-a → -o' },
      { pali: 'devaṃ', pronKo: '데왕', meaning: '신을 (목적격 단)', grammar: '-a → -aṃ' },
      { pali: 'devena', pronKo: '데웨나', meaning: '신에 의해 (구격 단)', grammar: '-a → -ena' },
      { pali: 'devassa', pronKo: '데왓사', meaning: '신의 (소유격 단)', grammar: '-a → -assa' },
      { pali: 'deve', pronKo: '데웨', meaning: '신에서 (처소격 단)', grammar: '-a → -e' },
    ],
    note: '§1 -a 남성 (가장 기본, 경전 대부분의 명사)',
  },
  {
    type: 'verse',
    pali: '§2 -a 중성 격변화 (rūpa = 물질)',
    pronKo: '',
    translation: '주격: rūpaṃ / rūpāni\n목적격: rūpaṃ / rūpāni\n(나머지는 남성과 동일)\n\n특징: 주격 = 목적격 (-ṃ)',
    words: [
      { pali: 'rūpaṃ', pronKo: '루-빵', meaning: '물질은/을', grammar: '주격=목적격 -ṃ' },
      { pali: 'dukkhaṃ', pronKo: '둑캉', meaning: '고통은/을', grammar: '중성 주격=목적격' },
      { pali: 'sukhaṃ', pronKo: '수캉', meaning: '행복은/을', grammar: '중성 주격=목적격' },
    ],
    note: '§2 -a 중성 (주격=목적격 -ṃ)',
  },
  {
    type: 'verse',
    pali: '§3 -ā 여성 격변화 (kaññā = 소녀)',
    pronKo: '',
    translation: '주격: kaññā / kaññā, kaññāyo\n목적격: kaññaṃ / kaññā, kaññāyo\n구격: kaññāya / kaññāhi\n소유격: kaññāya / kaññānaṃ\n처소격: kaññāya, kaññāyaṃ / kaññāsu',
    words: [
      { pali: 'kaññā', pronKo: '깐냐-', meaning: '소녀는 (주격)', grammar: '-ā 여성' },
      { pali: 'vedanā', pronKo: '웨다나-', meaning: '느낌은', grammar: '-ā 여성 (오온)' },
      { pali: 'taṇhā', pronKo: '딴하-', meaning: '갈애는', grammar: '-ā 여성 (사성제)' },
    ],
    note: '§3 -ā 여성 (vedanā, taṇhā, paññā 등)',
  },
  {
    type: 'quiz',
    question: '"devaṃ"은 무슨 격인가?',
    options: ['목적격 (신을)', '주격 (신은)', '소유격 (신의)', '처소격 (신에서)'],
    answer: 0,
    explanation: { correct: 'devaṃ = deva + ṃ (목적격 단수) = "신을"' },
  },
]

// ══════════════════════════════════════════
// 동사 활용표 인트로 — 현재형 인칭변화
// ══════════════════════════════════════════
export const VERB_INTRO: Step[] = [
  {
    type: 'intro',
    title: '동사 현재형 활용',
    subtitle: '인칭·수에 따른 어미 변화',
    description: '빠알리어 동사는 인칭(1/2/3)과\n수(단수/복수)에 따라 어미가 변합니다.',
    icon: '📐',
  },
  {
    type: 'verse',
    pali: '동사 현재형 어미표',
    pronKo: '',
    translation: '3인칭: -ti (단) / -nti (복)\n2인칭: -si (단) / -tha (복)\n1인칭: -āmi (단) / -āma (복)\n\n예: gacchati(간다), gacchanti(간다·복)',
    words: [
      { pali: 'gacchati', pronKo: '갓차띠', meaning: '(그는) 간다', grammar: '3인칭 단수 -ti' },
      { pali: 'gacchanti', pronKo: '갓찬띠', meaning: '(그들은) 간다', grammar: '3인칭 복수 -nti' },
      { pali: 'gacchāmi', pronKo: '갓차-미', meaning: '(나는) 간다', grammar: '1인칭 단수 -āmi' },
    ],
    note: '현재형 어미 6가지',
  },
  {
    type: 'verse',
    pali: '동사 시제 요약',
    pronKo: '',
    translation: '현재형: -ti/-nti (간다)\n과거형: a- 어두첨자 (갔다)\n미래형: -ssa- 삽입 (갈 것이다)\n명령형: -tu/-hi (가라)\n원망형: -eyya (가야 한다)',
    words: [
      { pali: 'viharati', pronKo: '위하라띠', meaning: '머무시다 (현재)', grammar: '경전 서문' },
      { pali: 'acintayuṃ', pronKo: '아찐따융', meaning: '생각했다 (과거)', grammar: 'a- 어두첨자' },
      { pali: 'brūhi', pronKo: '브루-히', meaning: '말씀해 주소서 (명령)', grammar: '-hi 명령형' },
    ],
    note: '5가지 시제/서법',
  },
]

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
