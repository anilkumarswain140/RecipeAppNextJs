import React, { useState } from 'react';
import RecipeFormModal from './AddRecipeModal';
import './AddRecipeButton.css';
const AddRecipeButton = ({ addRecipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Add Recipe Button */}
      <button
        onClick={openModal}
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 add-recipe-btn"
      >
        Add Recipe
      </button>

      {/* Modal */}
      <RecipeFormModal isOpen={isModalOpen} closeModal={closeModal} addRecipe={addRecipe} />
    </>
  );
};

export default AddRecipeButton;
