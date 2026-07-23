import React, { useEffect, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, Calendar, ChevronLeft, ChevronRight, Expand, ExternalLink, MapPin, UserRound, X } from 'lucide-react'
import './calmo.css'
import { CaseFooter, CaseHeader, EditorialCaseHero } from './case-chrome.jsx'

const prototypeUrl = 'https://tall-pony-86222120.figma.site'
const vimeoUrl = 'https://player.vimeo.com/video/1177305647?title=0&byline=0&portrait=0&dnt=1'

function CalmoImage({ name, alt, caption, onExpand, className = '', children }) {
  const [captionTitle, ...captionDetail] = (caption || '').split(' — ')
  return <figure className={`calmo-image ${className}`}>
    <button type="button" onClick={() => onExpand({ name, alt, caption, captionTitle, captionText: captionDetail.join(' — ') })} aria-label={`Expand ${caption || alt}`}>
      <img src={`/calmo/${name}`} alt={alt}/>
      <span><Expand size={15}/> Expand</span>
    </button>
    {caption && <figcaption>{caption}</figcaption>}
    {children}
  </figure>
}

const finalAppScreens = [
  {
    name: 'final-stress-alert.png',
    alt: 'CALMO stress alert interface and tailored calming session',
    title: 'Stress alert',
    summary: 'Detect a stress pattern and guide a calmer next step.'
  },
  {
    name: 'final-behaviour-explanation.png',
    alt: 'CALMO behaviour explanation and adaptation journey interface',
    title: 'Behaviour explanation',
    summary: 'Connect signals, context and recovery stages in one readable view.'
  },
  {
    name: 'final-record-tracking.png',
    alt: 'CALMO health and behaviour record tracking interface',
    title: 'Record & tracking',
    summary: 'Keep a shared record of health, behaviour and progress over time.'
  }
]

function CalmoFinalScreens({ onExpand }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = finalAppScreens[activeIndex]
  const caption = `${active.title} — ${active.summary}`
  const previous = () => setActiveIndex((index) => (index - 1 + finalAppScreens.length) % finalAppScreens.length)
  const next = () => setActiveIndex((index) => (index + 1) % finalAppScreens.length)

  return <section className="calmo-final-screens" aria-label="Final CALMO companion app screens">
    <figure className="calmo-final-screen">
      <div className="calmo-final-media">
        <button className="calmo-final-expand" type="button" onClick={() => onExpand({ ...active, caption, captionTitle: active.title, captionText: active.summary })} aria-label={`Expand ${active.title}`}>
          <img src={`/calmo/${active.name}`} alt={active.alt}/>
          <span><Expand size={15}/> Expand</span>
        </button>
        <button className="calmo-final-switch previous" type="button" onClick={previous} aria-label="Show previous app screen"><ChevronLeft size={28}/></button>
        <button className="calmo-final-switch next" type="button" onClick={next} aria-label="Show next app screen"><ChevronRight size={28}/></button>
      </div>
      <figcaption><strong>{active.title}</strong><span>{active.summary}</span></figcaption>
    </figure>
  </section>
}

