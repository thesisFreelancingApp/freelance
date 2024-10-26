"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import axios from "axios"

interface Freelancer {
  id: string
  first_name: string
  last_name: string
  profile_pic: string
  freelancer_ratings: { rating: number; review: string }[]
  skills: string[]
  price?: number
  description?: string
}

export default function FreelancerCard() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])

  const fetchFreelancers = async () => {
    try {
      const response = await axios.get("/api/user")
      const data = response.data.map((freelancer: any) => ({
        ...freelancer,
        // Check if skills and languages are strings before parsing them
        skills: typeof freelancer.skills === "string" ? JSON.parse(freelancer.skills) : freelancer.skills,
        languages: typeof freelancer.languages === "string" ? JSON.parse(freelancer.languages) : freelancer.languages,
      }))
      setFreelancers(data)
    } catch (error) {
      console.error("Error fetching featured freelancers:", error)
    }
  }
  

  useEffect(() => {
    fetchFreelancers()
  }, [])

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Freelancers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {freelancers.map((freelancer) => (
            <Card key={freelancer.id} className="overflow-hidden">
              <img
                src={freelancer.profile_pic || ""}
                alt={`${freelancer.first_name} ${freelancer.last_name}'s profile`}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{`${freelancer.first_name} ${freelancer.last_name}`}</CardTitle>
              </CardHeader>
              <CardContent>
                {Array.isArray(freelancer.skills) ? (
                  <p className="text-muted-foreground mb-2">{freelancer.skills.join(", ")}</p>
                ) : (
                  <p className="text-muted-foreground mb-2">No skills listed</p>
                )}
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < (freelancer.freelancer_ratings[0]?.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {freelancer.freelancer_ratings.length > 0
                      ? freelancer.freelancer_ratings[0].rating.toFixed(1)
                      : "No ratings"}
                  </span>
                </div>
                <p className="text-primary font-bold">
                  {freelancer.price ? `From $${freelancer.price}` : "Price not available"}
                </p>
                <p className="text-sm mt-2">{freelancer.description || "No description available"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
