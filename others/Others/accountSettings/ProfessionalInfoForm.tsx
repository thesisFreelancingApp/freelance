"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust the import based on your Button component location
import { Input } from "@/components/ui/input"; // Adjust the import based on your Input component location

const ProfessionalInfoForm: React.FC = () => {
  const [occupation, setOccupation] = useState("");
  const [skills, setSkills] = useState<{ skill: string; level: string }[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");

  // Education states
  const [country, setCountry] = useState("");
  const [collegeOrUniversity, setCollegeOrUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const allSkills = [
    "AI Applications",
    "Convert Files",
    "DevOps & Cloud",
    "Game Development",
    "Online Coding Lessons",
    "User Testing",
    "Website Maintenance",
    "Blockchain & Cryptocurrency",
    "Cybersecurity & Data Protection",
    "Mobile Apps",
    "QA & Review",
    "Web Programming",
    "Chatbots Development",
    "Desktop Applications",
    "NFT Development",
    "Support & IT",
    "Electronics Engineering",
    "Website Development",
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
    "Brazil",
    "Japan",
    "China",
    "South Africa",
    "Mexico",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Russia",
    "New Zealand",
    "Singapore",
    "Ireland",
    "Argentina",
  ];

  const handleSkillChange = (skill: string) => {
    if (skills.some((s) => s.skill === skill)) {
      setSkills(skills.filter((s) => s.skill !== skill));
    } else {
      if (skills.length < 5) {
        setSkills([...skills, { skill, level: "" }]);
      }
    }
  };

  const handleAddNewSkill = () => {
    if (newSkill && proficiencyLevel) {
      const skillExists = skills.some((s) => s.skill === newSkill);

      if (!skillExists) {
        // Add new skill to the skills array
        setSkills((prevSkills) => [
          ...prevSkills,
          { skill: newSkill, level: proficiencyLevel },
        ]);
        // console.log("Added Skill:", newSkill, "Level:", proficiencyLevel); // Debugging line
      } else {
        // console.log("Skill already exists:", newSkill); // Debugging line
      }

      // Clear the input fields
      setNewSkill("");
      setProficiencyLevel("");
    } else {
      // console.log("Please enter both skill and proficiency level."); // Debugging line
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log({
    //   occupation,
    //   skills,
    //   education: {
    //     country,
    //     collegeOrUniversity,
    //     degree,
    //     graduationYear,
    //   },
    // });
  };

  return (
    <form
      className="flex flex-col max-w-xl p-8 mx-auto bg-white rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 text-3xl font-semibold text-gray-800">
        Professional Info
      </h2>
      <p className="mb-6 text-gray-600">
        This is your time to shine. Let potential buyers know what you do best
        and how you gained your skills, certifications, and experience.
      </p>

      {/* Your Occupation Section */}
      <div className="mb-4">
        <label
          htmlFor="occupation"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Your Occupation*
        </label>
        <select
          id="occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          className="w-full p-2 border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select your occupation</option>
          <option value="Programming & Tech">Programming & Tech</option>
          <option value="Design & Creative">Design & Creative</option>
          <option value="Marketing">Marketing</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Skills Section */}
      <div className="mb-4">
        <h3 className="mb-1 text-sm font-medium text-gray-700">Skills*</h3>
        <p className="mb-2 text-gray-500">
          Choose <strong>two to five</strong> of your best skills.
        </p>
        <div className="flex flex-wrap">
          {allSkills.map((skill) => (
            <label key={skill} className="flex items-center mb-2 mr-4">
              <input
                type="checkbox"
                checked={skills.some((s) => s.skill === skill)}
                onChange={() => handleSkillChange(skill)}
                className="mr-2"
              />
              {skill}
            </label>
          ))}
        </div>
        <div>
          <h4 className="mb-1 text-sm font-medium text-gray-700">
            Added Skills:
          </h4>
          <ul>
            {skills.map((s, index) => (
              <li key={index} className="text-gray-600">
                {s.skill} - {s.level}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add New Skill Section */}
      <div className="mb-4">
        <h3 className="mb-1 text-sm font-medium text-gray-700">
          Add New Skill
        </h3>
        <div className="flex">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Skill"
            className="mr-2"
          />
          <select
            value={proficiencyLevel}
            onChange={(e) => setProficiencyLevel(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <Button
            type="button"
            onClick={handleAddNewSkill}
            className="ml-2 bg-[#EAB308] text-white font-semibold"
          >
            Add
          </Button>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-4">
        <h3 className="mb-1 text-sm font-medium text-gray-700">Education</h3>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-2 mb-2 border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <Input
          value={collegeOrUniversity}
          onChange={(e) => setCollegeOrUniversity(e.target.value)}
          placeholder="College/University"
          className="mb-2"
          required
        />
        <Input
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          placeholder="Degree"
          className="mb-2"
          required
        />
        <select
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          className="w-full p-2 border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Graduation Year</option>
          {Array.from({ length: 30 }, (_, i) => (
            <option key={i} value={2024 - i}>
              {2024 - i}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" className="bg-[#EAB308] text-white font-semibold">
        Submit
      </Button>
    </form>
  );
};

export default ProfessionalInfoForm;
