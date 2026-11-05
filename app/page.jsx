'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, animate, useInView } from 'framer-motion';

const NAV = ['Services', 'Projects', 'About', 'Contact'];
const TECH = ['Next.js', 'React', 'Node.js', 'Python', 'FastAPI', 'Django', 'PostgreSQL', 'LangChain', 'RAG', 'Docker', 'TensorFlow', 'PyTorch'];
const SERVICES = [
  ['Web Development', 'Fast, responsive websites and web apps built with Next.js, Node.js and Django.'],
  ['AI & Machine Learning', 'Custom models for images, text and prediction that solve a real business problem.'],
  ['AI Chatbots & Agents', 'Chatbots that answer from your own documents and automate repeat work.'],
  ['Backend & APIs', 'Secure APIs with PostgreSQL, user login and cloud deployment.'],
  ['Final Year Projects', 'Complete university projects with source code, report and viva preparation.'],
];
const PROJECTS = [
  ['Orthopaedic Clinic Website', 'Website', '/projects/clinic.svg', 'A professional website for an orthopaedic surgeon in Muzaffarabad, with appointment details and services.'],
  ['Kashmir Dairy Farm', 'E-commerce', '/projects/dairy.svg', 'Online store for fresh dairy from Neelum Valley, with products, cart and orders.'],
  ['AI Assessment Platform', 'AI Platform', '/projects/assess.svg', 'Adaptive tests that adjust to each person and turn results into career guidance.'],
  ['AI-FIT Engine', 'Chrome Extension', '/projects/fit.svg', 'Predicts shirt size from body photos so shoppers pick the right fit first time.'],
  ['Sugarcane Disease Detection', 'AI / Computer Vision', '/projects/sugarcane.svg', 'Finds diseases from leaf photos, estimates severity and suggests fertilizer and spray, with PDF reports.'],
  ['Telemedicine Platform', 'Healthcare', '/projects/telemed.svg', 'Connects patients in Pakistan with doctors abroad through video consultations and online payments.'],
  ['TalentMind AI', 'AI SaaS', '/projects/talentmind.svg', 'A team of AI agents that screens candidates and speeds up the hiring process.'],
  ['School Management System', 'Web App', '/projects/school.svg', 'One dashboard for students, fees, attendance and results.'],
  ['Hand Gesture Control System', 'AI / Computer Vision', '/projects/gesture.svg', 'Controls a computer with hand gestures, including a sign language recognition mode.'],
  ['Medical Symptom RAG Assistant', 'AI Chatbot', '/projects/medrag.svg', 'Answers symptom questions from trusted medical documents using retrieval and an LLM.'],
];
const STATS = [[5, '', 'Core services'], [10, '', 'Featured projects'], [100, '%', 'Custom built'], [12, '+', 'Technologies']];

const CONTACT = {
  whatsapp: '923264875089',
  phone: '0326 4875089',
  instagram: 'az_infotech_solutions',
  facebook: 'https://www.facebook.com/search/pages?q=AZ%20Info%20Tech%20Solutions',
  email: 'infotechsolutionsaz@gmail.com',
};

const Reveal = ({ children, d = 0, className }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.7, delay: d }}>{children}</motion.div>
);

function Count({ to, suffix }) {
  const r = useRef(null);
  const v = useInView(r, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!v) return;
    const c = animate(0, to, { duration: 1.8, onUpdate: (x) => setN(Math.round(x)) });
    return () => c.stop();
  }, [v, to]);
  return <b ref={r} className="grad">{n}{suffix}</b>;
}

const PIXELS = Array.from({ length: 14 }, (_, i) => ({
  s: 8 + (i * 7) % 18, x: (i * 37) % 96, y: (i * 53) % 88, d: 5 + (i % 5), o: 0.25 + (i % 4) * 0.12,
}));

