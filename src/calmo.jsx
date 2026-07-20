import React, { useEffect, useState } from 'react'
import { ArrowRight, Expand, ExternalLink, Play, X } from 'lucide-react'
import './calmo.css'
import { CaseFooter, CaseHeader, EditorialCaseHero } from './case-chrome.jsx'

const prototypeUrl = 'https://tall-pony-86222120.figma.site'
const vimeoUrl = 'https://player.vimeo.com/video/1177305647?title=0&byline=0&portrait=0&dnt=1'

function CalmoImage({ name, alt, caption, onExpand, className = '' }) {
  return <figure className={`calmo-image ${className}`}>
    <button type="button" onClick={() => onExpand({ name, alt })} aria-label={`Expand ${caption || alt}`}>
      <img src={`/calmo/${name}`} alt={alt}/>
      <span><Expand size={15}/> Expand</span>
    </button>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

function PrototypeModal({ onClose }) {
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return <div className="calmo-prototype-modal" role="dialog" aria-modal="true" aria-label="Interactive CALMO prototype">
    <div className="calmo-prototype-toolbar">
      <div><span>INTERACTIVE PROTOTYPE</span><strong>Explore the CALMO companion app</strong></div>
      <div><a href={prototypeUrl} target="_blank" rel="noreferrer">Open full prototype <ExternalLink size={15}/></a><button type="button" onClick={onClose}><X size={18}/> Close</button></div>
    </div>
    <div className="calmo-phone-frame">
      <div className="calmo-phone-speaker" aria-hidden="true"/>
      <iframe src={prototypeUrl} title="CALMO interactive companion app prototype" allow="fullscreen" loading="eager"/>
    </div>
    <p>If the embedded prototype is unavailable in your browser, use “Open full prototype” above.</p>
  </div>
}

const researchMethods = [
  ['01', 'Secondary research', 'Stress physiology, behavioural signals, sensory intervention and feasible non-contact sensing.'],
  ['02', 'Questionnaire', '10 distributed and 5 valid responses from potential adopters with more than six months of dog ownership.'],
  ['03', 'Competitive analysis', 'Compared products across monitoring, calming support, adopter guidance and post-adoption continuity.'],
  ['04', 'Stakeholder mapping', 'Connected dogs, adopters, police organisations, trainers, animal welfare groups and technology partners.']
]

const finalModules = [
  ['Dashboard', 'A calm overview of the dog’s current state, transition progress and recent signals.'],
  ['Stress Alert', 'Translates a detected change into a plain-language explanation and an appropriate next action.'],
  ['Calm Environment', 'Lets adopters adjust white noise, scent and timing while retaining manual control.'],
  ['Behaviour Understanding', 'Combines observable behaviour with sensor patterns to explain what a signal may mean.'],
  ['History', 'Shows change over time so progress is based on behaviour rather than a fixed countdown.'],
  ['Profile', 'Stores context, preferences and professional guidance for a personalised transition plan.']
]

export default function CalmoPage({ onHome, onContact, onNext }) {
  const [lightbox, setLightbox] = useState(null)
  const [prototypeOpen, setPrototypeOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = lightbox || prototypeOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox, prototypeOpen])

  return <div className="case-page case-redesign calmo-page">
    <CaseHeader onHome={onHome} onContact={onContact}/>

    <main>
      <EditorialCaseHero
        rootSelector=".calmo-page"
        eyebrow="2026 · TRANSITION SYSTEM · UX DESIGN AWARD NOMINEE"
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

      <section className="case-section calmo-overview">
        <div className="case-section-label">01 / OVERVIEW</div>
        <div className="calmo-overview-grid">
          <div>
            <span className="calmo-kicker">THE PROJECT IN PLAIN LANGUAGE</span>
            <h2>Transition is a period, not a moment</h2>
            <p>Working dogs are trained to stay alert, follow routines and respond to cues. Retirement removes that structure almost overnight. Adopters then have to interpret stress, hesitation and unfamiliar behaviour without the professional support that surrounded the dog during service.</p>
            <p>CALMO makes this invisible transition easier to understand. It turns behavioural and non-contact sensor signals into cautious, explainable guidance while keeping the adopter — and, when needed, a trainer — in the decision loop.</p>
          </div>
          <aside>
            <span>DESIGN QUESTION</span>
            <blockquote>How might we help retired police dogs gradually adapt to family life while helping adopters recognise and respond to their emotional needs?</blockquote>
          </aside>
        </div>
        <div className="calmo-system-line" aria-label="CALMO support system">
          {['Dog signals','CALMO pod','Behaviour interpretation','Adopter action','Transition history'].map((item, index) => <React.Fragment key={item}><div><span>0{index + 1}</span>{item}</div>{index < 4 && <ArrowRight aria-hidden="true"/>}</React.Fragment>)}
        </div>
      </section>

      <section className="case-section case-soft calmo-discovery">
        <div className="case-section-label">02 / DISCOVERING THE GAP</div>
        <h2>The dog carries working-life habits into a home that cannot read them</h2>
        <p className="case-lede">Research combined behavioural evidence, adopter perspectives, market comparison and system feasibility. The aim was not to diagnose a dog, but to identify where uncertainty becomes harmful for both dog and adopter.</p>
        <div className="calmo-methods">
          {researchMethods.map(([no, title, copy]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <div className="calmo-gap-grid">
          <article><span>01 / DOG</span><h3>Relaxation is unfamiliar</h3><p>Behaviours that signal hesitation, vigilance or overload can be subtle and highly individual.</p></article>
          <article><span>02 / ADOPTER</span><h3>Signals are easy to misread</h3><p>New adopters may interpret stress as disobedience or expect progress to follow a fixed timetable.</p></article>
          <article><span>03 / SUPPORT SYSTEM</span><h3>Guidance drops away</h3><p>Professional knowledge exists before adoption, but is difficult to access during everyday home situations.</p></article>
        </div>
        <div className="calmo-image-pair">
          <CalmoImage name="technology-analysis.png" alt="Technology analysis for non-contact dog monitoring" caption="Technical feasibility — non-contact signals were prioritised over wearable or invasive monitoring" onExpand={setLightbox}/>
          <CalmoImage name="competitive-analysis.png" alt="Competitive analysis of dog monitoring and calming products" caption="Market scan — existing products address isolated functions rather than the full transition" onExpand={setLightbox}/>
        </div>
        <CalmoImage name="stakeholder-map.png" alt="CALMO stakeholder power and interest map" caption="Stakeholder map — successful transition depends on continuity between professional and domestic care" onExpand={setLightbox}/>
      </section>

      <section className="case-section calmo-definition">
        <div className="case-section-label">03 / DEFINING THE TRANSITION</div>
        <h2>Design for two users moving through the same uncertainty</h2>
        <p className="case-lede">The adopter and the dog experience the same transition differently. Mapping both journeys revealed that confidence grows when guidance explains behaviour, shows credible evidence of change and offers an action the adopter can understand.</p>
        <div className="calmo-personas">
          <CalmoImage name="adopter-persona.png" alt="Persona for a potential retired police dog adopter" caption="Adopter persona — willing to help, but uncertain about interpreting specialist behaviour" onExpand={setLightbox}/>
          <CalmoImage name="dog-persona.png" alt="Persona for a retired police dog" caption="Dog persona — trained routines, individual sensitivities and a need for gradual change" onExpand={setLightbox}/>
        </div>
        <CalmoImage name="journey-map.png" alt="Parallel journey map for adopter and retired police dog" caption="Dual journey map — four stages from pre-adoption preparation to long-term adaptation" onExpand={setLightbox}/>
        <div className="calmo-insight">
          <span>CORE REFRAME</span>
          <strong>The product should not promise to calm every dog. It should help each dog and adopter build a safer, more legible transition together.</strong>
        </div>
      </section>

      <section className="case-section case-soft calmo-system">
        <div className="case-section-label">04 / DESIGNING THE SYSTEM</div>
        <h2>Three connected layers, each with a different responsibility</h2>
        <p className="case-lede">CALMO separates sensing, interpretation and intervention. This prevents a sensor reading from being presented as certainty and keeps professional judgement available for higher-risk situations.</p>
        <div className="calmo-layers">
          <article><span>01 / SMART POD</span><h3>Observe without adding burden</h3><p>Non-contact radar, microphone/noise sensing and an optional privacy-conscious depth camera detect patterns without requiring the dog to wear a device.</p></article>
          <article><span>02 / COMPANION APP</span><h3>Translate patterns into context</h3><p>The app combines physiological and observable behavioural signals, explains what they may mean and suggests a proportionate next action.</p></article>
          <article><span>03 / PROFESSIONAL SUPPORT</span><h3>Personalise readiness and escalation</h3><p>An initial trainer assessment determines suitability; professional guidance remains available when the system should not decide alone.</p></article>
        </div>
        <div className="calmo-boundary">
          <div><span>SIGNAL</span><strong>“Something changed.”</strong><small>CALMO detects a pattern, not a diagnosis.</small></div><ArrowRight/>
          <div><span>INTERPRETATION</span><strong>“Here is a possible meaning.”</strong><small>Behaviour and context are considered together.</small></div><ArrowRight/>
          <div><span>ACTION</span><strong>“Here is what you can do next.”</strong><small>The adopter chooses, confirms and learns.</small></div>
        </div>
        <CalmoImage name="value-proposition.png" alt="CALMO value proposition for adopters and retired police dogs" caption="Value proposition — emotional safety for the dog and practical confidence for the adopter" onExpand={setLightbox}/>
        <div className="calmo-image-pair calmo-system-figures">
          <CalmoImage name="user-flow.png" alt="CALMO companion app user flow" caption="App flow — alerts lead to explanation, action and a record of progress" onExpand={setLightbox}/>
          <CalmoImage name="wireframes.png" alt="CALMO app low-fidelity wireframes" caption="Early interface — key support moments translated into a navigable app structure" onExpand={setLightbox}/>
        </div>
      </section>

      <section className="case-section calmo-testing">
        <div className="case-section-label">05 / TESTING &amp; ITERATION</div>
        <h2>Testing changed the product logic, not only the interface</h2>
        <p className="case-lede">Five potential adopters and dog owners completed task-based usability sessions using think-aloud and semi-structured interviews. A professional behaviour trainer then challenged the assumptions behind the product concept.</p>
        <div className="calmo-findings">
          <article><span>USABILITY</span><h3>Controls looked clearer than their consequences</h3><p>Automatic mode, session ending, explanatory text and navigation patterns caused confusion. Participants also wanted progress to be supported by appetite, sleep and play behaviour — not a fixed timeline.</p></article>
          <article><span>EXPERT REVIEW</span><h3>A universal pod was the wrong starting point</h3><p>Dogs differ in history, sensitivity and readiness for enclosed spaces. A trainer assessment, optional use and personalised interventions had to precede automation.</p></article>
        </div>
        <div className="calmo-before-after">
          <div><span>EARLY CONCEPT</span><strong>Universal calming pod</strong><small>Immediate use · fixed transition progress · system-led intervention</small></div>
          <ArrowRight/>
          <div><span>FINAL DIRECTION</span><strong>Personalised transition system</strong><small>Readiness assessment · behavioural milestones · system alert + manual action</small></div>
        </div>
        <CalmoImage name="iteration-matrix.png" alt="CALMO usability findings and prioritised design iterations" caption="Iteration matrix — findings were prioritised by user value and implementation effort" onExpand={setLightbox}/>
      </section>

      <section className="case-section case-soft calmo-final">
        <div className="case-section-label">06 / FINAL DESIGN &amp; PROTOTYPE</div>
        <h2>A calmer environment, a clearer explanation and a visible path forward</h2>
        <p className="case-lede">The final concept combines environmental support with a companion app that makes progress legible. Dynamic milestones are based on behavioural recovery — including appetite, sleep stability and willingness to play — rather than time alone.</p>
        <div className="calmo-modules">
          {finalModules.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <CalmoImage name="final-app.png" alt="Final CALMO companion app interface screens" caption="Final companion app — dashboard, alerts, calming controls, behaviour understanding and history" onExpand={setLightbox}/>
        <div className="calmo-product-grid">
          <CalmoImage name="pod-exploded.png" alt="Exploded view of the CALMO smart pod" caption="Product architecture — modular, serviceable components and non-contact sensing" onExpand={setLightbox}/>
          <CalmoImage name="pod-final.png" alt="Final CALMO smart pod design and product views" caption="Final pod — soothing scent, white noise, timer and behaviour-led training mode" onExpand={setLightbox}/>
        </div>

        <div className="calmo-prototype-block">
          <div>
            <span className="calmo-kicker">INTERACTIVE PROTOTYPE</span>
            <h3>Experience the companion app</h3>
            <p>Explore CALMO’s dashboard, stress alerts, calming environment controls, behaviour explanations and transition history.</p>
            <div><button type="button" onClick={() => setPrototypeOpen(true)}>Launch prototype <ArrowRight size={17}/></button><a href={prototypeUrl} target="_blank" rel="noreferrer">Open in a new tab <ExternalLink size={15}/></a></div>
          </div>
          <button className="calmo-prototype-preview" type="button" onClick={() => setPrototypeOpen(true)} aria-label="Launch interactive CALMO prototype">
            <img src="/calmo/final-app.png" alt="Preview of the CALMO interactive app prototype"/>
            <span><Play size={20} fill="currentColor"/> Try the prototype</span>
          </button>
        </div>

        <div className="calmo-film">
          <div className="calmo-film-heading"><div><span className="calmo-kicker">PROJECT FILM</span><h3>See CALMO in context</h3></div><a href="https://vimeo.com/1177305647" target="_blank" rel="noreferrer">Watch on Vimeo <ExternalLink size={15}/></a></div>
          <div className="calmo-video-frame"><iframe src={vimeoUrl} title="CALMO project film" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy"/></div>
        </div>
      </section>

      <section className="case-section calmo-reflection">
        <div className="case-section-label">07 / RESPONSIBILITY &amp; REFLECTION</div>
        <h2>Technology supports judgement; it does not replace care</h2>
        <div className="calmo-responsibility">
          <article><span>ANIMAL-CENTRED</span><p>The pod is optional and readiness-led. A dog should never be forced into an enclosed environment because the product expects uniform behaviour.</p></article>
          <article><span>NON-CONTACT BY DEFAULT</span><p>Sensing avoids wearables and invasive monitoring. Depth imagery is abstracted and covered physically when it is not needed.</p></article>
          <article><span>EXPLAINABLE, NOT DIAGNOSTIC</span><p>The app uses cautious language, shows behavioural evidence and escalates uncertainty rather than presenting predictions as facts.</p></article>
          <article><span>LONGER-LIFE PRODUCT</span><p>A modular pod supports maintenance and replacement without discarding the full product.</p></article>
        </div>
        <div className="calmo-reflection-grid">
          <article><span>WHAT THE PROJECT ESTABLISHES</span><p>A coherent transition service, a connected product-and-app concept, a credible interaction model, and clear design changes grounded in user and expert feedback.</p></article>
          <article><span>WHAT REMAINS UNPROVEN</span><p>Sensor accuracy in diverse homes, long-term dog acceptance, false alert rates, professional service capacity and whether dynamic milestones improve transition outcomes.</p></article>
          <article><span>NEXT VALIDATION</span><p>Begin with trainer-supervised home trials, compare app interpretations with professional observations, measure adoption over time, and test whether guidance improves adopter confidence without increasing dependence.</p></article>
        </div>
        <p className="calmo-final-note">CALMO’s strongest iteration was conceptual: moving from “How can a pod calm a dog?” to “How can a system help a dog and adopter learn a new life together?”</p>
      </section>
    </main>

    {lightbox && <div className="calmo-lightbox" role="dialog" aria-modal="true" aria-label="Expanded CALMO diagram" onClick={() => setLightbox(null)}>
      <button type="button" onClick={() => setLightbox(null)}><X size={18}/> Close</button>
      <img src={`/calmo/${lightbox.name}`} alt={lightbox.alt} onClick={(event) => event.stopPropagation()}/>
    </div>}
    {prototypeOpen && <PrototypeModal onClose={() => setPrototypeOpen(false)}/>} 

    <CaseFooter onHome={onHome} onNext={onNext}/>
  </div>
}
