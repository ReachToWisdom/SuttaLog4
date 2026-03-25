// 과목 화면 — SuttaLog2 스타일 (접이식 카테고리 + 검색 + 이중 경로)
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildAllLessons, CATEGORIES } from '../../data/lessons-index'
import { STORAGE_PREFIX } from '../../config'

type ViewMode = 'grammar' | 'sutta'

function getProgress(lessonId: string): number {
  const val = localStorage.getItem(`${STORAGE_PREFIX}lesson-${lessonId}`)
  return parseFloat(val ?? '0') || 0
}

// 원형 진도 SVG
function CircleProgress({ pct, size = 36 }: { pct: number; size?: number }) {
  const stroke = 3, r = (size - stroke) / 2, circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  const color = pct >= 100 ? 'var(--color-accent)' : 'var(--color-primary)'
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} className="transition-all duration-700" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 shrink-0"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--color-text-secondary)' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ── 문법 경로 데이터 (교재 32과 전체 + 경전) ──
const GRAMMAR_SECTIONS = [
  { key: 'g-basic', title: '기초', items: [
    { label: '자모와 발음 (모음 8 + 자음 33)', lesson: 'tb-00' },
    { label: '연성법 (Sandhi ①~⑬)', lesson: 'tb-sandhi' },
    { label: '격변화 도표 (전체 19개)', lesson: 'declension-ref' },
  ]},
  { key: 'g-case', title: '명사 격변화 (1-8과)', items: [
    { label: '1과: 주격 + 동사 (-o/-ā · -ti/-nti)', lesson: 'tb-01' },
    { label: '2과: 목적격 (-ṃ/-e)', lesson: 'tb-02' },
    { label: '★ 행복경 (1) 실전', lesson: 'mangala-01', note: '주격/목적격' },
    { label: '3과: 구격 (-ena/-ehi)', lesson: 'tb-03' },
    { label: '4과: 탈격 (-ā/-mhā/-smā)', lesson: 'tb-04' },
    { label: '5과: 여격 (-āya/-ssa)', lesson: 'tb-05' },
    { label: '6과: 소유격 (-ssa/-ānaṃ)', lesson: 'tb-06' },
    { label: '★ 행복경 (2) 실전', lesson: 'mangala-02', note: '소유격/구격' },
    { label: '7과: 처소격 (-e/-mhi/-smiṃ)', lesson: 'tb-07' },
    { label: '8과: 호격 + 중성명사', lesson: 'tb-08' },
    { label: '★ 행복경 (3) 실전', lesson: 'mangala-03', note: '격변화 종합' },
  ]},
  { key: 'g-verb', title: '동사 활용 (9-13과)', items: [
    { label: '9과: 절대분사 (-(i)tvā/-ya)', lesson: 'tb-09' },
    { label: '★ 행복경 (4) 실전', lesson: 'mangala-04', note: '절대분사' },
    { label: '10-11과: 부정사 + 현재분사', lesson: 'tb-10' },
    { label: '12과: 동사 인칭변화 (1/2/3인칭)', lesson: 'tb-11' },
    { label: '13과: -e/-nā 어간 동사', lesson: 'tb-12' },
    { label: '★ 행복경 (5) 실전', lesson: 'mangala-05', note: '마무리' },
  ]},
  { key: 'g-tense', title: '시제 변화 (14-17과)', items: [
    { label: '14과: 미래형 (-(i)ssa)', lesson: 'tb-13' },
    { label: '15과: 원망형 (-eyya)', lesson: 'tb-14' },
    { label: '16과: 명령형 (-atu/-hi)', lesson: 'tb-15' },
    { label: '17과: 과거형 (Aorist)', lesson: 'tb-16' },
  ]},
  { key: 'g-fem', title: '여성명사 (18과)', items: [
    { label: '18과: -ā 여성명사 (vanitā)', lesson: 'tb-17' },
  ]},
  { key: 'g-ratana', title: '★ 보배경 · 자비경 독해', items: [
    { label: '보배경 (1)', lesson: 'ratana-01' }, { label: '보배경 (2)', lesson: 'ratana-02' },
    { label: '보배경 (3)', lesson: 'ratana-03' }, { label: '보배경 (4)', lesson: 'ratana-04' },
    { label: '자비경 (1)', lesson: 'metta-01' }, { label: '자비경 (2)', lesson: 'metta-02' },
  ]},
  { key: 'g-participle', title: '분사 (19-22과)', items: [
    { label: '19과: 과거분사 (-(i)ta/-na)', lesson: 'tb-18' },
    { label: '20과: -i/-ī 여성명사', lesson: 'tb-19' },
    { label: '21과: 현재분사 여성형 (-ntī/-mānā)', lesson: 'tb-20' },
    { label: '22과: 미래수동분사 (-tabba/-anīya)', lesson: 'tb-21' },
  ]},
  { key: 'g-dhammacakka', title: '★ 전법륜경 독해', items: [
    { label: '전법륜경 (1)', lesson: 'dhammacakka-01' }, { label: '전법륜경 (2)', lesson: 'dhammacakka-02' },
    { label: '전법륜경 (3)', lesson: 'dhammacakka-03' }, { label: '전법륜경 (4)', lesson: 'dhammacakka-04' },
  ]},
  { key: 'g-advanced', title: '사역·기타 명사 (23-29과)', items: [
    { label: '23과: 사역형 (-āpe/-āpaya)', lesson: 'tb-22' },
    { label: '24-26과: 기타 명사 (-u여성·-i/-ī남성)', lesson: 'tb-23' },
    { label: '27과: -u/-ū 남성명사 (bhikkhu)', lesson: 'tb-24' },
    { label: '28과: 친족명사 (satthā/pitā/mātā)', lesson: 'tb-25' },
    { label: '29과: -i/-u 중성명사 (aṭṭhi/cakkhu)', lesson: 'tb-26' },
  ]},
  { key: 'g-anatta', title: '★ 무아경 독해', items: [
    { label: '무아경 (1)', lesson: 'anatta-01' }, { label: '무아경 (2)', lesson: 'anatta-02' },
    { label: '무아경 (3)', lesson: 'anatta-03' }, { label: '무아경 (4)', lesson: 'anatta-04' },
  ]},
  { key: 'g-pronoun', title: '형용사·대명사 (30-32과)', items: [
    { label: '30과: -vantu/-mantu (bhagavā)', lesson: 'tb-27' },
    { label: '31과: 인칭대명사 (ahaṃ/tvaṃ)', lesson: 'tb-28' },
    { label: '32과: 관계·지시·의문대명사 (yo/so/ko)', lesson: 'tb-29' },
  ]},
  { key: 'g-dhammapada', title: '★ 법구경 독해', items: [
    { label: '법구경 (1)', lesson: 'dhammapada-01' }, { label: '법구경 (2)', lesson: 'dhammapada-02' },
  ]},
  { key: 'g-satipatthana', title: '★ 사념처경', items: [
    { label: '신념처 (1)', lesson: 'satipatthana-01' }, { label: '신념처 (2)', lesson: 'satipatthana-02' },
    { label: '신념처 (3)', lesson: 'satipatthana-03' }, { label: '신념처 (4)', lesson: 'satipatthana-04' },
    { label: '수심법 (1)', lesson: 'satipatthana-05' }, { label: '수심법 (2)', lesson: 'satipatthana-06' },
    { label: '수심법 (3)', lesson: 'satipatthana-07' }, { label: '수심법 (4)', lesson: 'satipatthana-08' },
  ]},
]

