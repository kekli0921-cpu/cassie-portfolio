import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight, ArrowUpRight, ChevronDown,
  Mail, Menu, MoveDown, Phone, X
} from 'lucide-react'
import './styles.css'

const projects = [
  {
    no: '01',
    title: 'Does giving an AI\na role change its output?',
    type: 'Research / AI',
    tags: ['A/B Testing', 'Experimental Design', 'Quantitative Analysis', 'AI/LLM Prompt Research'],
    accent: 'ink',
    year: '2025',
    description: 'A controlled A/B experiment examining whether an Information Architecture Expert role improves AI response quality.',
    detail: 'Collected outputs under both conditions, evaluated them across three dimensions, and ran Mann–Whitney U tests. Expert-persona prompts produced significantly more structured outputs, while user variation remained high. The work points toward personalised role suggestions that reduce interaction cost.'
  },
  {
    no: '02',
    title: 'BodyCodes',
    type: 'Service Design',
    tags: ['Service Design', 'Journey Mapping', 'Service Blueprinting', 'Stakeholder Analysis'],
    accent: 'orange',
    year: '2025',
    description: 'Designing trust and an expansion pathway for a new body-data sizing standard.',
    detail: 'Mapped procurement journeys across uniforms, footwear and vehicle ergonomics. Proposed a phased expansion pathway and a data-governance framework to turn BodyCodes from a single sizing vendor into foundational infrastructure for an occupational-fit ecosystem.'
  },
  {
    no: '03',
    title: 'Google\nRead Along',
    type: 'UX Redesign',
    tags: ['Interaction Analysis', 'Cognitive Psychology', 'System Mapping', 'UX Optimise'],
    accent: 'blue',
    year: '2026',
    award: 'UX Design Award · Nominated',
    description: 'Returning autonomy and confidence to children learning to read independently.',
    detail: 'Diagnosed five interaction frictions: silence, misrecognition, skipped reading, forced transitions and unclear manual controls. Using Self-Determination and Grounding Theory, each interaction was redesigned to help children self-correct and keep control.'
  },
  {
    no: '04',
    title: 'CALMO',
    type: 'Product / UI',
    tags: ['Double Diamond', 'Persona & Journey Mapping', 'Competitive Analysis', 'UI Design'],
    accent: 'green',
    year: '2025',
    description: 'A gentler transition system for retired police dogs and their adopters.',
    detail: 'From research and framing through prototype iteration, CALMO pairs a smart pod with a companion app. It tracks a dog’s condition, gives non-invasive support, and translates behaviour into clear guidance that builds adopter confidence.'
  },
  {
    no: '05',
    title: 'Human Factors',
    type: 'Research',
    tags: ['Multi-biosensor Research', 'EEG', 'Product Design', 'Eye Tracking'],
    accent: 'lilac',
    year: '2025',
    description: 'Multimodal physiological research for more responsive product experiences.',
    detail: 'A controlled research study combining EEG, eye tracking and product interaction signals to understand how people respond to designed experiences. The project explores how biometric insight can inform decisions with greater care and clarity.'
  }
]

const education = [
  ['2025—', 'MSc, UX Engineering', 'Goldsmiths, University of London', 'Computing the UX · Research Method · Interaction Science · Human Factor · Service Design · Low Code', 'Avg. 76.5'],
  ['2019—2022', 'MEng, Furniture Design Engineering', 'Nanjing Forestry University, China', 'First Class Scholarship · Academic Scholarship · Merit Student', 'Avg. 87'],
  ['2015—2019', 'BEng, Furniture Design', 'Nanjing Forestry University, China', 'Excellent Graduate · Merit Student Scholarship · Student Leader', 'Avg. 90']
]

