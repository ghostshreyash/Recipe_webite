import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./RecipeDetails.css"; // Adding external CSS file for custom styles

function RecipeDetails({ recipes, deleteRecipe, editRecipe }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === Number(id));

  const handleEdit = () => {
    editRecipe(recipe.id);
    navigate('/create');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete the recipe?')) {
      deleteRecipe(recipe.id);
      navigate('/');
    }
  };

  if (!recipe) {
    return <div className="not-found">Recipe not found!</div>;
  }

  return (
    <div className="recipe-details-container">
      {/* Header Section */}
      <div className="recipe-header">
        <h2 className="recipe-title">{recipe.title}</h2>
        <div className="recipe-header-actions">
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="recipe-content">
        {/* Ingredients Section */}
        <div className="ingredients-section">
          <h4 className="section-title">Ingredients</h4>
          <ul className="ingredient-list">
            {recipe.ingredients.split('\n').map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="instructions-section">
          <h4 className="section-title">Instructions</h4>
          <div
            className="instructions-content"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
