// 교재(빠알리 프라이머) 전체 32과 인덱스
// SuttaLog2의 레슨 데이터를 SuttaLog4 Step으로 변환하여 제공
import type { LessonInfo } from './types'
import { convertTextbookSteps } from './textbook-adapter'

// 교재 레슨 데이터 (SuttaLog2에서 복사)
import { LESSON_00 } from './textbook/lesson-00-alphabet'
import { LESSON_01_SANDHI } from './textbook/lesson-01-sandhi'
import { LESSON_01 } from './textbook/lesson-01'
import { LESSON_02 } from './textbook/lesson-02'
import { LESSON_03 } from './textbook/lesson-03'
import { LESSON_04 } from './textbook/lesson-04'
import { LESSON_05 } from './textbook/lesson-05'
import { LESSON_06 } from './textbook/lesson-06'
import { LESSON_07 } from './textbook/lesson-07'
import { LESSON_08 } from './textbook/lesson-08'
import { LESSON_09 } from './textbook/lesson-09'
import { LESSON_10 } from './textbook/lesson-10'
import { LESSON_11 } from './textbook/lesson-11'
import { LESSON_12 } from './textbook/lesson-12'
import { LESSON_13 } from './textbook/lesson-13'
import { LESSON_14 } from './textbook/lesson-14'
import { LESSON_15 } from './textbook/lesson-15'
import { LESSON_16 } from './textbook/lesson-16'
import { LESSON_17 } from './textbook/lesson-17'
import { LESSON_18 } from './textbook/lesson-18'
import { LESSON_19 } from './textbook/lesson-19'
import { LESSON_20 } from './textbook/lesson-20'
import { LESSON_21 } from './textbook/lesson-21'
import { LESSON_22 } from './textbook/lesson-22'
import { LESSON_23 } from './textbook/lesson-23'
import { LESSON_24 } from './textbook/lesson-24'
import { LESSON_25 } from './textbook/lesson-25'
import { LESSON_26 } from './textbook/lesson-26'
import { LESSON_27 } from './textbook/lesson-27'
import { LESSON_28 } from './textbook/lesson-28'
import { LESSON_29 } from './textbook/lesson-29'

