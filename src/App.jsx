import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import Layout from "./Layout";
import Home from "./Pages/Home/Home";
import ProjectDetail from "./Pages/OurProjectDetails/OurProjectDetails";
import Projects from "./Pages/Projects/Projects";
import Services from "./Pages/Services/Services";
import About from "./Pages/AboutUs/About";
import ContactForm from "./Pages/ContactUs/ContactUs";


function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Animation duration: 3 seconds total
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <HelmetProvider>
      <Router>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="contact" element={<ContactForm />} />
              <Route path="about" element={<About />} />
              <Route path="ourwork" element={<Projects />} />
              <Route path="ourwork/:slug" element={<ProjectDetail />} />
            </Route>
          </Routes>
        )}
      </Router>
    </HelmetProvider>
  );
}

function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black z-50">
      <div className="text-center px-4 w-full max-w-md">
        {/* Logo with construction-themed animation */}
        <div className="relative mb-6 flex justify-center">
          <div className="relative">
            <img
              src="/logo.png"
              alt="Emerge Construction Logo"
              className="w-40 h-40 md:w-48 md:h-48 mx-auto animate-[softBounce_2s_ease-in-out_infinite]"
            />
            
            {/* Construction beam animation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-yellow-400 animate-[buildUp_1.5s_ease-out_forwards] origin-top"></div>
            
            {/* Particle effects */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-[sparkle_2s_ease-in-out_infinite]"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1.5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Text with construction-themed entrance */}
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white animate-[hammerIn_0.8s_ease-out_0.3s_both]">
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            EMERGE
          </span>
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold text-gray-300 animate-[slideUp_0.8s_ease-out_0.6s_both]">
          CONSTRUCTION CONSULTANTS
        </h2>
        
        {/* Construction-themed loading indicator */}
        <div className="mt-8 animate-[fadeIn_1s_ease-out_1s_both]">
          <div className="flex justify-center items-center space-x-4">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="relative w-3 h-3 bg-yellow-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="absolute inset-0 border-2 border-yellow-400 rounded-full animate-[ripple_1.5s_ease-out_infinite]"
                  style={{ animationDelay: `${i * 0.2}s` }}></div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-yellow-400 text-sm font-medium animate-[fadeIn_1s_ease-out_1.2s_both]">
            BUILDING YOUR VISION
          </p>
        </div>
      </div>
      
      {/* Enhanced animations */}
      <style jsx global>{`
        @keyframes softBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        
        @keyframes hammerIn {
          from {
            transform: translateY(-30px) rotate(-5deg);
            opacity: 0;
          }
          to {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes buildUp {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        
        @keyframes sparkle {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;