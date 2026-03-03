// src/pages/index-data.jsx
import Project1 from "../assets/home/nocturne.jpg";
import Project2 from "../assets/home/atelier.jpg";
import Project3 from "../assets/home/mazare.jpg";
import Project4 from "../assets/home/soft-form.jpg";
import Project5 from "../assets/home/obsidian.jpg";
import Project6 from "../assets/home/phase-two.jpg";


const projects = [
  {
    id: "01",
    route: "/nocturne",
    title: "Nocturne",
    skills: ["music as data", "emotional OPen"],
    media: [
      { type: "image", src: Project1, alt: "" }
    ],
    layout: "default",
  },
  {
    id: "02",
    route: "/atelier",
    title: "Atelier",
    skills: ["Modern Agency Portfolio"],
    media: [
      { type: "image", src: Project2, alt: "" }
    ],
    layout: "default",
  },
  {
    id: "03",
    route: "/mazare",
    title: "Mazaré",
    skills: ["Runway Reveal", "Scroll Architecture"],
    media: [
      { type: "image", src: Project3, alt: "" }
    ],
    layout: "default",
  },
  {
    id: "04",
    route: "/soft-form",
    title: "Soft Form",
    skills: ["Beauty Editorial Lab", "Campaign-level polish"],
    media: [
      { type: "image", src: Project4, alt: "" }
    ],
    layout: "default",
  },
  {
    id: "05",
    route: "/obsidian",
    title: "Obsidian",
    skills: ["branding", "paralax images"],
    media: [
      { type: "image", src: Project5, alt: "" }
    ],
    layout: "default",
  },
  {
    id: "06",
    route: "/phase-two",
    title: "Phase II",
    skills: ["Texture Study"],
    media: [
      { type: "image", src: Project6, alt: "" }
    ],
    layout: "default",
  },
];

export default projects;




