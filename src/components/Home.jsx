import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard'; 

function Home({ recipes, deleteRecipe, editRecipe }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (recipe) => {
    navigate('/create', { state: { recipe } });
  };

  const handleDropdownToggle = (id) => {
    setDropdownOpen((prevId) => (prevId === id ? null : id));
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the recipe?')) {
      deleteRecipe(id); 
      setFilteredRecipes(filteredRecipes.filter((recipe) => recipe.id !== id)); 
      setDropdownOpen(null); 
    }
  };

  return (
    <div className="home">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', padding: '40px' }}>
        {/* Left section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '50px' }}>
          <img src="./assets/title.svg" alt="Title" style={{ width: 'auto', height: 'auto' }} />

          {/* Search bar and Create Button */}
          <div className="search-create-bar" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '50px', width: '60%' }}>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                flex: 1,
                padding: '10px 20px',
                borderRadius: '50px',
                backgroundColor: '#D9D9D9',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
              }}
            />
            <Link to="/create">
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '50px',
                  backgroundColor: '#d45b0a',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  flex: 0.3,
                }}
              >
                Create New Recipe
              </button>
            </Link>
          </div>

          {/* Filtered Recipe Cards */}
          <div
            className="filtered-recipe-cards"
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              marginTop: '30px',
              width: '70%',
              padding: '10px',
            }}
          >
            {filteredRecipes.length > 0 ? (
              filteredRecipes.slice(0, 3).map((recipe) => (
                <RecipeCard
                  key={recipe.id} 
                  recipe={recipe}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDropdownToggle={handleDropdownToggle}
                  dropdownOpen={dropdownOpen}
                />
              ))
            ) : (
              <p>No recipes found!</p>
            )}
          </div>
        </div>

        {/* Right section */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '50px' }}>
          <img src="./assets/title-2.svg" alt="Title 2" style={{ width: 'auto', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
}

export default Home;