const competitiveAnalysisSlides = [
  {
    title: 'Retired Working Dog Support Organisations',
    columns: ['', 'MissionK9Rescue', 'London Retired Police Dog Trust', 'Thin Blue Paw'],
    rows: [
      ['Organisation Type', 'US-based non-profit working dog rescue organisation', 'UK local charity supporting retired police dogs', 'UK national charity supporting police dog welfare'],
      ['Direct Adoption Service', 'Yes, but mainly through coordination and a selective matching process', 'No (focuses more on medical and care funding)', 'No (adoption handled by police forces, not directly by the charity)'],
      ['Type of Support Provided', 'Medium to full support (including medical care, transport, rehabilitation and behavioural support)', 'Provides medical funding and welfare support', 'Focuses on charity which protects, celebrates, supports and rehabilitates both serving and retired police dogs'],
      ['Target Group', 'Retired working dogs (including military, contract and police dogs) worldwide', 'Retired police dogs in London that require health or long-term care support', 'All UK police dogs (both serving and retired)'],
      ['Support for Post-retirement Behavioural / Psychological Recovery', 'Has long-term rehabilitation programmes', 'No clear information available', 'Mainly provides medical funding, limited behavioural recovery support'],
      ['Community Building & Engagement', 'Active online community + strong global awareness', 'Limited community interaction', 'Organised events and community-based support activities']
    ]
  },
  {
    title: 'Dog Behaviour Modification Courses',
    columns: ['', 'SpiritDog Training', 'British College of Canine Studies', 'The Online Dog Trainer'],
    rows: [
      ['Target Users', 'Pet dog owners', 'Dog trainers and pet owners', 'Pet dog owners'],
      ['Course Format', 'Self-paced online courses with video lessons', 'Online courses with certificate programmes', 'Reactivity management and dog psychology-based training'],
      ['Course Focus', 'Behaviour correction and basic obedience training', 'Comprehensive dog behaviour theory and practical training', 'Reactivity management and dog psychology-based training'],
      ['Support Provided', 'Trainer support and feedback within courses', 'Tutor guidance and assignment feedback', 'Blog content, podcasts, user interaction and community resources'],
      ['Key Features', 'Short daily training sessions, clear task-based lessons for everyday training situations', 'In-depth courses with strong theoretical background and professional-level content', 'Psychology-led training approach covering common behaviour issues']
    ]
  },
  {
    title: 'Calming & Behaviour Management Tools for Dogs',
    columns: ['', 'Target Users', 'Use Scenarios', 'Strengths', 'Limitations'],
    rows: [
      ['Pressure Wraps (e.g. calming jackets)', '• Dogs with noise fears (thunder, fireworks)\n• Mild to moderate separation anxiety\n• Owners who prefer non-spray or non-medication solutions\n• Indoor companion dogs', '• Thunderstorms\n• Firework seasons\n• Car travel / vet visits\n• Adjustment to new environments', '• Non-invasive and chemical-free\n• Reusable\n• Easy to use, quick to put on\n• Immediate calming effect for some dogs', '• Results vary greatly between individual dogs\n• Long-term wearing can cause discomfort\n• Limited effect for severe anxiety or PTSD-type retired working dogs\n• Does not improve long-term behaviour (symptom relief only)'],
      ['Pheromone & Scent-based Products', '• Owners wanting environmental-level calming support\n• Indoor households\n• Newly adopting families', '• New home adjustment period\n• Night-time calming\n• Reducing tension in multi-dog households\n• Moving house / visitors', '• Does not interfere with training\n• Continuous release (collars / diffusers)\n• Easy to use\n• Provides background calming effect for some dogs', '• Ongoing cost due to refills\n• Mixed scientific evidence\n• Weak effect for strong triggers (fireworks, trauma memories)\n• Difficult for owners to judge real effectiveness'],
      ['Music & Sound-based Calming Systems', '• Owners who work outside the home\n• Dogs left alone indoors\n• Families wanting a calm home environment', '• Dogs staying home alone\n• Night-time sleep\n• Masking street or background noise\n• Recovery after surgery', '• Non-contact solution\n• Suitable for longer-term use\n• Improves overall environment atmosphere\n• Can be combined with other tools', '• Not all dogs respond to music\n• Cannot help sudden strong triggers\n• Requires age adjustment\n• Effects are hard to measure'],
      ['Sniffing & Licking Enrichment Toys (e.g. Snuffle Mats, Lick Mats)', '• High-energy dogs\n• Dogs with limited indoor activity\n• Owners dealing with anxiety or destructive behaviour\n• Newly adopted dogs', '• When dogs are left alone\n• Release energy\n• During over-excitement\n• Relaxation breaks during training', '• Behaviour science support (sniffing and licking naturally calm dogs)\n• Helps reduce destructive behaviour\n• Low cost\n• Can be combined with daily feeding', '• Requires food preparation by owners\n• Limited effect on aggression or severe anxiety\n• Risk of over-dependence\n• Some dogs may damage toys'],
      ['Multi-tool Combination Solutions (e.g. bundled calming kits)', '• Owners of dogs with severe noise fears\n• Users looking for “all-in-one” calming solutions\n• Higher-budget households', '• Thunderstorms and fireworks\n• Long-distance travel\n• Early adoption period with multiple stress triggers', '• Multi-layer support (touch + scent + environment)\n• Broad coverage of stress situations\n• Mature and well-established market products', '• High cost\n• More complex to use\n• Still focused on symptom management\n• Risk of long-term dependence']
    ]
  }
]

function CompetitiveAnalysisTable({ slide }) {
  return <div className="calmo-market-table-wrap">
    <table className="calmo-market-table">
      <thead><tr>{slide.columns.map((column, index) => <th key={`${column}-${index}`}>{column}</th>)}</tr></thead>
      <tbody>{slide.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0
        ? <th scope="row" key={cell}>{cell}</th>
        : <td key={`${row[0]}-${index}`}>{cell}</td>
      )}</tr>)}</tbody>
    </table>
  </div>
}

const researchMethods = [
  {
    no: '01',
    title: 'Secondary research',
    copy: 'Stress physiology, behavioural signals, sensory intervention and feasible non-contact sensing.',
    visual: {
      name: 'technology-analysis-v2.svg',
      alt: 'Technology analysis for non-contact dog monitoring',
      captionTitle: 'Technical feasibility',
      captionText: 'Non-contact signals were prioritised over wearable or invasive monitoring'
    }
  },
  {
    no: '02',
    title: 'Competitive analysis',
    copy: 'Compared products across monitoring, calming support, adopter guidance and post-adoption continuity.',
    visual: {
      name: 'competitive-analysis-v2.png',
      alt: 'Competitive analysis of dog monitoring and calming products',
      captionTitle: 'Market scan',
      captionText: 'Existing products address isolated functions rather than the full transition',
      slides: competitiveAnalysisSlides
    }
  },
  {
    no: '03',
    title: 'Stakeholder mapping',
    copy: 'Connected dogs, adopters, police organisations, trainers, animal welfare groups and technology partners.',
    visual: {
      name: 'stakeholder-map-v2.png',
      alt: 'CALMO stakeholder power and interest map',
      captionTitle: 'Stakeholder map',
      captionText: 'Successful transition depends on continuity between professional and domestic care'
    }
  }
]

const systemModules = [
  {
    no: '01',
    title: 'SMART POD',
    heading: 'Observe without adding burden',
    copy: 'Non-contact radar, microphone/noise sensing and an optional privacy-conscious depth camera detect patterns without requiring the dog to wear a device.',
    visual: {
      name: 'smart-pod-flow.png',
      alt: 'CALMO smart pod monitoring and response flow',
      captionTitle: 'Smart pod flow',
      captionText: 'Signals are detected, interpreted and translated into a proportionate response.'
    }
  },
  {
    no: '02',
    title: 'COMPANION APP',
    heading: 'Translate patterns into context',
    copy: 'The app combines physiological and observable behavioural signals, explains what they may mean and suggests a proportionate next action.',
    visual: {
      diagramSlides: [
        { name: 'companion-app-flow.png', alt: 'CALMO companion app screens and interaction flow', captionTitle: 'Companion app flow', captionText: 'A connected home, capsule, insight and history experience keeps support legible.' },
        { name: 'information-architecture.png', alt: 'CALMO information architecture flow', captionTitle: 'Information Architecture', captionText: '', hideCaption: true }
      ]
    }
  },
  {
    no: '03',
    title: 'PROFESSIONAL SUPPORT',
    heading: 'Personalise readiness and escalation',
    copy: 'An initial trainer assessment determines suitability; professional guidance remains available when the system should not decide alone.',
    visual: null
  }
]

