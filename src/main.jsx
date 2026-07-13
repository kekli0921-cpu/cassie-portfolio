import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'
import './styles.css'

const projects = [
  { no: '01', title: 'Does giving an AI\na role change its output?', type: 'Research / AI', year: '2026', image: '/projects/ai-role.png', tags: ['A/B Testing', 'Experimental Design', 'Quantitative Analysis', 'AI/LLM Prompt Research'], detail: <>Ran a controlled A/B experiment to test whether prompting an AI with a defined Information Architecture (IA) Expert role improves its response quality.<br/><br/>Collected outputs under both conditions, evaluated outputs across three dimensions, ran Mann-Whitney U tests to analyse results statistically.<br/><br/>Found expert-persona prompts had significantly better-structured outputs, but varied widely among users. Suggest LLMs offer more personalised options, like an appropriate role based on input and task type, to reduce interaction cost and improve efficiency.</> },
  { no: '02', title: 'CALMO', type: 'Product / UI', year: '2026', image: '/projects/calmo.png', award: 'UX Design Award · Nominated', tags: ['Double Diamond', 'Persona & Journey Mapping', 'Competitive Analysis', 'UI Design'], detail: <>Retired working dogs often struggle emotionally when transitioning into home life, and new adopters failed to read or respond to their stress signals.<br/><br/>Followed a double-diamond design process, through research, problem framing, and prototype iteration, to ultimately design CALMO.<br/><br/>Through a smart pod and companion app, CALMO monitors dogs’ condition in real-time. It helps dogs reduce stress non-invasively by offering dynamic transition progress; builds adopter confidence by explaining dog behaviour; and bridges the gap between working and domestic life for retired police dogs.</> },
  { no: '03', title: 'Google\nRead Along', type: 'UX Redesign', year: '2026', image: '/projects/readalong.png', tags: ['Interaction Analysis', 'Cognitive Psychology', 'System Mapping', 'UX Optimise'], detail: <>Google Read Along is a reading app that uses speech recognition to help children practise independently.<br/><br/>Its current interaction logic creates friction across five categories: silence, misrecognised words, skipped reading, forced page transitions, and ambiguous manual controls.<br/><br/>Combined Self-Determination Theory (user autonomy) and Grounding Theory (shared understanding between user and system), redesigning each interaction so children could self-correct and stay in control, enhancing their confidence and engagement.</> },
  { no: '04', title: 'BodyCodes', type: 'Service Design', year: '2026', image: '/projects/bodycodes.png', tags: ['Service Design', 'Journey Mapping', 'Service Blueprinting', 'Stakeholder Analysis'], detail: <>Working with BodyCodes, a new sizing standard built on personal body identity and scan data. The company already had the technology, but concerns about user trust and fragmented industry-wide uptake limited adoption.<br/><br/>Mapped procurement journeys and pain points across uniforms, footwear and vehicle ergonomics, then proposed a phased business expansion pathway alongside a data-governance framework that limits how sensitive body data could be used.<br/><br/>Repositioned BodyCodes from a single sizing vendor into the foundational body-data infrastructure for a wider occupational-fit ecosystem.</> },
  { no: '05', title: 'Human Factors', type: 'Research', year: '2025', image: '/projects/human-factors.png', tags: ['Multi-biosensor Research', 'EEG', 'Eye Tracking', 'EMG'], detail: <>Three lab experiments tested whether physiological data actually matches what users say they feel — a core assumption in UX research.<br/><br/>Biosensors (EMG, ECG, skin temperature) during a racing game found background sound did not raise baseline arousal, but amplified emotional intensity at key moments and boosted enjoyment. EEG/ECG comparing meditation with high-arousal music showed meditation produced calmer but slower responses, while music produced faster but less stable ones.<br/><br/>Eye-tracking on Bionic Reading found smoother scan paths and lower effort, but comprehension accuracy dropped, showing that easier reading is not necessarily deeper reading.</> }
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openProject, setOpenProject] = useState(null)
  const [copied, setCopied] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const nav = [['Projects', 'projects'], ['About', 'about'], ['Experience', 'experience'], ['Contact', 'contact']]
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  const parallax = (xFactor, yFactor) => ({ '--px': `${cursor.x * xFactor}px`, '--py': `${cursor.y * yFactor}px` })
  const copyEmail = async () => { await navigator.clipboard.writeText('kekli0921@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 1700) }
  const handleMove = (event) => { const rect = event.currentTarget.getBoundingClientRect(); setCursor({ x: ((event.clientX - rect.left) / rect.width - .5) * 60, y: ((event.clientY - rect.top) / rect.height - .5) * 60 }) }

  return <main>
    <header className="topbar">
      <button className="brand" onClick={() => go('top')} aria-label="Back to top">KEXIN LI<span>.</span></button>
      <nav className="desktop-nav">{nav.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      {menuOpen && <div className="mobile-nav">{nav.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}<ArrowUpRight size={18}/></button>)}</div>}
    </header>

    <section id="top" className="hero grain" onMouseMove={handleMove} onMouseLeave={() => setCursor({ x: 0, y: 0 })}>
      <div className="hero-copy">
        <p className="eyebrow">UX RESEARCHER / DESIGNER / SYSTEM THINKER</p>
        <h1><span>Hi,</span><span>I’m Kexin Li.</span></h1>
        <h2 className="hero-sub">UX researcher / designer<br/>with a multi-disciplinary background.</h2>
        <p className="intro">I combine quantitative rigour and qualitative research to translate human insight into decisions that stick.</p>
        <button className="circle-link" onClick={() => go('projects')}>Selected<br/>work <ArrowDownRight size={20}/></button>
      </div>
      <div className="hero-tags" aria-label="UX design disciplines">
        <span className="hero-icon icon-grid" style={parallax(-.71,.52)}>✦</span><span className="hero-icon icon-arrow" style={parallax(.46,-.37)}>↗</span><span className="hero-icon icon-ring" style={parallax(-.58,-.83)}>◌</span><span className="hero-icon icon-star" style={parallax(.78,.36)}>✷</span>
        <span className="float-tag tag-a" style={parallax(.87,-.43)}>#UX Research</span><span className="float-tag tag-b" style={parallax(-.52,.71)}>#UX Design</span><span className="float-tag tag-c" style={parallax(.61,.82)}>#Service Design</span><span className="float-tag tag-d" style={parallax(-.92,-.51)}>#UI Design</span>
        <p>OPEN TO WORK<br/><span>London · UK</span></p><button className="circle-link hero-select" onClick={() => go('projects')}>Selected<br/>work <ArrowDownRight size={20}/></button>
      </div>
    </section>

    <section id="projects" className="projects section">
      <div className="project-head"><div className="section-kicker">01 / SELECTED PROJECTS</div><p>Five investigations in interaction, trust, behaviour and better systems.</p></div>
      <div className="project-list">{projects.map((p, index) => <article className="project-card" key={p.no}>
        <button className="project-main" onClick={() => setOpenProject(openProject === index ? null : index)} aria-expanded={openProject === index}>
          <div className="project-index">{p.no}<span>{p.year}</span></div>
          <div className="project-title"><h3>{p.title.split('\n').map((line, i) => <React.Fragment key={line}>{line}{i === 0 && p.title.includes('\n') && <br/>}</React.Fragment>)}</h3><div><p>{p.type}</p>{p.award && <small>{p.award}</small>}</div></div>
          <img className="project-image" src={p.image} alt={`${p.title.replace('\n', ' ')} project preview`} />
          <ChevronDown className={openProject === index ? 'rotated' : ''}/>
        </button>
        {openProject === index && <div className="project-detail"><div><p>{p.detail}</p>{p.award && <strong>{p.award}</strong>}<div>{p.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div><button className="view-more">View more <ArrowUpRight size={15}/></button></div>}
      </article>)}</div>
    </section>

    <section id="about" className="about section">
      <div className="section-kicker">02 / ABOUT ME</div>
      <div className="about-content"><h2>Research-led.<br/>People-first.<br/><em>Always curious.</em></h2><div><p className="body-copy">I think in systems, communicate with stakeholders at every level, and translate research findings into decisions that stick. My background spans UX engineering, furniture engineering, HR management and academic editing — giving me a broad perspective on how people interact with systems across very different contexts.</p><button className="text-link" onClick={() => go('experience')}>Learn more about me <ArrowDownRight size={17}/></button></div></div>
      <div className="skill-grid"><div><p className="label">RESEARCH</p><p>User Interviews · Journey Mapping · Usability Testing · Survey Design · A/B Testing · Prototyping · Eye-tracking · EEG · EMG</p></div><div><p className="label">TOOLS</p><p>Figma · Photoshop · Illustrator · InDesign · Rhino · 3ds Max · Keyshot · CAD</p></div></div>
    </section>

    <section id="experience" className="experience section">
      <div className="section-kicker">03 / EXPERIENCE</div>
      <div className="experience-intro"><h2>Every chapter<br/>adds a new <em>lens.</em></h2><div><p>A career across HR leadership, UX research, product design and academic publishing — each deepening a systems-level perspective on people, organisations and products.</p><button className="text-link" onClick={() => go('contact')}>Learn more about me <ArrowDownRight size={17}/></button></div></div>
      <div className="recognition"><p className="label">RECOGNITION</p><div className="award-grid"><a className="award-card" href="https://ux-design-awards.com/winners/2026-2-calmo-a-transition-system-for-retired-police-dogs" target="_blank" rel="noreferrer"><span>01</span><p>2026 / German</p><h3>UX Design Award</h3><strong>Nominated(Ongoing), International Design Center Berlin</strong></a><article className="award-card"><span>02</span><p>2019 / CHINA</p><h3>Industrial Design Award</h3><strong>Second Prize, Jiangsu Provincial</strong></article><article className="award-card"><span>03</span><p>2017 / CANADA</p><h3>Home Design Award</h3><strong>Finalist, Alberta Cup Rabbit Baby</strong></article></div></div>
    </section>

    <section id="contact" className="contact"><div><p className="eyebrow">AVAILABLE FOR OPPORTUNITIES & COLLABORATIONS</p><h2>Let’s build<br/>something <em>meaningful.</em></h2></div><div className="contact-actions"><button className="email copy-email" onClick={copyEmail} aria-label="Copy email address">{copied ? <><Check size={18}/> Copied</> : <>kekli0921@gmail.com <span>Copy</span></>}</button><a className="contact-line linkedin" href="https://linkedin.com/in/hellocassie" target="_blank" rel="noreferrer">in&nbsp; LinkedIn <ArrowUpRight size={15}/></a><a className="contact-line" href="tel:+447471678588"><Phone size={15}/> +44 7471 678588</a></div></section>
    <footer><button className="brand" onClick={() => go('top')}>KEXIN LI<span>.</span></button><p>Thinking in systems / Building in pixels</p><div><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://linkedin.com/in/hellocassie" aria-label="LinkedIn">in</a><a href="mailto:kekli0921@gmail.com" aria-label="Email"><Mail size={18}/></a></div><p className="copyright">© 2026 Kexin Li</p></footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