/** 교재 전체 과 목록 (자모+연성법+1과~32과) */
export const TEXTBOOK_LESSONS: LessonInfo[] = [
  { id: 'tb-00', title: '자모와 발음', subtitle: '모음 8 · 자음 33 · 발음규칙', icon: '🔤', category: 'basic', steps: convertTextbookSteps(LESSON_00) },
  { id: 'tb-sandhi', title: '연성법', subtitle: 'Sandhi ①~⑬ · 억제음 변화', icon: '🔗', category: 'basic', steps: convertTextbookSteps(LESSON_01_SANDHI) },
  { id: 'tb-01', title: '1과: 주격 + 동사', subtitle: '-o/-ā · -ti/-nti', icon: '📿', category: 'basic', steps: convertTextbookSteps(LESSON_01) },
  { id: 'tb-02', title: '2과: 목적격', subtitle: '-ṃ/-e · ~을/를', icon: '🎯', category: 'basic', steps: convertTextbookSteps(LESSON_02) },
  { id: 'tb-03', title: '3과: 구격', subtitle: '-ena/-ehi · ~으로/함께', icon: '🤝', category: 'basic', steps: convertTextbookSteps(LESSON_03) },
  { id: 'tb-04', title: '4과: 탈격', subtitle: '-ā/-mhā/-smā · ~로부터', icon: '↩️', category: 'basic', steps: convertTextbookSteps(LESSON_04) },
  { id: 'tb-05', title: '5과: 여격', subtitle: '-āya/-ssa · ~에게/위해', icon: '🎁', category: 'basic', steps: convertTextbookSteps(LESSON_05) },
  { id: 'tb-06', title: '6과: 소유격', subtitle: '-ssa/-ānaṃ · ~의', icon: '👤', category: 'basic', steps: convertTextbookSteps(LESSON_06) },
  { id: 'tb-07', title: '7과: 처소격', subtitle: '-e/-mhi/-smiṃ · ~에', icon: '📍', category: 'basic', steps: convertTextbookSteps(LESSON_07) },
  { id: 'tb-08', title: '8과: 호격 + 중성명사', subtitle: '총정리 · 중성 도입', icon: '📢', category: 'basic', steps: convertTextbookSteps(LESSON_08) },
  { id: 'tb-09', title: '9과: 절대분사', subtitle: '-(i)tvā/-ya · ~하고서', icon: '⏭️', category: 'basic', steps: convertTextbookSteps(LESSON_09) },
  { id: 'tb-10', title: '10-11과: 부정사+현재분사', subtitle: '-tuṃ · -nta/-māna', icon: '🔄', category: 'basic', steps: convertTextbookSteps(LESSON_10) },
  { id: 'tb-11', title: '12과: 동사 인칭변화', subtitle: '1·2·3인칭 현재형', icon: '👥', category: 'basic', steps: convertTextbookSteps(LESSON_11) },
  { id: 'tb-12', title: '13과: -e/-nā 어간', subtitle: 'deseti · kiṇāti · hoti', icon: '📚', category: 'basic', steps: convertTextbookSteps(LESSON_12) },
  { id: 'tb-13', title: '14과: 미래형', subtitle: '-(i)ssa · ~할 것이다', icon: '🔮', category: 'basic', steps: convertTextbookSteps(LESSON_13) },
  { id: 'tb-14', title: '15과: 원망형', subtitle: '-eyya · 만약 ~한다면', icon: '💭', category: 'basic', steps: convertTextbookSteps(LESSON_14) },
  { id: 'tb-15', title: '16과: 명령형', subtitle: '-atu · ~하라 / mā 금지', icon: '📣', category: 'basic', steps: convertTextbookSteps(LESSON_15) },
  { id: 'tb-16', title: '17과: 과거형', subtitle: 'Aorist · ~했다', icon: '⏪', category: 'basic', steps: convertTextbookSteps(LESSON_16) },
  { id: 'tb-17', title: '18과: -ā 여성명사', subtitle: 'vanitā 격변화', icon: '👩', category: 'basic', steps: convertTextbookSteps(LESSON_17) },
  { id: 'tb-18', title: '19과: 과거분사', subtitle: '-(i)ta/-na', icon: '✅', category: 'basic', steps: convertTextbookSteps(LESSON_18) },
  { id: 'tb-19', title: '20과: -i/-ī 여성명사', subtitle: 'bhūmi/nadī', icon: '🌊', category: 'basic', steps: convertTextbookSteps(LESSON_19) },
  { id: 'tb-20', title: '21과: 현재분사 여성형', subtitle: '-ntī/-mānā', icon: '🔄', category: 'basic', steps: convertTextbookSteps(LESSON_20) },
  { id: 'tb-21', title: '22과: 미래수동분사', subtitle: '-tabba/-anīya', icon: '📋', category: 'basic', steps: convertTextbookSteps(LESSON_21) },
  { id: 'tb-22', title: '23과: 사역형', subtitle: '-āpe/-āpaya', icon: '👉', category: 'basic', steps: convertTextbookSteps(LESSON_22) },
  { id: 'tb-23', title: '24-26과: 기타 명사', subtitle: '-u여성 · -i/-ī남성', icon: '📖', category: 'basic', steps: convertTextbookSteps(LESSON_23) },
  { id: 'tb-24', title: '27과: -u/-ū 남성명사', subtitle: 'bhikkhu/vidū 격변화', icon: '🧘', category: 'basic', steps: convertTextbookSteps(LESSON_24) },
  { id: 'tb-25', title: '28과: 친족명사', subtitle: 'satthā/pitā/mātā', icon: '👨‍👩‍👦', category: 'basic', steps: convertTextbookSteps(LESSON_25) },
  { id: 'tb-26', title: '29과: -i/-u 중성명사', subtitle: 'aṭṭhi/cakkhu', icon: '🦴', category: 'basic', steps: convertTextbookSteps(LESSON_26) },
  { id: 'tb-27', title: '30과: -vantu/-mantu', subtitle: 'Bhagavā · 소유형용사', icon: '🏔️', category: 'basic', steps: convertTextbookSteps(LESSON_27) },
  { id: 'tb-28', title: '31과: 인칭대명사', subtitle: 'ahaṃ/tvaṃ/mayaṃ/tumhe', icon: '🫵', category: 'basic', steps: convertTextbookSteps(LESSON_28) },
  { id: 'tb-29', title: '32과: 관계·지시·의문대명사', subtitle: 'yo/so/ko · yattha/tattha', icon: '❓', category: 'basic', steps: convertTextbookSteps(LESSON_29) },
]