const finalModules = [
  {
    title: 'Dashboard',
    copy: 'A calm overview of the dog’s current state, transition progress and recent signals.',
    url: prototypeUrl
  },
  {
    title: 'Stress Alert',
    copy: 'Translates a detected change into a plain-language explanation and an appropriate next action.',
    url: prototypeUrl
  },
  {
    title: 'Calm Environment',
    copy: 'Lets adopters adjust white noise, scent and timing while retaining manual control.',
    url: `${prototypeUrl}/calm`
  },
  {
    title: 'Behaviour Understanding',
    copy: 'Combines observable behaviour with sensor patterns to explain what a signal may mean.',
    url: `${prototypeUrl}/understanding`
  },
  {
    title: 'History',
    copy: 'Shows change over time so progress is based on behaviour rather than a fixed countdown.',
    url: `${prototypeUrl}/history`
  },
  {
    title: 'Profile',
    copy: 'Stores context, preferences and professional guidance for a personalised transition plan.',
    url: `${prototypeUrl}/profile`
  }
]

function InteractivePrototype() {
  const [activeModule, setActiveModule] = useState(0)
  const [visibleModule, setVisibleModule] = useState(0)
  const [loadedModules, setLoadedModules] = useState(() => new Set())
  const [expandedModule, setExpandedModule] = useState(null)
  const selectedModule = finalModules[activeModule]

  const selectModule = (index) => {
    setActiveModule(index)
    if (loadedModules.has(index)) setVisibleModule(index)
    setExpandedModule((current) => current === index ? null : index)
  }

  const markModuleLoaded = (index) => {
    setLoadedModules((current) => {
      if (current.has(index)) return current
      const next = new Set(current)
      next.add(index)
      return next
    })
    if (index === activeModule) setVisibleModule(index)
  }

  return <div className="calmo-prototype-workbench">
    <div className="calmo-prototype-stage">
      <div className="calmo-prototype-stage-head">
        <div>
          <span>INTERACTIVE PROTOTYPE</span>
          <h3>Click It!</h3>
        </div>
        <a href={selectedModule.url} target="_blank" rel="noreferrer" aria-label={`Open ${selectedModule.title} in a new tab`}>
          Open full screen <ExternalLink size={15}/>
        </a>
      </div>
      <div className="calmo-prototype-device-scroll">
        <div className="calmo-prototype-device-scale">
          <div className="calmo-prototype-device">
            <div className="calmo-phone-speaker" aria-hidden="true"/>
            {finalModules.map((module, index) => <iframe
              className={visibleModule === index ? 'active' : ''}
              key={`${module.title}-${module.url}`}
              src={module.url}
              title={`CALMO prototype — ${module.title}`}
              allow="fullscreen"
              loading="eager"
              aria-hidden={visibleModule !== index}
              tabIndex={visibleModule === index ? 0 : -1}
              onLoad={() => markModuleLoaded(index)}
            />)}
          </div>
        </div>
      </div>
    </div>

    <div className="calmo-prototype-navigation">
      <header>
        <span>PRODUCT MODULES</span>
        <h3>Move through the experience</h3>
        <p>Select a module to open its corresponding prototype screen.</p>
      </header>
      <div className="calmo-prototype-accordion">
        {finalModules.map((module, index) => {
          const active = activeModule === index
          const expanded = expandedModule === index
          const panelId = `calmo-prototype-panel-${index}`
          return <article className={`${active ? 'active' : ''}${expanded ? ' expanded' : ''}`} key={module.title}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => selectModule(index)}
            >
              <span className="calmo-prototype-marker" aria-hidden="true"/>
              <strong>{module.title}</strong>
              <ChevronRight size={19} aria-hidden="true"/>
            </button>
            <div className="calmo-prototype-panel" id={panelId} aria-hidden={!expanded}>
              <p>{module.copy}</p>
            </div>
          </article>
        })}
      </div>
    </div>
  </div>
}

