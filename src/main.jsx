import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'
import './styles.css'
import './case-redesign.css'
import './read-along.css'
import HumanFactorsPage from './human-factors.jsx'
import BodyCodesPage from './bodycodes.jsx'
import CalmoPage from './calmo.jsx'
import { CaseFooter, CaseHeader, EditorialCaseHero } from './case-chrome.jsx'
import './mobile.css'
import './case-viewport.css'
import './llm-case.css'
import './project-unified.css'

const projects = [
  { no: '01', title: 'LLM Prompt Design', subtitle: 'Does Giving an AI a Role Change Its Output?', type: 'Research / AI', year: '2026', image: '/projects/ai-role.png', tags: ['A/B Testing', 'Experimental Design', 'Quantitative Analysis', 'AI/LLM Prompt Research'], detail: <>Ran a controlled A/B experiment to test whether prompting an AI with a defined Information Architecture (IA) Expert role improves its response quality.<br/><br/>Collected outputs under both conditions, evaluated outputs across three dimensions, ran Mann-Whitney U tests to analyse results statistically.<br/><br/>Found expert-persona prompts had significantly better-structured outputs, but varied widely among users. Suggest LLMs offer more personalised options, like an appropriate role based on input and task type, to reduce interaction cost and improve efficiency.</> },
  { no: '02', title: 'CALMO', subtitle: 'A Transition Support System for Retired Police Dogs', type: 'Product / UI', year: '2026', image: '/projects/calmo.png', award: 'UX Design Award · Nominated', tags: ['Double Diamond', 'Persona & Journey Mapping', 'Competitive Analysis', 'UI Design'], detail: <>Retired working dogs often struggle emotionally when transitioning into home life, and new adopters failed to read or respond to their stress signals.<br/><br/>Followed a double-diamond design process, through research, problem framing, and prototype iteration, to ultimately design CALMO.<br/><br/>Through a smart pod and companion app, CALMO monitors dogs’ condition in real-time. It helps dogs reduce stress non-invasively by offering dynamic transition progress; builds adopter confidence by explaining dog behaviour; and bridges the gap between working and domestic life for retired police dogs.</> },
  { no: '03', title: 'Google Read Along', subtitle: 'Interaction Analysis and UX Redesign', type: 'UX Redesign', year: '2026', image: '/projects/readalong.png', tags: ['Interaction Analysis', 'Cognitive Psychology', 'System Mapping', 'UX Optimise'], detail: <>Google Read Along is a reading app that uses speech recognition to help children practise independently.<br/><br/>Its current interaction logic creates friction across five categories: silence, misrecognised words, skipped reading, forced page transitions, and ambiguous manual controls.<br/><br/>Combined Self-Determination Theory (user autonomy) and Grounding Theory (shared understanding between user and system), redesigning each interaction so children could self-correct and stay in control, enhancing their confidence and engagement.</> },
  { no: '04', title: 'BodyCodes', subtitle: 'Industry expansion strategy design, From Sizing Tool to Fit-Data Infrastructure', type: 'Service Design', year: '2026', image: '/projects/bodycodes.png', tags: ['Service Design', 'System Mapping', 'Service Blueprinting', 'Business Strategy'], detail: <>BodyCodes is a questionnaire-based sizing system that creates a reusable fit identity without body scans, photos or new hardware.<br/><br/>I focused on the corporate-uniform sector, mapping the workflow between employees, procurement teams and manufacturers. The research exposed repeated size collection, fragmented order coordination and a missing post-delivery feedback loop.<br/><br/>I repositioned BodyCodes from a consumer sizing tool into privacy-conscious B2B2C fit-data infrastructure, supported by a service blueprint, governance model, staged pilot and transparent validation framework.</> },
  { no: '05', title: 'Improving UX Through Human Factors', subtitle: 'Three evidence-based experiments', type: 'Research', year: '2025', image: '/projects/human-factors.png', tags: ['Multi-biosensor Research', 'EEG', 'Eye Tracking', 'EMG'], detail: <>Three lab experiments tested whether physiological data actually matches what users say they feel — a core assumption in UX research.<br/><br/>Biosensors (EMG, ECG, skin temperature) during a racing game found background sound did not raise baseline arousal, but amplified emotional intensity at key moments and boosted enjoyment. EEG/ECG comparing meditation with high-arousal music showed meditation produced calmer but slower responses, while music produced faster but less stable ones.<br/><br/>Eye-tracking on Bionic Reading found smoother scan paths and lower effort, but comprehension accuracy dropped, showing that easier reading is not necessarily deeper reading.</> }
]

