import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

export default function Card(props) {
  return (
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
              <Card
                data-resizable
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  width: 343,
                  height:'auto',
                  backgroundColor:'#D9D9D9'
                }}
              >
                <CardOverflow variant="solid" color="#dc3545">
                  <AspectRatio
                    variant="outlined"
                    color="#dc3545"
                    ratio="1"
                    sx={{
                      m: 'auto',
                      transform: 'translateY(50%)',
                      borderRadius: '50%',
                      width: '100px',
                      boxShadow: 'sm',
                      bgcolor: 'background.surface',
                      position: 'relative',
                    }}
                  >
                    <div>
                      <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} />
                    </div>
                  </AspectRatio>
                </CardOverflow>
                <Typography level="title-lg" sx={{ mt: 'calc(100px / 2)' }}>
                  {recipe.title}
                </Typography>
                <Typography level="body-sm">
                    {recipe.ingredients}
                  </Typography>
      
    

                {/* Dropdown Button */}
                <div className="menu-container" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <button className="menu-btn" onClick={() => handleDropdownToggle(recipe.id)}>
                    &#x22EE;
                  </button>

                  {dropdownOpen === recipe.id && (
                    <div
                      className="dropdown"
                      style={{
                        position: 'absolute',
                        top: '30px',
                        right: '0',
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: '8px 0',
                        zIndex: '100',
                      }}
                    >
                      <button onClick={() => handleEdit(recipe)} style={{ display: 'block', padding: '8px', cursor: 'pointer' }}>
                        Edit
                      </button>
                      <button onClick={() => deleteRecipe(recipe.id)} style={{ display: 'block', padding: '8px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                </Card>
            ))
          ) : (
            <p>No recipes found!</p>
          )}
        </div>
        
  );
}