const transitionProfiles = {
  adopter: {
    label: 'Adopter journey',
    behaviourLabel: 'Adopter behaviour',
    metric: 'Understanding & caregiving confidence',
    trajectory: 'Expectation → setback → rapid learning → stability',
    scores: [7, 4, 6, 8],
    states: ['Expectation', 'Setback', 'Rapid learning', 'Stability'],
    name: 'Alexandra',
    role: 'Potential adopter · 35 · Self-employed · London',
    quote: '“You protected the world, and I will protect you.”',
    scenario: 'Alexandra lives alone with an irregular schedule. She wants to adopt responsibly, but is unsure how a retired working dog will behave in a quiet home.',
    goals: ['Understand specialist behaviour', 'Build a workable daily routine', 'Know when professional help is needed'],
    image: '/calmo/persona-adopter.png',
    path: 'M85 180 C175 125 260 252 355 215 S525 140 635 116 S815 156 915 88',
    points: [[8.5, 180], [35.5, 215], [63.5, 116], [91.5, 88]],
    stages: [
      { no: '01', phase: 'Waiting period for adoption', phaseNote: '', title: 'Preparing to adopt', action: 'Researches, applies and meets potential dogs.', emotion: 'Eager, but uncertain', opportunity: 'Clear dog profile and readiness checklist.' },
      { no: '02', phase: 'Survival and adaptation period', phaseNote: '(within one month)', title: 'Building a safe routine', action: 'Adjusts the home and observes stress signals.', emotion: 'Empathetic, but self-doubting', opportunity: 'Daily guidance and an accessible trainer channel.' },
      { no: '03', phase: 'Family adjustment and acclimation period', phaseNote: '(1–3 months)', title: 'Learning to interpret', action: 'Tests routines, reinforcement and calmer responses.', emotion: 'Confidence grows unevenly', opportunity: 'Explain signals and suggest proportionate actions.' },
      { no: '04', phase: 'Long-term adaptation', phaseNote: '(after 3 months)', title: 'Sustaining progress', action: 'Adapts routines as trust and independence develop.', emotion: 'More capable and reassured', opportunity: 'Long-term review, health prompts and peer support.' }
    ]
  },
  dog: {
    label: 'Dog journey',
    behaviourLabel: 'Dog behaviour',
    metric: 'Felt safety & self-regulation',
    trajectory: 'Low felt safety → stress trough → gradual recovery → residual sensitivity',
    scores: [5, 3, 5, 7],
    states: ['Low felt safety', 'Stress trough', 'Gradual recovery', 'Residual sensitivity'],
    name: 'Brendy',
    role: 'Retired police dog · 8 · German Shepherd · London',
    quote: '“Don’t misunderstand me, I just haven’t learned to be a pet.”',
    scenario: 'Brendy understands structured work, commands and vigilance. Retirement replaces familiar routines with a home environment whose signals are harder to predict.',
    goals: ['Find a trusted human guide', 'Feel safe without staying alert', 'Translate working habits into home life'],
    image: '/calmo/persona-dog.png',
    path: 'M85 190 C175 142 255 255 355 232 S520 182 635 146 S815 176 915 94',
    points: [[8.5, 190], [35.5, 232], [63.5, 146], [91.5, 94]],
    stages: [
      { no: '01', phase: 'Waiting period for adoption', phaseNote: '', title: 'Losing a familiar role', action: 'Relies on handlers, routines and learned vigilance.', emotion: 'Anxious and withdrawn', opportunity: 'A complete behavioural profile and transitional care.' },
      { no: '02', phase: 'Survival and adaptation period', phaseNote: '(within one month)', title: 'Testing the new home', action: 'Startles easily, seeks commands and assesses safety.', emotion: 'Alert and afraid of mistakes', opportunity: 'Predictable routines and non-contact monitoring.' },
      { no: '03', phase: 'Family adjustment and acclimation period', phaseNote: '(1–3 months)', title: 'Negotiating family life', action: 'Experiments with trust, rest and unfamiliar freedom.', emotion: 'Safer when understood', opportunity: 'Translate behaviour before it is misread as disobedience.' },
      { no: '04', phase: 'Long-term adaptation', phaseNote: '(after 3 months)', title: 'Forming a new identity', action: 'Self-settles more often while retaining sensitivities.', emotion: 'Reassured, but still trigger-sensitive', opportunity: 'Track an individual baseline and support gradual change.' }
    ]
  }
}

const transitionOpportunities = [
  {
    no: '01',
    phase: 'BEFORE ADOPTION',
    title: 'Prepare before adoption',
    copy: 'Create a shared profile connecting the dog’s needs with adopter readiness.'
  },
  {
    no: '02',
    phase: 'EARLY ADAPTATION',
    title: 'Structure early adaptation',
    copy: 'Provide personalised routines, progress milestones and professional support.'
  },
  {
    no: '03',
    phase: 'FAMILY ADJUSTMENT',
    title: 'Translate signals into action',
    copy: 'Explain behavioural signals and recommend clear, proportionate responses.'
  },
  {
    no: '04',
    phase: 'LONG-TERM CARE',
    title: 'Support long-term progress',
    copy: 'Track individual change and provide ongoing health and care guidance.'
  }
]