export default function Courses() {
  const nav = useNavigate()
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grammar')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const allLessons = useMemo(() => buildAllLessons(), [])

  const stats = useMemo(() => {
    const completed = allLessons.filter(l => getProgress(l.id) >= 100).length
    return { completed, total: allLessons.length }
  }, [allLessons])

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-lg mx-auto px-4">
        {/* 헤더 */}
        <div className="pt-[max(env(safe-area-inset-top),20px)] pb-4 animate-fadeIn">
          <h1 className="text-2xl font-bold tracking-tight">과목</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {stats.completed}/{stats.total}과 완료
          </p>
        </div>

        {/* 검색바 */}
        <div className="px-1 mb-4 animate-slideUp">
          <div className="relative">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="과목 검색..."
              className="w-full rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
              style={{ backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }} />
          </div>
        </div>

        {/* 탭 전환 */}
        <div className="flex gap-2 mb-4 px-1">
          {(['grammar', 'sutta'] as const).map(m => (
            <button key={m} onClick={() => setViewMode(m)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
              style={{
                background: viewMode === m ? 'var(--color-primary)' : 'var(--color-surface)',
                color: viewMode === m ? '#fff' : 'var(--color-text-secondary)',
                border: viewMode === m ? 'none' : '1.5px solid var(--color-border-light)',
              }}>
              {m === 'grammar' ? '📐 문법 경로' : '📚 경전 경로'}
            </button>
          ))}
        </div>

        {/* 과 목록 */}
        <div className="px-1 space-y-3 animate-slideUp delay-2">
          {viewMode === 'grammar' ? (
            <GrammarList nav={nav} search={search} openSections={openSections} setOpenSections={setOpenSections} />
          ) : (
            <SuttaList nav={nav} search={search} allLessons={allLessons} openSections={openSections} setOpenSections={setOpenSections} />
          )}
        </div>
      </div>
    </div>
  )
}

// ── 문법 경로 ──
function GrammarList({ nav, search, openSections, setOpenSections }: {
  nav: ReturnType<typeof useNavigate>; search: string
  openSections: Record<string, boolean>; setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) {
  const q = search.toLowerCase().trim()
  return <>
    {GRAMMAR_SECTIONS.map(sec => {
      const items = q ? sec.items.filter(it => it.label.toLowerCase().includes(q) || ((it as {note?:string}).note?.toLowerCase().includes(q) ?? true)) : sec.items
      if (items.length === 0) return null
      const isOpen = openSections[sec.key] ?? true
      const done = items.filter(it => getProgress(it.lesson) >= 100).length

      return (
        <div key={sec.key} className="rounded-2xl overflow-hidden card-shadow"
          style={{ backgroundColor: 'var(--color-surface)', border: done === items.length && items.length > 0
            ? '1.5px solid color-mix(in srgb, var(--color-accent) 30%, var(--color-border))'
            : '1.5px solid var(--color-border)' }}>
          <button onClick={() => setOpenSections(p => ({ ...p, [sec.key]: !p[sec.key] }))}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:scale-[0.99]">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm truncate">{sec.title}</span>
                <span className="badge text-[10px]">{done}/{items.length}</span>
              </div>
            </div>
            <ChevronIcon open={isOpen || !!q} />
          </button>
          <div className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: (isOpen || !!q) ? `${items.length * 64 + 16}px` : '0px', opacity: (isOpen || !!q) ? 1 : 0 }}>
            <div className="px-3 pb-3 space-y-2">
              {items.map((it, i) => {
                const pct = getProgress(it.lesson)
                const isDone = pct >= 100
                return (
                  <button key={i} onClick={() => nav(`/learn/${it.lesson}`)}
                    className="w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-left active:scale-[0.98]"
                    style={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid transparent' }}>
                    <div className="shrink-0 relative">
                      {isDone ? (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, transparent)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                      ) : (
                        <div className="relative">
                          <CircleProgress pct={pct} />
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold"
                            style={{ color: 'var(--color-primary)' }}>{pct > 0 ? `${Math.round(pct)}%` : ''}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[13px] truncate">{it.label}</p>
                      {(it as {note?:string}).note && <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--color-text-secondary)' }}>📖 {(it as {note?:string}).note}</p>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )
    })}
  </>
}

// ── 경전 경로 ──
function SuttaList({ nav, search, allLessons, openSections, setOpenSections }: {
  nav: ReturnType<typeof useNavigate>; search: string
  allLessons: ReturnType<typeof buildAllLessons>
  openSections: Record<string, boolean>; setOpenSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) {
  const q = search.toLowerCase().trim()
  return <>
    {CATEGORIES.map(cat => {
      const lessons = allLessons.filter(l => l.category === cat.key && (!q || l.title.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q)))
      if (lessons.length === 0) return null
      const isOpen = openSections[`s-${cat.key}`] ?? true
      const done = lessons.filter(l => getProgress(l.id) >= 100).length

      return (
        <div key={cat.key} className="rounded-2xl overflow-hidden card-shadow"
          style={{ backgroundColor: 'var(--color-surface)', border: done === lessons.length && lessons.length > 0
            ? '1.5px solid color-mix(in srgb, var(--color-accent) 30%, var(--color-border))'
            : '1.5px solid var(--color-border)' }}>
          <button onClick={() => setOpenSections(p => ({ ...p, [`s-${cat.key}`]: !p[`s-${cat.key}`] }))}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:scale-[0.99]">
            <span className="text-lg">{cat.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm truncate">{cat.label}</span>
                <span className="badge text-[10px]">{done}/{lessons.length}</span>
              </div>
            </div>
            <ChevronIcon open={isOpen || !!q} />
          </button>
          <div className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: (isOpen || !!q) ? `${lessons.length * 64 + 16}px` : '0px', opacity: (isOpen || !!q) ? 1 : 0 }}>
            <div className="px-3 pb-3 space-y-2">
              {lessons.map(lesson => {
                const pct = getProgress(lesson.id)
                const isDone = pct >= 100
                return (
                  <button key={lesson.id} onClick={() => nav(`/learn/${lesson.id}`)}
                    className="w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-left active:scale-[0.98]"
                    style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
                    <div className="shrink-0 relative">
                      {isDone ? (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 12%, transparent)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                      ) : (
                        <div className="relative">
                          <CircleProgress pct={pct} />
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold"
                            style={{ color: 'var(--color-primary)' }}>{pct > 0 ? `${Math.round(pct)}%` : ''}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[13px] truncate">{lesson.icon} {lesson.title}</p>
                      <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--color-text-secondary)' }}>{lesson.subtitle}</p>
                    </div>
                    <span className="text-[10px] font-semibold shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                      {lesson.steps.length}스텝
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )
    })}
  </>
}
