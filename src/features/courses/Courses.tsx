// 과목 화면 — 문법 주요 목차 + 경전 보조 목차
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildAllLessons, CATEGORIES } from '../../data/lessons-index'
import { STORAGE_PREFIX } from '../../config'

type ViewMode = 'grammar' | 'sutta'

function getProgress(lessonId: string): number {
  const val = localStorage.getItem(`${STORAGE_PREFIX}lesson-${lessonId}`)
  return parseFloat(val ?? '0') || 0
}

// ── 문법 학습 경로 (주요 목차) ──
// 각 문법 항목이 어떤 경전 과에서 배울 수 있는지 매핑
const GRAMMAR_SECTIONS = [
  {
    title: '기초',
    icon: '🔤',
    color: '#6B7280',
    items: [
      { label: '자모와 발음 (모음 8 + 자음 33)', lesson: 'alphabet' },
    ],
  },
  {
    title: '명사 격변화 (1-8과)',
    icon: '📐',
    color: '#5B21B6',
    subtitle: '행복경 서문에서 격변화를 배웁니다',
    items: [
      { label: '주격: ~은/는 (-o/-ā)', lesson: 'mangala-01', note: '행복경 서문 bhagavā' },
      { label: '목적격: ~을/를 (-ṃ/-e)', lesson: 'mangala-01', note: '행복경 서문 samayaṃ, dhammaṃ' },
      { label: '구격: ~에 의해 (-ena/-ehi)', lesson: 'mangala-02', note: '행복경 2-3게송' },
      { label: '여격·탈격: ~에게, ~로부터', lesson: 'mangala-02', note: '행복경 2-3게송' },
      { label: '소유격: ~의 (-ssa/-ānaṃ)', lesson: 'mangala-01', note: '행복경 서문 Anāthapiṇḍikassa' },
      { label: '처소격: ~에서 (-yaṃ/-e/-smiṃ)', lesson: 'mangala-01', note: '행복경 서문 Sāvatthiyaṃ, Jetavane' },
      { label: '호격: ~이여 (-a/-ā)', lesson: 'dhammacakka-01', note: '전법륜경 bhikkhave' },
      { label: '격변화 종합 정리', lesson: 'mangala-03', note: '행복경 4-6게송 반복 연습' },
    ],
  },
  {
    title: '★ 행복경 전문 독해',
    icon: '🪷',
    color: 'var(--color-primary)',
    items: [
      { label: '행복경 (1) 서문 + 제1게송', lesson: 'mangala-01' },
      { label: '행복경 (2) 제2-3게송', lesson: 'mangala-02' },
      { label: '행복경 (3) 제4-6게송', lesson: 'mangala-03' },
      { label: '행복경 (4) 제7-9게송', lesson: 'mangala-04' },
      { label: '행복경 (5) 제10-12게송', lesson: 'mangala-05' },
    ],
  },
  {
    title: '동사 활용 (9-13과)',
    icon: '📐',
    color: '#5B21B6',
    subtitle: '경전 속 동사 형태를 익힙니다',
    items: [
      { label: '절대분사: ~하고 나서 (-tvā)', lesson: 'mangala-04', note: '행복경 katvāna' },
      { label: '부정사: ~하기 위해 (-tuṃ)', lesson: 'anatta-01', note: '무아경 samanupassituṃ' },
      { label: '중성명사 (dukkhaṃ, rūpaṃ)', lesson: 'dhammacakka-01', note: '전법륜경 사성제' },
      { label: '동사 현재형 (-ti/-nti)', lesson: 'mangala-01', note: '행복경 viharati' },
      { label: '특수동사 (pajānāti, atthi)', lesson: 'dhammacakka-02', note: '전법륜경' },
    ],
  },
  {
    title: '시제 변화 (14-18과)',
    icon: '📐',
    color: '#5B21B6',
    items: [
      { label: '미래형: ~할 것이다 (-ssa-)', lesson: 'ratana-01', note: '보배경' },
      { label: '원망형: ~해야 한다 (-eyya)', lesson: 'metta-01', note: '자비경 bhāvaye' },
      { label: '명령형: ~하라 (-tu/-hi)', lesson: 'mangala-01', note: '행복경 brūhi' },
      { label: '과거형: ~했다 (a- 어두첨자)', lesson: 'mangala-02', note: '행복경 acintayuṃ' },
      { label: 'ā-여성명사 (vedanā, paññā)', lesson: 'anatta-02', note: '무아경 오온' },
    ],
  },
  {
    title: '★ 보배경 · 자비경 독해',
    icon: '💎',
    color: '#D97706',
    items: [
      { label: '보배경 (1) 제1-4게송', lesson: 'ratana-01' },
      { label: '보배경 (2) 제5-9게송', lesson: 'ratana-02' },
      { label: '보배경 (3) 제10-13게송', lesson: 'ratana-03' },
      { label: '보배경 (4) 제14-17게송', lesson: 'ratana-04' },
      { label: '자비경 (1) 제1-5게송', lesson: 'metta-01' },
      { label: '자비경 (2) 제6-10게송', lesson: 'metta-02' },
    ],
  },
  {
    title: '분사 (19-22과)',
    icon: '📐',
    color: '#5B21B6',
    subtitle: '동사에서 파생된 형용사',
    items: [
      { label: '과거분사: ~된 (-ta/-na)', lesson: 'mangala-01', note: '행복경 sutaṃ' },
      { label: '현재분사: ~하는 (-nta/-māna)', lesson: 'mangala-02', note: '행복경 ākaṅkhamānā' },
      { label: '미래수동분사: ~해야 할 (-tabba)', lesson: 'dhammacakka-03', note: '전법륜경 pariññeyyaṃ' },
      { label: 'i/ī-여성명사 (jāti, nadī)', lesson: 'anatta-03', note: '무아경 jāti' },
    ],
  },
  {
    title: '★ 전법륜경 독해',
    icon: '☸️',
    color: '#7C3AED',
    items: [
      { label: '전법륜경 (1) 제1-4단락', lesson: 'dhammacakka-01' },
      { label: '전법륜경 (2) 제5-8단락', lesson: 'dhammacakka-02' },
      { label: '전법륜경 (3) 제9-12단락', lesson: 'dhammacakka-03' },
      { label: '전법륜경 (4) 제13-15단락', lesson: 'dhammacakka-04' },
    ],
  },
  {
    title: '고급 명사 (23-29과)',
    icon: '📐',
    color: '#5B21B6',
    items: [
      { label: '사역형: ~하게 하다 (-āpeti)', lesson: 'anatta-01', note: '무아경' },
      { label: 'u/ū-남성명사 (bhikkhu)', lesson: 'dhammacakka-01', note: '전법륜경' },
      { label: '자음어간 명사 (satthā=스승)', lesson: 'anatta-04', note: '무아경' },
      { label: '-vantu/-mantu 형용사 (bhagavā)', lesson: 'mangala-01', note: '행복경' },
    ],
  },
  {
    title: '★ 무아경 독해',
    icon: '🔥',
    color: '#7C3AED',
    items: [
      { label: '무아경 (1) 제1-3단락', lesson: 'anatta-01' },
      { label: '무아경 (2) 제4-7단락', lesson: 'anatta-02' },
      { label: '무아경 (3) 제8-11단락', lesson: 'anatta-03' },
      { label: '무아경 (4) 제12-14단락', lesson: 'anatta-04' },
    ],
  },
  {
    title: '★ 법구경 명구',
    icon: '📜',
    color: '#D97706',
    items: [
      { label: '법구경 (1) 제1-5선', lesson: 'dhammapada-01' },
      { label: '법구경 (2) 제6-10선', lesson: 'dhammapada-02' },
    ],
  },
  {
    title: '대명사 · 복합어 (30-32과)',
    icon: '📐',
    color: '#5B21B6',
    items: [
      { label: '인칭대명사 (ahaṃ, tvaṃ)', lesson: 'satipatthana-01', note: '사념처경' },
      { label: '지시·관계·의문대명사', lesson: 'satipatthana-02', note: '사념처경' },
      { label: '복합어 · 접두사 · 접미사', lesson: 'satipatthana-03', note: '사념처경' },
    ],
  },
  {
    title: '★ 사념처경 독해',
    icon: '🧘',
    color: '#7C3AED',
    items: [
      { label: '신념처 (1) 서문+호흡', lesson: 'satipatthana-01' },
      { label: '신념처 (2) 자세+명지', lesson: 'satipatthana-02' },
      { label: '신념처 (3) 부정관+요소', lesson: 'satipatthana-03' },
      { label: '신념처 (4) 묘지관', lesson: 'satipatthana-04' },
      { label: '수심법 (1) 수념처+심념처', lesson: 'satipatthana-05' },
      { label: '수심법 (2) 오개+오온', lesson: 'satipatthana-06' },
      { label: '수심법 (3) 육처+칠각지', lesson: 'satipatthana-07' },
      { label: '수심법 (4) 사성제+팔정도', lesson: 'satipatthana-08' },
    ],
  },
]

