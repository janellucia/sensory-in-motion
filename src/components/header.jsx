import { Link } from "react-router-dom";
import '../styles/header-footer.css'

export default function Header() {

  return (
    <header>
      <nav>
        <span>
          <Link to="/" className="logo">
            Sensory in Motion
          </Link>
        </span>

        <span><p>Motion-Driven Creative Developer</p></span>

        <ul>
          <li>
            <Link to="/about" className="mono">About</Link>
          </li>
        </ul>

      </nav>
    </header>
  );
};

