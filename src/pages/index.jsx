import HomeATF from "../components/home-atf";
import Projects from "../components/projects";
import ProjectsMobile from "../components/projects-mobile";

import "../styles/home-atf.css";
import "../styles/home.css";

export default function Home() {
  return (
    <>
      <HomeATF />
      <div className="desktop"><Projects /></div>
      <div className="mobile"><ProjectsMobile /></div>
    </>
  );
}