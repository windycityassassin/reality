import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Grid, Paper, Divider, alpha, useTheme } from '@mui/material';
import AppLayout from '../components/layout/AppLayout';
import Interactive3DFighter from '../components/ui/Interactive3DFighter';
import ParallaxHero from '../components/ui/ParallaxHero';
import HorizontalScrollGallery, { GalleryItem } from '../components/ui/HorizontalScrollGallery';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Sample gallery data
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Alex "The Mauler" Petrov',
    subtitle: 'Heavyweight contender with devastating knockout power',
    image: 'https://source.unsplash.com/featured/?boxing,heavyweight',
    category: 'Heavyweight',
    link: '#fighter1'
  },
  {
    id: 2,
    title: 'Sarah "The Lioness" Johnson',
    subtitle: 'Technical striker with excellent takedown defense',
    image: 'https://source.unsplash.com/featured/?mma,woman',
    category: 'Strawweight',
    link: '#fighter2'
  },
  {
    id: 3,
    title: 'Mike "Iron Fist" Chen',
    subtitle: 'Submission specialist with a background in Brazilian Jiu-Jitsu',
    image: 'https://source.unsplash.com/featured/?mma,fighter',
    category: 'Welterweight',
    link: '#fighter3'
  },
  {
    id: 4,
    title: 'Jessica "The Hurricane" Martinez',
    subtitle: 'Rising star with an undefeated professional record',
    image: 'https://source.unsplash.com/featured/?kickboxing,woman',
    category: 'Bantamweight',
    link: '#fighter4'
  },
  {
    id: 5,
    title: 'Carlos "The Python" Silva',
    subtitle: 'Grappling prodigy with multiple championship titles',
    image: 'https://source.unsplash.com/featured/?jiu-jitsu,martial',
    category: 'Middleweight',
    link: '#fighter5'
  },
  {
    id: 6,
    title: 'Leila "The Assassin" Rahman',
    subtitle: 'Muay Thai expert with deadly clinch work',
    image: 'https://source.unsplash.com/featured/?muay,thai',
    category: 'Flyweight',
    link: '#fighter6'
  }
];

const PremiumUIPage: React.FC = () => {
  const theme = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppLayout>
      {/* Parallax Hero */}
      <ParallaxHero 
        title="Discover Elite Fighters"
        subtitle="Explore the world's top MMA talent with immersive profiles and performance analytics"
        ctaText="View Roster"
        layers={[
          {
            image: 'https://source.unsplash.com/featured/?mma,fighter',
            depth: 0.2,
            position: 'right'
          },
          {
            image: 'https://source.unsplash.com/featured/?boxing,gloves',
            depth: 0.4,
            position: 'left'
          },
          {
            image: 'https://source.unsplash.com/featured/?championship,belt',
            depth: 0.6,
            position: 'bottom'
          }
        ]}
      />
      
      <Box sx={{ py: 6, backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography 
              variant="overline" 
              sx={{ 
                fontSize: '0.9rem', 
                fontWeight: 600, 
                color: theme.palette.primary.main,
                letterSpacing: '0.1em',
                mb: 1,
                display: 'block'
              }}
            >
              PREMIUM COMPONENTS
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                mb: 2 
              }}
            >
              Award-Winning MMA Experience
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 300,
                color: alpha(theme.palette.text.primary, 0.7),
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Our premium UI components create an immersive experience inspired by the world's most acclaimed digital designs
            </Typography>
          </Box>
          
          <Grid container spacing={4} alignItems="center" sx={{ mb: 10 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Interactive 3D Fighter Profiles
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: alpha(theme.palette.text.primary, 0.7) }}>
                Explore fighter profiles with our immersive 3D component that responds to your mouse movements. Get detailed stats and analytics with beautifully animated visuals.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  sx={{ 
                    borderRadius: '50px',
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  View All Fighters
                </Button>
                <Button 
                  variant="outlined"
                  sx={{ 
                    borderRadius: '50px',
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={10}
                sx={{ 
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.2)}`
                }}
              >
                <Interactive3DFighter 
                  name="Sarah Johnson"
                  nickname="The Lioness"
                  specialty="Mixed Martial Arts"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Horizontal Scroll Gallery */}
      <HorizontalScrollGallery 
        items={galleryItems}
        title="MMA Elite Fighters"
        subtitle="Explore our roster of world-class athletes dominating the octagon"
      />
      
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={4}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    mb: 3
                  }}
                >
                  <SportsMmaIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Premium Fight Statistics
                </Typography>
                <Typography sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 3 }}>
                  Access comprehensive analytics and performance metrics for every fighter in our database. Compare stats and track progress over time.
                </Typography>
                <Button 
                  variant="text" 
                  color="primary"
                  sx={{ 
                    fontWeight: 600, 
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  Explore Stats
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={4}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.secondary.main, 0.15)}`
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    mb: 3
                  }}
                >
                  <FitnessCenterIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Training Insights
                </Typography>
                <Typography sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 3 }}>
                  Discover detailed training regimens and techniques from professional fighters. Learn from the best to improve your own skills.
                </Typography>
                <Button 
                  variant="text" 
                  color="secondary"
                  sx={{ 
                    fontWeight: 600, 
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  View Training
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={4}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.success.main, 0.15)}`
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    mb: 3
                  }}
                >
                  <EmojiEventsIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Fight Predictions
                </Typography>
                <Typography sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 3 }}>
                  Leverage our advanced AI models to predict fight outcomes based on fighter statistics, historical performance, and matchup analytics.
                </Typography>
                <Button 
                  variant="text" 
                  color="success"
                  sx={{ 
                    fontWeight: 600, 
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  Try Predictions
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  );
};

export default PremiumUIPage;
