/* eslint-disable tailwindcss/no-contradicting-classname */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const sections = [
  {
    title: "SIGN UP",
    tag: "BEGINNER",
    content: "Create your account on our official platform.",
    details: "It's quick, easy, and free!",
    color: "#4AE3B5",
    glowColor: "rgba(74, 227, 181, 0.4)",
    step: "01",
    image:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTBxMGp2czBnN3NlNXEwaWJuOWtrdWZjY3dwaXNtYmMybHZybWI1MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/e2HHUuc4x2VaHIhjlf/giphy.gif",
  },
  {
    title: "CHOOSE YOUR GAME",
    tag: "STRATEGIST",
    content: "Select your battlefield and conquer your destiny.",
    details: "Master one or dominate both!",
    color: "#FF4A8D",
    glowColor: "rgba(255, 74, 141, 0.4)",
    step: "02",
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWUwenI0MTFpdTVqcWZsbDJnYXk5N3lkczluNG9saWdzNWx1d2lsdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ODqRx6hvlRApKmdRsZ/giphy.gif",
  },
  {
    title: "FORM YOUR TEAM",
    tag: "LEADER",
    content: "Solo player or squad leader?",
    details: "Build your dream team or join forces with other gamers.",
    color: "#4A9FFF",
    glowColor: "rgba(74, 159, 255, 0.4)",
    step: "03",
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXZ0NTVkNGdidmduZThwZGM5YTVrd3E2OTJzYXFqM3c3Yzgwb2tmMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/WDIL1Ax7uQfwGSnV2W/giphy.gif",
  },
  {
    title: "COMPETE & QUALIFY",
    tag: "FIGHTER",
    content: "Battle through online qualifiers.",
    details: "Show your skills and climb the ranks!",
    color: "#FFD700",
    glowColor: "rgba(255, 215, 0, 0.4)",
    step: "04",
    image:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm9oY2Rxd3UwZXVlZmpkYmZxeHU5NmY3N3FibWE0Z2NkNHoyaGhtZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ceUY9mubodXVYC0HlD/giphy.gif",
  },
  {
    title: "REACH THE FINALS",
    tag: "ELITE",
    content: "Top performers will advance to the grand finale.",
    details: "Are you ready for the spotlight?",
    color: "#FF4A4A",
    glowColor: "rgba(255, 74, 74, 0.4)",
    step: "05",
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDJhc2xtdTRiZ3h4cDZtYm54NzEybzVoaWs2cXl5MnkzamNrbTYwbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KxVdS08iripnNoHUSi/giphy.gif",
  },
];

const ImageFrame = ({ section }) => (
  <div className="relative aspect-[3/4] w-full md:w-[400px] rounded-xl overflow-hidden">
    <motion.div
      initial={false}
      animate={{ scale: 1.05 }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      className="relative z-10 h-full"
    >
      <img
        src={section.image}
        alt={section.title}
        className="w-full h-full object-cover"
      />
    </motion.div>

    <div className="absolute top-4 right-4 z-40">
      <div
        className="px-3 py-1 rounded-full text-sm font-bold"
        style={{
          backgroundColor: section.color,
          color: "#0A0A0A",
        }}
      >
        {section.step}/05
      </div>
    </div>
  </div>
);


const SignupFlow = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSection(
      (prev) => (prev + newDirection + sections.length) % sections.length
    );
  };

  return (
    <div id="welliMchhorm" className="relative min-h-screen bg-[#0A0A0A] overflow-hidden px-4 sm:px-6 lg:px-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[999] h-16 bg-gradient-to-b from-black via-black/50 to-transparent" />
      
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${sections[currentSection].color}20 0%, transparent 50%)`,
            animation: "pulse 4s infinite",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 w-full z-10 py-6 sm:py-8">
        <h1 className="text-center font-nightWarrior text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-white">
          CONTACTEZ-NOUS
        </h1>
      </div>

      <div className="relative min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-6xl py-20 sm:py-16 lg:py-0"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
              <div className="flex-1 space-y-6 sm:space-y-8 text-center sm:text-left">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <div
                      className="text-6xl sm:text-7xl  md:text-8xl lg:text-9xl font-nightWarrior opacity-10 absolute -top-10 sm:-top-16 lg:-top-20 left-1/2 sm:-left-8 transform -translate-x-1/2 sm:translate-x-0"
                      style={{ color: sections[currentSection].color }}
                    >
                      {sections[currentSection].step}
                    </div>
                    <div className="relative">
                      <span
                        className="text-sm sm:text-base tracking-widest font-valorant"
                        style={{ color: sections[currentSection].color }}
                      >
                        {sections[currentSection].tag}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-valorant text-white  ">
                      {sections[currentSection].title}
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-400 font-general">
                      {sections[currentSection].content}
                    </p>
                    <p className="text-base sm:text-lg text-gray-500">
                      {sections[currentSection].details}
                    </p>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start space-x-4">
                    <button
                      onClick={() => navigate(-1)}
                      className="p-2 sm:p-3 rounded-full border-2 border-gray-800 hover:border-gray-600 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </button>
                    <button
                      onClick={() => navigate(1)}
                      className="p-2 sm:p-3 rounded-full border-2 border-gray-800 hover:border-gray-600 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] flex-shrink-0">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <ImageFrame
                    section={sections[currentSection]}
                    currentSection={currentSection}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-black pointer-events-none z-[999]" />
    </div>
  );
};

export default SignupFlow;
