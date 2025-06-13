import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Divider,
  useTheme,
  alpha,
  Stack
} from '@mui/material';
import { 
  PremiumCard, 
  PremiumButton, 
  StatisticCard,
  ImmersiveHero,
  StatsDashboard,
  FighterProfile,
  PremiumNavigation
} from '../components/ui';
import AppLayout from '../components/layout/AppLayout';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  SportsMma as SportsMmaIcon,
  EmojiEvents as EmojiEventsIcon,
  VideoLibrary as VideoLibraryIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

// Sample data for the navigation
const navSections = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", path: "/dashboard", icon: <HomeIcon /> },
      { title: "Fighters", path: "/fighters", icon: <PeopleIcon />, badge: 5 },
      { title: "Matches", path: "/matches", icon: <SportsMmaIcon /> },
    ]
  },
  {
    title: "Content",
    items: [
      { title: "Videos", path: "/videos", icon: <VideoLibraryIcon />, badge: "New" },
      { title: "Tournament", path: "/tournament", icon: <EmojiEventsIcon /> },
    ]
  },
  {
    title: "System",
    items: [
      { title: "Settings", path: "/settings", icon: <SettingsIcon /> },
    ]
  }
];

// Section component for cleaner code organization
const Section: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 6 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          mb: 3, 
          position: 'relative',
          display: 'inline-block',
          fontWeight: 600,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -5,
            left: 0,
            width: '100%',
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.light, 0.3)})`,
          }
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

const UIShowcasePage: React.FC = () => {
  const theme = useTheme();
  
  // Stats for the dashboard
  const stats = [
    { title: 'Fighters', value: 124, trend: 12, color: 'primary' as 'primary' },
    { title: 'Matches', value: 56, trend: 8, color: 'secondary' as 'secondary' },
    { title: 'Gyms', value: 28, trend: 2, color: 'primary' as 'primary' },
    { title: 'Viewers', value: 12400, trend: 22, color: 'primary' as 'primary' },
  ];
  
  return (
    <AppLayout>
      <ImmersiveHero
        title="Raw Talent Scout"
        subtitle="Discover the next MMA champions"
        buttonText="Explore Fighters"
        backgroundImage="https://source.unsplash.com/featured/?mma,ufc"
        overlayOpacity={0.7}
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: 1,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Premium UI Components
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 6,
            color: theme.palette.text.secondary,
            maxWidth: 800
          }}
        >
          A showcase of custom UI components designed for the premium MMA scouting application
        </Typography>
        
        <Section title="Navigation">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <PremiumNavigation sections={navSections} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Modern Navigation</Typography>
                <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                  A visually enhanced navigation component with smooth animations, active indicators, and section organization.
                  Designed for intuitive application navigation with visual feedback.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <PremiumButton variant="contained" gradientColor="primary">
                    View Details
                  </PremiumButton>
                  <PremiumButton variant="outlined" gradientColor="secondary">
                    Documentation
                  </PremiumButton>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Section>
        
        <Divider sx={{ my: 6 }} />
        
        <Section title="Fighter Profiles">
          <FighterProfile 
            name="Alex Thompson"
            highlighted={true}
            avatarUrl="https://source.unsplash.com/random/100x100/?mma,fighter"
            imageLarge="https://source.unsplash.com/featured/?mma,fighter,male"
          />
          
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <FighterProfile 
                  name="Sarah Johnson"
                  nickname="The Lioness"
                  weightClass="Strawweight"
                  age={25}
                  height="5'6"
                  weight="115 lbs"
                  reach="68"
                  record="8-1-0"
                  nationality="Canada"
                  team="Revolution MMA"
                  skills={{
                    striking: 92,
                    grappling: 76,
                    stamina: 85,
                    strength: 70,
                    speed: 94,
                    technique: 90
                  }}
                  tags={["Muay Thai", "BJJ Purple Belt", "Kickboxing Champion"]}
                  notes="Technical striker with exceptional speed and movement. Improving ground game but primarily keeps the fight standing."
                  avatarUrl="https://source.unsplash.com/random/100x100/?woman,fighter"
                  imageLarge="https://source.unsplash.com/featured/?mma,fighter,female"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FighterProfile 
                  name="Miguel Santana"
                  nickname="El Toro"
                  weightClass="Lightweight"
                  age={29}
                  height="5'10"
                  weight="155 lbs"
                  reach="71"
                  record="14-3-0"
                  nationality="Mexico"
                  team="Guerreros MMA"
                  skills={{
                    striking: 78,
                    grappling: 95,
                    stamina: 82,
                    strength: 88,
                    speed: 75,
                    technique: 89
                  }}
                  tags={["Wrestling", "BJJ Black Belt", "Submission Specialist"]}
                  notes="Dominant grappler with exceptional submission skills. Constantly improving striking to complement his ground game."
                  avatarUrl="https://source.unsplash.com/random/100x100/?man,fighter"
                  imageLarge="https://source.unsplash.com/featured/?boxing,fighter"
                />
              </Grid>
            </Grid>
          </Box>
        </Section>
        
        <Divider sx={{ my: 6 }} />
        
        <Section title="Statistics & Analytics">
          <StatsDashboard 
            title="Performance Analytics"
            stats={stats}
          />
          <Typography variant="subtitle1" sx={{ mt: 1, mb: 3, textAlign: 'center', color: 'text.secondary' }}>
            Track fighter metrics and engagement
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <StatisticCard
                title="Average Fight Duration"
                value="8:24"
                trend={1}
                trendLabel="1:12"
                icon={<SportsMmaIcon />}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatisticCard
                title="Submission Rate"
                value="42%"
                trend={5}
                trendLabel="5%"
                icon={<EmojiEventsIcon />}
                color="success"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatisticCard
                title="KO/TKO Rate"
                value="35%"
                trend={-3}
                trendLabel="3%"
                icon={<PeopleIcon />}
                color="error"
              />
            </Grid>
          </Grid>
        </Section>
        
        <Divider sx={{ my: 6 }} />
        
        <Section title="Premium Cards & Buttons">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <PremiumCard
                title="Discover Talent"
                subtitle="Find the next UFC champion"
                glowColor="primary"
                elevation={3}
              >
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <PremiumButton 
                    size="small" 
                    variant="contained" 
                    gradientColor="primary"
                    glowEffect
                  >
                    Explore
                  </PremiumButton>
                  <PremiumButton 
                    size="small" 
                    variant="outlined" 
                    gradientColor="primary"
                  >
                    Learn More
                  </PremiumButton>
                </Box>
              </PremiumCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <PremiumCard
                title="Coach Network"
                subtitle="Elite training & development"
                glowColor="secondary"
                elevation={3}
              >
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <PremiumButton 
                    size="small" 
                    variant="contained" 
                    gradientColor="secondary"
                    glowEffect
                  >
                    Connect
                  </PremiumButton>
                  <PremiumButton 
                    size="small" 
                    variant="outlined" 
                    gradientColor="secondary"
                  >
                    View Profiles
                  </PremiumButton>
                </Box>
              </PremiumCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <PremiumCard
                title="Reality Show"
                subtitle="The ultimate fighter competition"
                glowColor="primary"
                elevation={3}
              >
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <PremiumButton 
                    size="small" 
                    variant="contained" 
                    gradientColor="primary"
                    glowEffect
                  >
                    Watch Now
                  </PremiumButton>
                  <PremiumButton 
                    size="small" 
                    variant="outlined" 
                    gradientColor="primary"
                  >
                    Schedule
                  </PremiumButton>
                </Box>
              </PremiumCard>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 6, p: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Button Variants</Typography>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ mb: 3 }}>
              <PremiumButton variant="contained" gradientColor="primary" glowEffect>Primary</PremiumButton>
              <PremiumButton variant="contained" gradientColor="secondary" glowEffect>Secondary</PremiumButton>
              <PremiumButton variant="contained" gradientColor="primary" glowEffect>Info</PremiumButton>
              <PremiumButton variant="contained" gradientColor="primary" glowEffect>Success</PremiumButton>
              <PremiumButton variant="contained" gradientColor="primary" glowEffect>Warning</PremiumButton>
              <PremiumButton variant="contained" gradientColor="primary" glowEffect>Error</PremiumButton>
            </Stack>
            
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <PremiumButton variant="outlined" gradientColor="primary">Primary</PremiumButton>
              <PremiumButton variant="outlined" gradientColor="secondary">Secondary</PremiumButton>
              <PremiumButton variant="outlined" gradientColor="primary">Info</PremiumButton>
              <PremiumButton variant="outlined" gradientColor="primary">Success</PremiumButton>
              <PremiumButton variant="outlined" gradientColor="primary">Warning</PremiumButton>
              <PremiumButton variant="outlined" gradientColor="primary">Error</PremiumButton>
            </Stack>
          </Box>
        </Section>
      </Container>
    </AppLayout>
  );
};

export default UIShowcasePage;
