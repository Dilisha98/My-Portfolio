import React from 'react';

const ClassPosts = ({ designs, onImageClick }) => {
  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {designs.map((design) => (
          <div
            key={design.id}
            className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer aspect-square"
            onClick={() => onImageClick(design)}
          >
            <img
              src={design.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClassPosts;