import React from "react";
import "./Projects.css";

export default function Projects() {
  const projects = [
    { name: "Stand Out", desc: "A productivity & ranking system", link: "https://github.com/Vedant-Adhau-Dev/Stand-Out" },
    { name: "Portfolio", desc: "My Portfolio Website", link: "https://github.com/Vedant-Adhau-Dev/Portfolio" },
  ];

  const openProject = (url) => {
    window.open(url, "_blank"); // opens in new tab
  };

  return (
    <div className="nebula-space">
      <div className="nebula-core"></div>
      <div className="nebula-glow"></div>
      <div className="stars-bg"></div>

      {projects.map((project, index) => (
        <div
          key={index}
          className="project-orb"
          style={{ "--i": index + 1 }}
          onClick={() => openProject(project.link)}
        >
          <div className="orb-light"></div>
          <div className="orb-text">
            <h3>{project.name}</h3>
            <p>{project.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
