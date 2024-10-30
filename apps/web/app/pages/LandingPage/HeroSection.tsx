"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Preload video
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.error("Video failed to load");
    setIsVideoLoaded(false);
  };

  if (!isMounted) {
    return (
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero/tunisian-workspace.webp"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        {/* Fallback content */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Découvrez les Talents{" "}
              <span className="text-primary">Tunisiens</span>
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video with Fallback */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          {!isVideoLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src="/hero/tunisian-workspace.jpg"
                alt="Hero Background"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          className={`object-cover w-full h-full transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          poster="/hero/tunisian-workspace.jpg"
        >
          <source src="/hero/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Découvrez les Talents{" "}
              <span className="text-primary">Tunisiens</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Connectez-vous avec les meilleurs freelances tunisiens. De la
              création au développement, trouvez le talent parfait pour votre
              projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="text-lg w-full sm:w-auto">
                  Commencer Maintenant
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg w-full sm:w-auto bg-white text-primary hover:bg-white/90"
                >
                  Comment ça marche ?
                </Button>
              </Link>
            </div>

            {/* Success Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 mt-12"
            >
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary">50K+</h3>
                <p className="text-gray-300">Freelances</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary">98%</h3>
                <p className="text-gray-300">Satisfaction</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary">24/7</h3>
                <p className="text-gray-300">Support</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Success Story Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-[60px] h-[60px]">
                  <Image
                    src="/success-stories/success-story-1.webp"
                    alt="Success Story"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Sarah Ben Ali</h3>
                  <p className="text-gray-300">Designer Freelance</p>
                </div>
              </div>
              <p className="text-gray-200 mb-4">
                "Grâce à cette plateforme, j'ai pu développer mon activité et
                travailler avec des clients du monde entier tout en restant en
                Tunisie."
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 bg-white text-primary hover:bg-white/90"
              >
                <PlayCircle className="w-4 h-4" />
                Voir son histoire
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
