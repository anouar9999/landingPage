import React, { useState } from 'react';
import { Menu, X, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';

// export default function OrganizerPage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);

//   const toggleFaq = (index) => {
//     setOpenFaq(openFaq === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-[#0D0D0D] text-white relative">
//       {/* Background Image with Overlay */}
//       <div className="fixed inset-0 z-0">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070')] bg-cover bg-center bg-no-repeat"></div>
//         {/* Gradient overlay from transparent top to dark bottom */}
// <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D]/70 to-[#0D0D0D]"></div>      </div>

//       {/* Content */}
//       <div className="relative z-10">
//         <NavBar />

//         {/* Hero Section */}
//         <section className="pt-32 pb-20 px-6 lg:px-8 font-circular-web">
//           <div className="max-w-5xl mx-auto text-center ">
//             <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 !font-zentry special-font">
//               Create and Manage<br />
//            <span className='text-primary'>Unforgettable</span>    <br />
//               Competitions
//             </h1>
//             <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
//               From local events to global circuits, our platform gives you the keys to success. 
//               You focus on the show, we'll handle the technology.
//             </p>
            
           

//        {/* Pricing Cards Preview */}
//             <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
//               {/* Community Plan */}
//               <div className="relative rounded-2xl p-8 text-left overflow-hidden h-full flex flex-col group hover:scale-[1.02] transition-transform">
//                 {/* Background Image with Overlay */}
//                 <div className="absolute inset-0 z-0">
//                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065')] bg-cover bg-center"></div>
//                   <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/90 via-[#1A1A1A]/95 to-[#0D0D0D]/90"></div>
//                 </div>
                
//                 <div className="relative z-10">
//                   <div className="mb-6">
//                     <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-4">
//                       <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                       </svg>
//                     </div>
//                     <h3 className="text-2xl font-bold mb-2">Community</h3>
//                     <p className="text-sm text-gray-400">Perfect for small local tournaments and getting started</p>
//                   </div>
                  
//                   <div className="mb-8 pb-8 border-b border-gray-800">
//                     <div className="flex items-baseline">
//                       <span className="text-5xl font-bold">Free</span>
//                     </div>
//                     <p className="text-sm text-gray-500 mt-1">No credit card required</p>
//                   </div>

//                   <button className="w-full bg-white/5 hover:bg-white/10 border border-gray-700 text-white rounded-xl py-3 text-sm font-semibold transition mb-8">
//                     Get Started
//                   </button>

//                   <div className="space-y-4 flex-grow">
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">Up to 64 participants</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">Standard tournament formats</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">Automated bracket generation</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">Basic participant profiles</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">Community support</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Professional Plan - Highlighted */}
//               <div className="relative rounded-2xl p-8 text-left overflow-hidden transform md:scale-105 shadow-2xl shadow-indigo-500/20 h-full flex flex-col group hover:scale-110 transition-transform">
//                 {/* Background Image with Overlay */}
//                 <div className="absolute inset-0 z-0">
//                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065')] bg-cover bg-center"></div>
//                   <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/95 via-indigo-700/90 to-indigo-800/95"></div>
//                 </div>
                
//                 <div className="absolute top-4 right-4 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full z-10">
//                   RECOMMENDED
//                 </div>
//                 <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                
//                 <div className="relative z-10 mb-6">
//                   <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
//                     <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-2xl font-bold mb-2 text-white">Professional</h3>
//                   <p className="text-sm text-indigo-100">For serious organizers running regular events</p>
//                 </div>
                
//                 <div className="relative z-10 mb-8 pb-8 border-b border-white/20">
//                   <div className="flex items-baseline">
//                     <span className="text-5xl font-bold text-white">$2.99</span>
//                     <span className="text-white/70 ml-2">/month</span>
//                   </div>
//                   <p className="text-sm text-indigo-100 mt-1">Billed monthly or annually</p>
//                 </div>

//                 <button className="relative z-10 w-full bg-white text-indigo-600 hover:bg-gray-100 rounded-xl py-3 text-sm font-semibold transition mb-8 shadow-lg">
//                   Start Free Trial
//                 </button>

//                 <div className="relative z-10 space-y-4 flex-grow">
//                   <div className="flex items-start space-x-3">
//                     <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-white font-medium">Everything in Community, plus:</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-white">Up to 256 participants</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-white">Real-time statistics & analytics</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-white">Sponsor integration tools</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-white">Advanced format options</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-white">Priority email support</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Enterprise Plan */}
//               <div className="relative rounded-2xl p-8 text-left overflow-hidden h-full flex flex-col group hover:scale-[1.02] transition-transform">
//                 {/* Background Image with Overlay */}
//                 <div className="absolute inset-0 z-0">
//                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065')] bg-cover bg-center"></div>
//                   <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/90 via-[#1A1A1A]/95 to-[#0D0D0D]/90"></div>
//                 </div>
                
//                 <div className="relative z-10">
//                   <div className="mb-6">
//                     <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
//                       <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                       </svg>
//                     </div>
//                     <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
//                     <p className="text-sm text-gray-400">Custom solutions for large-scale operations</p>
//                   </div>
                  
//                   <div className="mb-8 pb-8 border-b border-gray-800">
//                     <div className="flex items-baseline">
//                       <span className="text-5xl font-bold">Custom</span>
//                     </div>
//                     <p className="text-sm text-gray-500 mt-1">Tailored to your needs</p>
//                   </div>

//                   <button className="w-full bg-white/5 hover:bg-white/10 border border-gray-700 text-white rounded-xl py-3 text-sm font-semibold transition mb-8">
//                     Contact Sales
//                   </button>

//                   <div className="space-y-4 flex-grow">
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300 font-medium">Everything in Professional, plus:</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">Unlimited participants</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">White-label solution</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">Custom branding & domain</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">Dedicated account manager</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">API access & integrations</span>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-sm text-gray-300">24/7 premium support</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>          

//             {/* Trusted By */}
//             <div className="flex flex-col items-center">
//               <p className="text-xs text-gray-600 uppercase tracking-wider mb-6">Trusted by leading esports organizations</p>
//               <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
//                 <div className="text-xl font-bold">Slack</div>
//                 <div className="text-xl font-bold">Stripe</div>
//                 <div className="text-xl font-bold">Spotify</div>
//                 <div className="text-xl font-bold">Booking.com</div>
//                 <div className="text-xl font-bold">Gusto</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Comparison Table Section */}
//         <section id="plans" className="py-20 px-6 lg:px-8 bg-[#0A0A0A]">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl md:text-5xl font-bold mb-4">Compare Plans</h2>
//               <p className="text-gray-400">Choose the perfect plan for your esports ambitions</p>
//             </div>

//             {/* Comparison Table */}
//             <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-800">
//                       <th className="text-left p-6 font-normal text-gray-400 text-sm">Features</th>
//                       <th className="p-6 text-center">
//                         <div className="text-sm text-gray-400 mb-2">Community</div>
//                         <div className="text-2xl font-bold">Free</div>
//                       </th>
//                       <th className="p-6 text-center bg-indigo-600/5">
//                         <div className="text-sm text-indigo-400 mb-2">Professional</div>
//                         <div className="text-2xl font-bold">$2.99</div>
//                         <div className="text-xs text-gray-500">per month</div>
//                       </th>
//                       <th className="p-6 text-center">
//                         <div className="text-sm text-gray-400 mb-2">Enterprise</div>
//                         <div className="text-2xl font-bold">$6.99</div>
//                         <div className="text-xs text-gray-500">per month</div>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[
//                       { feature: 'Max participants', free: '64', pro: '256', ent: 'Unlimited' },
//                       { feature: 'Tournament formats', free: 'Standard', pro: 'Standard', ent: 'All + Custom' },
//                       { feature: 'Automated brackets', free: true, pro: true, ent: true },
//                       { feature: 'Real-time stats', free: false, pro: true, ent: true },
//                       { feature: 'Custom branding', free: false, pro: false, ent: true },
//                       { feature: 'Sponsor integration', free: false, pro: true, ent: true },
//                       { feature: 'White-label solution', free: false, pro: false, ent: true },
//                       { feature: 'Dedicated support', free: false, pro: false, ent: true }
//                     ].map((row, idx) => (
//                       <tr key={idx} className="border-b border-gray-800 last:border-0">
//                         <td className="p-6 text-sm text-gray-300">{row.feature}</td>
//                         <td className="p-6 text-center">
//                           {typeof row.free === 'boolean' ? (
//                             row.free ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-700">—</span>
//                           ) : (
//                             <span className="text-sm text-gray-400">{row.free}</span>
//                           )}
//                         </td>
//                         <td className="p-6 text-center bg-indigo-600/5">
//                           {typeof row.pro === 'boolean' ? (
//                             row.pro ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-700">—</span>
//                           ) : (
//                             <span className="text-sm text-gray-400">{row.pro}</span>
//                           )}
//                         </td>
//                         <td className="p-6 text-center">
//                           {typeof row.ent === 'boolean' ? (
//                             row.ent ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-700">—</span>
//                           ) : (
//                             <span className="text-sm text-gray-400">{row.ent}</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* CTA Buttons */}
//               <div className="grid grid-cols-3 border-t border-gray-800">
//                 <div className="p-6 text-center border-r border-gray-800">
//                   <button className="text-sm text-gray-400 hover:text-white transition">
//                     Select
//                   </button>
//                 </div>
//                 <div className="p-6 text-center bg-indigo-600/5 border-r border-gray-800">
//                   <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-8 py-2 rounded-lg transition font-medium">
//                     Get Professional
//                   </button>
//                 </div>
//                 <div className="p-6 text-center">
//                   <button className="text-sm text-gray-400 hover:text-white transition">
//                     Contact Sales
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="py-20 px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid md:grid-cols-2 gap-8 items-center mb-20">
//               <div>
//                 <div className="inline-block bg-indigo-600/10 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
//                   ORGANIZERS
//                 </div>
//                 <h2 className="text-4xl md:text-5xl font-bold mb-6">
//                   The Power of a Pro Tool, Made Simple
//                 </h2>
//                 <p className="text-gray-400 text-lg mb-8">
//                   Managing an esports event shouldn't be complicated. We've designed an intuitive 
//                   interface that automates complex tasks.
//                 </p>
                
//                 <div className="space-y-6">
//                   <div className="flex items-start space-x-4">
//                     <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Check className="w-5 h-5 text-indigo-400" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold mb-1">Total Flexibility</h3>
//                       <p className="text-sm text-gray-400">No matter the game or format, our platform adapts to your vision.</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Check className="w-5 h-5 text-indigo-400" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold mb-1">Player Engagement</h3>
//                       <p className="text-sm text-gray-400">Professional experience with profiles, stats, and real-time leaderboards.</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Check className="w-5 h-5 text-indigo-400" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold mb-1">Simplified Monetization</h3>
//                       <p className="text-sm text-gray-400">Easily integrate your sponsors and manage ticketing.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 h-96 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-6xl font-bold mb-2">01:20:15</div>
//                   <div className="text-indigo-200 text-sm">Average Setup Time</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section id="faq" className="py-20 px-6 lg:px-8 bg-[#0A0A0A]">
//           <div className="max-w-3xl mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
//               <p className="text-gray-400">Everything you need to know about our platform</p>
//             </div>

//             <div className="space-y-3">
//               {[
//                 {
//                   q: "Which games are supported?",
//                   a: "Absolutely all of them! You define the rules."
//                 },
//                 {
//                   q: "Do I need technical skills?",
//                   a: "Not at all. Our interface is designed to be simple and intuitive."
//                 },
//                 {
//                   q: "Can I organize paid tournaments?",
//                   a: "Yes, with our Enterprise plan, you can link your own ticketing system."
//                 },
//                 {
//                   q: "What payment methods do you accept?",
//                   a: "We accept all major credit cards, PayPal, and cryptocurrency payments."
//                 }
//               ].map((faq, index) => (
//                 <div 
//                   key={index}
//                   className="bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition"
//                 >
//                   <button
//                     onClick={() => toggleFaq(index)}
//                     className="w-full p-6 text-left flex justify-between items-center"
//                   >
//                     <span className="font-medium">{faq.q}</span>
//                     <ChevronDown 
//                       className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`}
//                       size={20}
//                     />
//                   </button>
//                   {openFaq === index && (
//                     <div className="px-6 pb-6 text-gray-400 text-sm border-t border-gray-800 pt-4">
//                       {faq.a}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Newsletter Section */}
//         <section className="py-20 px-6 lg:px-8">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Launch Your Next Big Event?</h2>
//               <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
//                 Join hundreds of organizers who trust us. Create your first tournament in minutes.
//               </p>
//               <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
//                 Start for Free →
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="border-t border-gray-800 py-12 px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
//               <div>
//                 <h4 className="font-semibold mb-4 text-sm">Product</h4>
//                 <ul className="space-y-2 text-sm text-gray-400">
//                   <li><a href="#" className="hover:text-white transition">Features</a></li>
//                   <li><a href="#" className="hover:text-white transition">Pricing</a></li>
//                   <li><a href="#" className="hover:text-white transition">Security</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-4 text-sm">Company</h4>
//                 <ul className="space-y-2 text-sm text-gray-400">
//                   <li><a href="#" className="hover:text-white transition">About</a></li>
//                   <li><a href="#" className="hover:text-white transition">Blog</a></li>
//                   <li><a href="#" className="hover:text-white transition">Careers</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-4 text-sm">Resources</h4>
//                 <ul className="space-y-2 text-sm text-gray-400">
//                   <li><a href="#" className="hover:text-white transition">Documentation</a></li>
//                   <li><a href="#" className="hover:text-white transition">API</a></li>
//                   <li><a href="#" className="hover:text-white transition">Support</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-4 text-sm">Legal</h4>
//                 <ul className="space-y-2 text-sm text-gray-400">
//                   <li><a href="#" className="hover:text-white transition">Privacy</a></li>
//                   <li><a href="#" className="hover:text-white transition">Terms</a></li>
//                   <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-4 text-sm">Social</h4>
//                 <ul className="space-y-2 text-sm text-gray-400">
//                   <li><a href="#" className="hover:text-white transition">Twitter</a></li>
//                   <li><a href="#" className="hover:text-white transition">Discord</a></li>
//                   <li><a href="#" className="hover:text-white transition">GitHub</a></li>
//                 </ul>
//               </div>
//             </div>
            
//             <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
//               <div className="flex items-center space-x-2 mb-4 md:mb-0">
//                 <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"></div>
//                 <span className="font-semibold">Esports Hub</span>
//               </div>
//               <p className="text-sm text-gray-500">© 2024 Esports Hub. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }





export default function OrganizerPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070')] bg-cover bg-center bg-no-repeat"></div>
        {/* Gradient overlay from transparent top to dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D]/70 to-[#0D0D0D]"></div>      </div>

      {/* Content */}
      <div className="relative z-10">
        <NavBar />

        {/* Hero Section */}
         <section className="pt-32 pb-20 px-6 lg:px-8 font-circular-web">
           <div className="max-w-5xl mx-auto text-center ">
             <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 !font-zentry special-font">
               Create and Manage<br />
            <span className='text-primary'>Unforgettable</span>    <br />
               Competitions
             </h1>
             <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
               From local events to global circuits, our platform gives you the keys to success. 
               You focus on the show, we'll handle the technology.
             </p>
            
           {/* Pricing Cards Preview */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {/* Community Plan */}
              <div className="relative rounded-2xl p-8 text-left overflow-hidden h-full flex flex-col group hover:scale-[1.02] transition-transform">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/90 via-[#1A1A1A]/95 to-[#0D0D0D]/90"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Community</h3>
                    <p className="text-sm text-gray-400">Perfect for small local tournaments and getting started</p>
                  </div>
                  
                  <div className="mb-8 pb-8 border-b border-gray-800">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold">Free</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">No credit card required</p>
                  </div>

                  <div className="flex-grow space-y-4">
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Up to 64 participants</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Standard tournament formats</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Automated bracket generation</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Basic participant profiles</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Community support</span>
                    </div>
                  </div>
                   <button className="w-full mt-8 bg-white/5 hover:bg-white/10 border border-gray-700 text-white rounded-xl py-3 text-sm font-semibold transition">
                    Get Started
                  </button>
                </div>
              </div>

              {/* White-label Plan */}
              <div className="relative rounded-2xl p-8 text-left overflow-hidden h-full flex flex-col group hover:scale-[1.02] transition-transform">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/90 via-[#1A1A1A]/95 to-[#0D0D0D]/90"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">White-label</h3>
                    <p className="text-sm text-gray-400">Custom solutions for large-scale operations</p>
                  </div>
                  
                  <div className="mb-8 pb-8 border-b border-gray-800">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold">Custom</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Tailored to your needs</p>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300 font-medium">Everything in Community, plus:</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Unlimited participants</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">White-label solution</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Custom branding & domain</span>
                    </div>
                     <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Real-time statistics & analytics</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Dedicated account manager</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">24/7 premium support</span>
                    </div>
                  </div>
                  <button className="w-full mt-8 bg-white/5 hover:bg-white/10 border border-gray-700 text-white rounded-xl py-3 text-sm font-semibold transition">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>          

            {/* Trusted By */}
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-600 uppercase tracking-wider mb-6">Trusted by leading esports organizations</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                <div className="text-xl font-bold">Slack</div>
                <div className="text-xl font-bold">Stripe</div>
                <div className="text-xl font-bold">Spotify</div>
                <div className="text-xl font-bold">Booking.com</div>
                <div className="text-xl font-bold">Gusto</div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section id="plans" className="py-20 px-6 lg:px-8 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Compare Plans</h2>
              <p className="text-gray-400">Choose the perfect plan for your esports ambitions</p>
            </div>

            {/* Comparison Table */}
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left p-6 font-normal text-gray-400 text-sm w-1/3">Features</th>
                      <th className="p-6 text-center w-1/3">
                        <div className="text-sm text-gray-400 mb-2">Community</div>
                        <div className="text-2xl font-bold">Free</div>
                      </th>
                      <th className="p-6 text-center w-1/3">
                        <div className="text-sm text-gray-400 mb-2">White-label</div>
                        <div className="text-2xl font-bold">Custom</div>
                        <div className="text-xs text-gray-500">Contact Us</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Max participants', free: '64', ent: 'Unlimited' },
                      { feature: 'Tournament formats', free: 'Standard', ent: 'All + Custom' },
                      { feature: 'Automated brackets', free: true, ent: true },
                      { feature: 'Real-time stats', free: false, ent: true },
                      { feature: 'Sponsor integration', free: false, ent: true },
                      { feature: 'Custom branding', free: false, ent: true },
                      { feature: 'White-label solution', free: false, ent: true },
                      { feature: 'Dedicated support', free: false, ent: true }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-800 last:border-0">
                        <td className="p-6 text-sm text-gray-300">{row.feature}</td>
                        <td className="p-6 text-center">
                          {typeof row.free === 'boolean' ? (
                            row.free ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-700">—</span>
                          ) : (
                            <span className="text-sm text-gray-400">{row.free}</span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {typeof row.ent === 'boolean' ? (
                            row.ent ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-700">—</span>
                          ) : (
                            <span className="text-sm text-gray-400">{row.ent}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-2 border-t border-gray-800">
                <div className="p-6 text-center border-r border-gray-800">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-8 py-2 rounded-lg transition font-medium">
                    Get Started
                  </button>
                </div>
                <div className="p-6 text-center">
                  <button className="text-sm text-gray-400 hover:text-white transition">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-20">
              <div>
                <div className="inline-block bg-indigo-600/10 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ORGANIZERS
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  The Power of a Pro Tool, Made Simple
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Managing an esports event shouldn't be complicated. We've designed an intuitive 
                  interface that automates complex tasks.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Total Flexibility</h3>
                      <p className="text-sm text-gray-400">No matter the game or format, our platform adapts to your vision.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Player Engagement</h3>
                      <p className="text-sm text-gray-400">Professional experience with profiles, stats, and real-time leaderboards.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Simplified Monetization</h3>
                      <p className="text-sm text-gray-400">Easily integrate your sponsors and manage ticketing.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">01:20:15</div>
                  <div className="text-indigo-200 text-sm">Average Setup Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-6 lg:px-8 bg-[#0A0A0A]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-400">Everything you need to know about our platform</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Which games are supported?",
                  a: "Absolutely all of them! You define the rules."
                },
                {
                  q: "Do I need technical skills?",
                  a: "Not at all. Our interface is designed to be simple and intuitive."
                },
                {
                  q: "Can I organize paid tournaments?",
                  a: "Yes, with our White-label plan, you can link your own ticketing system and payment gateways."
                },
                {
                  q: "What payment methods do you accept for the plan?",
                  a: "We accept all major credit cards, PayPal, and cryptocurrency payments for custom plans."
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex justify-between items-center"
                  >
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown 
                      className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`}
                      size={20}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6 text-gray-400 text-sm border-t border-gray-800 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Launch Your Next Big Event?</h2>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of organizers who trust us. Create your first tournament in minutes.
              </p>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Start for Free →
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div>
                <h4 className="font-semibold mb-4 text-sm">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#features" className="hover:text-white transition">Features</a></li>
                  <li><a href="#plans" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Security</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/downloads" className="hover:text-white transition">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition">API</a></li>
                  <li><a href="#" className="hover:text-white transition">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm">Social</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition">Discord</a></li>
                  <li><a href="#" className="hover:text-white transition">GitHub</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <div className="flex items-center mb-4 md:mb-0">
                <Link to="/" className="flex items-center">
                  <img
                    src="img/logo-gamius-white.png"
                    alt="GAMIUS Logo"
                    className="h-10"
                  />
                </Link>
              </div>
              <p className="text-sm text-gray-500">© 2025 Gamius. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}