export default function Home() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  const [st, setSt] = useState('');

  useEffect(() => {
    const onS = () => setSc(window.scrollY > 40);
    const onM = (e) => {
      document.documentElement.style.setProperty('--mx', e.clientX + 'px');
      document.documentElement.style.setProperty('--my', e.clientY + 'px');
    };
    window.addEventListener('scroll', onS);
    window.addEventListener('mousemove', onM);
    return () => { window.removeEventListener('scroll', onS); window.removeEventListener('mousemove', onM); };
  }, []);

  async function send(e) {
    e.preventDefault();
    const form = e.target;
    setSt('sending');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      if (!r.ok) throw new Error();
      setSt('ok'); form.reset();
    } catch { setSt('err'); }
  }

  const words = 'Turning Ideas into Smart Digital Solutions'.split(' ');
  return (
    <>
      <div className="glow" />
      <motion.div className="progress" style={{ scaleX: sx }} />
      <nav className={sc || open ? 'sc' : ''}>
        <a className="brand" href="#home"><span className="badge"><img src="/logo.jpeg" alt="AZ Info Tech Solutions logo" /></span><span className="bn">AZ Info Tech Solutions</span></a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
        <div className={'links' + (open ? ' open' : '')} onClick={() => setOpen(false)}>
          {NAV.map((n) => <a key={n} href={'#' + n.toLowerCase()}>{n}</a>)}
          <a className="btn" href="#contact">Get a quote</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="grid-bg" />
        <motion.div className="orb" style={{ width: 460, height: 460, background: '#0a5cd6', opacity: 0.35, top: '8%', left: '-6%' }}
          animate={{ x: [0, 70, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="orb" style={{ width: 380, height: 380, background: '#00c8ff', opacity: 0.2, bottom: '5%', right: '-4%' }}
          animate={{ x: [0, -60, 0], y: [0, -50, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        {PIXELS.map((p, i) => (
          <motion.span key={i} className="px" style={{ width: p.s, height: p.s, left: p.x + '%', top: p.y + '%', opacity: p.o }}
            animate={{ y: [0, -28, 0], rotate: [0, 90, 0] }} transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }} />
        ))}
        <h1>
          {words.map((w, i) => (
            <motion.span key={i} className={i >= 3 ? 'grad' : ''} style={{ display: 'inline-block', marginRight: '.25em' }}
              initial={{ opacity: 0, y: 60, rotateX: -70 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3 + i * 0.13, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>{w}</motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          We build websites, AI systems and software for businesses in Azad Kashmir and beyond.
        </motion.p>
        <motion.div className="cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
          <a className="btn" href="#contact">Start your project</a>
          <a className="btn ghost" href="#projects">See our work</a>
        </motion.div>
      </section>

      <div className="marquee"><div className="track">{[...TECH, ...TECH].map((t, i) => <span key={i}>{t}</span>)}</div></div>

      <section><div className="stats">{STATS.map(([n, s, l]) => <div key={l}><Count to={n} suffix={s} /><span>{l}</span></div>)}</div></section>

      <section id="services">
        <Reveal className="title"><h2>What we build for you</h2><p>From a first website to a full AI system, one team handles design, code and deployment.</p></Reveal>
        {SERVICES.map(([t, d]) => (
          <Reveal key={t}><div className="row"><i /><h3>{t}</h3><p>{d}</p></div></Reveal>
        ))}
      </section>

      <section id="projects">
        <Reveal className="title"><h2>Our projects</h2><p>Websites, AI systems and platforms, each built around a real need.</p></Reveal>
        <div className="projects">
          {PROJECTS.map(([t, tag, img, d], i) => (
            <Reveal key={t} d={i % 2 ? 0.12 : 0}>
              <div className="proj"><div className="im"><img src={img} alt={t} /></div>
                <div className="tx"><span className="tag">{tag}</span><h3>{t}</h3><p>{d}</p></div></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about">
        <div className="about">
          <Reveal className="title" ><h2>A small team that ships real work</h2>
            <p>AZ Info Tech Solutions is based in Muzaffarabad, Azad Kashmir. We combine web development with applied AI, so you get a product that looks good and also works smartly.</p>
            <p>You talk directly to the people writing the code, and you get clear updates at every step.</p></Reveal>
          <Reveal><motion.div className="ring" animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
            <img src="/logo.jpeg" alt="AZ Info Tech Solutions" /></motion.div></Reveal>
        </div>
      </section>

      <section id="contact">
        <Reveal className="title"><h2>Tell us what you need</h2><p>Send a message and we will reply with ideas and a clear price.</p></Reveal>
        <div className="social">
          <a className="wa" href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2.1-1-1 .8c-.9-.4-1.7-1.2-2.1-2.1l.8-1-1-2.1z" fill="currentColor" stroke="none" /></svg>
            WhatsApp</a>
          <a className="ig" href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" /></svg>
            Instagram</a>
          <a className="fb" href={CONTACT.facebook} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            Facebook</a>
          <a className="em" href={`mailto:${CONTACT.email}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m22 7-10 7L2 7" /></svg>
            Email</a>
        </div>
        <div className="info">
          WhatsApp: {CONTACT.phone}<br />
          Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br />
          Location: Muzaffarabad, Azad Kashmir, Pakistan
        </div>
        <form className="form" onSubmit={send}>
          <input name="name" placeholder="Your name" required />
          <input name="email" type="email" placeholder="Your email" required />
          <textarea name="message" rows={5} placeholder="What would you like to build?" required />
          <button className="btn" disabled={st === 'sending'}>{st === 'sending' ? 'Sending…' : 'Send message'}</button>
          {st === 'ok' && <p style={{ color: '#4ade80' }}>Message sent. We will reply soon.</p>}
          {st === 'err' && <p style={{ color: '#f87171' }}>Message not sent. Check your details and try again.</p>}
        </form>
      </section>

      <footer>© {new Date().getFullYear()} AZ Info Tech Solutions. Muzaffarabad, Azad Kashmir.</footer>
    </>
  );
}