import React from 'react';
import { useNavigate } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import IconButton from '@mui/joy/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';

function RecipeCard({ recipe, onEdit, onDelete, onDropdownToggle, dropdownOpen }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`); // Navigate to recipe details page
  };

  return (
    <Card
      sx={{
        position: 'relative',
        width: 300,
        minHeight: '420px',
        backgroundColor: '#fff8e1', // Light, warm background color
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
        },
        cursor: 'pointer',
        paddingBottom: '20px', // Ensures there's room for content at the bottom
        paddingTop: '60px', // Allows space for the image and adjusts content downwards
      }}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <CardOverflow
        sx={{
          borderRadius: '50%',
          margin: '0 auto', // Centers the image horizontally
          position: 'relative', // Positioned relative to card's top
          top: '-40px', // Adjusts the image to be 20px below the top of the card
          width: '120px',
          height: '120px',
          border: '5px solid white',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for the image
          overflow: 'hidden',
          backgroundColor: '#fff', // White background for the image circle
        }}
      >
        <AspectRatio ratio="1">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} />
          )}
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ marginTop: '40px' }}> {/* Adjusted margin for text */}
        {/* Recipe Title */}
        <Typography
          level="h5"
          sx={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#d45b0a' }}
        >
          {recipe.title}
        </Typography>

        {/* Ingredients */}
        <Typography
          sx={{
            fontSize: '0.9rem',
            color: '#666',
            marginTop: '10px',
            marginBottom: '20px',
            minHeight: '60px', // Ensure consistent card height
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {recipe.ingredients}
        </Typography>

        {/* Recipe Creation Date */}
        <Typography sx={{ fontSize: '0.8rem', color: '#999', mt: 2 }}>
          Created on: {new Date(recipe.id).toLocaleDateString()}
        </Typography>
      </CardContent>

      {/* Dropdown Button for Edit/Delete */}
      <IconButton
        aria-label="settings"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click when opening menu
          onDropdownToggle(recipe.id);
        }}
        sx={{ position: 'absolute', top: 10, right: 10 }}
      >
        <MoreVertIcon />
      </IconButton>

      {dropdownOpen === recipe.id && (
        <Box
          sx={{
            position: 'absolute',
            top: '50px',
            right: '20px',
            backgroundColor: 'white',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
            zIndex: 100,
            padding: '10px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onEdit(recipe)}
            style={{
              display: 'block',
              padding: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            style={{
              display: 'block',
              padding: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            Delete
          </button>
        </Box>
      )}
    </Card>
  );
}

export default RecipeCard;
