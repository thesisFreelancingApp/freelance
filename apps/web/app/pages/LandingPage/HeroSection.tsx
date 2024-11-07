"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const handleVideoLoad = () => setIsVideoLoaded(true);
  const handleVideoError = () => console.error("Failed to load video");

  if (!mounted) {
    return (
      <section className="relative mt-6 m-6 flex items-center min-h-[300px] md:max-h-[480px] overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </section>
    );
  }

  return (
    <section className="relative mt-6 m-6 flex items-center min-h-[300px] md:max-h-[480px] overflow-hidden rounded-lg">
      {/* Background Video with Fallback Image */}
      <div className="absolute inset-0 z-0">
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="object-cover w-full h-full transition-opacity duration-500 rounded-lg shadow-lg bg-gradient-to-r from-black/85 to-black/30"
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "500px",
          }}
        >
          <source src="/hero/hero-background.mp4" type="video/mp4" />
        </motion.video>
        {/* Gradient Overlay with Fade-in Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-lg px-6 py-8 mx-auto sm:px-8 sm:py-12">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <h1 className="mb-4 text-xl font-extrabold leading-tight sm:text-2xl md:text-4xl">
              Découvrez les Talents{" "}
              <span className="text-primary">Tunisiens</span>
            </h1>
            <p className="mb-6 text-base leading-relaxed text-gray-200 sm:text-lg">
              Connectez-vous avec des freelances tunisiens experts pour votre
              projet.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg bg-primary"
                >
                  Commencer Maintenant
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-4 py-2 text-sm bg-transparent border-white sm:px-6 sm:py-3 sm:text-lg hover:bg-white"
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
              className="grid grid-cols-3 gap-4 sm:gap-8"
            >
              <div className="text-center">
                <h3 className="text-xl font-extrabold text-primary sm:text-3xl">
                  50K+
                </h3>
                <p className="text-sm text-gray-300 sm:text-base">Freelances</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-extrabold text-primary sm:text-3xl">
                  98%
                </h3>
                <p className="text-sm text-gray-300 sm:text-base">
                  Satisfaction
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-extrabold text-primary sm:text-3xl">
                  24/7
                </h3>
                <p className="text-sm text-gray-300 sm:text-base">Support</p>
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
            <div className="p-4 border rounded-lg sm:p-6 bg-white/10 backdrop-blur-lg border-white/20">
              <div className="flex items-center gap-3 mb-4 sm:gap-4">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                  <Image
                    src="/success-stories/success-story-1.webp"
                    alt="Success Story"
                    layout="fill"
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    Sarah Ben Ali
                  </h3>
                  <p className="text-xs text-gray-300 sm:text-sm">
                    Designer Freelance
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-200 sm:text-base">
                "Grâce à cette plateforme, j'ai pu développer mon activité et
                travailler avec des clients du monde entier tout en restant en
                Tunisie."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
