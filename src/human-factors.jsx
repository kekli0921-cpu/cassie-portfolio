import React from 'react'
import './human-factors.css'
import { CaseFooter, CaseHeader, EditorialCaseHero } from './case-chrome.jsx'

function HFImage({ name, alt, caption, className = '' }) {
  return <figure className={`hf-image ${className}`}>
    <img src={`/human-factors/${name}`} alt={alt} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

const studies = [
  {
    no: '01',
    title: 'Sound as an Emotional Amplifier',
    stimulus: 'Sound on / Sound off',
    methods: 'EMG · ECG · Skin temperature',
    tension: 'Baseline arousal vs. critical moments',
    target: 'hf-study-sound'
  },
  {
    no: '02',
    title: 'Calm Focus vs. Fast Reaction',
    stimulus: 'Meditation / High-arousal music',
    methods: 'EEG · ECG · Behavioural scores',
    tension: 'Stability vs. speed',
    target: 'hf-study-music'
  },
  {
    no: '03',
    title: 'Easier Reading Is Not Deeper Reading',
    stimulus: 'Traditional / Bionic text',
    methods: 'Eye tracking · Test · Interview',
    tension: 'Fluency vs. comprehension',
    target: 'hf-study-reading'
  }
]

function StudyEvidence({ items }) {
  return <div className="hf-evidence-grid">
    {items.map(([label, title, copy]) => <article key={label}>
      <span>{label}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>)}
  </div>
}

export default function HumanFactorsPage({ onHome, onContact, onNext }) {
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return <div className="case-page case-redesign human-factors-page">
    <CaseHeader onHome={onHome} onContact={onContact}/>

    <main>
      <EditorialCaseHero
        rootSelector=".human-factors-page"
        eyebrow="MULTIMODAL RESEARCH · THREE LAB EXPERIMENTS"
        title="Improving UX Through Human Factors"
        subtitle="Three evidence-based experiments"
        summary={[
          'Three lab experiments examined whether physiological signals, observed behaviour, and self-reported experience tell the same story.',
          'Combined EMG, ECG, skin temperature, EEG, eye tracking, behavioural observation, comprehension tests, and interviews.',
          "The studies reveal where objective signals support users' accounts — and where easier, faster, or more aroused does not necessarily mean a better experience."
        ]}
        chapters={['Research premise', 'Study overview', 'Experiment 01', 'Experiment 02', 'Experiment 03', 'Cross-study synthesis', 'UX principles & reflection']}
        imageSrc="/human-factors/hero.png"
        imageAlt="Participant wearing biosensors during a racing game, with gameplay and EMG evidence"
        result="Objective signals become useful when interpreted beside behaviour and self-report."
        accent="#76629d"
        accentSoft="#d7c9ec"
        longTitle
      />

      <section className="case-section hf-premise">
        <div className="case-section-label">01 / RESEARCH PREMISE</div>
        <div className="hf-premise-grid">
          <div>
            <h2>What happens when the body and the user tell different stories?</h2>
            <p>Self-report captures meaning, preferences, and remembered experience, but it cannot show every real-time change in attention or arousal. Physiological data captures change as it happens, but a signal cannot explain itself.</p>
            <p>This project uses triangulation: interpreting physiological signals alongside observable behaviour, task performance, and what the participant said.</p>
          </div>
          <blockquote><span>THE CORE QUESTION</span>When physiological evidence and subjective experience do not align, how should UX researchers interpret the experience and turn it into a design decision?</blockquote>
        </div>
        <div className="hf-research-chain" aria-label="Research interpretation framework">
          {['Digital stimulus','Physiological signal','Observable behaviour','Self-report','UX decision'].map((item, index) => <React.Fragment key={item}><div><span>0{index + 1}</span>{item}</div>{index < 4 && <i>→</i>}</React.Fragment>)}
        </div>
      </section>

      <section className="case-section case-soft hf-overview">
        <div className="case-section-label">02 / STUDY OVERVIEW</div>
        <h2>One question, three experimental lenses</h2>
        <p className="case-lede">Each study pairs a digital stimulus with multiple forms of evidence, then tests whether the resulting interpretations agree.</p>
        <div className="hf-study-index">
          {studies.map(study => <button key={study.no} onClick={() => jump(study.target)}>
            <span>{study.no}</span>
            <h3>{study.title}</h3>
            <dl><div><dt>Stimulus</dt><dd>{study.stimulus}</dd></div><div><dt>Evidence</dt><dd>{study.methods}</dd></div><div><dt>Question</dt><dd>{study.tension}</dd></div></dl>
            <b>View experiment ↓</b>
          </button>)}
        </div>
      </section>

      <section id="hf-study-sound" className="case-section hf-study hf-sound">
        <div className="case-section-label">03 / EXPERIMENT 01</div>
        <div className="hf-study-head"><div><span className="hf-study-kicker">BIOSENSORS · RACING GAME</span><h2>Sound as an Emotional Amplifier</h2></div><p>Does background sound in Monoposto increase emotional engagement and immersion?</p></div>
        <div className="hf-method-strip"><div><span>CONDITIONS</span>Sound on / Sound off across four races</div><div><span>SENSORS</span>EMG · ECG · Skin temperature</div><div><span>VALIDATION</span>Video observation · Interviews · Performance</div></div>
        <StudyEvidence items={[
          ['PHYSIOLOGY','No clear baseline shift','Average ECG and EMG values showed no consistent difference between sound conditions. However, sound-on sessions produced stronger momentary responses around collisions, overtaking, and difficult corners.'],
          ['BEHAVIOUR','Critical events mattered','The strongest EMG fluctuation appeared during a high-speed corner and overtake. Performance improved during the sound-on sessions, while the final silent session felt more monotonous.'],
          ['SELF-REPORT','More tense, realistic, and immersive','The participant felt more emotionally engaged with sound. Audio prompts also explained penalties and helped her understand the scoring mechanism.']
        ]}/>
        <div className="hf-visual-pair"><HFImage name="hero.png" alt="EMG peak aligned with a critical racing-game moment" caption="Experimental setup and event-level EMG evidence"/><HFImage name="game-ecg.png" alt="Heart-rate patterns under sound-on and sound-off conditions" caption="Heart-rate patterns across the four sound conditions"/></div>
        <aside className="hf-finding"><span>UX FINDING 01</span><strong>Sound did not raise baseline arousal. It amplified emotional intensity at key moments and operated as an information cue.</strong><p>Design sound around errors, success, risk, and status changes — not simply as a constant layer of stimulation. Audio can support situational awareness and reduce continuous visual monitoring.</p></aside>
      </section>

      <section id="hf-study-music" className="case-section case-soft hf-study hf-music">
        <div className="case-section-label">04 / EXPERIMENT 02</div>
        <div className="hf-study-head"><div><span className="hf-study-kicker">EEG · ECG · REACTION TASK</span><h2>Calm Focus vs. Fast Reaction</h2></div><p>How do meditation and high-arousal music change brain activity, reaction speed, and performance stability?</p></div>
        <div className="hf-method-strip"><div><span>CONDITIONS</span>5 min meditation / 5 min Summer Party</div><div><span>TASK</span>Five rounds of Dinosaur T-Rex</div><div><span>REGIONS</span>Frontal · Parietal · Central motor</div></div>
        <div className="hf-contrast">
          <article><span>MEDITATION</span><h3>Stable control, slower response</h3><p>Stronger Alpha at P3 and Theta at Fz suggested sustained attention and executive control. Weaker Beta at C3/C4 aligned with lower motor readiness and more stable but slower performance.</p></article>
          <article><span>HIGH-AROUSAL MUSIC</span><h3>Fast response, larger fluctuation</h3><p>Stronger Beta at C3/C4 indicated greater action readiness. Scores rose, but varied more between rounds; frontal and parietal activity suggested less stable attentional regulation.</p></article>
        </div>
        <div className="hf-visual-grid hf-eeg-grid"><HFImage name="eeg-time.png" alt="EEG topographic comparison over four time windows" caption="EEG activity at 30, 60, 90, and 120 seconds"/><HFImage name="eeg-traces.png" alt="Raw EEG traces for meditation and high-arousal music" caption="Raw EEG traces before the reaction task"/><HFImage name="game-scores.png" alt="Dinosaur game scores after meditation and high-arousal music" caption="Behavioural scores across five game rounds"/><HFImage name="music-ecg.png" alt="Heartbeat comparison after two music conditions" caption="ECG variability after each music condition"/></div>
        <aside className="hf-finding"><span>UX FINDING 02</span><strong>There is no universally optimal music state. The right level of arousal depends on what the interaction asks the user to do.</strong><p>Use calmer audio for exploration, sustained attention, and careful judgement; use energetic audio for combat, movement, and time-critical reaction. Adaptive systems could change tempo in response to behavioural or physiological state.</p></aside>
      </section>

      <section id="hf-study-reading" className="case-section hf-study hf-reading">
        <div className="case-section-label">05 / EXPERIMENT 03</div>
        <div className="hf-study-head"><div><span className="hf-study-kicker">EYE TRACKING · COMPREHENSION</span><h2>Easier Reading Is Not Deeper Reading</h2></div><p>Does Bionic Reading create smoother eye movement and lower effort without compromising comprehension?</p></div>
        <div className="hf-method-strip"><div><span>CONDITIONS</span>Traditional / Bionic text</div><div><span>EVIDENCE</span>Scan paths · Heatmaps · Interview</div><div><span>OUTCOME</span>Five comprehension questions</div></div>
        <div className="hf-reading-result"><div><span>TRADITIONAL LAYOUT</span><strong>100%</strong><p>comprehension accuracy</p></div><div className="hf-reading-statement">Bionic Reading created smoother, more linear scan paths with fewer regressions and more continuous heatmaps — but the participant read more casually.</div><div><span>BIONIC READER</span><strong>60%</strong><p>comprehension accuracy</p></div></div>
        <div className="hf-reading-comparison"><div><HFImage name="traditional-scan.png" alt="Traditional reading scan path" caption="Traditional text · fragmented gaze and repeated search"/><HFImage name="traditional-heatmap.png" alt="Traditional reading heatmap" caption="Traditional text · separated hotspots"/></div><div><HFImage name="bionic-scan.png" alt="Bionic Reader scan path" caption="Bionic Reader · smoother paragraph-level scan path"/><HFImage name="bionic-heatmap.png" alt="Bionic Reader heatmap" caption="Bionic Reader · more continuous visual attention"/></div></div>
        <HFImage name="reading-feedback.png" alt="Participant interview comparison of normal and Bionic Reader text" caption="Interview comparison: searching difficulty, visual focus stability, and need to reconfirm" className="hf-feedback"/>
        <aside className="hf-finding"><span>UX FINDING 03</span><strong>Lower cognitive effort does not automatically produce better understanding.</strong><p>Bionic Reading may support scanning, information search, accessibility, or low-effort focus modes. Learning platforms and complex content should protect the productive effort that supports deeper semantic processing.</p></aside>
      </section>

      <section className="case-section case-soft hf-synthesis">
        <div className="case-section-label">06 / CROSS-STUDY SYNTHESIS</div>
        <h2>Physiological data is evidence, not an automatic explanation</h2>
        <div className="hf-synthesis-table" role="table" aria-label="Cross-study comparison">
          <div className="hf-table-head" role="row"><span>STUDY</span><span>WHERE EVIDENCE AGREED</span><span>WHERE IT DIVERGED</span><span>UX INTERPRETATION</span></div>
          <div role="row"><strong>Game sound</strong><p>Critical events produced visible tension and EMG fluctuations.</p><p>Average biosensor values did not reflect the stronger self-reported engagement.</p><p>Study moments and context, not only averages.</p></div>
          <div role="row"><strong>Music</strong><p>EEG patterns broadly matched stable-versus-fast behavioural performance.</p><p>ECG arousal did not clearly predict reaction performance.</p><p>Match stimulation to the task requirement.</p></div>
          <div role="row"><strong>Bionic Reading</strong><p>Eye tracking supported the participant's perception of easier reading.</p><p>Greater fluency coincided with lower comprehension accuracy.</p><p>Ease and effectiveness are different outcomes.</p></div>
        </div>
        <blockquote className="hf-synthesis-quote">The strongest UX interpretation came from the relationship between signals — physiology, behaviour, context, and self-report — rather than from any single measurement.</blockquote>
      </section>

      <section className="case-section hf-principles">
        <div className="case-section-label">07 / UX PRINCIPLES & REFLECTION</div>
        <h2>Four principles for evidence-led experience design</h2>
        <div className="hf-principle-grid">
          <article><span>01</span><h3>Design for critical moments</h3><p>Average measurements can hide the interaction events that shape the experience.</p></article>
          <article><span>02</span><h3>Match stimulation to the task</h3><p>Deep focus, careful judgement, and rapid action require different arousal states.</p></article>
          <article><span>03</span><h3>Separate ease from outcome</h3><p>A smoother interaction can feel better while producing weaker comprehension or decisions.</p></article>
          <article><span>04</span><h3>Triangulate before deciding</h3><p>Combine signals with behaviour, context, and user meaning before drawing a UX conclusion.</p></article>
        </div>
        <div className="hf-limitations"><h3>Limitations</h3><p>These exploratory studies used one participant per experiment and were affected by order, fatigue, learning, task variability, and technical limitations. EEG lacked precise event markers, ECG could not support HRV analysis, and the Bionic Reading comparison used different articles. The findings should therefore be treated as directional evidence and a foundation for larger controlled studies.</p></div>
      </section>
    </main>

    <CaseFooter onHome={onHome} onNext={onNext}/>
  </div>
}
