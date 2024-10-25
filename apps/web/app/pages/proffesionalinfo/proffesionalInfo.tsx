"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Skill = { name: string; level: string }
type Education = { country: string; university: string; title: string; major: string; year: string }
type Certification = { name: string; issuer: string; year: string }

export default function ProfessionalInfoForm() {
  const [occupation, setOccupation] = useState("")
  const [occupationFrom, setOccupationFrom] = useState("")
  const [occupationTo, setOccupationTo] = useState("")
  const [skills, setSkills] = useState<Skill[]>([{ name: "", level: "" }])
  const [education, setEducation] = useState<Education[]>([{ country: "", university: "", title: "", major: "", year: "" }])
  const [certifications, setCertifications] = useState<Certification[]>([{ name: "", issuer: "", year: "" }])
  const [website, setWebsite] = useState("")

  const addSkill = () => setSkills([...skills, { name: "", level: "" }])
  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index))

  const addEducation = () => setEducation([...education, { country: "", university: "", title: "", major: "", year: "" }])
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index))

  const addCertification = () => setCertifications([...certifications, { name: "", issuer: "", year: "" }])
  const removeCertification = (index: number) => setCertifications(certifications.filter((_, i) => i !== index))

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Professional Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="occupation">Your Occupation</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="Enter your occupation"
            />
            <Input
              type="date"
              value={occupationFrom}
              onChange={(e) => setOccupationFrom(e.target.value)}
              placeholder="From"
            />
            <Input
              type="date"
              value={occupationTo}
              onChange={(e) => setOccupationTo(e.target.value)}
              placeholder="To"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Skills</Label>
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={skill.name}
                onChange={(e) => {
                  const newSkills = [...skills]
                  newSkills[index].name = e.target.value
                  setSkills(newSkills)
                }}
                placeholder="Skill name"
              />
              <Select
                value={skill.level}
                onValueChange={(value) => {
                  const newSkills = [...skills]
                  newSkills[index].level = value
                  setSkills(newSkills)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              {index > 0 && (
                <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addSkill} variant="outline" size="sm">
            Add Skill
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Education</Label>
          {education.map((edu, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <Input
                value={edu.country}
                onChange={(e) => {
                  const newEducation = [...education]
                  newEducation[index].country = e.target.value
                  setEducation(newEducation)
                }}
                placeholder="Country"
              />
              <Input
                value={edu.university}
                onChange={(e) => {
                  const newEducation = [...education]
                  newEducation[index].university = e.target.value
                  setEducation(newEducation)
                }}
                placeholder="University"
              />
              <Input
                value={edu.title}
                onChange={(e) => {
                  const newEducation = [...education]
                  newEducation[index].title = e.target.value
                  setEducation(newEducation)
                }}
                placeholder="Title"
              />
              <Input
                value={edu.major}
                onChange={(e) => {
                  const newEducation = [...education]
                  newEducation[index].major = e.target.value
                  setEducation(newEducation)
                }}
                placeholder="Major"
              />
              <Input
                value={edu.year}
                onChange={(e) => {
                  const newEducation = [...education]
                  newEducation[index].year = e.target.value
                  setEducation(newEducation)
                }}
                placeholder="Year"
              />
              {index > 0 && (
                <Button variant="ghost" size="icon" onClick={() => removeEducation(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" size="sm">
            Add Education
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Certification</Label>
          {certifications.map((cert, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <Input
                value={cert.name}
                onChange={(e) => {
                  const newCertifications = [...certifications]
                  newCertifications[index].name = e.target.value
                  setCertifications(newCertifications)
                }}
                placeholder="Certificate name"
              />
              <Input
                value={cert.issuer}
                onChange={(e) => {
                  const newCertifications = [...certifications]
                  newCertifications[index].issuer = e.target.value
                  setCertifications(newCertifications)
                }}
                placeholder="Issuing body"
              />
              <Input
                value={cert.year}
                onChange={(e) => {
                  const newCertifications = [...certifications]
                  newCertifications[index].year = e.target.value
                  setCertifications(newCertifications)
                }}
                placeholder="Year"
              />
              {index > 0 && (
                <Button variant="ghost" size="icon" onClick={() => removeCertification(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addCertification} variant="outline" size="sm">
            Add Certification
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Personal Website</Label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <Button className="w-full">Continue</Button>
      </CardContent>
    </Card>
  )
}