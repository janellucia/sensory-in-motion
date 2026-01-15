import { Link } from "react-router-dom";
import '../styles/header-footer.css'

export default function Footer() {

  return (
    <footer>
      <div className="top-row">
        <div className="contact">
          <h3>A focused motion practice built to demonstrate front-end motion thinking and execution.</h3>
          <Link to="mailto:hello@janellucia.com" className="logo">Reach Out</Link>

        </div>
      </div>
      <div className="bottom-row">
        <div className="reel"> </div>
        <div className="menu"></div>
        <div className="menu">
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
      </div>
    </footer>
  );
};

