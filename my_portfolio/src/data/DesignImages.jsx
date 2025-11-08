// Main design images data file - imports from all category files
import { foodPosts } from './categories/foodPosts';
import { filmPosts } from './categories/filmPosts';
import { classPosts } from './categories/classPosts';
import { others } from './categories/others';

export const designImages = {
  foodPosts,
  filmPosts,
  classPosts,
  others
};

export const categories = [
  { 
    id: 'foodPosts', 
    name: 'Food Posts', 
    color: 'from-green-500 to-emerald-600',
    count: foodPosts.length
  },
  { 
    id: 'filmPosts', 
    name: 'Film Posts', 
    color: 'from-blue-500 to-purple-600',
    count: filmPosts.length
  },
  { 
    id: 'classPosts', 
    name: 'Class Posts', 
    color: 'from-orange-500 to-red-600',
    count: classPosts.length
  },
  { 
    id: 'others', 
    name: 'Others', 
    color: 'from-gray-500 to-gray-700',
    count: others.length
  }
];

// Helper function to get all designs as a flat array
export const getAllDesigns = () => {
  return Object.values(designImages).flat();
};

// Helper function to get designs by category
export const getDesignsByCategory = (category) => {
  return designImages[category] || [];
};