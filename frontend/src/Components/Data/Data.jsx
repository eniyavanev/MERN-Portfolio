import HTML from "../../assets/Images/html5.png";
import CSS from "../../assets/Images/css.png";
import Bootstrap from "../../assets/Images/Bootstrap1.jpeg";
import Tailwind from "../../assets/Images/tailwind.png";
import Javascript from "../../assets/Images/js.png";
import React from "../../assets/Images/react.png";
import NodeJs from "../../assets/Images/nodejs.png";
import MongoDB from "../../assets/Images/mongo.png";
import Github from "../../assets/Images/github1.png";
import Figma from "../../assets/Images/Figma.png";
const Data = [
  {
    id: 1,
    image: HTML,
    title: "HTML",
    subTitle:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    num: 1,
  },
  {
    id: 2,
    image: CSS,
    title: "CSS",
    subTitle:
      "CSS stands for Cascading Style Sheets. It is a style sheet language which is used to describe the look and formatting of a document written in markup language.",
    num: 2,
  },
  {
    id: 3,
    image: Bootstrap,
    title: "Bootstap",
    subTitle:
      "Bootstrap is a popular open-source front-end framework for developing responsive and mobile-first websites quickly using HTML, CSS, and JavaScript. ",
    num: 3,
  },
  {
    id: 4,
    image: Tailwind,
    title: "Tailwindcss",
    subTitle:
      "Tailwind CSS is an open source CSS framework. The main feature of this library is that, unlike other CSS frameworks like Bootstrap.",
    num: 4,
  },
  {
    id: 5,
    image: Javascript,
    title: "JavaScript",
    subTitle:
      "JavaScript is a scripting language that enables you to create dynamically updating content, control multimedia and everything else.",
    num: 5,
  },
  {
    id: 6,
    image: React,
    title: "ReactJs",
    subTitle:
      "React is a free and open-source front-end JavaScript library for building user interfaces based on components.",
    num: 6,
  },
  {
    id: 6,
    image: Github,
    title: "Github",
    subTitle:
      "GitHub is an Internet hosting service for software development and version control using Git.",
    num: 6,
  },
  {
    id: 7,
    image: Figma,
    title: "Figma",
    subTitle:
      "Figma is a cloud-based design tool that allows teams to collaborate on interface design and prototyping in real-time. It offers features like vector editing, components, and interactive prototypes for web and mobile applications.",
    num: 7,
  },
  {
    id: 7,
    image: NodeJs,
    title: "NodeJs",
    subTitle:
      "Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript Engine, and executes JavaScript code outside a web browser.",
    num: 7,
  },
  {
    id: 7,
    image: MongoDB,
    title: "MongoDB",
    subTitle:
      "MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program.",
    num: 7,
  },
];

const education = [
  {
    id: 1,
    course: "M.Sc",
    year: "2022",
    summary:
      "Completed a Master's degree in Science, specializing in advanced topics of physics and mathematics, focusing on research methodologies and practical applications.",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    percentage: 80,
    college: "Shanmuga Industries Arts and Science College, Tiruvannamalai",
  },
  {
    id: 2,
    course: "B.Sc",
    year: "2018",
    summary:
      "Graduated with a Bachelor's degree in Science, with a major in Physics. ",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    percentage: 80,
    college: "Sri Ramakrishna Mission Of Vivekananda College, Chennai",
  },
  {
    id: 3,
    course: "High School",
    year: "2015",
    summary:
      "Completed high school with a strong emphasis on the sciences and mathematics, excelling in physics and chemistry.",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    percentage: 80,
    college: "Jayam Vidhyalaya, Harur",
  },
  {
    id: 4,
    course: "SSLC",
    year: "2013",
    summary:
      "Achieved SSLC certification with commendable performance in various subjects, laying a strong foundation for future studies in science.",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    percentage: 80,
    college:
      "Sri Ramana Maharishi Matriculation Hr. Sec. School, Tiruvannamalai",
  },
];

const projectData = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "E-commerce Website",
    details:
      " Developed a fully functional e-commerce website that allows users to browse products, add items to their cart, and complete purchases.",
    github: "https://github.com/",
    youtube: "https://youtube.com/",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "School PorTfolio",
    details:
      "Created a portfolio website for a school to showcase its achievements, activities like extracurricular activities like sports, arts, cultural events. ",
    github: "https://github.com/",
    youtube: "https://youtube.com/",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "SkillFund",
    details:
      "A web application that provides users with a platform to invest to peoples skills. It also provides users with a platform to share their skills. ",
    github: "https://github.com/",
    youtube: "https://youtube.com/",
  },
];

const repData = [
  {
    id: 1,
    title: "Reputation",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    link: "https://github.com/",
  },
  {
    id: 2,
    title: "Reputation",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    link: "https://github.com/",
  },
];

export default Data;
export { education, projectData, repData };