function PersonaJourney({ activeProfile, onChange }) {
  const [activeNode, setActiveNode] = useState(null)
  const journeyProfiles = Object.entries(transitionProfiles)
  const journeyStages = transitionProfiles.adopter.stages
  const xPositions = [100, 370, 630, 900]
  const scoreToY = (score) => 200 - (score * 20)
  const curvePath = (scores) => {
    const points = scores.map((score, index) => ({ x: xPositions[index], y: scoreToY(score) }))
    return points.slice(1).reduce((path, point, index) => {
      const previous = points[index]
      const midpoint = (previous.x + point.x) / 2
      return `${path} C ${midpoint} ${previous.y}, ${midpoint} ${point.y}, ${point.x} ${point.y}`
    }, `M ${points[0].x} ${points[0].y}`)
  }
  const selectedNode = activeNode
    ? transitionProfiles[activeNode.profile].stages[activeNode.index]
    : transitionProfiles[activeProfile].stages[0]
  const selectedProfile = activeNode ? transitionProfiles[activeNode.profile] : transitionProfiles[activeProfile]

  const selectProfile = (id) => {
    onChange(id)
    setActiveNode(null)
  }
  const personaMetaIcons = [UserRound, Calendar, BriefcaseBusiness, MapPin]

  return <div className="calmo-persona-journey">
    <div className="calmo-persona-switch" role="tablist" aria-label="Transition perspective">
      {Object.entries(transitionProfiles).map(([id, item]) => <button
        type="button"
        role="tab"
        aria-selected={activeProfile === id}
        className={activeProfile === id ? 'is-active' : ''}
        key={id}
        onClick={() => selectProfile(id)}
      >
        <small className="calmo-persona-kind">{id === 'adopter' ? 'ADOPTER PERSONA' : 'DOG PERSONA'}</small>
        <span className="calmo-persona-side">
          <span className="calmo-persona-avatar"><img src={item.image} alt=""/></span>
          <span className="calmo-persona-meta">
            {item.role.split(' · ').map((detail, index) => {
              const MetaIcon = personaMetaIcons[index] || UserRound
              return <em key={detail}><MetaIcon size={13} strokeWidth={1.7} aria-hidden="true"/>{detail}</em>
            })}
          </span>
        </span>
        <span className="calmo-persona-card-copy">
          <strong>{item.name}</strong>
          <p>{item.scenario}</p>
          <span className="calmo-persona-goal-list">
            {item.goals.map((goal) => <em key={goal}>{goal}</em>)}
          </span>
        </span>
      </button>)}
    </div>

    <section
      className="calmo-journey-panel"
      role="tabpanel"
      aria-live="polite"
      aria-label="Adopter and dog transition journey comparison"
    >
      <header className="calmo-journey-panel-head">
        <div><span>DUAL-PERSPECTIVE JOURNEY</span><h3>One transition, two recovery rhythms</h3></div>
        <p>Both perspectives share the same timeline, but measure different experiences.</p>
      </header>

      <div className="calmo-journey-phase-row" aria-hidden="true">
        {journeyStages.map((stage) => <div key={stage.no}>
          <span>{stage.no}</span>
          <strong>{stage.phase}</strong>
          {stage.phaseNote && <small>{stage.phaseNote}</small>}
        </div>)}
      </div>

      <div className="calmo-journey-plot">
        <svg viewBox="0 0 1000 210" preserveAspectRatio="none" aria-hidden="true">
          <path
            className={`calmo-journey-curve is-adopter ${activeProfile === 'adopter' ? 'is-active' : 'is-muted'}`}
            d={curvePath(transitionProfiles.adopter.scores)}
          />
          <path
            className={`calmo-journey-curve is-dog ${activeProfile === 'dog' ? 'is-active' : 'is-muted'}`}
            d={curvePath(transitionProfiles.dog.scores)}
          />
        </svg>

        {journeyProfiles.flatMap(([profileId, profile]) => profile.stages.map((stage, index) => {
          const x = xPositions[index] / 10
          const y = (scoreToY(profile.scores[index]) / 210) * 100
          const isOpen = activeNode?.profile === profileId && activeNode?.index === index
          return <div
            className={`calmo-journey-node-wrap is-${profileId} ${index === 0 ? 'is-first' : ''} ${index === profile.stages.length - 1 ? 'is-last' : ''} ${index > 1 ? 'is-late-stage' : ''} ${isOpen ? 'is-open' : ''} ${activeProfile === profileId ? 'is-active' : 'is-muted'}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            key={`${profileId}-${stage.no}`}
          >
            <span className="calmo-journey-state-label">{profile.states[index]}</span>
            <button
              type="button"
              className="calmo-journey-node"
              aria-label={`${profile.label}, ${stage.phase}: ${profile.states[index]}, score ${profile.scores[index]} out of 10`}
              aria-expanded={isOpen}
              onClick={() => {
                onChange(profileId)
                setActiveNode(isOpen ? null : { profile: profileId, index })
              }}
            ></button>
            <article className="calmo-behaviour-card">
              <span>{profile.behaviourLabel}</span>
              <strong>{stage.title}</strong>
              <p>{stage.action}</p>
            </article>
          </div>
        }))}
      </div>

      <article className="calmo-mobile-behaviour" aria-live="polite">
        <span>{selectedProfile.behaviourLabel}</span>
        <strong>{selectedNode.title}</strong>
        <p>{selectedNode.action}</p>
      </article>

      <div className="calmo-journey-legend" aria-label="Journey measures">
        {journeyProfiles.map(([id, profile]) => <button
          type="button"
          className={`is-${id} ${activeProfile === id ? 'is-active' : ''}`}
          onClick={() => selectProfile(id)}
          key={id}
        >
          <span aria-hidden="true"></span>
          <strong>{profile.metric}</strong>
          <small>{profile.trajectory}</small>
        </button>)}
      </div>
    </section>

    <section className="calmo-opportunity-section" aria-label="Design opportunities">
      <header className="calmo-opportunity-intro">
        <span>DESIGN OPPORTUNITY</span>
      </header>
      <div className="calmo-opportunities">
        {transitionOpportunities.map((opportunity) => <article key={opportunity.no}>
          <header><span>{opportunity.no}</span><small>{opportunity.phase}</small></header>
          <h4>{opportunity.title}</h4>
          <p>{opportunity.copy}</p>
        </article>)}
      </div>
    </section>
  </div>
}

export default function CalmoPage({ onHome, onContact, onNext }) {
  const [lightbox, setLightbox] = useState(null)
  const [lightboxSlide, setLightboxSlide] = useState(0)
  const [transitionPersona, setTransitionPersona] = useState('adopter')

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  useEffect(() => {
    setLightboxSlide(0)
  }, [lightbox])

  const activeDiagram = lightbox?.diagramSlides?.[lightboxSlide]

  useEffect(() => {
    if (!lightbox) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightbox(null)
      const slides = lightbox.slides || lightbox.diagramSlides
      if (!slides) return
      if (event.key === 'ArrowLeft') setLightboxSlide((current) => (current - 1 + slides.length) % slides.length)
      if (event.key === 'ArrowRight') setLightboxSlide((current) => (current + 1) % slides.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox])

  return <div className="case-page case-redesign calmo-page">
    <CaseHeader onHome={onHome} onContact={onContact}/>

    <main>
      <EditorialCaseHero
        rootSelector=".calmo-page"
        eyebrow={<a href="https://ux-design-awards.com/winners/2026-2-calmo-a-transition-system-for-retired-police-dogs" target="_blank" rel="noreferrer">2026 · UX DESIGN AWARD NOMINEE (ONGOING)</a>}
        title="CALMO"
        subtitle="A Transition Support System for Retired Police Dogs"
        summary={[
          'Retired police dogs move from a highly structured working life into a domestic environment, yet the emotional transition is often treated as an adoption event rather than a gradual process.',
          'CALMO combines a non-contact smart pod, a companion app and professional guidance to help adopters understand behavioural signals, respond with confidence and support each dog at its own pace.',
          'The concept evolved through research, usability testing and a professional trainer interview — from a universal calming product into a personalised transition system.'
        ]}
        chapters={['Overview', 'Discovering the gap', 'Defining the transition', 'Designing the system', 'Testing & iteration', 'Final design & prototype', 'Responsibility & reflection']}
        imageSrc="/projects/calmo.png"
        imageAlt="CALMO smart pod supporting a retired police dog at home"
        result="A transition service that supports both the dog and the adopter."
        accent="#d88143"
        accentSoft="#e9b48c"
      />

      <section className="calmo-film calmo-hero-film" aria-label="CALMO project film">
        <div className="calmo-film-heading">See CALMO in context</div>
        <div className="calmo-video-frame"><iframe src={vimeoUrl} title="CALMO project film" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy"/></div>
      </section>

      <section className="case-section calmo-overview">
        <div className="case-section-label">01 / OVERVIEW</div>
        <div className="calmo-overview-grid">
          <div className="calmo-overview-brief">
            <span className="calmo-kicker">PROJECT BRIEF</span>
            <h2>Transition is a period, not a moment</h2>
            <div className="calmo-overview-copy">
              <p>Working dogs are trained to stay alert, follow routines and respond to cues. Retirement removes that structure almost overnight. Adopters then have to interpret stress, hesitation and unfamiliar behaviour without the professional support that surrounded the dog during service.</p>
              <p>CALMO makes this invisible transition easier to understand. It turns behavioural and non-contact sensor signals into cautious, explainable guidance while keeping the adopter — and, when needed, a trainer — in the decision loop.</p>
            </div>
          </div>
          <aside className="calmo-design-question">
            <span>DESIGN QUESTION</span>
            <span className="calmo-question-lead">How might we</span>
            <p className="calmo-question-copy">help retired police dogs gradually adapt to family life while helping adopters recognise and respond to their emotional needs?</p>
          </aside>
        </div>
      </section>

      <section className="case-section case-soft calmo-discovery">
        <div className="case-section-label">02 / DISCOVERING THE GAP</div>
        <h2>The dog carries working-life habits into a home that cannot read them</h2>
        <p className="case-lede">Research combined behavioural evidence, adopter perspectives, market comparison and system feasibility. The aim was not to diagnose a dog, but to identify where uncertainty becomes harmful for both dog and adopter.</p>
        <div className="calmo-methods">
          {researchMethods.map(({ no, title, copy, visual }) => visual
            ? <button className="calmo-method-card is-interactive" type="button" key={no} onClick={() => setLightbox(visual)} aria-label={`Open ${visual.captionTitle}: ${visual.captionText}`}>
                <h3>{title}</h3><p>{copy}</p><em>Open visual <Expand size={14}/></em>
              </button>
            : <article key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>
          )}
        </div>
        <div className="calmo-insights">
          <span className="calmo-insights-label">RESPONSIBILITY</span>
          <div className="calmo-gap-grid">
            <article><h3><span>For dog:</span> Relaxation is unfamiliar</h3><p>Behaviours that signal hesitation, vigilance or overload can be subtle and highly individual.</p></article>
            <article><h3><span>For adopter:</span> Signals are easy to misread</h3><p>New adopters may interpret stress as disobedience or expect progress to follow a fixed timetable.</p></article>
            <article><h3><span>For support system:</span> Guidance drops away</h3><p>Professional knowledge exists before adoption, but is difficult to access during everyday home situations.</p></article>
          </div>
        </div>
      </section>

      <section className="case-section calmo-definition">
        <div className="case-section-label">03 / DEFINING THE TRANSITION</div>
        <h2>Design for two users moving through the same uncertainty</h2>
        <p className="case-lede">The adopter and the dog experience the same transition differently. Mapping both journeys revealed that confidence grows when guidance explains behaviour, shows credible evidence of change and offers an action the adopter can understand.</p>
        <PersonaJourney activeProfile={transitionPersona} onChange={setTransitionPersona}/>
        <div className="calmo-insight">
          <span>CORE REFRAME</span>
          <div className="calmo-core-reframe-copy">
            <strong>A process of interpretation not control</strong>
            <p>Helping adopters understand the dog’s behaviour, grounding guidance in observable behavioural evidence, and defining distinct transition stages so the right support can be provided at the right time.</p>
          </div>
        </div>
      </section>

      <section className="case-section case-soft calmo-system">
        <div className="case-section-label">04 / DESIGNING THE SYSTEM</div>
        <h2>Three connected layers, each with a different responsibility</h2>
        <p className="case-lede">CALMO separates sensing, interpretation and intervention. This prevents a sensor reading from being presented as certainty and keeps professional judgement available for higher-risk situations.</p>
        <div className="calmo-layers">
          {systemModules.map(({ no, title, heading, copy, visual }) => visual
            ? <button
                className="calmo-method-card is-interactive"
                type="button"
                key={no}
                onClick={() => visual.diagramSlides
                  ? setLightbox({ diagramSlides: visual.diagramSlides })
                  : setLightbox(visual)}
                aria-label={`Open ${title.toLowerCase()} visual`}
              >
                <span>{no} / {title}</span><h3>{heading}</h3><p>{copy}</p><em>Open visual <Expand size={14}/></em>
              </button>
            : <button className="calmo-method-card is-interactive calmo-no-visual" type="button" key={no} aria-label={`${title} layer`}>
                <span>{no} / {title}</span><h3>{heading}</h3><p>{copy}</p>
              </button>
          )}
        </div>
      </section>

      <section className="case-section calmo-testing">
        <div className="case-section-label">05 / TESTING &amp; ITERATION</div>
        <h2>Testing changed the product logic, not only the interface</h2>
        <p className="case-lede">We tested the early app-and-pod concept with potential adopters and dog owners, then challenged its assumptions with professional dog-behaviour specialists. The goal was to understand not only whether people could use CALMO, but whether its underlying support model was responsible and believable.</p>

        <div className="calmo-test-story">
          <section className="calmo-test-stage">
            <header><h3>What I did</h3></header>
            <div className="calmo-test-methods">
              <article className="calmo-hover-card">
                <span>APP USABILITY TESTING</span>
                <h4>Test the system through realistic tasks</h4>
                <p>Using think-aloud sessions and follow-up semi-structured interviews, we examined whether participants could understand the app–pod relationship, interpret alerts and behaviour translations, follow adaptation progress, distinguish automatic from manual actions, and identify what to do next.</p>
              </article>
              <article className="calmo-hover-card">
                <span>BEHAVIOUR SPECIALIST INTERVIEWS</span>
                <h4>Challenge the assumptions behind the concept</h4>
                <p>Professional dog-behaviour specialists reviewed whether dogs would be ready to use the pod, how history and sensitivity affect adaptation, how behavioural and physiological signals should be interpreted, and when professional guidance should remain in the system.</p>
              </article>
            </div>
          </section>

          <section className="calmo-test-stage">
            <header><h3>What I found</h3></header>
            <div className="calmo-test-findings">
              <article>
                <div><h4>Visible controls did not make the system logic clear</h4><p>Participants could locate functions, but automatic mode, ending a session, explanatory copy and navigation still left them uncertain about what the system was doing and what would happen next.</p></div>
              </article>
              <article>
                <div><h4>A fixed timeline was not credible evidence of progress</h4><p>Progress felt more meaningful when it was connected to observable behaviour such as appetite, sleep stability and willingness to play, rather than time passing alone.</p></div>
              </article>
              <article>
                <div><h4>A universal pod was the wrong starting point</h4><p>Dogs differ in behavioural history, sensitivity, pace and readiness for semi-enclosed spaces. Signals also cannot be interpreted as simple or diagnostic facts.</p></div>
              </article>
            </div>
          </section>

          <section className="calmo-test-stage">
            <header><h3>What I changed</h3></header>
            <div className="calmo-test-changes">
              <article><p>Immediate, universal pod use</p><ArrowRight strokeWidth={2.8}/><strong>Trainer-led readiness assessment and an optional pod layer</strong></article>
              <article><p>A fixed transition timeline</p><ArrowRight strokeWidth={2.8}/><strong>Personalised stages measured through behavioural milestones</strong></article>
              <article><p>System-led interpretation and action</p><ArrowRight strokeWidth={2.8}/><strong>Clear alerts, cautious explanations and adopter-confirmed actions</strong></article>
            </div>
          </section>
        </div>

        <div className="calmo-insight">
          <span>FINAL DIRECTION</span>
          <div className="calmo-core-reframe-copy">
            <strong>From a universal calming product to a personalised transition system</strong>
            <p>CALMO became a readiness-led service that treats behavioural evidence as guidance, keeps the pod optional and preserves human judgement in the decision loop.</p>
          </div>
        </div>
      </section>

      <section className="case-section case-soft calmo-final">
        <div className="case-section-label">06 / FINAL DESIGN &amp; PROTOTYPE</div>
        <h2>A calmer environment, a clearer explanation and a visible path forward</h2>
        <p className="case-lede">The final concept combines environmental support with a companion app that makes progress legible. Dynamic milestones are based on behavioural recovery — including appetite, sleep stability and willingness to play — rather than time alone.</p>
        <div className="calmo-dog-pod">
          <div className="calmo-dog-pod-title">CALMO dog pot</div>
          <CalmoImage name="calmo-dog-pod.png" alt="CALMO dog pod concept, features and product views" caption="Soothing scent, white noise, timer and behaviour-led training mode" onExpand={setLightbox}>
            <button className="calmo-product-architecture-link" type="button" onClick={() => setLightbox({
              name: 'pod-exploded.png',
              alt: 'Exploded view of the CALMO smart pod',
              caption: 'Product architecture — modular, serviceable components and non-contact sensing',
              captionTitle: 'Product architecture',
              captionText: 'Modular, serviceable components and non-contact sensing'
            })}>View Product architecture</button>
          </CalmoImage>
        </div>
        <div className="calmo-supporting-application">Supporting Application</div>
        <CalmoFinalScreens onExpand={setLightbox}/>

        <InteractivePrototype/>

      </section>

      <section className="case-section calmo-reflection">
        <div className="case-section-label">07 / RESPONSIBILITY &amp; REFLECTION</div>
        <h2>Technology supports judgement; it does not replace care</h2>
        <div className="calmo-responsibility">
          <article className="calmo-hover-card"><span>ANIMAL-CENTRED</span><p>The pod is optional and readiness-led. A dog should never be forced into an enclosed environment because the product expects uniform behaviour.</p></article>
          <article className="calmo-hover-card"><span>NON-CONTACT BY DEFAULT</span><p>Sensing avoids wearables and invasive monitoring. Depth imagery is abstracted and covered physically when it is not needed.</p></article>
          <article className="calmo-hover-card"><span>EXPLAINABLE, NOT DIAGNOSTIC</span><p>The app uses cautious language, shows behavioural evidence and escalates uncertainty rather than presenting predictions as facts.</p></article>
          <article className="calmo-hover-card"><span>LONGER-LIFE PRODUCT</span><p>A modular pod supports maintenance and replacement without discarding the full product.</p></article>
        </div>
        <div className="calmo-insights calmo-reflection-insight">
          <span className="calmo-insights-label">REFLECTION</span>
          <div className="calmo-gap-grid">
            <article>
              <h3>WHAT THE PROJECT ESTABLISHES</h3>
              <p>A coherent transition service, a connected product-and-app concept, a credible interaction model, and clear design changes grounded in user and expert feedback.</p>
            </article>
            <article>
              <h3>WHAT REMAINS UNPROVEN</h3>
              <p>Sensor accuracy in diverse homes, long-term dog acceptance, false alert rates, professional service capacity and whether dynamic milestones improve transition outcomes.</p>
            </article>
            <article>
              <h3>NEXT VALIDATION</h3>
              <p>Begin with trainer-supervised home trials, compare app interpretations with professional observations, measure adoption over time, and test whether guidance improves adopter confidence without increasing dependence.</p>
            </article>
          </div>
        </div>
      </section>
    </main>

    {lightbox && <div className={`calmo-lightbox${lightbox.slides || lightbox.diagramSlides ? ' has-slides' : ''}`} role="dialog" aria-modal="true" aria-label="Expanded CALMO diagram" onClick={() => setLightbox(null)}>
      <button className="calmo-lightbox-close" type="button" onClick={() => setLightbox(null)}><X size={18}/> Close</button>
      <div className="calmo-lightbox-content" onClick={(event) => event.stopPropagation()}>
        {lightbox.diagramSlides
          ? <div className="calmo-diagram-carousel">
              <div className="calmo-diagram-carousel-head">
                <div><span>DESIGNING THE SYSTEM</span><h3>{activeDiagram.captionTitle}</h3></div>
                <span>{String(lightboxSlide + 1).padStart(2, '0')} / {String(lightbox.diagramSlides.length).padStart(2, '0')}</span>
              </div>
              <img className={activeDiagram.cropTop ? 'calmo-diagram-image crop-top' : 'calmo-diagram-image'} src={`/calmo/${activeDiagram.name}`} alt={activeDiagram.alt}/>
              <div className="calmo-market-carousel-controls">
                <button type="button" onClick={() => setLightboxSlide((current) => (current - 1 + lightbox.diagramSlides.length) % lightbox.diagramSlides.length)} aria-label="Previous system diagram"><ChevronLeft size={20}/><span>Previous</span></button>
                <div>{lightbox.diagramSlides.map((slide, index) => <button className={index === lightboxSlide ? 'active' : ''} type="button" key={slide.name} onClick={() => setLightboxSlide(index)} aria-label={`Open ${slide.captionTitle}`}/>)}</div>
                <button type="button" onClick={() => setLightboxSlide((current) => (current + 1) % lightbox.diagramSlides.length)} aria-label="Next system diagram"><span>Next</span><ChevronRight size={20}/></button>
              </div>
            </div>
          : lightbox.slides
          ? <div className="calmo-market-carousel">
              <div className="calmo-market-carousel-head">
                <div><span>MARKET SCAN</span><h3>{lightbox.slides[lightboxSlide].title}</h3></div>
                <span>{String(lightboxSlide + 1).padStart(2, '0')} / {String(lightbox.slides.length).padStart(2, '0')}</span>
              </div>
              <CompetitiveAnalysisTable slide={lightbox.slides[lightboxSlide]}/>
              <div className="calmo-market-carousel-controls">
                <button type="button" onClick={() => setLightboxSlide((current) => (current - 1 + lightbox.slides.length) % lightbox.slides.length)} aria-label="Previous comparison table"><ChevronLeft size={20}/><span>Previous</span></button>
                <div>{lightbox.slides.map((slide, index) => <button className={index === lightboxSlide ? 'active' : ''} type="button" key={slide.title} onClick={() => setLightboxSlide(index)} aria-label={`Open ${slide.title}`}/>)}</div>
                <button type="button" onClick={() => setLightboxSlide((current) => (current + 1) % lightbox.slides.length)} aria-label="Next comparison table"><span>Next</span><ChevronRight size={20}/></button>
              </div>
            </div>
          : <img src={`/calmo/${lightbox.name}`} alt={lightbox.alt}/>
        }
        {(lightbox.captionTitle || activeDiagram) && !activeDiagram?.hideCaption && <p className="calmo-lightbox-caption"><strong>{activeDiagram?.captionTitle || lightbox.captionTitle}</strong>{(activeDiagram?.captionText || lightbox.captionText) && <span>{activeDiagram?.captionText || lightbox.captionText}</span>}</p>}
        {!lightbox.captionTitle && lightbox.caption && <p>{lightbox.caption}</p>}
      </div>
    </div>}
    <CaseFooter onHome={onHome} onNext={onNext}/>
  </div>
}
