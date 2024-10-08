import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetails from './components/RecipeDetails';
import Navbar from './components/Navbar';
import AllRecipes from './components/AllRecipes';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (savedRecipes) {
      setRecipes(savedRecipes);
    }

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setIsAuthenticated(true);
    }
  }, []);

  const saveRecipe = (recipe) => {
    if (recipe.id) {
      const updatedRecipes = recipes.map((r) => (r.id === recipe.id ? recipe : r));
      setRecipes(updatedRecipes);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    } else {
      const newRecipe = { ...recipe, id: Date.now() };
      const updatedRecipes = [...recipes, newRecipe];
      setRecipes(updatedRecipes);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    }
  };

  const editRecipe = (id) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    setEditingRecipe(recipeToEdit);
  };

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  recipes={recipes}
                  deleteRecipe={deleteRecipe}
                  editRecipe={editRecipe}
                />
              }
            />
            <Route
              path="/create"
              element={<CreateRecipe saveRecipe={saveRecipe} editingRecipe={editingRecipe} />}
            />
            <Route
              path="/recipe/:id"
              element={
                <RecipeDetails
                  recipes={recipes}
                  deleteRecipe={deleteRecipe}
                  editRecipe={editRecipe}
                />
              }
            />
            <Route path="/recipes" element={<AllRecipes recipes={recipes} />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to home */}
          </Routes>
        </>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<SignupForm />}
          />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect unknown routes to login */}
        </Routes>
      )}
    </Router>
  );
}

export default App;