/** 원형 SVG 진도 */
function CircleProgress({ pct }: { pct: number }) {
  const r = 16
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0">
      <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-border-light)" strokeWidth="3" />
      {pct > 0 && (
        <circle cx="20" cy="20" r={r} fill="none"
          stroke={pct >= 100 ? 'var(--color-accent)' : 'var(--color-primary)'}
          strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.4s ease' }}
        />
      )}
      <text x="20" y="20" textAnchor="middle" dominantBaseline="central"
        fill={pct >= 100 ? 'var(--color-accent)' : 'var(--color-text-secondary)'}
        fontSize="10" fontWeight="600">
        {pct >= 100 ? '✓' : `${Math.round(pct)}%`}
      </text>
    </svg>
  )
}

function TabButton({ active, onClick, label }: {
  active: boolean; onClick: () => void; label: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all"
      style={{
        background: active ? 'var(--color-surface)' : 'transparent',
        color: active ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
        boxShadow: active ? 'var(--shadow-sm)' : 'none',
      }}
    >
      {label}
    </button>
  )
}

export default function Courses() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('grammar')

  return (
    <div className="pb-20 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        목차
      </h1>

      {/* 탭 전환: 문법 경로 (주) / 경전 경로 (보조) */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl"
        style={{ background: 'var(--color-border-light)' }}>
        <TabButton
          active={viewMode === 'grammar'}
          onClick={() => setViewMode('grammar')}
          label="📐 문법 경로"
        />
        <TabButton
          active={viewMode === 'sutta'}
          onClick={() => setViewMode('sutta')}
          label="📚 경전 경로"
        />
      </div>

      {viewMode === 'grammar' ? (
        <GrammarView navigate={navigate} />
      ) : (
        <SuttaView navigate={navigate} />
      )}
    </div>
  )
}

