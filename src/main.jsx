import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'
import './styles.css'
import { initAnalytics, trackEvent, trackPageView } from './analytics.js'
import './case-redesign.css'
import './read-along.css'
import CalmoPage from './calmo.jsx'
import ProcureSmartPage from './procuresmart.jsx'
import { CaseFooter, CaseHeader, EditorialCaseHero } from './case-chrome.jsx'
import './mobile.css'
import './case-viewport.css'
import './llm-case.css'
import './project-unified.css'

const projects = [
  { route: 'case-study', no: '01', title: 'LLM Prompt Design', subtitle: 'Does Giving an AI a Role Change Its Output?', type: 'Research / AI', year: '2026', image: '/projects/ai-role.png', tags: ['A/B Testing', 'Experimental Design', 'Quantitative Analysis', 'AI/LLM Prompt Research'], detail: <>Ran a controlled A/B experiment to test whether prompting an AI with a defined Information Architecture (IA) Expert role improves its response quality.<br/><br/>Collected outputs under both conditions, evaluated outputs across three dimensions, ran Mann-Whitney U tests to analyse results statistically.<br/><br/>Found expert-persona prompts had significantly better-structured outputs, but varied widely among users. Suggest LLMs offer more personalised options, like an appropriate role based on input and task type, to reduce interaction cost and improve efficiency.</> },
  { route: 'calmo', no: '02', title: 'CALMO', subtitle: 'A Transition Support System for Retired Police Dogs', subtitleLines: ['A Transition Support System for', 'Retired Police Dogs'], type: 'Product / UI', year: '2026', image: '/projects/calmo.png', award: 'UX Design Award · Nominated', tags: ['Double Diamond', 'Persona & Journey Mapping', 'Competitive Analysis', 'UI Design'], detail: <>Retired working dogs often struggle emotionally when transitioning into home life, and new adopters failed to read or respond to their stress signals.<br/><br/>Followed a double-diamond design process, through research, problem framing, and prototype iteration, to ultimately design CALMO.<br/><br/>Through a smart pod and companion app, CALMO monitors dogs’ condition in real-time. It helps dogs reduce stress non-invasively by offering dynamic transition progress; builds adopter confidence by explaining dog behaviour; and bridges the gap between working and domestic life for retired police dogs.</> },
  { route: 'read-along', no: '03', title: 'Google Read Along', subtitle: 'Interaction Analysis and UX Redesign', subtitleLines: ['Interaction Analysis and UX', 'Redesign'], type: 'UX Redesign', year: '2026', image: '/projects/readalong.png', tags: ['Interaction Analysis', 'Cognitive Psychology', 'System Mapping', 'UX Optimise'], detail: <>Google Read Along is a reading app that uses speech recognition to help children practise independently.<br/><br/>Its current interaction logic creates friction across five categories: silence, misrecognised words, skipped reading, forced page transitions, and ambiguous manual controls.<br/><br/>Combined Self-Determination Theory (user autonomy) and Grounding Theory (shared understanding between user and system), redesigning each interaction so children could self-correct and stay in control, enhancing their confidence and engagement.</> },
  { route: 'procuresmart', no: '06', title: 'ProcureSmart Health', subtitle: 'AI-assisted clinical procurement decision support', type: 'Healthcare UX / AI', year: '2026', hiddenHome: true, image: '/projects/procuresmart.jpg', tags: ['Healthcare UX', 'AI Decision Support', 'Information Architecture'], detail: <>ProcureSmart Health helps clinicians turn an ambiguous procurement need into explicit criteria, a focused candidate set and a traceable evidence trail.<br/><br/>The workflow uses AI to structure and narrow the search, while clinicians remain responsible for comparing options, checking evidence and making the final decision.</> }
]

const siteNav = [['Projects', 'projects'], ['About', 'about'], ['Contact', 'contact']]
const visibleProjectRoutes = projects.filter(project => !project.hiddenHome).map(project => project.route)
const getNextVisibleProject = currentRoute => {
  const currentIndex = visibleProjectRoutes.indexOf(currentRoute)
  return visibleProjectRoutes[(currentIndex + 1) % visibleProjectRoutes.length]
}
const analyticsPages = {
  home: { title: 'Kexin Li — Portfolio', path: '/' },
  about: { title: 'About — Kexin Li', path: '/about' },
  'case-study': { title: 'LLM Prompt Design — Kexin Li', path: '/projects/llm-prompt-design' },
  calmo: { title: 'CALMO — Kexin Li', path: '/projects/calmo' },
  'read-along': { title: 'Google Read Along — Kexin Li', path: '/projects/google-read-along' },
  procuresmart: { title: 'ProcureSmart Health — Kexin Li', path: '/projects/procuresmart-health' },
}
const skillSets = {
  research: {
    label: 'RESEARCH',
    line: 'From Evidence To insight',
    intro: 'I combine qualitative depth, controlled experiments and multimodal evidence to understand what people do, feel and need.',
    groups: [
      ['Research strategy', ['Semi-structured Interviews', 'Survey Design', 'Employee Research', 'Qualitative Coding']],
      ['Experiments & evidence', ['A/B Testing', 'Experimental Design', 'Order-effect Control', 'Data Triangulation', 'Research Synthesis']],
      ['Human factors', ['EEG / ECG / EMG', 'Eye Tracking', 'Heatmaps & Scan Paths', 'Cognitive Load Analysis']]
    ]
  },
  design: {
    label: 'DESIGN',
    line: 'From Insight To experience',
    intro: 'I turn evidence into coherent services, useful product decisions and clear, high-fidelity interaction experiences.',
    groups: [
      ['Service & systems', ['Service Blueprinting', 'Stakeholder Mapping', 'Ecosystem Journeys', 'Physical–Digital / IoT']],
      ['Product & UX', ['Usability Diagnosis', 'Competitive Analysis', 'PRD & Functional Requirements', 'Constraint-led Decisions']],
      ['Interface & narrative', ['Figma Prototyping', 'Design Systems', 'AI-assisted Design Workflows', 'Bilingual Content & Localisation', 'Case Study Storytelling']]
    ]
  },
  build: {
    label: 'BUILD',
    line: 'From Idea To testable experience',
    intro: 'I use AI-assisted and low-code workflows to turn validated ideas into functional prototypes, making concepts tangible early and easier to test.',
    groups: [
      ['Prototype & build', ['AI-assisted Prototyping', 'Vibe Coding', 'Low-code Development', 'Functional Prototypes']],
      ['Delivery workflow', ['Rapid Iteration', 'Design-to-build Collaboration']]
    ]
  }
}

