import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateRecipe.css'; 

function CreateRecipe({ saveRecipe, editingRecipe }) {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.recipe) {
      setRecipe(location.state.recipe);
    } else if (editingRecipe) {
      setRecipe(editingRecipe);
    }
  }, [location.state, editingRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveRecipe(recipe);
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRecipe({ ...recipe, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-recipe-container">
      <form onSubmit={handleSubmit} className="recipe-form">
        <h2>{recipe.id ? 'Edit Recipe' : 'Create Recipe'}</h2>

        <label className="form-label">Title:</label>
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          required
          className="form-input"
        />

        <label className="form-label">Ingredients:</label>
        <textarea
          value={recipe.ingredients}
          onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
          required
          className="form-textarea"
        ></textarea>

        <label className="form-label">Instructions:</label>
        <ReactQuill
          value={recipe.instructions}
          onChange={(content) => setRecipe({ ...recipe, instructions: content })}
          className="form-quill"
        />

        <label className="form-label">Recipe Image:</label>
        <input 
          type="file" 
          onChange={handleImageChange} 
          accept="image/*" 
          className="form-input"
        />

        <button type="submit" className="form-button">
          {recipe.id ? 'Update Recipe' : 'Create Recipe'}
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
