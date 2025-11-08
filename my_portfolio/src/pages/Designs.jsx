import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { designImages, categories } from '../data/DesignImages';
import FoodPosts from '../components/categories/FoodPosts';
import FilmPosts from '../components/categories/FilmPosts';
import ClassPosts from '../components/categories/ClassPosts';
import Others from '../components/categories/Others';
import ImageModal from '../components/ImageModal';
import NightSkyBackground from '../components/NightSkyBackground';

const Designs = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowAll = () => {
    setSelectedCategory('all');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Night Sky Background */}
      <NightSkyBackground />
      
      {/* Additional gradient overlays for depth */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={handleBackToHome}
            className="mb-8 px-6 py-2 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg border border-white/10 hover:bg-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          >
            ← Back to Home
          </button>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-pink-300 bg-clip-text text-transparent mb-4">
            My Designs
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto backdrop-blur-sm bg-black/20 rounded-lg p-4 border border-white/5">
            {selectedCategory === 'all' 
              ? 'Explore all my creative work under the stars' 
              : `Viewing ${categories.find(cat => cat.id === selectedCategory)?.name}`
            }
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={handleShowAll}
            className={`px-6 py-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30'
                : 'bg-gray-800/30 text-gray-300 border-white/10 hover:bg-gray-700/30 hover:border-white/20'
            }`}
          >
            All Works
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-6 py-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg shadow-blue-500/30`
                  : 'bg-gray-800/30 text-gray-300 border-white/10 hover:bg-gray-700/30 hover:border-white/20'
              }`}
            >
              {category.name}
              <span className="ml-2 px-2 py-1 bg-black/40 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Show selected category or all categories */}
        <div className="space-y-16">
          {selectedCategory === 'all' ? (
            // Show all categories
            <>
              <FoodPosts 
                designs={designImages.foodPosts} 
                onImageClick={handleImageClick}
              />
              <FilmPosts 
                designs={designImages.filmPosts} 
                onImageClick={handleImageClick}
              />
              <ClassPosts 
                designs={designImages.classPosts} 
                onImageClick={handleImageClick}
              />
              <Others 
                designs={designImages.others} 
                onImageClick={handleImageClick}
              />
            </>
          ) : (
            // Show only selected category
            <>
              {selectedCategory === 'foodPosts' && (
                <FoodPosts 
                  designs={designImages.foodPosts} 
                  onImageClick={handleImageClick}
                />
              )}
              {selectedCategory === 'filmPosts' && (
                <FilmPosts 
                  designs={designImages.filmPosts} 
                  onImageClick={handleImageClick}
                />
              )}
              {selectedCategory === 'classPosts' && (
                <ClassPosts 
                  designs={designImages.classPosts} 
                  onImageClick={handleImageClick}
                />
              )}
              {selectedCategory === 'others' && (
                <Others 
                  designs={designImages.others} 
                  onImageClick={handleImageClick}
                />
              )}
            </>
          )}
        </div>

        {/* Back to All button when viewing single category */}
        {selectedCategory !== 'all' && (
          <div className="text-center mt-12">
            <button
              onClick={handleShowAll}
              className="px-6 py-3 bg-gray-800/30 backdrop-blur-sm text-white rounded-lg border border-white/10 hover:bg-gray-700/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              ← Back to All Categories
            </button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedImage}
      />
    </div>
  );
};

export default Designs;