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

// ── 문법 경로 데이터 ──
const GRAMMAR_SECTIONS = [
  { key: 'g-basic', title: '기초', items: [
    { label: '자모와 발음 (모음 8 + 자음 33)', lesson: 'alphabet' },
  ]},
  { key: 'g-case', title: '명사 격변화 (1-8과)', items: [
    { label: '1과 주격·목적격·소유격·처소격', lesson: 'mangala-01', note: '행복경 서문' },
    { label: '3과 구격: ~에 의해 (-ena/-ehi)', lesson: 'grammar-03', note: '교재 예문' },
    { label: '4과 탈격: ~로부터 (-mhā/-smā)', lesson: 'grammar-04', note: '교재 예문' },
    { label: '5과 여격: ~에게 (-ssa/-āya)', lesson: 'grammar-05', note: '교재 예문' },
    { label: '6-7과 구격·여격 경전 복습', lesson: 'mangala-02', note: '행복경 2-3게송' },
    { label: '8과 호격: ~이여 (-a/-ā)', lesson: 'grammar-08', note: '교재 bhikkhave' },
    { label: '격변화 종합 연습', lesson: 'mangala-03', note: '행복경 4-6게송' },
  ]},
  { key: 'g-verb', title: '동사 + 분사 (9-13과)', items: [
    { label: '9과 절대분사 (-tvā) + 동사 기초', lesson: 'mangala-04', note: '행복경 katvāna' },
    { label: '10과 부정사: ~하기 위해 (-tuṃ)', lesson: 'grammar-10', note: '교재 예문' },
    { label: '행복경 마무리', lesson: 'mangala-05', note: '행복경 10-12게송' },
    { label: '13과 특수동사 + 삼귀의', lesson: 'grammar-13', note: '교재 atthi, karoti' },
  ]},
  { key: 'g-mangala', title: '★ 행복경 전문 독해', items: [
    { label: '행복경 (1) 서문 + 제1게송', lesson: 'mangala-01' },
    { label: '행복경 (2) 제2-3게송', lesson: 'mangala-02' },
    { label: '행복경 (3) 제4-6게송', lesson: 'mangala-03' },
    { label: '행복경 (4) 제7-9게송', lesson: 'mangala-04' },
    { label: '행복경 (5) 제10-12게송', lesson: 'mangala-05' },
  ]},
  { key: 'g-tense', title: '시제 + 여성명사 (14-18과)', items: [
    { label: '18과 ā-여성명사 (vedanā, paññā)', lesson: 'grammar-18', note: '교재 예문' },
    { label: '14-15과 미래형·원망형', lesson: 'ratana-01', note: '보배경에서' },
    { label: '16-17과 명령형·과거형', lesson: 'ratana-02', note: '보배경에서' },
  ]},
  { key: 'g-ratana', title: '★ 보배경 · 자비경', items: [
    { label: '보배경 (1)', lesson: 'ratana-01' }, { label: '보배경 (2)', lesson: 'ratana-02' },
    { label: '보배경 (3)', lesson: 'ratana-03' }, { label: '보배경 (4)', lesson: 'ratana-04' },
    { label: '자비경 (1)', lesson: 'metta-01' }, { label: '자비경 (2)', lesson: 'metta-02' },
  ]},
  { key: 'g-participle', title: '분사 심화 + 중성명사 (19-22과)', items: [
    { label: '중성명사 (dukkhaṃ, rūpaṃ)', lesson: 'dhammacakka-01', note: '사성제' },
    { label: '특수동사 (pajānāti)', lesson: 'dhammacakka-02', note: '전법륜경' },
    { label: '미래수동분사 (-tabba)', lesson: 'dhammacakka-03', note: 'pariññeyyaṃ' },
  ]},
  { key: 'g-dhammacakka', title: '★ 전법륜경', items: [
    { label: '전법륜경 (1)', lesson: 'dhammacakka-01' }, { label: '전법륜경 (2)', lesson: 'dhammacakka-02' },
    { label: '전법륜경 (3)', lesson: 'dhammacakka-03' }, { label: '전법륜경 (4)', lesson: 'dhammacakka-04' },
  ]},
  { key: 'g-advanced', title: '고급 명사 + 오온 (23-29과)', items: [
    { label: 'i/ī-여성명사', lesson: 'anatta-01', note: '무아경 오온' },
    { label: '부정사 (-tuṃ)', lesson: 'anatta-01', note: 'samanupassituṃ' },
    { label: '사역형 (-āpeti)', lesson: 'anatta-03', note: '무아경' },
    { label: '자음어간 명사', lesson: 'anatta-04', note: '무아경' },
  ]},
  { key: 'g-anatta', title: '★ 무아경', items: [
    { label: '무아경 (1)', lesson: 'anatta-01' }, { label: '무아경 (2)', lesson: 'anatta-02' },
    { label: '무아경 (3)', lesson: 'anatta-03' }, { label: '무아경 (4)', lesson: 'anatta-04' },
  ]},
  { key: 'g-dhammapada', title: '★ 법구경', items: [
    { label: '법구경 (1)', lesson: 'dhammapada-01' }, { label: '법구경 (2)', lesson: 'dhammapada-02' },
  ]},
  { key: 'g-pronoun', title: '대명사 · 복합어 (30-32과)', items: [
    { label: '인칭대명사', lesson: 'satipatthana-01', note: '사념처경' },
    { label: '지시·관계·의문대명사', lesson: 'satipatthana-02', note: '사념처경' },
    { label: '복합어·접두사·접미사', lesson: 'satipatthana-03', note: '사념처경' },
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
      const items = q ? sec.items.filter(it => it.label.toLowerCase().includes(q) || ((it as {note?:string}).note?.toLowerCase().includes(q) ?? false)) : sec.items
      if (items.length === 0) return null
      const isOpen = openSections[sec.key] ?? false
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
      const isOpen = openSections[`s-${cat.key}`] ?? false
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
