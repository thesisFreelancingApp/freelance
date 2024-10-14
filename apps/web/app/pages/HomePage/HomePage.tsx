"use client";
import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CategoriesIcon from "./CategoriesIcon";
import {
  ArrowRight,
  Search,
  Star,
  CheckCircle,
  Globe,
  Briefcase,
} from "lucide-react";
import Image from 'next/image';
import PopularServices from "./PopulaireService";
import HowItWorks from "./comment-ça-marche";
import SupportPalestine from "./supportPalestine";




export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const popularServices = [
    { title: "Logo Design", image: "/placeholder.svg?height=200&width=300" },
    { title: "WordPress", image: "/placeholder.svg?height=200&width=300" },
    { title: "Voice Over", image: "/placeholder.svg?height=200&width=300" },
    { title: "Video Editing", image: "/placeholder.svg?height=200&width=300" },
    { title: "Social Media", image: "/placeholder.svg?height=200&width=300" },
  ];

  const sellingPoints = [
    {
      icon: Globe,
      title: "Connect to freelancers with proven business experience",
    },
    {
      icon: CheckCircle,
      title:
        "Get matched with the perfect talent by a customer success manager",
    },
    {
      icon: Briefcase,
      title:
        "Manage teamwork and boost productivity with one powerful workspace",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Find the perfect <span className="text-primary">freelance</span>{" "}
                services for your business
              </h1>
              <div className="w-full max-w-2xl space-y-2">
                <form
                  className="flex space-x-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    className="flex-1 bg-background"
                    placeholder="Try 'building mobile app'"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                Popular:
                <Link href="#" className="hover:underline">
                  Website Design
                </Link>
                <Link href="#" className="hover:underline">
                  WordPress
                </Link>
                <Link href="#" className="hover:underline">
                  Logo Design
                </Link>
                <Link href="#" className="hover:underline">
                  AI Services
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
              Popular professional services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {popularServices.map((service, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        fill
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-end p-4 transition-opacity group-hover:opacity-100 opacity-0">
                        <h3 className="text-white font-semibold">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                  A whole world of freelance talent at your fingertips
                </h2>
                <ul className="space-y-4">
                  {sellingPoints.map((point, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <point.icon className="h-6 w-6 text-primary" />
                      <span>{point.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:justify-self-end">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Freelance talent"
                  width={500} // Set appropriate width
                  height={300} // Set appropriate height
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <CategoriesIcon />

            <PopularServices />

            <HowItWorks />
            <SupportPalestine />
            
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Find the talent needed to get your business growing.
              </h2>
              <p className="max-w-[600px] text-primary-foreground/80">
                Unlock new possibilities with our global community of
                freelancers.
              </p>
              <Button className="bg-background text-primary hover:bg-background/90">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-background border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Graphics & Design
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Writing & Translation
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Video & Animation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Press & News
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Trust & Safety
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Selling on Fiverr
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Buying on Fiverr
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Forum
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href="#"
                  >
                    Community Standards
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              © 2024 Waia International Ltd.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
