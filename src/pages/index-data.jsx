// src/pages/index-data.jsx
import Project1 from "../assets/home/1.jpg";
import Project2 from "../assets/home/2.jpg";
import Project3 from "../assets/home/3.jpg";
import Project4 from "../assets/home/4.jpg";
// import Project5 from "../assets/home/5.jpg";
// import Project6 from "../assets/home/6.jpg";


const projects = [
  {
    id: "01",
    route: "/romy-marais",
    title: "Romy Marais",
    skills: ["branding", "web design"],
    media: [
      { type: "image", src: Project1, alt: "" }
    ],
    layout: "default",
  },
  {
    id: "02",
    route: "/the-visual-edit",
    title: "The Visual Edit",
    skills: ["Editorial Design"],
    media: [
      { type: "image", src: Project2, alt: "" }
    ],
    layout: "default",
  },
  {
    id: "03",
    route: "/daniela-bosco",
    title: "Daniela Bosco",
    skills: ["branding", "web design"],
    media: [
      { type: "image", src: Project3, alt: "" }
    ],
    layout: "default",
  },
  {
    id: "04",
    route: "/lorangerie-photographie",
    title: "LOrangerie Photographie",
    skills: ["Editorial Design"],
    media: [
      { type: "image", src: Project4, alt: "" }
    ],
    layout: "default",
  },
  // {
  //   id: "05",
  //   route: "/bad-girls-collective",
  //   title: "Bad Girls Collective",
  //   skills: ["branding", "web design"],
  //   media: [
  //     { type: "image", src: Project5, alt: "" }
  //   ],
  //   layout: "default",
  // },
  // {
  //   id: "06",
  //   route: "/onceived-space",
  //   title: "Conceived Space",
  //   skills: ["Editorial Design"],
  //   media: [
  //     { type: "image", src: Project6, alt: "" }
  //   ],
  //   layout: "default",
  // },
];

export default projects;




