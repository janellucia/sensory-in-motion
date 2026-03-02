import { useEffect } from 'react';
import '../styles/about.css'
import { Link } from "react-router-dom";


export default function About() {
  useEffect(() => {
    document.body.classList.add("about-page");
    return () => {
      document.body.classList.remove("about-page");
    };
  }, []);

  return (
    <>
      <header className="about-header">
        <nav>
          <span>
            <Link to="/" className="logo">
              Sensory in Motion
            </Link>
          </span>

          <span><p>Motion-Driven Creative Developer</p></span>

          <ul>
            <li>
              <Link to="/" className="mono">Close</Link>
            </li>
          </ul>

        </nav>
      </header>
      <div className='about-page-wrapper'>
        <h1>Motion-driven <br></br>front-end development.</h1>
        <div className='left'>
          <p>Sensory in Motion is a motion-focused front-end practice operating between design and engineering.</p>
          <p>The work centers on how timing shapes perception, how transitions guide attention, and how performance influences trust. Interaction is treated as part of the structure of a site rather than an enhancement layered on top. Movement reinforces hierarchy, clarifies relationships between elements, and creates continuity between states.</p>
          <p>Projects begin at the level of concept and prototype, where motion is explored early in the process rather than added at the end. From there, visual systems are translated into responsive, production-ready architectures. Animation logic is integrated into the component structure, ensuring that what is designed can scale, perform, and remain maintainable over time.</p>
          <p>Built with React, Next.js, and GSAP, each project moves from exploration to execution with a focus on clarity, restraint, and technical precision. Performance and accessibility are considered foundational. Transitions are intentional but never excessive, and interaction is used to support understanding rather than distract from it.</p>
          <p>The aesthetic remains minimal by design, with emphasis placed on rhythm, continuity, and control. Sensory in Motion is not about adding movement for effect, but about shaping experiences that feel coherent, stable, and thoughtfully constructed.</p>
        </div>
        <div className='middle'>
          <ul>
            <li>
              <p className='sub-title'>(Services)</p>
              <p>Interaction-Led Web Development</p>
              <p>Motion Systems & Transition Architecture</p>
              <p>Prototype to Production Execution</p>
              <p>React & Next.js Development</p>
              <p>Scroll-Driven Experiences</p>
              <p>Performance Optimization</p>
              <p>Design System Implementation</p>
              <p>Front-End Collaboration & Build Support</p>
            </li>
          </ul>

        </div>
        <div className='right'>
          <ul>
            <li>
              <p className='sub-title'>(Reach Out)</p>
              <Link to="mailto:hello@janellucia.com?subject=Let's make something beautiful" target="_blank">hello@janellucia.com</Link>
            </li>
            <li>
              <p className='sub-title'>(Design Portfolio)</p>
              <Link to="https://janellucia.com/" target="_blank">janellucia.com</Link>
            </li>
            <li>
              <p className='sub-title'>(Connect)</p>
              <Link to="https://www.instagram.com/xojanel_/" target="_blank">Instagram</Link><br></br>
              <Link to="https://ca.pinterest.com/janel_lucia_studio/_saved/" target="_blank">Pintrest</Link><br></br>
              <Link to="https://github.com/janellucia" target="_blank">Github</Link><br></br>
              <Link to="https://www.linkedin.com/in/janel-lucia/" target="_blank">LinkedIn</Link>
            </li>
          </ul>

        </div>
      </div>
    </>
  );
}