const experience = [
  ['2022—2025', 'Senior HR Officer', 'China Unicom · China', 'Redesigned a role-specific candidate screening pipeline and structured assessment stage, improving recruitment efficiency and role-fit quality. Designed targeted training programmes around organisational skill gaps.'],
  ['2021', 'Research Intern', 'Haitai Olin Group · China', 'Researched the daily needs and physical constraints of elderly users in retirement communities, producing a needs-led research report for vulnerable groups.'],
  ['2020—2021', 'Product Design Intern', 'Red Star Macalline Group · China', 'Designed home products for the Alibaba × NetEase Onmyoji collaboration, translating game visual identity into physical product design.'],
  ['2020', 'Consultant Assistant', 'Nanjing Cognitive IoT Research Institute · China', 'Researched how industrial-design companies could empower IoT development across technical, policy and user-facing dimensions.'],
  ['2018—2020', 'Editor', 'Furniture Magazine · China', 'Managed article review, graphic design and visual layout for a core academic journal.']
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openProject, setOpenProject] = useState(null)
  const nav = [['About', 'about'], ['Projects', 'projects'], ['Experience', 'experience'], ['Contact', 'contact']]
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  return <main>
    <header className="topbar">
      <button className="brand" onClick={() => go('top')} aria-label="Back to top">CASSIE LI<span>.</span></button>
      <nav className="desktop-nav">{nav.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      {menuOpen && <div className="mobile-nav">{nav.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}<ArrowUpRight size={18}/></button>)}</div>}
    </header>

    <section id="top" className="hero grain">
      <div className="hero-copy">
        <p className="eyebrow">UX DESIGNER / RESEARCHER / SYSTEM THINKER</p>
        <h1>Making complex<br/><em>systems</em> feel human.</h1>
        <p className="intro">I combine quantitative rigour and qualitative research to translate human insight into decisions that stick.</p>
        <button className="circle-link" onClick={() => go('projects')}>Selected<br/>work <ArrowDownRight size={22}/></button>
      </div>
      <div className="hero-art" aria-label="Abstract visual composition">
        <div className="sun"></div><div className="arc"></div><div className="orb orb-a"></div><div className="orb orb-b"></div>
        <p>KEXIN (CASSIE) LI<br/><span>London · UK</span></p>
      </div>
      <MoveDown className="scroll-mark" size={20}/>
    </section>

    <section id="about" className="about section">
      <div className="section-kicker">01 / ABOUT ME</div>
      <div className="about-content">
        <h2>Research-led.<br/>People-first.<br/><em>Always curious.</em></h2>
        <div><p className="body-copy">I think in systems, communicate with stakeholders at every level, and translate research findings into decisions that stick. My background spans UX engineering, furniture engineering, HR management and academic editing — giving me a broad perspective on how people interact with systems across very different contexts.</p>
        <a className="text-link" href="mailto:kekli0921@gmail.com">Let’s work together <ArrowUpRight size={17}/></a></div>
      </div>
      <div className="skill-grid">
        <div><p className="label">RESEARCH</p><p>User Interviews · Journey Mapping · Usability Testing · Survey Design · A/B Testing · Prototyping · Eye-tracking · EEG · EMG</p></div>
        <div><p className="label">TOOLS</p><p>Figma · Photoshop · Illustrator · InDesign · Rhino · 3ds Max · Keyshot · CAD</p></div>
      </div>
    </section>

    <section id="projects" className="projects section">
      <div className="project-head"><div className="section-kicker">02 / SELECTED PROJECTS</div><p>Five investigations in interaction, trust, behaviour and better systems.</p></div>
      <div className="project-list">{projects.map((p, index) => <article className={`project-card ${p.accent}`} key={p.no}>
        <button className="project-main" onClick={() => setOpenProject(openProject === index ? null : index)} aria-expanded={openProject === index}>
          <div className="project-index">{p.no}<span>{p.year}</span></div>
          <div className="project-title"><h3>{p.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i < p.title.split('\n').length - 1 && <br/>}</React.Fragment>)}</h3><p>{p.type}</p></div>
          <div className="project-shape"><span></span><span></span><span></span></div>
          <ChevronDown className={openProject === index ? 'rotated' : ''}/>
        </button>
        {openProject === index && <div className="project-detail"><p>{p.detail}</p>{p.award && <strong>{p.award}</strong>}<div>{p.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div>}
      </article>)}</div>
    </section>

    <section className="education section">
      <div className="section-kicker">03 / EDUCATION</div>
      <div className="education-list">{education.map(([date, degree, school, details, avg]) => <article key={degree}><p className="date">{date}</p><div><h3>{degree}</h3><p className="school">{school}</p><p className="detail-line">{details}</p></div><strong>{avg}</strong></article>)}</div>
    </section>

    <section id="experience" className="experience section">
      <div className="section-kicker">04 / EXPERIENCE</div>
      <div className="experience-intro"><h2>Every chapter<br/>adds a new <em>lens.</em></h2><p>A career across HR leadership, UX research, product design and academic publishing — each deepening a systems-level perspective on people, organisations and products.</p></div>
      <div className="experience-list">{experience.map(([date, role, company, copy]) => <article key={role}><p className="date">{date}</p><div><h3>{role}</h3><p className="school">{company}</p></div><p>{copy}</p></article>)}</div>
    </section>

    <section className="awards section"><div className="section-kicker">05 / RECOGNITION</div><div className="award-grid">
      <article><span>01</span><p>2026 / PROGRESSING</p><h3>UX Design Award</h3><strong>Nominated</strong></article>
      <article><span>02</span><p>2019 / CHINA</p><h3>Industrial Design Award</h3><strong>Second Prize, Jiangsu Provincial</strong></article>
      <article><span>03</span><p>2017 / CANADA</p><h3>Home Design Award</h3><strong>Finalist, Alberta Cup Rabbit Baby</strong></article>
    </div></section>

    <section id="contact" className="contact"><div><p className="eyebrow">AVAILABLE FOR OPPORTUNITIES & COLLABORATIONS</p><h2>Let’s build<br/>something <em>meaningful.</em></h2></div><a className="email" href="mailto:kekli0921@gmail.com">kekli0921@gmail.com <ArrowUpRight/></a><div className="contact-links"><a href="tel:+447471678588"><Phone size={16}/> +44 7471 678588</a><a href="https://linkedin.com/in/hellocassie" target="_blank" rel="noreferrer">in&nbsp; LinkedIn</a></div></section>
    <footer><button className="brand" onClick={() => go('top')}>CASSIE LI<span>.</span></button><p>Thinking in systems / Building in pixels</p><div><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://linkedin.com/in/hellocassie" aria-label="LinkedIn">in</a><a href="mailto:kekli0921@gmail.com" aria-label="Email"><Mail size={18}/></a></div><p className="copyright">© 2026 Kexin (Cassie) Li</p></footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