/** 문법 경로 뷰 (주요 목차) */
function GrammarView({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <div>
      {GRAMMAR_SECTIONS.map((section, si) => (
        <div key={si} className="mb-6">
          {/* 섹션 헤더 */}
          <div className="flex items-center gap-3 mb-2 px-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `color-mix(in srgb, ${section.color} 12%, transparent)` }}
            >
              <span className="text-base">{section.icon}</span>
            </div>
            <div>
              <h2 className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>
                {section.title}
              </h2>
              {'subtitle' in section && section.subtitle && (
                <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                  {section.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* 항목 리스트 */}
          <div className="flex flex-col gap-2">
            {section.items.map((item, ii) => {
              const pct = getProgress(item.lesson)
              const done = pct >= 100
              const inProgress = pct > 0 && !done

              return (
                <button
                  key={ii}
                  onClick={() => navigate(`/learn/${item.lesson}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all active:scale-[0.98]"
                  style={{
                    background: 'var(--color-surface)',
                    border: done ? '2px solid var(--color-accent)' : '1px solid var(--color-border-light)',
                  }}
                >
                  {/* 상태 아이콘 */}
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      background: done ? 'var(--color-accent)' : inProgress ? 'var(--color-primary-glow)' : 'var(--color-border-light)',
                      color: done ? '#fff' : inProgress ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                    }}
                  >
                    {done ? '✓' : inProgress ? '→' : (ii + 1)}
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {item.label}
                    </p>
                    {'note' in item && item.note && (
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                        📖 {item.note}
                      </p>
                    )}
                  </div>

                  {/* 진도 */}
                  <div className="shrink-0">
                    {done ? (
                      <span className="badge badge-success">완료</span>
                    ) : pct > 0 ? (
                      <CircleProgress pct={pct} />
                    ) : null}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

/** 경전 경로 뷰 (보조 목차) */
function SuttaView({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const allLessons = buildAllLessons()

  return (
    <div>
      {CATEGORIES.map((cat) => {
        const lessons = allLessons.filter(l => l.category === cat.key)
        if (lessons.length === 0) return null

        return (
          <div key={cat.key} className="mb-6">
            <div className="flex items-center gap-3 mb-3 px-1">
              <span className="text-lg">{cat.icon}</span>
              <h2 className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>
                {cat.label}
              </h2>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {lessons.length}과
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {lessons.map((lesson) => {
                const pct = getProgress(lesson.id)
                const done = pct >= 100

                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(`/learn/${lesson.id}`)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all active:scale-[0.98] card-shadow"
                    style={{
                      background: 'var(--color-surface)',
                      border: done ? '2px solid var(--color-accent)' : '1px solid var(--color-border-light)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--color-primary-glow)' }}
                    >
                      <span className="text-base">{lesson.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
                        {lesson.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                        {lesson.subtitle}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {done ? (
                        <span className="badge badge-success">완료</span>
                      ) : pct > 0 ? (
                        <CircleProgress pct={pct} />
                      ) : (
                        <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>미학습</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
