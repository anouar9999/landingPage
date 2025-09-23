  import React, { useState, useEffect } from "react";
  import AnimatedTitle from "./AnimatedTitle";

  const GamingBanner = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const [prizePool, setPrizePool] = useState(50000);
    const [prizeAnimation, setPrizeAnimation] = useState(false);

    // Prize pool tiers
    const prizeTiers = [
      { place: "1st", amount: 25000, percentage: 50, color: "text-yellow-400" },
      { place: "2nd", amount: 12500, percentage: 25, color: "text-gray-300" },
      { place: "3rd", amount: 7500, percentage: 15, color: "text-amber-600" },
      { place: "4th-10th", amount: 5000, percentage: 10, color: "text-blue-400" },
    ];

    useEffect(() => {
      // Generate particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      }));
      setParticles(newParticles);

      // Animate particles
      const interval = setInterval(() => {
        setParticles((prev) =>
          prev.map((particle) => ({
            ...particle,
            x: (particle.x + particle.speed) % 100,
          }))
        );
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }, []);

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    return (
      <div
        className="relative w-full h-screen mx-4 rounded-xl bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden shadow-2xl cursor-crosshair"
        onMouseMove={handleMouseMove}
      >
        {/* Animated particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                boxShadow: "0 0 6px rgba(251, 191, 36, 0.8)",
              }}
            />
          ))}
        </div>

        {/* Mouse glow effect */}

        {/* Main content container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
          <p className="font-valorant  text-primary text-xs sm:text-xs md:text-sm lg:text-sm uppercase px-2 md:px-4 max-w-2xl mx-auto">
            {"Prize pool"}
          </p>

          {/* Championship Trophy Section */}
          <AnimatedTitle
            title={"Prize pool"}
            containerClass=" !text-black text-center text-primary"
          />

          {/* Prize Pool Section */}
          <div className=" backdrop-blur-lg rounded-2xl  p-8 max-w-4xl w-full ">
            {/* Total Prize Pool */}
            <div className="text-center ">
              {/* <div className="text-lg text-gray-400 -mb-8 font-general tracking-wider">TOTAL PRIZE POOL</div> */}
              <div
                className={`text-[9rem] font-free-fire bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent transition-all duration-500 ${prizeAnimation ? "scale-110" : "scale-100"}`}
              >
                {prizePool} {""} DH
              </div>
            </div>

            {/* Prize Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {prizeTiers.map((tier, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-slate-700/40 to-slate-800/40 rounded-xl p-4 border border-gray-600/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className={`text-xl font-general ${tier.color} mb-2`}>
                      {tier.place}
                    </div>
                    <div className="text-2xl font-general text-white mb-1">
                      {Math.floor((prizePool * tier.percentage) / 100)} DH
                    </div>
                    <div className="text-sm text-gray-400 font-general">
                      {tier.percentage}% of pool
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 flex gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-black font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25">
              REGISTER NOW
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-gray-400 hover:border-yellow-400 text-gray-300 hover:text-yellow-400 font-bold rounded-xl transition-all duration-300">
              VIEW RULES
            </button>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-yellow-400 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-orange-500 rounded-full" />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 border border-red-500 rounded-full" />
        </div>
      </div>
    );
  };

  export default GamingBanner;