const siteNav = [['Projects', 'projects'], ['About', 'about'], ['Contact', 'contact']]
const projectRoutes = ['case-study', 'calmo', 'read-along', 'bodycodes', 'human-factors']
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
  ['Jul 2022 – May 2025', 'Senior Talent Development Specialist', 'China Unicom (Fortune 500) | China', 'Redesigned the candidate screening pipeline by introducing role-specific competency frameworks and a structured assessment stage, raising the team-lead interview pass rate from 40% to 65% and improving new-hire first-year retention from 70% to 85%. Identified organisational skill gaps through workforce analysis and designed targeted training programmes, lifting the rate of employees rated A/B in first-year reviews by 35 percentage points; 87% of participating product and operations staff went on to earn NPDP (New Product Development Professional) certification.', 'Competency Framework Design · Structured Interview Design · Skills Gap Analysis · Training Programme Design'],
  ['Mar 2021 – Aug 2021', 'Research Intern', 'Haitai Olin Group | China', 'Researched daily living needs and physical constraints of elderly users in retirement communities, generated research report about needs led research for vulnerable user groups.', 'User needs research · Field research · Vulnerable user groups · Accessibility research'],
  ['Oct 2020 – Mar 2021', 'Product Design Intern', 'Red Star Macalline Group Corporation Ltd. | China', 'Designed home products for Alibaba x NetEase Onmyoji IP collaboration, adapting game visual identity into physical product design.', 'Product design · Visual identity translation · IP Collaboration · Design for retail'],
  ['Jun 2020 – Aug 2020', 'Consultant Assistant', 'Nanjing Cognitive IoT Research Institute | China', 'Researched how industrial design companies could empower IoT industry development, produced planning reports and solution research across technical, policy, and user facing dimensions.', 'Industry research · IoT strategy design · Policy research · Consultant'],
  ['Oct 2018 – Oct 2020', 'Editor', 'Furniture Magazine (Core Academic Journal) | China', 'Managed the full editorial workflow for an academic journal, including article review, graphic design, and visual layout.', 'Editorial design · Visual layout · Content review · Publication design']
]

function CaseChart({ title, ai = false }) { return <div className="case-chart"><h3>{title}</h3><p>Condition A vs. Condition B</p><svg viewBox="0 0 520 220" role="img" aria-label={title}><line x1="55" y1="180" x2="500" y2="180" stroke="currentColor" opacity=".25"/><line x1="55" y1="35" x2="55" y2="180" stroke="currentColor" opacity=".25"/>{['Visual Hierarchy','Structural Coherence','Actionability'].map((label, i) => { const x = 130 + i * 130; const a = ai ? [132,145,118][i] : [126,120,105][i]; const b = ai ? [118,126,108][i] : [106,112,82][i]; return <g key={label}><text x={x} y="205" textAnchor="middle" fontSize="10" fill="currentColor">{label}</text><line x1={x-18} y1={a-28} x2={x-18} y2={a+25} stroke="#76629d" strokeWidth="2"/><rect x={x-29} y={a-12} width="22" height="30" rx="5" fill="#d7c9ec" stroke="#76629d"/><line x1={x-29} y1={a+3} x2={x-7} y2={a+3} stroke="#1f201c" strokeWidth="2"/><line x1={x+18} y1={b-28} x2={x+18} y2={b+25} stroke="#e67046" strokeWidth="2"/><rect x={x+7} y={b-14} width="22" height="32" rx="5" fill="#f3c5ac" stroke="#e67046"/><line x1={x+7} y1={b+2} x2={x+29} y2={b+2} stroke="#1f201c" strokeWidth="2"/></g> })}</svg><div className="chart-legend"><span><i className="legend-a"/>Condition A</span><span><i className="legend-b"/>Condition B</span></div></div> }