function SiteHeader({ onHome, onNavigate, active = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = (id) => { setMenuOpen(false); onNavigate(id) }

  return <header className="topbar">
    <button className="brand" onClick={onHome} aria-label="Back to top">KEXIN LI<span>.</span></button>
    <nav className="desktop-nav">{siteNav.map(([label, id]) => <button className={active === id ? 'active-nav' : ''} key={id} onClick={() => navigate(id)}>{label}</button>)}</nav>
    <button className="menu" onClick={() => setMenuOpen(current => !current)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    {menuOpen && <div className="mobile-nav">{siteNav.map(([label, id]) => <button className={active === id ? 'active-nav' : ''} key={id} onClick={() => navigate(id)}>{label}<ArrowUpRight size={18}/></button>)}</div>}
  </header>
}

const education = [
  ['2025–Present', 'MSc, UX Engineering', 'Goldsmiths, University of London', 'Computing the UX / Research Method / Interaction Science / Human Factor / Service Design / Low Code', 'average score: 76.5', 'distinction'],
  ['2019–2022', 'MEng, Furniture Design Engineering', 'Nanjing Forestry University, China', 'First Class Scholarship (2020); Academic Scholarship (2019, 2021); Merit Student (2020); Admitted Postgraduate via recommendation ranking: 3/95 (2019)', 'average score: 87', ''],
  ['2015–2019', 'BEng, Furniture Design', 'Nanjing Forestry University, China', "Excellent Graduate (2019); Merit Student Scholarship (2017, 2018); School's Excellent Student Leader (2016)", 'average score: 90', '']
]

const experiences = [
  ['Jul 2022 – May 2025', 'Senior Employee Experience Designer', 'China Unicom (Fortune 500) | China', ['Redesigned the candidate assessment experience by introducing role-specific competency frameworks and a structured evaluation stage, increasing the team-lead interview pass rate from 40% to 65% and improving new-hire first-year retention from 70% to 85%.', 'Diagnosed organisational skill gaps through workforce analysis and built targeted training programmes that lifted employees’ first-year A/B performance ratings by 35%.'], 'Employee Experience · Competency Framework Design · Structured Evaluation · Workforce Research'],
  ['Mar 2021 – Aug 2021', 'Product Design Intern', 'Red Star Macalline Group Corporation Ltd. | China', 'Designed home products for an Alibaba × NetEase Onmyoji IP collaboration, adapting game visual identity into physical product design.', 'Product Design · Visual Identity Translation · IP Collaboration · Design for Retail'],
  ['Oct 2020 – Mar 2021', 'Research Intern', 'Haitai Olin Group | China', 'Researched the daily living needs and physical constraints of elderly users in retirement communities, producing a needs-led research report focused on vulnerable user groups.', 'User Needs Research · Field Research · Vulnerable User Groups · Accessibility Research'],
  ['Jun 2020 – Aug 2020', 'Consultant Assistant', 'Nanjing Cognitive IoT Research Institute | China', 'Researched how industrial design companies could support IoT industry development, producing planning reports and solution research across technical, policy, and user-facing dimensions.', 'Industry Research · IoT Strategy · Policy Research · Consulting'],
  ['Oct 2018 – Oct 2020', 'Editor', 'Furniture Magazine (Core Academic Journal) | China', 'Managed the full editorial workflow for an academic journal, including article review, graphic design, and visual layout.', 'Editorial design · Visual layout · Content review · Publication design']
]

function CaseChart({ title, ai = false }) { return <div className="case-chart"><h3>{title}</h3><p>Condition A vs. Condition B</p><svg viewBox="0 0 520 220" role="img" aria-label={title}><line x1="55" y1="180" x2="500" y2="180" stroke="currentColor" opacity=".25"/><line x1="55" y1="35" x2="55" y2="180" stroke="currentColor" opacity=".25"/>{['Visual Hierarchy','Structural Coherence','Actionability'].map((label, i) => { const x = 130 + i * 130; const a = ai ? [132,145,118][i] : [126,120,105][i]; const b = ai ? [118,126,108][i] : [106,112,82][i]; return <g key={label}><text x={x} y="205" textAnchor="middle" fontSize="10" fill="currentColor">{label}</text><line x1={x-18} y1={a-28} x2={x-18} y2={a+25} stroke="#9d8db8" strokeWidth="2"/><rect x={x-29} y={a-12} width="22" height="30" rx="5" fill="#e3dced" stroke="#9d8db8"/><line x1={x-29} y1={a+3} x2={x-7} y2={a+3} stroke="#1f201c" strokeWidth="2"/><line x1={x+18} y1={b-28} x2={x+18} y2={b+25} stroke="#5e4b86" strokeWidth="2"/><rect x={x+7} y={b-14} width="22" height="32" rx="5" fill="#bbaed0" stroke="#5e4b86"/><line x1={x+7} y1={b+2} x2={x+29} y2={b+2} stroke="#1f201c" strokeWidth="2"/></g> })}</svg><div className="chart-legend"><span><i className="legend-a"/>Condition A</span><span><i className="legend-b"/>Condition B</span></div></div> }

function CasePlaceholder({ label, className = '' }) { return <div className={`case-placeholder ${className}`}><span>{label}</span><small>Upload visual here</small></div> }
const caseCaptions = { '2.png': <>Fogg Behaviour Model<br/><em className="llm-formula">B=MAT (Behaviour=Motivation × Ability × Trigger)</em></>, '3.png': <>DeLone &amp; McLean's Information Systems Success Model<br/><em className="llm-formula">Quality → Use → Value</em></>, '4.png': <>Human Scoring Comparison<br/><em>Condition A vs. Condition B</em></>, '5.png': <>AI Scoring Comparison<br/><em>Condition A vs. Condition B</em></>, '6.png': <>Human Expert Scoring Results</>, '7.png': <>AI Scoring Results</> }
function CaseImage({ src, alt, className = '', caption = null, loading = 'lazy', zoomable = true }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const label = caseCaptions[src] || caption
  useEffect(() => {
    if (!isZoomed) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setIsZoomed(false)
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isZoomed])
  const image = <img src={`/case-study/${src}`} alt={alt} loading={loading} decoding="async" />
  return <>
    <figure className={`case-image ${className}${zoomable ? ' case-image-zoomable' : ''}`}>
      {label && <figcaption>{label}</figcaption>}
      {zoomable ? <button type="button" className="case-image-trigger" onClick={() => setIsZoomed(true)} aria-label={`Enlarge ${alt}`}>{image}</button> : image}
    </figure>
    {zoomable && isZoomed && <div className="case-image-lightbox" role="dialog" aria-modal="true" aria-label={`${alt} enlarged`} onClick={() => setIsZoomed(false)}>
      <div className="case-image-lightbox-dialog" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="case-image-lightbox-close" onClick={() => setIsZoomed(false)} aria-label="Close enlarged image">×</button>
        <div className="case-image-lightbox-title">{label || alt}</div>
        <img src={`/case-study/${src}`} alt={alt} loading="eager" decoding="async" />
      </div>
    </div>}
  </>
}

function ModelDiagram({ kind }) { const fogg = kind === 'fogg'; return <div className="model-diagram"><div className="diagram-head"><span>{fogg ? "Fogg Behaviour Model" : "DeLone & McLean's Information Systems Success Model"}</span><strong className="llm-formula llm-formula-compact">{fogg ? 'B=MAT' : 'Quality→Use→Value'}</strong></div><div className="diagram-layers"><div className="diagram-outcome">OUTCOME LAYER<br/><b>{fogg ? 'Target Behaviour / Conversion' : 'High-Quality Decision Support'}</b></div><div className="diagram-peak">PEAK · ACTION LAYER<br/><b>{fogg ? 'Trigger — Actionability' : 'Net Benefits — Actionability'}</b></div><div className="diagram-base">FOUNDATION · BASE LAYER<br/><b>{fogg ? 'Ability — VH + SC' : 'Information Quality — VH + SC'}</b></div></div></div> }

function CaseStudyPage({ onHome, onContact, onNext }) {
  const chapters = [
    ['01', 'Context', 'llm-context'],
    ['02', 'Experiment', 'llm-experiment'],
    ['03', 'Process', 'llm-process'],
    ['04', 'Framework', 'llm-framework'],
    ['05', 'Results', 'llm-evidence'],
    ['06', 'Implications', 'llm-implications']
  ]
  const jumpTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

   return <div className="case-page case-redesign llm-case-page llm-editorial-page">
    <CaseHeader onHome={onHome} onContact={onContact}/>
    <main className="llm-editorial-main">
      <section className="case-hero llm-editorial-hero">
        <div className="llm-hero-panel">
          <p className="llm-hero-eyebrow">RESEARCH / AI · 2026</p>
          <h1>LLM Prompt Design</h1>
          <p className="case-project-subtitle">Does Giving an AI a Role Change Its Output?</p>
          <div className="llm-hero-summary">
            <p>A controlled A/B experiment to test whether prompting an AI with a defined Information Architecture (IA) Expert role improves its response quality.</p>
            <p>Found expert-persona prompts had significantly better-structured outputs, but varied widely among users.</p>
            <p>Suggest LLMs offer more personalised options, an appropriate role based on input and task type, to reduce interaction cost and improve efficiency.</p>
          </div>
          <nav className="llm-chapter-index" aria-label="Project chapters">
            {chapters.map(([no, label, id]) => <button type="button" key={id} onClick={() => jumpTo(id)}><span>{no}</span>{label}</button>)}
          </nav>
        </div>
        <div className="llm-hero-visual">
          <CaseImage src="1.png" alt="General Prompt versus IA Expert Role" loading="eager"/>
          <p className="llm-hero-result"><span>Key result</span>A small prompt change — a persona prefix — made AI output noticeably clearer to act on.</p>
        </div>
      </section>

      <section id="llm-context" className="case-section llm-editorial-section problem-section">
        <div className="llm-section-marker"><span>01 /</span><small>Context</small></div>
        <div className="llm-section-content">
          <div className="llm-context-grid">
            <div className="llm-context-brief">
              <span className="llm-context-kicker">Project brief</span>
              <h2>The Problem: Cognitive Friction in LLM Outputs</h2>
              <div className="llm-context-copy">
                <p>Large Language Models (LLMs) are increasingly used to synthesise unstructured data, such as audio transcripts and meeting notes. Yet their <strong>default outputs are often dense and poorly structured, creating cognitive friction and limiting practical usability.</strong></p>
                <p>This study examines whether a targeted prompt intervention can make LLM-generated outputs easier to understand and use.</p>
              </div>
            </div>
            <aside className="llm-research-question">
              <span className="llm-context-kicker">Research question</span>
              <h3>Can a role change the output?</h3>
              <p>When processing unstructured audio transcripts, does an <strong>expert persona prompt</strong> significantly improve the generated output's <strong>Visual Hierarchy, Structural Coherence, and Actionability</strong> compared to a default prompt?</p>
            </aside>
          </div>
        </div>
      </section>

      <section id="llm-experiment" className="case-section llm-editorial-section">
        <div className="llm-section-marker"><span>02 /</span><small>Experiment</small></div>
        <div className="llm-section-content">
          <h2>A single-variable A/B comparison</h2>
          <p className="llm-editorial-lede">20 real academic transcript excerpts (tutorials, lectures, group discussions) were each run under both conditions on the same model and platform, producing 20 per condition.</p>
          <div className="condition-grid llm-condition-grid">
            <article>
              <span>Condition A — Control</span>
              <p>“Organise this transcript into a clear, readable structure.”</p>
              <small>Plain prompt, no persona</small>
            </article>
            <article className="condition-b">
              <span>Condition B — Experimental</span>
              <p>“You are <strong>an expert in information architecture and cognitive load optimisation</strong>. Please organise the following transcript into a clear and readable structured output”</p>
              <small>Same prompt with expert persona prefix</small>
            </article>
          </div>
          <p className="llm-control-note"><span>Controlled comparison</span>Same model, same transcripts, same task — only the persona prefix changed.</p>
        </div>
      </section>

      <section id="llm-process" className="case-section llm-editorial-section">
        <div className="llm-section-marker"><span>03 /</span><small>Process</small></div>
        <div className="llm-section-content">
          <h2>Four-stage blind evaluation</h2>
          <p className="llm-editorial-lede">Every output was anonymised, randomised and independently rated before the conditions were compared.</p>
          <div className="process-grid llm-process-line">
            {[["01","Collection","Collect","All raw outputs under both conditions","Gemini 3 in Thinking mode"],["02","Anonymisation","Anonymise","Remove wording that revealed which condition produced each output",""],["03","Randomisation","Randomise","Blind-code the anonymised set before scoring",""],["04","Evaluation","Rate","Five participants and three AI models scored every output across three dimensions","Dual validation between human and machine judgement"]].map(([no,label,title,body,note]) => <article key={no}><span>{no} / {label}</span><h3>{title}</h3><p>{body}</p>{note && <small>{note}</small>}</article>)}
          </div>
        </div>
      </section>

      <section id="llm-framework" className="case-section llm-editorial-section">
        <div className="llm-section-marker"><span>04 /</span><small>Framework</small></div>
        <div className="llm-section-content">
          <h2>Three dimensions, one causal chain</h2>
          <div className="llm-framework-intro llm-dimension-intro">
            <span>Three Evaluation dimensions</span>
            <p>Evaluated LLM output quality across three dimensions, each grounded in existing theory.</p>
          </div>
          <div className="dimension-grid llm-dimension-list">
            <article><h3>Visual Hierarchy</h3><p>For Perception: Clear formatting that supports scanning and reduces extraneous cognitive load</p><small>* Sweller, 1988; Mayer, 2009</small></article>
            <article><h3>Structural Coherence</h3><p>For Comprehension: Logical chunking that helps readers extract key ideas efficiently</p><small>* Miller, 1956</small></article>
            <article><h3>Actionability</h3><p>For Action: The extent to which content points users toward concrete next steps</p><small>* Pirolli and Card, 2005</small></article>
          </div>
          <div className="llm-models">
            <div className="llm-framework-intro llm-model-intro llm-supporting-models-intro">
              <span>Supporting models</span>
              <p>Two established models supported this framing from different angles.</p>
            </div>
            <article className="llm-model-row">
              <div><h3>Fogg Behaviour Model</h3><p>Clear structure improves ability by reducing cognitive load; actionability operates as the trigger that helps users move forward.</p></div>
              <CaseImage src="2.png" alt="Fogg Behaviour Model" zoomable/>
            </article>
            <article className="llm-model-row">
              <div><h3>DeLone &amp; McLean Model</h3><p>Hierarchy and coherence support information quality, while actionability determines whether that information produces practical value.</p></div>
              <CaseImage src="3.png" alt="DeLone and McLean model" zoomable/>
            </article>
          </div>
          <p className="llm-framework-takeaway"><span>Framework takeaway</span>Actionability connects well-structured information to practical value.</p>
        </div>
      </section>

      <section id="llm-evidence" className="case-section llm-editorial-section llm-evidence-section">
        <div className="llm-section-marker"><span>05 /</span><small>Results</small></div>
        <div className="llm-section-content">
          <h2>What changed — and what did not</h2>
          <p className="llm-key-finding">Expert-persona prompts produced their clearest improvement in <strong>actionability</strong>.</p>

          <div className="llm-result-summary" aria-label="Summary of statistical results">
            <article><span>Actionability</span><strong>Significant</strong><p>p=.028, r=.408</p></article>
            <article><span>Visual hierarchy</span><strong>Marginal</strong><p>p=.052, r=.360</p></article>
            <article><span>Structural coherence</span><strong>Not significant</strong><p>p=.369, r=.173</p></article>
          </div>

          <article className="llm-evidence-block llm-method-block">
            <header><span>01 / Method</span><h3>Two-tailed Mann-Whitney U tests</h3></header>
            <p>Condition A and Condition B were compared across all three dimensions at <span className="llm-formula llm-formula-compact">α=.05</span>. Five human participants and three AI models rated each response; output-level means were analysed with <span className="llm-formula llm-formula-compact">n=20</span> per group.</p>
          </article>

          <article className="llm-evidence-block">
            <header><span>02 / Pattern</span><h3>Human raters detected the strongest change</h3></header>
            <p>Human scores favoured Condition B across all dimensions. The largest difference appeared in Actionability, rising from <span className="llm-formula llm-formula-compact">Mdn 2.50</span> to <span className="llm-formula llm-formula-compact">Mdn 3.30</span>. AI scores were higher and more compressed, with less separation between conditions.</p>
            <div className="chart-grid"><CaseImage src="4.png" alt="Human scoring comparison"/><CaseImage src="5.png" alt="AI scoring comparison"/></div>
          </article>

          <article className="llm-evidence-block">
            <header><span>03 / Significance</span><h3>Only actionability reached statistical significance</h3></header>
            <p>Actionability reached significance with a medium effect size <span className="llm-formula llm-formula-compact">(U=118.5, p=.028, r=.408)</span>. Visual Hierarchy was marginal; Structural Coherence was not significant.</p>
            <CaseImage src="6.png" alt="Human expert scoring results" className="case-table-placeholder"/>
            <p>AI raters detected no significant differences across any dimension, suggesting lower sensitivity to the subtle UX improvements identified by people.</p>
            <CaseImage src="7.png" alt="AI scoring results" className="case-table-placeholder"/>
          </article>

        </div>
      </section>

      <section id="llm-implications" className="case-section llm-editorial-section llm-implications-section">
        <div className="llm-section-marker"><span>06 /</span><small>Implications</small></div>
        <div className="llm-section-content">
          <h2>What this means for AI interfaces</h2>
          <p className="llm-editorial-lede">The study points to three practical decisions for designing clearer, more adaptable AI-generated output.</p>
          <ol className="llm-implication-list">
            <li><span>01</span><p>Treat the <em>persona prefix</em> as a low-cost UX design decision, not only a prompting technique.</p></li>
            <li><span>02</span><p>Well-structured output is not necessarily usable; AI should make the <em>next action explicit</em>.</p></li>
            <li><span>03</span><p>Because users responded differently, interfaces should offer <em>flexible output formats</em>.</p></li>
          </ol>
          <aside className="llm-design-direction">
            <span>Reflection</span>
            <div className="llm-reflection-copy">
              <p><strong>For Project:</strong> this suggests that giving users a Role option when interacting with AI could help optimise output quality.</p>
              <p><strong>For myself:</strong> it showed me how to use research and experimentation to support and validate design decisions, rather than relying on intuition alone.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
    <CaseFooter onHome={onHome} onNext={onNext}/>
  </div>
}

function CaseToc({ items = ['01 / PROBLEM AND RESEARCH QUESTION', '02 / THEORETICAL FRAMING', '03 / EXPERIMENT DESIGN', '04 / PROCESS', '05 / DATA ANALYSIS AND RESULTS', '06 / APPLICATION IN UX'], rootSelector = '.case-page', accent = '#76629d' }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const sections = [...document.querySelectorAll(`${rootSelector} .case-section`)]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActive(sections.indexOf(visible[0].target))
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [rootSelector])
  const jump = (index) => {
    setActive(index)
    document.querySelectorAll(`${rootSelector} .case-section`)[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return <nav className="case-toc" aria-label="Case study contents" style={{ '--case-toc-accent': accent }}><div className="case-toc-dots">{items.map((item, index) => <button key={item} aria-label={item} className={active === index ? 'active' : ''} onClick={() => jump(index)} />)}</div></nav>
}

const readAlongSolutions = [
  {
    no: '01',
    friction: 'Reading Stagnation / Hesitation',
    frictionCopy: 'The system triggers the ‘Read this aloud’ prompt after 5 seconds of silence, treating it as a binary ‘failure’ rather than a meaningful ‘signal’ — misclassifying children’s cognitive processing (thinking, hesitation, or anxiety) simply as ‘no input.’',
    solution: 'Positive responds while silence',
    solutionCopy: <>The redesign responds the same way to all of them: with encouragement, never with ‘wrong’.<br/><br/>According to the silence time, from soft prompt to reading together reminder to syllable guide. A short buffer window enable children response gradually, keeps the system from reacting too fast to intervene thinking pauses.</>,
    theory: <><p><em>Piaget (1952) — Stages of Cognitive Development.</em> Children aged 2–7 need dual visual+auditory stimulation and extended wait times; children aged 7–11 need step-by-step structured rules. This redesign differentiates support by pacing rather than age directly.</p><p><em>Krashen (1982) — Affective Filter Hypothesis.</em> Removing blame from the feedback keeps a young learner's affective filter low and their willingness to keep trying intact.</p></>,
  },
  {
    no: '02',
    friction: 'System-Detected Reading Error',
    frictionCopy: 'The system compresses pronunciation errors, environmental noise, alignment issues, and reading-order deviations into one identical visual signal, the word turns blue and underlined. leaving the source of failure ambiguous.',
    solution: 'Specific Feedback for each scenarios',
    solutionCopy: <>Identify friction type and responds to each with precise, non-blaming feedback instead of one generic ‘error’ signal.<br/><br/>Pronunciation unclear → gentle toast* (let's polish the pronunciation).<br/>Background noise → reassurance, not blame (Too noisy here/Environment OK).<br/>Read too fast → rhythm cue, not correction (You're moving fast! Let's pick up from here).<br/>Intentional skip → treated as a choice, not a failure (Let's continue from here).</>,
    theory: <p><em>Nielsen (1994) — Error Recognition, Diagnosis &amp; Recovery Heuristic.</em> The undifferentiated signal violates this heuristic directly, giving users no actionable information about what went wrong or how to correct it.</p>,
  },
  {
    no: '03',
    friction: 'Skip-Reading',
    frictionCopy: 'Three skip patterns were tested: skipping forward, returning to earlier content, and jumping to the page’s final word. Surfacing four problems: the system struggles to distinguish intentional skipping from recognition error, skipped content is only partially resolved, page transitions rely too heavily on the final word alone rather than overall coverage, and automatic page turns give no explanation for why the position or page changed.',
    solution: 'Telling a Skip Apart from a Mistake',
    solutionCopy: <>The system now judges whether a jump ahead was intentional, rather than assuming every jump is a mistake.<br/><br/>The system checks if a jump ahead keeps matching later words, if so, it's treated as intentional and the reading position moves on; if not, it's treated as a misheard word and gently guided back.</>,
    theory: <p><em>Nielsen (1994) — Visibility of System Status.</em> Page turns and skip decisions now come with visible feedback (a banner, a prompt) instead of happening silently, directly addressing the original lack of explanation when the reading position changed unexpectedly.</p>,
  },
  {
    no: '04',
    friction: 'Error Correction',
    frictionCopy: 'No guidance appears the first time the error-underline state shows up, so users don’t know a correction feature exists; an error at the end of a page triggers an automatic page turn with no chance to fix it; and there is no aggregation mechanism — uncorrected words simply vanish once the story summary page appears.',
    solution: 'Multi Chances to Fix a Mistake',
    solutionCopy: <>The system offers three progressively later chances to repair an error, always leaving the choice with the child.<br/><br/>First mistake → a gentle reminder appears immediately.<br/>Still unfixed by page's end → the page pauses briefly and invites a fix rather than jumping ahead automatically.<br/>Story finished → any remaining mistakes are quietly saved and offered back ("read again for more stars"), never forced.</>,
    theory: <p><em>Ryan &amp; Deci (2000) — Self-Determination Theory.</em> Each repair stage still ends with the child's own choice to correct or move on, restoring the learner autonomy that the original automatic page-turn had removed.</p>,
  },
  {
    no: '05',
    friction: 'User Behaviour / Implicit Controls',
    frictionCopy: 'Pause, resume, and repositioning are all implicit: there’s no explicit pause button (only muting the mic). Tapping any word for pronunciation help also silently resets the reading start point, conflating ‘review’ with ‘reposition.’',
    solution: "Making the System's State Visible",
    solutionCopy: <>Make the listening state visible and put control of pausing, resuming, and repositioning back in the child's hands.<br/><br/>Live waveform feedback shows the mic is actively picking up speech. After 10 seconds of silence, the system visibly enters a "paused listening" state (mic icon changes).<br/>When the user reopens a story, a clear choice appears to show resume or restart.<br/>Tapping a word once replays its pronunciation only; tapping it again within 2 seconds sets it as the new reading position, separating ‘review’ from ‘reposition’.</>,
    theory: <p><em>Clark &amp; Brennan (1991) — Grounding in Communication.</em> Making the system's internal state visible (listening, paused, position), re-establishes the shared understanding between user and system that implicit controls had broken.</p>,
  },
]

const readAlongMaps = [
  {
    no: '01',
    title: 'Story-to-reward loop',
    label: 'Whole experience',
    image: '2.png',
    alt: 'Read Along system overview',
    intro: 'This flowchart provides a high-level overview of the entire page experience. Read Along is a voice-interactive system designed around the goal of reading individual stories to collect stars. The system monitors the user’s reading completion rate and provides various feedback or rewards based on performance.',
    className: 'ra-map-scale-80',
  },
  {
    no: '02',
    title: 'Recognition flow',
    label: 'System response',
    image: '3.png',
    alt: 'System interaction logic and classification',
    intro: 'This flowchart illustrates a detailed breakdown of all interactions observed within the system. Divided interaction behaviours into three types: Right Input (Green), No Input (Yellow), Error And Correction (Red).',
  },
  {
    no: '03',
    title: 'User-led controls',
    label: 'Active interaction',
    image: '4.png',
    alt: 'User active interaction',
    intro: 'In addition to the visual and auditory feedback provided by the system, users can also engage in autonomous reading interactions. For example, clicking on a word triggers a pronunciation hint, or interacting with the mute notification icon at the bottom of the screen.',
    className: 'ra-map-scale-60',
  },
]

const readAlongBreakdownGroups = [
  {
    no: '01–04',
    title: 'System-triggered interactions',
    label: 'Four friction points',
    image: '5.png',
    alt: 'System-triggered reading frictions one to four',
    summary: 'Automatic recognition treats hesitation, mistakes, skipped reading and correction as fixed system states, leaving little room for the learner to pause, self-correct or stay in control.',
    issues: ['Reading stagnation', 'Detected reading error', 'Skip-reading', 'Error correction'],
  },
  {
    no: '05',
    title: 'User-led interactions',
    label: 'One friction point',
    image: '6.png',
    alt: 'User-led interaction and implicit controls',
    summary: 'Manual controls exist, but their state and consequences are not clearly communicated, making user-led actions difficult to predict.',
    issues: ['Implicit controls'],
  },
]

function ReadAlongImage({ name, alt, caption, intro, className = '', onClick, eager = false }) {
  const activate = (event) => {
    if (!onClick) return
    event.stopPropagation()
    onClick()
  }
  return <figure
    className={`ra-image ${className}`}
    onClick={activate}
    onKeyDown={(event) => {
      if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) return
      event.preventDefault()
      activate(event)
    }}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    aria-label={onClick ? `Expand ${alt}` : undefined}
  >
    {intro && <p className="ra-image-intro">{intro}</p>}
    <img src={`/read-along/${name}`} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async"/>
    {caption && <figcaption>{typeof caption === 'string' ? <strong>{caption}</strong> : caption}</figcaption>}
  </figure>
}

function ReadAlongCasePage({ onHome, onContact, onNext }) {
  const [activeSolution, setActiveSolution] = useState(0)
  const [solutionVisible, setSolutionVisible] = useState(false)
  const [activeMap, setActiveMap] = useState(0)
  const [activeBreakdown, setActiveBreakdown] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const lightboxCloseRef = useRef(null)
  const previousFocusRef = useRef(null)
  const active = readAlongSolutions[activeSolution]
  const activeSolutionImage = activeSolution >= 3
    ? `solution-${activeSolution + 1}.svg`
    : `solution-${activeSolution + 1}.png`
  const map = readAlongMaps[activeMap]
  const breakdown = readAlongBreakdownGroups[activeBreakdown]
  const chooseSolution = (index) => {
    setActiveSolution(index)
    setSolutionVisible(false)
  }

  useEffect(() => {
    if (!lightbox) return undefined
    previousFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = requestAnimationFrame(() => lightboxCloseRef.current?.focus())
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setLightbox(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      previousFocusRef.current?.focus?.()
    }
  }, [lightbox])

  return <div className="case-page case-redesign readalong-page">
    <CaseHeader onHome={onHome} onContact={onContact}/>
    <main>
      <EditorialCaseHero
        rootSelector=".readalong-page"
        eyebrow="INTERACTION AUDIT · UX REDESIGN"
        title="Google Read Along"
        subtitle="Interaction Analysis and UX Redesign"
        summary={[
          'Google Read Along is a reading app that uses speech recognition to help children practise independently.',
          'After mapping five interaction frictions, I combined Self-Determination Theory and Grounding Theory to redesign each response so children could self-correct and remain in control.'
        ]}
        chapters={['Context & goal', 'How it works', 'Where it breaks', 'Redesign decisions', 'Validation & limitations', 'Reflection']}
        imageSrc="/read-along/1.png"
        imageAlt="Google Read Along interaction analysis and system map"
        result="Five interaction frictions mapped to five autonomy-preserving solutions."
        accent="#278a68"
        accentSoft="#91c8b2"
        diagram
      />

      <section className="case-section ra-overview" id="readalong-context">
        <div className="case-section-label">01 / CONTEXT &amp; GOAL</div>
        <div className="ra-section-head">
          <h2>Understand the system before redesigning it.</h2>
          <p>Google Read Along is a voice-interactive reading app designed for children learning a second language. Users read stories aloud to collect stars while the system tracks completion and provides real-time phonetic feedback.</p>
        </div>
        <div className="ra-overview-grid">
          <div className="ra-overview-copy">
            <p>This project reverse-engineered the app's full interaction logic before evaluating it, classifying exactly where its error-handling system breaks down for young second-language learners.</p>
            <p>The design goal shifted from simply correcting errors to understanding learners: provide context-aware, developmentally adaptive and minimally disruptive support while preserving children's autonomy.</p>
          </div>
          <div className="ra-overview-points">{[
            ['01', 'Map', 'Document system, story and user-initiated interaction flows before proposing changes.'],
            ['02', 'Diagnose', 'Group breakdowns into five distinct friction types rather than treating every error alike.'],
            ['03', 'Redesign', 'Match each friction to one focused interaction response and an explicit theoretical rationale.'],
          ].map(([no, title, copy]) => <article key={no}><span>{no}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
      </section>

      <section className="case-section case-soft ra-mapping" id="readalong-mapping">
        <div className="case-section-label">02 / HOW IT WORKS</div>
        <div className="ra-section-head">
          <h2>Three levels of the same reading experience.</h2>
          <p>Move from the whole story loop to the system's recognition logic and, finally, to the controls initiated by the child.</p>
        </div>
        <div className="ra-control-tabs" role="tablist" aria-label="System mapping views">
          {readAlongMaps.map((item, index) => <button
            key={item.no}
            id={`ra-map-tab-${index}`}
            role="tab"
            aria-selected={activeMap === index}
            aria-controls="ra-map-panel"
            className={activeMap === index ? 'active' : ''}
            onClick={() => setActiveMap(index)}
          ><span>{item.no}</span><strong>{item.title}</strong><small>{item.label}</small></button>)}
        </div>
        <div id="ra-map-panel" className="ra-map-panel" role="tabpanel" aria-labelledby={`ra-map-tab-${activeMap}`} key={map.no}>
          <ReadAlongImage name={map.image} alt={map.alt} className={map.className} intro={map.intro}/>
        </div>
      </section>

      <section className="case-section ra-frictions" id="readalong-frictions">
        <div className="case-section-label">03 / WHERE IT BREAKS</div>
        <div className="ra-section-head">
          <h2>Two sources of friction, not five disconnected problems.</h2>
          <p>The audit groups four issues inside automatic recognition and one inside user-led controls. This makes the diagnosis clear before the five redesign decisions that follow.</p>
        </div>
        <div className="ra-friction-index ra-breakdown-index" role="tablist" aria-label="Interaction friction groups">
          {readAlongBreakdownGroups.map((item, index) => <button
            key={item.no}
            id={`ra-breakdown-tab-${index}`}
            role="tab"
            aria-selected={activeBreakdown === index}
            aria-controls="ra-breakdown-panel"
            className={activeBreakdown === index ? 'active' : ''}
            onClick={() => setActiveBreakdown(index)}
          ><span>{item.no}</span><strong>{item.title}</strong><small>{item.label}</small></button>)}
        </div>
        <div id="ra-breakdown-panel" className="ra-friction-preview ra-breakdown-preview" role="tabpanel" aria-labelledby={`ra-breakdown-tab-${activeBreakdown}`} key={breakdown.no}>
          <div>
            <span>{breakdown.label}</span>
            <h3>{breakdown.title}</h3>
            <p>{breakdown.summary}</p>
            <div className="ra-friction-coverage" aria-label="Issues in this group">
              {breakdown.issues.map(issue => <span key={issue}>{issue}</span>)}
            </div>
          </div>
          <ReadAlongImage name={breakdown.image} alt={breakdown.alt}/>
        </div>
      </section>

      <section className="case-section case-soft ra-solutions" id="readalong-solutions">
        <div className="case-section-label">04 / REDESIGN DECISIONS</div>
        <div className="ra-section-head">
          <h2>One friction. One response. One reason.</h2>
          <p>Select a friction, then open the card to see how the redesigned interaction preserves clarity and learner control.</p>
        </div>
        <div className="ra-diagnostic">
          <div className="ra-friction-tabs" role="tablist" aria-label="Five redesign decisions">
            {readAlongSolutions.map((item, index) => <button
              key={item.no}
              id={`ra-solution-tab-${index}`}
              role="tab"
              aria-selected={activeSolution === index}
              aria-controls="ra-solution-panel"
              className={activeSolution === index ? 'active' : ''}
              onClick={() => chooseSolution(index)}
            ><span>{item.no}</span><strong>{item.friction}</strong></button>)}
          </div>
          <div id="ra-solution-panel" className={`ra-flip-shell${solutionVisible ? ' is-flipped' : ''}`} role="tabpanel" aria-labelledby={`ra-solution-tab-${activeSolution}`}>
            <div className="ra-flip-card">
              <article
                className="ra-friction-focus"
                role="button"
                tabIndex={solutionVisible ? -1 : 0}
                aria-hidden={solutionVisible}
                aria-label={`View solution for ${active.friction}`}
                onClick={() => setSolutionVisible(true)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return
                  event.preventDefault()
                  setSolutionVisible(true)
                }}
              >
                <div className="ra-card-meta">FRICTION {active.no}</div>
                <h3>{active.friction}</h3>
                <p>{active.frictionCopy}</p>
                <ReadAlongImage name={`friction-${activeSolution + 1}.png`} alt={`${active.friction} flow chart`}/>
                <span className="ra-flip-action" aria-hidden="true">View solution <span>→</span></span>
              </article>
              <article className="ra-solution-reveal" aria-hidden={!solutionVisible}>
                <div className={`ra-solution-main${activeSolution === 1 || activeSolution === 2 ? ' ra-solution-main-fill' : ''}`}>
                  <div className="ra-card-meta">SOLUTION {active.no}</div>
                  <h3>{active.solution}</h3>
                  <p>{active.solutionCopy}</p>
                  <ReadAlongImage
                      name={activeSolutionImage}
                      alt={`${active.solution} solution flow chart`}
                      className={`ra-zoom-image${activeSolution === 1 || activeSolution === 2 ? ' ra-solution-image-fill' : ''}`}
                      onClick={solutionVisible
                        ? () => setLightbox({ name: activeSolutionImage, alt: `${active.solution} solution flow chart` })
                        : undefined}
                  />
                </div>
                <aside><span>THEORETICAL GROUNDING</span>{active.theory}<button type="button" tabIndex={solutionVisible ? 0 : -1} onClick={() => setSolutionVisible(false)}>Back to friction <span>↩</span></button></aside>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section ra-validation" id="readalong-validation">
        <div className="case-section-label">05 / VALIDATION &amp; LIMITATIONS</div>
        <div className="ra-section-head">
          <h2>A structured proposal, not a claim of proven impact.</h2>
          <p>The interaction logic is now testable. Learning outcomes, emotional response and recognition performance still need evidence from children using the redesigned flows.</p>
        </div>
        <div className="ra-validation-grid">
          <article><span>ESTABLISHED</span><h3>What this work makes clear</h3><p>It connects five observed friction patterns to five explicit recovery paths across silence, misrecognition, skipping, correction and listening state.</p></article>
          <article><span>UNPROVEN</span><h3>What the design cannot claim yet</h3><p>Recognition accuracy, comprehension, emotional response and long-term engagement were not validated with children in this study.</p></article>
          <article><span>NEXT</span><h3>How I would test it</h3><p>Run moderated story-reading tasks with children and guardians; compare completion, error recovery, unnecessary intervention and perceived control.</p></article>
        </div>
      </section>

      <section className="case-section case-soft ra-reflection" id="readalong-reflection">
        <div className="case-section-label">06 / REFLECTION</div>
        <div className="ra-reflection-grid">
          <h2>Design the recovery path, not only the happy path.</h2>
          <p>In a speech-led learning experience, silence, uncertainty and misrecognition are not edge cases; they are the experience. The redesign therefore makes system state legible, explains what happened and preserves the child's choice to continue, correct or pause.</p>
        </div>
      </section>
    </main>
    {lightbox && <div className="ra-lightbox" role="dialog" aria-modal="true" aria-label="Expanded solution diagram" onClick={() => setLightbox(null)}><button ref={lightboxCloseRef} onClick={() => setLightbox(null)} aria-label="Close expanded image">Close ×</button><img src={`/read-along/${lightbox.name}`} alt={lightbox.alt} onClick={(event) => event.stopPropagation()}/></div>}
    <CaseFooter onHome={onHome} onNext={onNext}/>
  </div>
}

function AboutPage({ go, onHome }) {
  const talk = () => document.getElementById('talk-more')?.scrollIntoView({ behavior: 'smooth' })
  const [copiedAbout, setCopiedAbout] = useState(false)
  const copyAboutEmail = async () => { await navigator.clipboard.writeText('kekli0921@gmail.com'); setCopiedAbout(true); setTimeout(() => setCopiedAbout(false), 1700) }
  const [tagOffset, setTagOffset] = useState({ x: 0, y: 0 })
  const tagTarget = useRef({ x: 0, y: 0 })
  const tagFrame = useRef(null)
  const animateTags = () => { tagFrame.current = null; setTagOffset(current => { const next = { x: current.x + (tagTarget.current.x - current.x) * .14, y: current.y + (tagTarget.current.y - current.y) * .14 }; if (Math.abs(next.x - tagTarget.current.x) > .05 || Math.abs(next.y - tagTarget.current.y) > .05) tagFrame.current = requestAnimationFrame(animateTags); return next }) }
  const moveTags = (event) => { const rect = event.currentTarget.getBoundingClientRect(); tagTarget.current = { x: ((event.clientX - rect.left) / rect.width - .5) * 60, y: ((event.clientY - rect.top) / rect.height - .5) * 60 }; if (!tagFrame.current) tagFrame.current = requestAnimationFrame(animateTags) }
  const resetTags = () => { tagTarget.current = { x: 0, y: 0 }; if (!tagFrame.current) tagFrame.current = requestAnimationFrame(animateTags) }
  return <div className="about-page">
    <SiteHeader onHome={onHome} onNavigate={go} active="about" />
    <main>
      <section className="about-hero section"><div className="about-hero-copy"><h1>I'm Kexin Li</h1><p className="about-role">UX researcher / designer based in London</p><p className="about-lede">I combine strong quantitative skills with qualitative research experience across user interviews, journey mapping, and service design, and think in systems, communicate with stakeholders at every level, and translate research findings into decisions that stick. My background spans UX engineering, furniture engineering, employee experience design and management, and academic editing, giving me a broad perspective on how people interact with systems across very different contexts.</p><div className="about-hero-actions"><button className="about-project-btn" onClick={() => go('projects')}>View Project <ArrowDownRight size={17}/></button><button className="about-talk-link" onClick={talk}>Let's talk more <ArrowUpRight size={17}/></button></div></div><div className="about-portrait-wrap" onMouseMove={moveTags} onMouseLeave={resetTags}><img src="/about-photo.jpg" alt="Kexin Li"/><div className="about-tags"><span style={{ '--tx': `${tagOffset.x * .75}px`, '--ty': `${tagOffset.y * .75}px` }}>✦ System Thinker</span><span style={{ '--tx': `${tagOffset.x * -.55}px`, '--ty': `${tagOffset.y * .8}px` }}>✦ Evidence-Driven</span><span style={{ '--tx': `${tagOffset.x * 1.05}px`, '--ty': `${tagOffset.y * -.65}px` }}>✦ Boundary Crosser</span></div></div></section>
      <section className="about-detail section"><div className="section-kicker">EDUCATION</div><div className="education-timeline">{education.map(([date, degree, school, details, avg, distinction]) => <article key={degree}><span className="timeline-date">{date}</span><div><h2>{degree}</h2><p className="school-line">{school}</p><p>{details}</p></div><strong>{avg}{distinction && <><br/><small>{distinction}</small></>}</strong></article>)}</div></section>
      <section className="about-detail experience-detail section" id="experience"><div className="section-kicker">WORK EXPERIENCE</div><div className="experience-lead"><h2>A career spanning<br/><em>many lenses.</em></h2><p>A career spanning UX research, employee experience, product design, and academic publishing — each chapter strengthening my ability to turn complex human insights into clear product decisions and practical design solutions.</p></div><div className="experience-timeline">{experiences.map(([date, role, company, copy, tags]) => <article key={role}><span className="timeline-date">{date}</span><div><h2>{role}</h2><p className="school-line">{company}</p><div className="experience-copy">{(Array.isArray(copy) ? copy : [copy]).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><div className="experience-tags">{tags.split(' · ').map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>
      <section id="talk-more" className="contact section"><div><p className="eyebrow">AVAILABLE FOR OPPORTUNITIES & COLLABORATIONS</p><h2>Let’s build<br/>something <em>meaningful.</em></h2></div><div className="contact-actions"><button className="email copy-email" onClick={copyAboutEmail} aria-label="Copy email address">{copiedAbout ? <><Check size={18}/> Copied</> : <>kekli0921@gmail.com <span>Copy</span></>}</button><a className="contact-line linkedin" href="https://linkedin.com/in/hellocassie" target="_blank" rel="noreferrer">in&nbsp; LinkedIn <ArrowUpRight size={15}/></a><a className="contact-line" href="tel:+447471678588"><Phone size={15}/> +44 7471 678588</a></div></section>
    </main><footer><button className="brand" onClick={onHome}>KEXIN LI<span>.</span></button><p>Thinking in systems / Building in pixels</p><p className="copyright">© 2026 Kexin Li</p></footer>
  </div>
}

function App() {
  const [openProject, setOpenProject] = useState(null)
  const [activeSkills, setActiveSkills] = useState('research')
  const [copied, setCopied] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const cursorTarget = useRef({ x: 0, y: 0 })
  const cursorFrame = useRef(null)
  const [page, setPage] = useState(() => {
    const previewPage = new URLSearchParams(window.location.search).get('page')
    return [...visibleProjectRoutes, 'about'].includes(previewPage) ? previewPage : 'home'
  })
  useEffect(() => { window.scrollTo(0, 0) }, [page])
  useEffect(() => {
    if (page !== 'home') return undefined

    const elements = Array.from(document.querySelectorAll('.home-reveal, .home-hero-reveal'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    elements.forEach((element, index) => {
      const delay = element.classList.contains('home-hero-reveal-late') ? 120 : (index % 4) * 55
      element.style.setProperty('--reveal-delay', `${delay}ms`)
    })

    if (reduceMotion) {
      elements.forEach(element => { element.dataset.revealed = 'true' })
      return undefined
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.dataset.revealed = entry.isIntersecting ? 'true' : 'false'
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [page])
  const go = (id) => { if (id === 'about') { setPage('about'); window.scrollTo(0, 0); return } if (id === 'case-study') { setPage('case-study'); window.scrollTo(0, 0); return } if (id === 'calmo') { setPage('calmo'); window.scrollTo(0, 0); return } if (id === 'read-along') { setPage('read-along'); window.scrollTo(0, 0); return } if (id === 'procuresmart') { setPage('procuresmart'); window.scrollTo(0, 0); return } setPage('home'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 0) }
  const openProjectPage = (index) => go(projects[index].route)
  const parallax = (xFactor, yFactor) => ({ '--px': `${cursor.x * xFactor}px`, '--py': `${cursor.y * yFactor}px` })
  const copyEmail = async () => { await navigator.clipboard.writeText('kekli0921@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 1700) }
  const animateCursor = () => { cursorFrame.current = null; setCursor(current => { const next = { x: current.x + (cursorTarget.current.x - current.x) * .16, y: current.y + (cursorTarget.current.y - current.y) * .16 }; if (Math.abs(next.x - cursorTarget.current.x) > .05 || Math.abs(next.y - cursorTarget.current.y) > .05) cursorFrame.current = requestAnimationFrame(animateCursor); return next }) }
  const handleMove = (event) => { const rect = event.currentTarget.getBoundingClientRect(); cursorTarget.current = { x: ((event.clientX - rect.left) / rect.width - .5) * 60, y: ((event.clientY - rect.top) / rect.height - .5) * 60 }; if (!cursorFrame.current) cursorFrame.current = requestAnimationFrame(animateCursor) }
  const resetCursor = () => { cursorTarget.current = { x: 0, y: 0 }; if (!cursorFrame.current) cursorFrame.current = requestAnimationFrame(animateCursor) }

  if (page === 'about') return <AboutPage go={go} onHome={() => { setPage('home'); window.scrollTo(0, 0) }} />
  if (page === 'case-study') return <CaseStudyPage onHome={() => { setPage('home'); window.scrollTo(0, 0) }} onContact={() => go('contact')} onNext={() => go(getNextVisibleProject('case-study'))} />
  if (page === 'calmo') return <CalmoPage onHome={() => { setPage('home'); window.scrollTo(0, 0) }} onContact={() => go('contact')} onNext={() => go(getNextVisibleProject('calmo'))} />
  if (page === 'read-along') return <ReadAlongCasePage onHome={() => { setPage('home'); window.scrollTo(0, 0) }} onContact={() => go('contact')} onNext={() => go(getNextVisibleProject('read-along'))} />
  if (page === 'procuresmart') return <ProcureSmartPage onHome={() => { setPage('home'); window.scrollTo(0, 0) }} onContact={() => go('contact')} onNext={() => go(getNextVisibleProject('procuresmart'))} />

  return <main className="home-page">
    <SiteHeader onHome={() => go('top')} onNavigate={go} />

    <section id="top" className="hero grain" onMouseMove={handleMove} onMouseLeave={resetCursor}>
      <div className="hero-copy home-hero-reveal">
        <p className="eyebrow">UX RESEARCHER / DESIGNER / SYSTEM THINKER</p>
        <h1><span className="hero-sans">Hi,</span><span className="hero-sans">I’m Kexin Li.</span></h1>
        <h2 className="hero-sub"><span className="hero-serif hero-accent-orange">UX researcher / designer</span><br/><span className="hero-sans">with a multi-disciplinary background.</span></h2>
        <p className="intro">I combine quantitative rigour and qualitative research to translate human insight into decisions that stick.</p>
        <button className="circle-link" onClick={() => go('projects')}>Selected<br/>work <ArrowDownRight size={20}/></button>
      </div>
      <div className="hero-tags home-hero-reveal home-hero-reveal-late" aria-label="UX design disciplines">
        <span className="hero-icon icon-grid" style={parallax(-.71,.52)}>✦</span><span className="hero-icon icon-arrow" style={parallax(.46,-.37)}>↗</span><span className="hero-icon icon-ring" style={parallax(-.58,-.83)}>◌</span><span className="hero-icon icon-star" style={parallax(.78,.36)}>✷</span>
        <button type="button" className="float-tag tag-a" style={parallax(.87,-.43)} onClick={() => go('case-study')} aria-label="View LLM Prompt Design project">#UX Research</button><button type="button" className="float-tag tag-b" style={parallax(-.52,.71)} onClick={() => go('read-along')} aria-label="View Google Read Along project">#UX Design</button><button type="button" className="float-tag tag-d" style={parallax(-.92,-.51)} onClick={() => go('calmo')} aria-label="View CALMO project">#UI Design</button>
        <p>OPEN TO WORK<br/><span>UK · UAE · China</span></p><button className="circle-link hero-select" onClick={() => go('projects')}>Selected<br/>work <ArrowDownRight size={20}/></button>
      </div>
    </section>

    <section id="projects" className="projects section">
      <div className="project-head home-reveal"><div className="section-kicker">SELECTED PROJECTS</div><p>Four investigations in interaction, trust, behaviour and better systems.</p></div>
      <div className="project-list">{projects.map((p, index) => p.hiddenHome ? null : <article className={`project-card home-reveal${openProject === index ? ' is-open' : ''}`} key={p.title}>
        <button className="project-main" onClick={(event) => { if (openProject === index && event.target.closest('.project-title h3')) { openProjectPage(index); return } setOpenProject(openProject === index ? null : index) }} aria-expanded={openProject === index}>
          <div className="project-title"><h3><strong>{p.title}</strong><span className="project-subtitle">{p.subtitleLines ? p.subtitleLines.map((line) => <span className="project-subtitle-line" key={line}>{line}</span>) : p.subtitle}</span></h3><div><p>{p.type}</p>{p.award && <small>{p.award}</small>}</div></div>
          <img className="project-image" src={p.image} alt={`${p.title.replace('\n', ' ')} project preview`} />
          <ChevronDown className={openProject === index ? 'rotated' : ''}/>
        </button>
        {openProject === index && <div className="project-detail"><div><p>{p.detail}</p><div>{p.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div><button className="view-more" onClick={() => openProjectPage(index)}>View more <ArrowUpRight size={15}/></button></div>}
      </article>)}</div>
    </section>

    <section id="about" className="about section">
      <div className="section-kicker home-reveal">ABOUT ME</div>
      <div className="home-info-layout about-info-layout">
        <div className="about-content home-info-primary home-reveal"><h2>Research-led.<br/><em>human-centric.</em><br/>End-to-End.</h2><div><p className="body-copy">I think in systems, communicate with stakeholders at every level, and translate research findings into decisions that stick. My background spans UX engineering, furniture engineering, HR management and academic editing — giving me a broad perspective on how people interact with systems across very different contexts.</p><button className="text-link" onClick={() => go('about')}>Learn more about me <ArrowDownRight size={17}/></button></div></div>
        <div className="skill-explorer home-info-side home-reveal" data-area={activeSkills}>
          <div className="skill-switch" role="tablist" aria-label="Skills">
            {Object.entries(skillSets).map(([key, set]) => <button key={key} id={`skill-tab-${key}`} className={activeSkills === key ? 'active' : ''} onClick={() => setActiveSkills(key)} role="tab" type="button" aria-selected={activeSkills === key} aria-controls={`skill-panel-${key}`}>{set.label}</button>)}
          </div>
          <div className="skill-panel" id={`skill-panel-${activeSkills}`} key={activeSkills} role="tabpanel" aria-labelledby={`skill-tab-${activeSkills}`}>
            <div className="skill-panel-intro"><p className="skill-panel-line">{skillSets[activeSkills].line}</p><p>{skillSets[activeSkills].intro}</p></div>
            <div className="skill-groups">{skillSets[activeSkills].groups.map(([group, tags]) => <article key={group}><h3>{group}</h3><div>{tags.map((tag, index) => <span className="skill-tag" style={{ '--tag-index': index }} key={tag}>{tag}</span>)}</div></article>)}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="experience" className="experience section">
      <div className="experience-section-head home-reveal"><div className="section-kicker">EXPERIENCE</div><p className="label">RECOGNITION</p></div>
      <div className="home-info-layout experience-info-layout">
        <div className="experience-intro home-info-primary home-reveal"><h2>Every chapter<br/>adds a new <em>lens.</em></h2><div><p>A career spanning UX research, employee experience, product design, and academic publishing — each chapter strengthening my ability to turn complex human insights into clear product decisions and practical design solutions.</p><button className="text-link" onClick={() => go('about')}>Learn more about me <ArrowDownRight size={17}/></button></div></div>
        <div className="recognition home-info-side home-reveal"><div className="award-grid"><a className="award-card" style={{ '--award-image': "url('/awards/ux-design-award.png')", '--award-bg': '#ffffff' }} href="https://ux-design-awards.com/winners/2026-2-calmo-a-transition-system-for-retired-police-dogs" target="_blank" rel="noreferrer"><p>2026 / German</p><h3>UX Design Award</h3><strong>Nominated(Ongoing), International Design Center Berlin</strong></a><article className="award-card" style={{ '--award-image': "url('/awards/jiangsu-industrial-design.png')", '--award-bg': '#ffffff' }}><p>2019 / CHINA</p><h3>Industrial Design Award</h3><strong>Second Prize, Jiangsu Provincial</strong></article><article className="award-card" style={{ '--award-image': "url('/awards/alberta-home-design.png')", '--award-bg': '#006448', '--award-fill': 'linear-gradient(90deg, #006448 0%, #00694b 100%)' }}><p>2017 / CANADA</p><h3>Home Design Award</h3><strong>Finalist, Alberta Cup Rabbit Baby</strong></article></div></div>
      </div>
    </section>

    <section id="contact" className="contact"><div className="home-reveal"><p className="eyebrow">AVAILABLE FOR OPPORTUNITIES & COLLABORATIONS</p><h2>Let’s build<br/>something <em>meaningful.</em></h2></div><div className="contact-actions home-reveal"><button className="email copy-email" onClick={copyEmail} aria-label="Copy email address">{copied ? <><Check size={18}/> Copied</> : <>kekli0921@gmail.com <span>Copy</span></>}</button><a className="contact-line linkedin" href="https://linkedin.com/in/hellocassie" target="_blank" rel="noreferrer">in&nbsp; LinkedIn <ArrowUpRight size={15}/></a><a className="contact-line" href="tel:+447471678588"><Phone size={15}/> +44 7471 678588</a></div></section>
    <footer><button className="brand" onClick={() => go('top')}>KEXIN LI<span>.</span></button><p>Thinking in systems / Building in pixels</p><div><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://linkedin.com/in/hellocassie" aria-label="LinkedIn">in</a><a href="mailto:kekli0921@gmail.com" aria-label="Email"><Mail size={18}/></a></div><p className="copyright">© 2026 Kexin Li</p></footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
