import { Link } from "react-router-dom";
import '../styles/header-footer.css'
import footerImg from "../assets/home/6.jpg";

export default function Footer() {

  return (
    <footer>
      <div className="top-row">
        <div className="contact">
          <h3>Let's Build<br></br>Your project together</h3>
          <Link to="mailto:hello@janellucia.com" className="logo">Get in Touch</Link>
        </div>
      </div>
      <div className="bottom-row">
        <div className="reel">
          <img className="homeATF__img" src={footerImg} alt="" />
        </div>

        <div className="footer-menu">
          <ul>
            <li>
              <Link to="/" className="mono">Studies</Link>
            </li>
            <li>
              <Link to="/about" className="mono">About</Link>
            </li>
            <li>
              <Link to="mailto:hello@janellucia.com" className="logo">Contact</Link>
            </li>
          </ul>
        </div>


        <div className="footer-menu">
          <ul>
            <li>
              <Link to="https://janellucia.com/" target="_blank">Design</Link><br></br>
            </li>
            <li>
              <Link to="https://github.com/janellucia" target="_blank">Github</Link><br></br>
            </li>
            <li>
              <Link to="https://www.linkedin.com/in/janel-lucia/" target="_blank">LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

