import React from 'react';

const GamingFooter = () => {
  const regions = ['AUSTRALIA', 'BRAZIL', 'EUROPE', 'GERMANY', 'USA/CANADA'];

  return (
    <footer className="bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-8 mb-8">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Logo_inwi.svg/2560px-Logo_inwi.svg.png" alt="UFL Logo" className="h-14" />
        </div>

        <p className="text-gray-400 text-sm mb-8 max-w-5xl">
          © 2025 XTEN Limited. All rights reserved. STRIKERZ Inc., STRZ, UFL, Fair To Play and related logos are trademarks or registered trademarks of XTEN Limited. 
          Unreal® is a trademark or registered trademark of Epic Games, Inc. in the United States of America and elsewhere. "PlayStation Family Mark", "PS5 logo" are 
          registered trademarks or trademarks of Sony Interactive Entertainment Inc. © 2024 Valve Corporation. Steam and the Steam logo are trademarks and/or 
          registered trademarks of Valve Corporation in the U.S. and/or other countries.
        </p>

        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-6">
              <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-white">Game Policies</a>
              <a href="#" className="text-gray-400 hover:text-white">Web Policies</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {regions.map((region, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-xs text-gray-400 hover:text-white"
              >
                {region}
              </a>
            ))}
          </div>

        
        </div>
      </div>
    </footer>
  );
};

export default GamingFooter;  