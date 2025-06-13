import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  alpha,
  LinearProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MovieIcon from '@mui/icons-material/Movie';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Sample data
const SHOW_SEASONS = [
  {
    id: 1,
    name: 'RAW: India Season 1',
    status: 'In Production',
    episodes: 10,
    premiere: '2025-06-15',
    location: 'Mumbai',
    mainCoach: 'Vijay Singh',
    guestCoaches: ['Amir Khan', 'Mary Kom'],
    fightersCount: 16,
    poster: 'https://images.unsplash.com/photo-1557130641-1e14ff9ca492?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'RAW: India Season 2',
    status: 'Planning',
    episodes: 12,
    premiere: '2026-01-20',
    location: 'Delhi',
    mainCoach: 'TBD',
    guestCoaches: [],
    fightersCount: 0,
    poster: 'https://images.unsplash.com/photo-1579019163248-e7761241d85d?q=80&w=400&auto=format&fit=crop'
  }
];

const CAST_FIGHTERS = [
  { id: 1, name: 'Rajiv Kumar', weightClass: 'Lightweight', record: '8-0', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=200&auto=format&fit=crop', status: 'Confirmed' },
  { id: 2, name: 'Aisha Patel', weightClass: 'Women\'s Strawweight', record: '7-1', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=200&auto=format&fit=crop', status: 'Confirmed' },
  { id: 3, name: 'Vikram Singh', weightClass: 'Welterweight', record: '6-0', image: 'https://images.unsplash.com/photo-1567013127542-490d757e6349?q=80&w=200&auto=format&fit=crop', status: 'Confirmed' },
  { id: 4, name: 'Priya Sharma', weightClass: 'Women\'s Flyweight', record: '5-1-1', image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=200&auto=format&fit=crop', status: 'Backup' },
  { id: 5, name: 'Arjun Reddy', weightClass: 'Middleweight', record: '9-2', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&auto=format&fit=crop', status: 'Invited' },
  { id: 6, name: 'Neha Gupta', weightClass: 'Women\'s Bantamweight', record: '4-0', image: 'https://images.unsplash.com/photo-1622557850710-0685e3d673c4?q=80&w=200&auto=format&fit=crop', status: 'Invited' },
];

const UPCOMING_EPISODES = [
  { id: 1, number: 1, title: 'Fighter Selection', status: 'Filming', date: '2025-04-20', description: 'Coaches select fighters for their teams from the tryout winners.' },
  { id: 2, number: 2, title: 'Team Training Begins', status: 'Script Ready', date: '2025-04-27', description: 'The fighters move into the house and begin training with their coaches.' },
  { id: 3, number: 3, title: 'First Elimination Fights', status: 'Planning', date: '2025-05-04', description: 'First round of elimination fights between team members.' },
];

interface Season {
  id: number;
  name: string;
  status: string;
  episodes: number;
  premiere: string;
  location: string;
  mainCoach: string;
  guestCoaches: string[];
  fightersCount: number;
  poster: string;
}

interface Fighter {
  id: number;
  name: string;
  weightClass: string;
  record: string;
  image: string;
  status: string;
}

interface Episode {
  id: number;
  number: number;
  title: string;
  status: string;
  date: string;
  description: string;
}

const ShowManager: React.FC = () => {
  const theme = useTheme();
  
  // State
  const [tabValue, setTabValue] = useState(0);
  const [seasons, setSeasons] = useState<Season[]>(SHOW_SEASONS);
  const [fighters, setFighters] = useState<Fighter[]>(CAST_FIGHTERS);
  const [episodes, setEpisodes] = useState<Episode[]>(UPCOMING_EPISODES);
  const [selectedSeason, setSelectedSeason] = useState<Season>(seasons[0]);
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight="700">
          Show Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 4 }}
        >
          New Season
        </Button>
      </Box>
      
      {/* Season Selector */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {seasons.map((season) => (
          <Grid item xs={12} md={6} key={season.id}>
            <Card 
              elevation={0} 
              sx={{ 
                display: 'flex', 
                height: 180,
                borderRadius: 3,
                border: season.id === selectedSeason.id ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[5],
                },
              }}
              onClick={() => setSelectedSeason(season)}
            >
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={season.poster}
                alt={season.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography component="div" variant="h6" fontWeight="600">
                      {season.name}
                    </Typography>
                    <Chip 
                      label={season.status} 
                      size="small" 
                      color={
                        season.status === 'In Production' ? 'primary' : 
                        season.status === 'Planning' ? 'secondary' : 'default'
                      }
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                      <MovieIcon fontSize="small" /> {season.episodes} Episodes
                    </Box>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                      <CalendarTodayIcon fontSize="small" /> Premiere: {formatDate(season.premiere)}
                    </Box>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                      <LocationOnIcon fontSize="small" /> {season.location}
                    </Box>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PersonIcon fontSize="small" /> {season.fightersCount} Fighters
                    </Box>
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Tabs for selected season */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { height: 3, borderRadius: '3px 3px 0 0' } }}
        >
          <Tab label="Overview" />
          <Tab label="Cast" />
          <Tab label="Episodes" />
          <Tab label="Production" />
        </Tabs>
      </Box>
      
      {/* Overview Tab */}
      {tabValue === 0 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  border: `1px solid ${theme.palette.divider}`,
                  mb: 3
                }}
              >
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Season Details
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Season Name
                    </Typography>
                    <Typography variant="body1">
                      {selectedSeason.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip 
                      label={selectedSeason.status} 
                      size="small" 
                      color={
                        selectedSeason.status === 'In Production' ? 'primary' : 
                        selectedSeason.status === 'Planning' ? 'secondary' : 'default'
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Episodes
                    </Typography>
                    <Typography variant="body1">
                      {selectedSeason.episodes}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Premiere Date
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(selectedSeason.premiere)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1">
                      {selectedSeason.location}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Main Coach
                    </Typography>
                    <Typography variant="body1">
                      {selectedSeason.mainCoach}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{ borderRadius: 4 }}
                >
                  Edit Details
                </Button>
              </Paper>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Next Episode
                </Typography>
                
                {episodes.length > 0 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="600">
                        Episode {episodes[0].number}: {episodes[0].title}
                      </Typography>
                      <Chip label={episodes[0].status} size="small" color="primary" />
                    </Box>
                    
                    <Typography variant="body2" paragraph>
                      {episodes[0].description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                      <CalendarTodayIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Filming Date: {formatDate(episodes[0].date)}
                      </Typography>
                    </Box>
                    
                    <Button
                      variant="contained"
                      startIcon={<VideocamIcon />}
                      sx={{ borderRadius: 4 }}
                    >
                      Manage Episode
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  border: `1px solid ${theme.palette.divider}`,
                  mb: 3
                }}
              >
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Cast Status
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Confirmed
                    </Typography>
                    <Typography variant="body2" fontWeight="500">
                      {fighters.filter(f => f.status === 'Confirmed').length}/{selectedSeason.fightersCount}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(fighters.filter(f => f.status === 'Confirmed').length / selectedSeason.fightersCount) * 100} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        backgroundColor: theme.palette.success.main
                      }
                    }}
                  />
                </Box>
                
                <List sx={{ width: '100%' }}>
                  {fighters.slice(0, 4).map((fighter) => (
                    <React.Fragment key={fighter.id}>
                      <ListItem alignItems="flex-start" disablePadding sx={{ py: 1 }}>
                        <ListItemAvatar>
                          <Avatar alt={fighter.name} src={fighter.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={fighter.name}
                          secondary={
                            <Box component="span" sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {fighter.weightClass}
                              </Typography>
                              <Chip 
                                label={fighter.status} 
                                size="small" 
                                color={
                                  fighter.status === 'Confirmed' ? 'success' : 
                                  fighter.status === 'Invited' ? 'warning' : 'default'
                                }
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
                
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ borderRadius: 4, mt: 1 }}
                >
                  View All Cast
                </Button>
              </Paper>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Production Timeline
                </Typography>
                
                <List sx={{ width: '100%' }}>
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemText
                      primary="Casting Complete"
                      secondary="April 5, 2025"
                    />
                    <Chip label="In Progress" size="small" color="primary" />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemText
                      primary="Production Start"
                      secondary="April 20, 2025"
                    />
                    <Chip label="Upcoming" size="small" />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemText
                      primary="Post-Production"
                      secondary="May 25, 2025"
                    />
                    <Chip label="Planned" size="small" />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem disablePadding sx={{ py: 1 }}>
                    <ListItemText
                      primary="Premiere Date"
                      secondary={formatDate(selectedSeason.premiere)}
                    />
                    <Chip label="Scheduled" size="small" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ShowManager;