function CasePlaceholder({ label, className = '' }) { return <div className={`case-placeholder ${className}`}><span>{label}</span><small>Upload visual here</small></div> }
const caseCaptions = { '2.png': <>Fogg Behaviour Model<br/><em>B = MAT (Behaviour = Motivation × Ability × Trigger)</em></>, '3.png': <>DeLone &amp; McLean's Information Systems Success Model<br/><em>Quality → Use → Value</em></>, '4.png': <>Human Scoring Comparison<br/><em>Condition A vs. Condition B</em></>, '5.png': <>AI Scoring Comparison<br/><em>Condition A vs. Condition B</em></>, '6.png': <>Human Expert Scoring Results</>, '7.png': <>AI Scoring Results</> }
function CaseImage({ src, alt, className = '', caption = null }) { const label = caseCaptions[src] || caption; return <figure className={`case-image ${className}`}>{label && <figcaption>{label}</figcaption>}<img src={`/case-study/${src}`} alt={alt} /></figure> }

function ModelDiagram({ kind }) { const fogg = kind === 'fogg'; return <div className="model-diagram"><div className="diagram-head"><span>{fogg ? "Fogg Behaviour Model" : "DeLone & McLean's Information Systems Success Model"}</span><strong>{fogg ? 'B = MAT' : 'Quality → Use → Value'}</strong></div><div className="diagram-layers"><div className="diagram-outcome">OUTCOME LAYER<br/><b>{fogg ? 'Target Behaviour / Conversion' : 'High-Quality Decision Support'}</b></div><div className="diagram-peak">PEAK · ACTION LAYER<br/><b>{fogg ? 'Trigger — Actionability' : 'Net Benefits — Actionability'}</b></div><div className="diagram-base">FOUNDATION · BASE LAYER<br/><b>{fogg ? 'Ability — VH + SC' : 'Information Quality — VH + SC'}</b></div></div></div> }

function CaseStudyPage({ onHome, onContact, onNext }) {
  const chapters = [
    ['01', 'Context', 'llm-context'],
    ['02', 'Experiment setting', 'llm-experiment'],
    ['03', 'Process', 'llm-process'],
    ['04', 'Theory framework', 'llm-framework'],
    ['05', 'Analysis result', 'llm-evidence'],
    ['06', 'UX implications', 'llm-implications']
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
          <CaseImage src="1.png" alt="General Prompt versus IA Expert Role"/>
          <p className="llm-hero-result"><span>Key result</span>Only Actionability reached statistical significance.</p>
        </div>
      </section>

      <section id="llm-context" className="case-section llm-editorial-section problem-section">
        <div className="llm-section-marker"><span>01</span><small>Context</small></div>
        <div className="llm-section-content">
          <div className="llm-context-grid">
            <div className="llm-reading-copy">
              <h2>The Problem: Cognitive Friction in LLM Outputs</h2>
              <p>Large Language Models (LLMs) are increasingly used to synthesise unstructured data, such as audio transcripts and meeting notes.</p>
              <p>However, their <strong>default outputs are often dense and poorly structured, creating cognitive friction and limiting practical usability.</strong></p>
              <p>This highlights the need to examine whether targeted prompt interventions can improve the usability of LLM generated outputs when processing audio transcripts.</p>
            </div>
            <aside className="llm-research-question">
              <h3>Research question</h3>
              <p>When processing unstructured audio transcripts, does an <strong>expert persona prompt</strong> significantly improve the generated output's <strong>Visual Hierarchy, Structural Coherence, and Actionability</strong> compared to a default prompt?</p>
            </aside>
          </div>
        </div>
      </section>

      <section id="llm-experiment" className="case-section llm-editorial-section">
        <div className="llm-section-marker"><span>02</span><small>Experiment setting</small></div>
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
        </div>
      </section>

      <section id="llm-process" className="case-section llm-editorial-section">
        <div className="llm-section-marker"><span>03</span><small>Process</small></div>
        <div className="llm-section-content">
          <h2>Four-stage blind evaluation</h2>
          <p className="llm-editorial-lede">To keep evaluation unbiased, the process ran in four stages.</p>
          <div className="process-grid llm-process-line">
            {[["01","Collect","All raw outputs under both conditions","Gemini 3 in Thinking mode"],["02","Anonymise","Removing wording that revealed which condition produced them",""],["03","Randomise","Blind-code the anonymised set before scoring",""],["04","Rate","5 participants and 3 AI models scored every output across three dimensions","A dual validation check between human and machine judgement."]].map(([no,title,body,note]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{body}</p>{note && <small>{note}</small>}</article>)}
          </div>
        </div>
      </section>

      <section id="llm-framework" className="case-section llm-editorial-section">
        <div className="llm-section-marker"><span>04</span><small>Theory framework</small></div>
        <div className="llm-section-content">
          <h2>Three dimensions, one causal chain</h2>
          <div className="llm-framework-intro">
            <span>01 / Evaluation dimensions</span>
            <p>We evaluated LLM output quality across three dimensions, each grounded in existing theory.</p>
          </div>
          <div className="dimension-grid llm-dimension-list">
            <article><h3>Visual Hierarchy (VH)</h3><p>Clear formatting that supports scanning and reduces extraneous cognitive load</p><small>* Sweller, 1988; Mayer, 2009</small></article>
            <article><h3>Structural Coherence (SC)</h3><p>Logical chunking that helps readers extract key ideas efficiently</p><small>* Miller, 1956</small></article>
            <article><h3>Actionability</h3><p>The extent to which content points users toward concrete next steps</p><small>* Pirolli and Card, 2005</small></article>
          </div>
          <p className="llm-causal-statement">Rather than treating these as three separate criteria, framed them as a causal chain: from <strong>perception</strong> to <strong>comprehension</strong> to <strong>action</strong>.</p>
          <div className="llm-models">
            <div className="llm-framework-intro llm-model-intro">
              <span>02 / Supporting models</span>
              <p>Two established models supported this framing from different angles.</p>
            </div>
            <article className="llm-model-row">
              <div><p><strong>Fogg's Behaviour Model (B = MAT)</strong>, well structured and visually organised content enhances user ability by reducing cognitive load, while actionability functions as a trigger that facilitates decision-making.</p></div>
              <CaseImage src="2.png" alt="Fogg Behaviour Model"/>
            </article>
            <article className="llm-model-row">
              <div><p><strong>DeLone &amp; McLean Information Systems Success Model</strong>, where hierarchy and coherence define information quality while actionability defines its realised value.</p></div>
              <CaseImage src="3.png" alt="DeLone and McLean model"/>
            </article>
          </div>
          <div className="llm-editorial-note">
            <p>These dimensions form a trajectory from <strong>perception</strong> to <strong>comprehension</strong> to <strong>action</strong>.</p>
            <p>As the behavioural trigger in this chain, <strong>actionability</strong> is expected to play a more central role in determining overall utility.</p>
            <p>This study empirically tests these three dimensions separately within this causal framework.</p>
          </div>
        </div>
      </section>

      <section id="llm-evidence" className="case-section llm-editorial-section llm-evidence-section">
        <div className="llm-section-marker"><span>05</span><small>Analysis result</small></div>
        <div className="llm-section-content">
          <h2>Data Analysis and Results</h2>
          <p className="llm-key-finding">Expert-persona prompts produced their clearest improvement in <strong>actionability</strong>.</p>

          <article className="llm-evidence-block">
            <header><span>Analysis</span><h3>Analytical Approach: Two-tailed Mann-Whitney U tests</h3></header>
            <p>Two-tailed Mann-Whitney U tests (α = .05) were conducted to compare Condition A (standard prompt) and Condition B (expert prompt) across three dimensions. Each response was rated by five human scorers and three AI models; computed means of per outputs' each dimension before analysis (n = 20 per group).</p>
          </article>

          <article className="llm-evidence-block">
            <header><span>Pattern</span><h3>Descriptive Stats: Humans detected Condition B's superiority</h3></header>
            <p>Human scores showed a consistent positive trend favouring Condition B across all dimensions. The largest gap appeared in Actionability (Mdn A = 2.50, Mdn B = 3.30), followed by Visual Hierarchy (3.80 vs. 4.10) and Structural Coherence (3.80 vs. 4.00). AI scores were notably higher and more compressed (Mdn range: 3.67-4.67), with minimal inter-group separation, suggesting an effect that limited their discriminative sensitivity.</p>
            <div className="chart-grid"><CaseImage src="4.png" alt="Human scoring comparison"/><CaseImage src="5.png" alt="AI scoring comparison"/></div>
          </article>

          <article className="llm-evidence-block">
            <header><span>Significance</span><h3>Mann-Whitney Output: The superiority in Actionability is more obvious</h3></header>
            <p>Only Actionability reached significance (U = 118.5, p = .028, r = .408). The medium effect size indicates that the improvement is not only statistically significant but also practically meaningful. Visual Hierarchy showed a marginal trend toward significance (U = 128.0, p = .052, r = .360); Structural Coherence was non-significant (n.s.) (U = 165.5, p = .369, r = .173).</p>
            <CaseImage src="6.png" alt="Human expert scoring results" className="case-table-placeholder"/>
            <p>In contrast to human raters, AI detected no significant differences across any dimension (all p &gt; .05), suggesting that AI lacks the sensitivity required to capture the subtle UX quality improvements identified by human experts.</p>
            <CaseImage src="7.png" alt="AI scoring results" className="case-table-placeholder"/>
          </article>

          <div className="llm-editorial-conclusion">
            <p>Compared with Condition A, Condition B (expert prompt) significantly outperformed on Actionability (Mdn: 2.50 → 3.30, r = .408) and Visual Hierarchy (p = .052); Structural Coherence is non-significant (p=.369).</p>
            <p>The rank-ordered effect sizes (Actionability r = .408 &gt; Visual Hierarchy r = .360 &gt; Structural Coherence r = .173) are aligned with the theoretical predictions of Fogg's B = MAT model and the DeLone &amp; McLean framework, offering preliminary support for a hierarchical causal relationship among the three dimensions.</p>
            <p>AI raters showed low discriminability across all dimensions.</p>
          </div>
        </div>
      </section>

      <section id="llm-implications" className="case-section llm-editorial-section llm-implications-section">
        <div className="llm-section-marker"><span>06</span><small>UX implications</small></div>
        <div className="llm-section-content">
          <ol className="llm-implication-list">
            <li><span>01</span><p>The <em>persona prefix</em> is a low-cost, flexible approach for improving AI-assisted workflows, worth treating as a genuine <em>UX design decision</em>.</p></li>
            <li><span>02</span><p>The fact that Actionability moved the most, while Visual Hierarchy and Structural Coherence barely shifted, suggests that <em>well-organised output</em> is not the same as usable output: even well-structured content can still leave people unsure what to do next, and <em>clearer action guidance</em> is required to help users move forward.</p></li>
            <li><span>03</span><p>Ratings on Actionability also varied the most between people, hinting that a single fixed output format may not work well for everyone. Future AI interfaces could let users choose among <em>flexible output formats</em>.</p></li>
          </ol>
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
    theory: <><p><em>Piaget (1952) — Stages of Cognitive Development.</em> Children aged 2–7 need dual visual+auditory stimulation and extended wait times; children aged 7–11 need step-by-step structured rules, but the original system treated them identically. This redesign differentiates support by pacing rather than age directly.</p><p><em>Krashen (1982) — Affective Filter Hypothesis.</em> Removing blame from the feedback keeps a young learner's affective filter low and their willingness to keep trying intact.</p></>,
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

function ReadAlongImage({ name, alt, caption, className = '', onClick }) {
  const activate = (event) => {
    if (!onClick) return
    event.stopPropagation()
    onClick()
  }
  return <figure className={`ra-image ${className}`} onClick={activate} onKeyDown={(event) => { if (onClick && (event.key === 'Enter' || event.key === ' ')) activate(event) }} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}><img src={`/read-along/${name}`} alt={alt}/>{caption && <figcaption>{caption}</figcaption>}</figure>
}

function ReadAlongCasePage({ onHome, onContact, onNext }) {
  const [activeSolution, setActiveSolution] = useState(0)
  const [solutionVisible, setSolutionVisible] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const solutionCursor = useRef(null)
  const active = readAlongSolutions[activeSolution]
  const chooseSolution = (index) => {
    setActiveSolution(index)
    setSolutionVisible(false)
  }
  const moveSolutionCursor = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    if (!solutionCursor.current) return
    solutionCursor.current.style.left = `${event.clientX - rect.left}px`
    solutionCursor.current.style.top = `${event.clientY - rect.top}px`
    solutionCursor.current.classList.add('is-visible')
  }
  const hideSolutionCursor = () => solutionCursor.current?.classList.remove('is-visible')
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
          'Classify its current interaction frictions as: how it handles silence, misrecognised words, skipped reading, forced page transitions, and ambiguous manual controls.',
          'Combined Self-Determination Theory and Grounding Theory , redesigned each interaction so children could self-correct and stay in control, enhancing their confidence and engagement.'
        ]}
        chapters={['Overview', 'System mapping', 'Five friction types', 'Solutions']}
        imageSrc="/read-along/1.png"
        imageAlt="Google Read Along interaction analysis and system map"
        result="Five interaction frictions mapped to five autonomy-preserving solutions."
        accent="#278a68"
        accentSoft="#91c8b2"
        diagram
      />

      <section className="case-section ra-overview"><div className="case-section-label">01 / OVERVIEW</div><div className="ra-overview-grid"><div className="ra-overview-copy"><h2>Overview</h2><p>Google Read Along is a voice-interactive reading app designed for children learning a second language. Users read stories aloud to collect stars while the system tracks completion and provides real-time phonetic feedback.</p><p>This project reverse-engineered the app's full interaction logic before evaluating it, classifying exactly where its error-handling system breaks down for young second-language learners.</p><p>Shift from correcting errors to understanding learners, delivering context-aware, developmentally adaptive, and minimally disruptive support that preserves both learning effectiveness and children's autonomy.</p></div><div className="ra-overview-points">{[
        ['01','Full interaction-flow documentation','System-level, single-story, and user-initiated behaviour documented in complete flow charts before any redesign began.'],
        ['02','Five-part error taxonomy','Each error type observed during testing: stagnation, system-detected errors, skip-reading, correction failures, and implicit controls.'],
        ['03','Five scoped redesign solutions','Progressive guidance, toast feedback, coverage checking, layered correction, and explicit state controls — each matched 1:1 to an error type.'],
        ['04','Theoretical grounding','Piaget, Krashen, Nielsen, Ryan & Deci, Clark & Brennan — applied throughout to justify specific design decisions.']
      ].map(([no,title,copy]) => <article key={no}><span>{no}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

      <section className="case-section case-soft ra-mapping"><div className="case-section-label">02 / SYSTEM MAPPING</div><h2>System Mapping</h2><div className="ra-map-stack"><ReadAlongImage name="2.png" alt="Read Along system overview" caption={<><strong>Read Along System Overview: story selection → reading → star rewards</strong><span>This flowchart provides a high-level overview of the entire page experience. Read Along is a voice-interactive system designed around the goal of reading individual stories to collect stars. The system monitors the user’s reading completion rate and provides various feedback or rewards based on performance.</span></>}/><ReadAlongImage name="3.png" alt="System interaction logic and classification" caption={<><strong>System Interaction logic and classification</strong><span>This flowchart illustrates a detailed breakdown of all interactions observed within the system. Divided interaction behaviours into three types: Right Input(Green),No Input(Yellow), Error And Correction(Red).</span></>}/><ReadAlongImage name="4.png" alt="User active interaction" caption={<><strong>User Active Interaction</strong><span>In addition to the visual and auditory feedback provided by the system, users can also engage in autonomous reading interactions. For example, clicking on a word triggers a pronunciation hint, or interacting with the mute notification icon at the bottom of the screen.</span></>}/></div></section>

      <section className="case-section ra-frictions"><div className="case-section-label">03 / FIVE FRICTION TYPES</div><h2>Five Friction Types</h2><p className="case-lede">Interaction testing surfaced five distinct classes of system friction: 4 triggered automatically by the system during single-story interaction, and 1 arising from the system's passive response to user-initiated actions. Each mapped with its own flow chart and theoretical grounding.</p><div className="ra-friction-overview"><div><article><h3>Triggered within the system's automatic recognition flow</h3><ol><li><span>01</span><strong>Reading Stagnation / Hesitation</strong></li><li><span>02</span><strong>System-Detected Reading Error</strong></li><li><span>03</span><strong>Skip-reading</strong></li><li><span>04</span><strong>Error Correction</strong></li></ol></article><ReadAlongImage name="5.png" alt="Four frictions triggered within the system's automatic recognition flow"/></div><div><article><h3>User Lead Interaction, where the system's unclear UI causes user confusion</h3><ol><li><span>05</span><strong>User-initiated actions</strong></li></ol></article><ReadAlongImage name="6.png" alt="User-led interaction friction"/></div></div></section>

      <section className="case-section case-soft ra-solutions"><div className="case-section-label">04 / SOLUTIONS</div><h2>Solutions</h2><p className="case-lede">Interaction testing surfaced five distinct classes of system friction: 4 triggered automatically by the system during single-story interaction, and 1 arising from the system's passive response to user-initiated actions. Each mapped with its own flow chart and theoretical grounding.</p><div className="ra-diagnostic"><div className="ra-friction-tabs" role="tablist" aria-label="Five friction types">{readAlongSolutions.map((item, index) => <button key={item.no} role="tab" aria-label={`${item.no} ${item.friction}`} aria-selected={activeSolution === index} className={activeSolution === index ? 'active' : ''} onClick={() => chooseSolution(index)}><span>{item.no} / {item.friction}</span></button>)}</div><div className={`ra-flip-shell${solutionVisible ? ' is-flipped' : ''}`}><div className="ra-flip-card"><article className="ra-friction-focus" onClick={() => setSolutionVisible(true)} onMouseMove={moveSolutionCursor} onMouseLeave={hideSolutionCursor}><div className="ra-card-meta">FRICTION #{active.no}</div><h3>{active.friction}</h3><p>{active.frictionCopy}</p><ReadAlongImage name={`friction-${activeSolution + 1}.png`} alt={`${active.friction} flow chart`}/><span ref={solutionCursor} className="ra-card-cursor" aria-hidden="true">View solution ↗</span></article><article className="ra-solution-reveal" aria-hidden={!solutionVisible} onClick={() => setSolutionVisible(false)}><div className={`ra-solution-main${activeSolution === 1 || activeSolution === 2 ? ' ra-solution-main-fill' : ''}`}><div className="ra-card-meta">SOLUTION #{active.no}</div><h3>{active.solution}</h3><p>{active.solutionCopy}</p><ReadAlongImage name={`solution-${activeSolution + 1}.png`} alt={`${active.solution} solution flow chart`} className={`ra-zoom-image${activeSolution === 1 || activeSolution === 2 ? ' ra-solution-image-fill' : ''}`} onClick={() => setLightbox({ name: `solution-${activeSolution + 1}.png`, alt: `${active.solution} solution flow chart` })}/></div><aside><span>THEORETICAL GROUNDING</span>{active.theory}</aside></article></div></div></div></section>
    </main>
    {lightbox && <div className="ra-lightbox" role="dialog" aria-modal="true" aria-label="Expanded solution diagram" onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)} aria-label="Close expanded image">Close ×</button><img src={`/read-along/${lightbox.name}`} alt={lightbox.alt} onClick={(event) => event.stopPropagation()}/></div>}
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
      <section className="about-hero section"><div className="about-hero-copy"><h1>I'm Kexin (Cassie) Li</h1><p className="about-role">UX researcher / designer based in London</p><p className="about-lede">I combine strong quantitative skills with qualitative research experience across user interviews, journey mapping, and service design, and think in systems, communicate with stakeholders at every level, and translate research findings into decisions that stick. My background spans UX engineering, furniture engineering, HR management, and academic editing, giving me a broad perspective on how people interact with systems across very different contexts.</p><div className="about-hero-actions"><button className="about-project-btn" onClick={() => go('projects')}>View Project <ArrowDownRight size={17}/></button><button className="about-talk-link" onClick={talk}>Let's talk more <ArrowUpRight size={17}/></button></div></div><div className="about-portrait-wrap" onMouseMove={moveTags} onMouseLeave={resetTags}><img src="/about-photo.jpg" alt="Kexin Li"/><div className="about-tags"><span style={{ '--tx': `${tagOffset.x * .75}px`, '--ty': `${tagOffset.y * .75}px` }}>✦ System Thinker</span><span style={{ '--tx': `${tagOffset.x * -.55}px`, '--ty': `${tagOffset.y * .8}px` }}>✦ Evidence-Driven</span><span style={{ '--tx': `${tagOffset.x * 1.05}px`, '--ty': `${tagOffset.y * -.65}px` }}>✦ Boundary Crosser</span></div></div></section>
      <section className="about-detail section"><div className="section-kicker">EDUCATION</div><div className="education-timeline">{education.map(([date, degree, school, details, avg, distinction]) => <article key={degree}><span className="timeline-date">{date}</span><div><h2>{degree}</h2><p className="school-line">{school}</p><p>{details}</p></div><strong>{avg}{distinction && <><br/><small>{distinction}</small></>}</strong></article>)}</div></section>
      <section className="about-detail experience-detail section" id="experience"><div className="section-kicker">WORK EXPERIENCE</div><div className="experience-lead"><h2>A career spanning<br/><em>many lenses.</em></h2><p>A career spanning HR leadership, UX research, product design, and academic publishing — each chapter deepening a systems-level perspective on how people interact with organisations and products.</p></div><div className="experience-timeline">{experiences.map(([date, role, company, copy, tags]) => <article key={role}><span className="timeline-date">{date}</span><div><h2>{role}</h2><p className="school-line">{company}</p><p>{copy}</p><div className="experience-tags">{tags.split(' · ').map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>
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
  const [page, setPage] = useState('home')
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
  const go = (id) => { if (id === 'about') { setPage('about'); window.scrollTo(0, 0); return } if (id === 'case-study') { setPage('case-study'); window.scrollTo(0, 0); return } if (id === 'calmo') { setPage('calmo'); window.scrollTo(0, 0); return } if (id === 'read-along') { setPage('read-along'); window.scrollTo(0, 0); return } if (id === 'bodycodes') { setPage('bodycodes'); window.scrollTo(0, 0); return } if (id === 'human-factors') { setPage('human-factors'); window.scrollTo(0, 0); return } setPage('home'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 0) }
  const openProjectPage = (index) => go(projectRoutes[index])
  const parallax = (xFactor, yFactor) => ({ '--px': `${cursor.x * xFactor}px`, '--py': `${cursor.y * yFactor}px` })
  const copyEmail = async () => { await navigator.clipboard.writeText('kekli0921@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 1700) }
  const animateCursor = () => { cursorFrame.current = null; setCursor(current => { const next = { x: current.x + (cursorTarget.current.x - current.x) * .16, y: current.y + (cursorTarget.current.y - current.y) * .16 }; if (Math.abs(next.x - cursorTarget.current.x) > .05 || Math.abs(next.y - cursorTarget.current.y) > .05) cursorFrame.current = requestAnimationFrame(animateCursor); return next }) }
  const handleMove = (event) => { const rect = event.currentTarget.getBoundingClientRect(); cursorTarget.current = { x: ((event.clientX - rect.left) / rect.width - .5) * 60, y: ((event.clientY - rect.top) / rect.height - .5) * 60 }; if (!cursorFrame.current) cursorFrame.current = requestAnimationFrame(animateCursor) }
  const resetCursor = () => { cursorTarget.current = { x: 0, y: 0 }; if (!cursorFrame.current) cursorFrame.current = requestAnimationFrame(animateCursor) }

  if (page === 'about') return <AboutPage go={go} onHome={() => { setPage('home'); window.scrollTo(0, 0) }} />
  if (page === 'case-study') return <CaseStudyPage onHome={() => { setPage('home'); window.scrollTo(0, 0) }} onContact={() => go('contact')} onNext={() => go('calmo')} />
  if (page === 'calmo') return <><CalmoPage onHome={() => { setPage('home'); window.scrollTo(0, 0) }} onContact={() => go('contact')} onNext={() => go('read-along')} /><CaseToc rootSelector=".calmo-page" accent="#d88143" items={['01 / OVERVIEW', '02 / DISCOVERING THE GAP', '03 / DEFINING THE TRANSITION', '04 / DESIGNING THE SYSTEM', '05 / TESTING & ITERATION', '06 / FINAL DESIGN & PROTOTYPE', '07 / RESPONSIBILITY & REFLECTION']} /></>
  if (page === 'read-along') return <><ReadAlongCasePage onHome={() => { setPage('home'); window.scrollTo(0, 0) }} onContact={() => go('contact')} onNext={() => go('bodycodes')} /><CaseToc rootSelector=".readalong-page" accent="#278a68" items={['01 / OVERVIEW', '02 / SYSTEM MAPPING', '03 / FIVE FRICTION TYPES', '04 / SOLUTIONS']} /></>
  if (page === 'bodycodes') return <><BodyCodesPage onHome={() => { setPage('home'); window.scrollTo(0, 0) }} onContact={() => go('contact')} onNext={() => go('human-factors')} /><CaseToc rootSelector=".bodycodes-page" accent="#287662" items={['01 / OVERVIEW & MY ROLE', '02 / WHY CORPORATE UNIFORMS', '03 / UNDERSTANDING THE CURRENT SYSTEM', '04 / DESIGN STRATEGY', '05 / PROPOSED SERVICE', '06 / MAKING IT VIABLE', '07 / REFLECTION & NEXT STEPS']} /></>
  if (page === 'human-factors') return <><HumanFactorsPage onHome={() => { setPage('home'); window.scrollTo(0, 0) }} onContact={() => go('contact')} onNext={() => go('case-study')} /><CaseToc rootSelector=".human-factors-page" accent="#76629d" items={['01 / RESEARCH PREMISE', '02 / STUDY OVERVIEW', '03 / EXPERIMENT 01', '04 / EXPERIMENT 02', '05 / EXPERIMENT 03', '06 / CROSS-STUDY SYNTHESIS', '07 / UX PRINCIPLES & REFLECTION']} /></>

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
        <button type="button" className="float-tag tag-a" style={parallax(.87,-.43)} onClick={() => go('case-study')} aria-label="View LLM Prompt Design project">#UX Research</button><button type="button" className="float-tag tag-b" style={parallax(-.52,.71)} onClick={() => go('read-along')} aria-label="View Google Read Along project">#UX Design</button><button type="button" className="float-tag tag-c" style={parallax(.61,.82)} onClick={() => go('bodycodes')} aria-label="View BodyCodes project">#Service Design</button><button type="button" className="float-tag tag-d" style={parallax(-.92,-.51)} onClick={() => go('calmo')} aria-label="View CALMO project">#UI Design</button><button type="button" className="float-tag tag-e" style={parallax(.34,-.92)} onClick={() => go('human-factors')} aria-label="View Human Factors project">#Human Factor</button>
        <p>OPEN TO WORK<br/><span>London · UK</span></p><button className="circle-link hero-select" onClick={() => go('projects')}>Selected<br/>work <ArrowDownRight size={20}/></button>
      </div>
    </section>

    <section id="projects" className="projects section">
      <div className="project-head home-reveal"><div className="section-kicker">SELECTED PROJECTS</div><p>Five investigations in interaction, trust, behaviour and better systems.</p></div>
      <div className="project-list">{projects.map((p, index) => <article className={`project-card home-reveal${openProject === index ? ' is-open' : ''}`} key={p.title}>
        <button className="project-main" onClick={(event) => { if (openProject === index && event.target.closest('.project-title h3')) { openProjectPage(index); return } setOpenProject(openProject === index ? null : index) }} aria-expanded={openProject === index}>
          <div className="project-title"><h3><strong>{p.title}</strong><span className="project-subtitle">{p.subtitle}</span></h3><div><p>{p.type}</p>{p.award && <small>{p.award}</small>}</div></div>
          <img className="project-image" src={p.image} alt={`${p.title.replace('\n', ' ')} project preview`} />
          <ChevronDown className={openProject === index ? 'rotated' : ''}/>
        </button>
        {openProject === index && <div className="project-detail"><div><p>{p.detail}</p><div>{p.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div><button className="view-more" onClick={() => openProjectPage(index)}>View more <ArrowUpRight size={15}/></button></div>}
      </article>)}</div>
    </section>

    <section id="about" className="about section">
      <div className="section-kicker home-reveal">ABOUT ME</div>
      <div className="home-info-layout about-info-layout">
        <div className="about-content home-info-primary home-reveal"><h2>Research-led.<br/><em>human-centric.</em><br/>Always curious.</h2><div><p className="body-copy">I think in systems, communicate with stakeholders at every level, and translate research findings into decisions that stick. My background spans UX engineering, furniture engineering, HR management and academic editing — giving me a broad perspective on how people interact with systems across very different contexts.</p><button className="text-link" onClick={() => go('about')}>Learn more about me <ArrowDownRight size={17}/></button></div></div>
        <div className="skill-explorer home-info-side home-reveal" data-area={activeSkills}>
          <div className="skill-switch" role="tablist" aria-label="Skills">
            {Object.entries(skillSets).map(([key, set]) => <button key={key} className={activeSkills === key ? 'active' : ''} onClick={() => setActiveSkills(key)} role="tab" aria-selected={activeSkills === key}>{set.label}</button>)}
          </div>
          <div className="skill-panel" key={activeSkills} role="tabpanel">
            <div className="skill-panel-intro"><p className="skill-panel-line">{skillSets[activeSkills].line}</p><p>{skillSets[activeSkills].intro}</p></div>
            <div className="skill-groups">{skillSets[activeSkills].groups.map(([group, tags]) => <article key={group}><h3>{group}</h3><div>{tags.map((tag, index) => <span className="skill-tag" style={{ '--tag-index': index }} key={tag}>{tag}</span>)}</div></article>)}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="experience" className="experience section">
      <div className="section-kicker home-reveal">EXPERIENCE</div>
      <div className="home-info-layout experience-info-layout">
        <div className="experience-intro home-info-primary home-reveal"><h2>Every chapter<br/>adds a new <em>lens.</em></h2><div><p>A career across HR leadership, UX research, product design and academic publishing — each deepening a systems-level perspective on people, organisations and products.</p><button className="text-link" onClick={() => go('about')}>Learn more about me <ArrowDownRight size={17}/></button></div></div>
        <div className="recognition home-info-side home-reveal"><p className="label">RECOGNITION</p><div className="award-grid"><a className="award-card" style={{ '--award-image': "url('/awards/ux-design-award.png')", '--award-bg': '#ffffff' }} href="https://ux-design-awards.com/winners/2026-2-calmo-a-transition-system-for-retired-police-dogs" target="_blank" rel="noreferrer"><p>2026 / German</p><h3>UX Design Award</h3><strong>Nominated(Ongoing), International Design Center Berlin</strong></a><article className="award-card" style={{ '--award-image': "url('/awards/jiangsu-industrial-design.png')", '--award-bg': '#ffffff' }}><p>2019 / CHINA</p><h3>Industrial Design Award</h3><strong>Second Prize, Jiangsu Provincial</strong></article><article className="award-card" style={{ '--award-image': "url('/awards/alberta-home-design.png')", '--award-bg': '#006448', '--award-fill': 'linear-gradient(90deg, #006448 0%, #00694b 100%)' }}><p>2017 / CANADA</p><h3>Home Design Award</h3><strong>Finalist, Alberta Cup Rabbit Baby</strong></article></div></div>
      </div>
    </section>

    <section id="contact" className="contact"><div className="home-reveal"><p className="eyebrow">AVAILABLE FOR OPPORTUNITIES & COLLABORATIONS</p><h2>Let’s build<br/>something <em>meaningful.</em></h2></div><div className="contact-actions home-reveal"><button className="email copy-email" onClick={copyEmail} aria-label="Copy email address">{copied ? <><Check size={18}/> Copied</> : <>kekli0921@gmail.com <span>Copy</span></>}</button><a className="contact-line linkedin" href="https://linkedin.com/in/hellocassie" target="_blank" rel="noreferrer">in&nbsp; LinkedIn <ArrowUpRight size={15}/></a><a className="contact-line" href="tel:+447471678588"><Phone size={15}/> +44 7471 678588</a></div></section>
    <footer><button className="brand" onClick={() => go('top')}>KEXIN LI<span>.</span></button><p>Thinking in systems / Building in pixels</p><div><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://linkedin.com/in/hellocassie" aria-label="LinkedIn">in</a><a href="mailto:kekli0921@gmail.com" aria-label="Email"><Mail size={18}/></a></div><p className="copyright">© 2026 Kexin Li</p></footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
