import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleViewDesigns = () => {
    navigate('/designs');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-ping"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#eee 1px, transparent 1px), linear-gradient(90deg, #eee 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 animate-gradient"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          
          {/* Left Column - Personal Details */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <div className="space-y-6 backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-white/10">
              {/* Name */}
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent animate-gradient">
                John Doe
              </h1>
              
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl text-gray-300 font-light">
                Graphic Designer & Visual Artist
              </h2>
              
              {/* Bio/Description */}
              <div className="space-y-4">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Welcome to my creative space! I specialize in crafting visually stunning 
                  designs that tell compelling stories and create memorable experiences.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  With over 5 years of experience in digital design, I blend creativity 
                  with strategy to deliver exceptional visual solutions.
                </p>
              </div>
              
              {/* View My Designs Button */}
              <button
                onClick={handleViewDesigns}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl backdrop-blur-sm"
              >
                View My Designs
              </button>
            </div>
          </div>
          
          {/* Right Column - Profile Photo */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Profile Photo Container */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl backdrop-blur-sm bg-white/5">
                {/* Placeholder for profile photo - replace with your actual image */}
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white text-lg">Your Profile Photo</span>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/30 rounded-full blur-xl animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;