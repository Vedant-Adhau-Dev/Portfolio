import React from "react";
import "./skillset.css";

export default function Skillset() {
  const skills = [
    "HTML", "CSS", "JavaScript", "React", "Node.js", "Firebase", "Git",
    "Express", "MongoDB", "Tailwind"
  ];


  // Duplicate list for smooth infinite scroll
  const doubledSkills = [...skills, ...skills];

  return (
    <div className="skillset-container">
      <h2 className="section-title">My Skillset Stream</h2>
      <div className="slider">
        <div className="slide-track">
          {
          doubledSkills.map((skill, i) => (
            <div className="slide" key={i}>
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
