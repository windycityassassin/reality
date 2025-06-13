import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
  useTheme,
  alpha,
  Grid,
  Skeleton,
  Badge,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import MapIcon from '@mui/icons-material/Map';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, GeolocateControl, Source, Layer } from 'react-map-gl';

// Sample data - this would come from your API in a real application
// In production, you would load this from your backend
const SAMPLE_GYMS = [
  { 
    id: 1, 
    name: 'Tiger MMA Academy', 
    latitude: 19.0760, 
    longitude: 72.8777, 
    city: 'Mumbai', 
    address: '123 Fighter Lane, Andheri East, Mumbai',
    rating: 4.7,
    reviews: 156,
    phone: '+91 9876543210',
    website: 'https://example.com/tiger-mma',
    established: 2015,
    coaches: 8,
    fighters: 42,
    champions: 3,
    amenities: ['Boxing Ring', 'MMA Cage', 'Strength & Conditioning', 'Recovery Center'],
    tags: ['MMA', 'Kickboxing', 'BJJ', 'Wrestling'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop'
  },
  { 
    id: 2, 
    name: 'Warriors Combat Club', 
    latitude: 28.7041, 
    longitude: 77.1025, 
    city: 'Delhi', 
    address: '45 Fight Street, Karol Bagh, Delhi',
    rating: 4.5,
    reviews: 124,
    phone: '+91 9876543211',
    website: 'https://example.com/warriors-combat',
    established: 2017,
    coaches: 6,
    fighters: 35,
    champions: 1,
    amenities: ['MMA Cage', 'Boxing Area', 'Cardio Zone'],
    tags: ['MMA', 'Muay Thai', 'BJJ'],
    image: 'https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?q=80&w=1000&auto=format&fit=crop'
  },
  { 
    id: 3, 
    name: 'Elite Fight Systems', 
    latitude: 12.9716, 
    longitude: 77.5946, 
    city: 'Bangalore', 
    address: '78 Combat Avenue, Indiranagar, Bangalore',
    rating: 4.8,
    reviews: 187,
    phone: '+91 9876543212',
    website: 'https://example.com/elite-fight',
    established: 2014,
    coaches: 10,
    fighters: 50,
    champions: 4,
    amenities: ['MMA Cage', 'Wrestling Area', 'Yoga Studio', 'Strength Zone', 'Recovery Center'],
    tags: ['MMA', 'Wrestling', 'BJJ', 'Kickboxing', 'Karate'],
    image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=1000&auto=format&fit=crop'
  },
];

// Interface for gym data
interface Gym {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  address: string;
  rating: number;
  reviews: number;
  phone: string;
  website: string;
  established: number;
  coaches: number;
  fighters: number;
  champions: number;
  amenities: string[];
  tags: string[];
  image: string;
}

const GymMap: React.FC = () => {
  const theme = useTheme();
  const mapRef = useRef(null);
  
  // State
  const [gyms, setGyms] = useState<Gym[]>(SAMPLE_GYMS);
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [popupInfo, setPopupInfo] = useState<Gym | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewState, setViewState] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
    bearing: 0,
    pitch: 0
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [prospectiveGyms, setProspectiveGyms] = useState<number[]>([]);

  // Load gym data
  useEffect(() => {
    // This would be replaced with an API call to your backend
    // which would return the data from your CSV file or database
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setGyms(SAMPLE_GYMS);
      setLoading(false);
    }, 1500);
  }, []);

  // Handle selecting a gym
  const handleSelectGym = (gym: Gym) => {
    setSelectedGym(gym);
    setDrawerOpen(true);
    
    // Center map on selected gym
    setViewState({
      ...viewState,
      latitude: gym.latitude,
      longitude: gym.longitude,
      zoom: 12,
    });
  };

  // Handle marker click
  const handleMarkerClick = (gym: Gym) => {
    setPopupInfo(gym);
  };

  // Add gym to prospective list
  const handleAddToProspective = (gymId: number) => {
    if (prospectiveGyms.includes(gymId)) {
      setProspectiveGyms(prospectiveGyms.filter(id => id !== gymId));
    } else {
      setProspectiveGyms([...prospectiveGyms, gymId]);
    }
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter gyms
  const filteredGyms = gyms.filter(gym => {
    const matchesSearch = searchQuery === '' || 
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = filters.length === 0 || 
      filters.some(filter => gym.tags.includes(filter));
    
    return matchesSearch && matchesFilters;
  });

  return (
    <Box sx={{ height: 'calc(100vh - 128px)', position: 'relative' }}>
      {/* Search and Filter Panel */}
      <Paper 
        elevation={0} 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          left: 16, 
          zIndex: 10, 
          p: 2, 
          borderRadius: 2,
          width: 320,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(5px)',
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          MMA Gym Explorer
        </Typography>
        
        <TextField
          fullWidth
          placeholder="Search gyms by name or city..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 4 }
          }}
        />
        
        <Box sx={{ display: 'flex', mb: 1, gap: 0.5, flexWrap: 'wrap' }}>
          <Chip 
            label="MMA" 
            size="small" 
            color={filters.includes('MMA') ? 'primary' : 'default'}
            onClick={() => {
              if (filters.includes('MMA')) {
                setFilters(filters.filter(f => f !== 'MMA'));
              } else {
                setFilters([...filters, 'MMA']);
              }
            }}
          />
          <Chip 
            label="BJJ" 
            size="small"
            color={filters.includes('BJJ') ? 'primary' : 'default'}
            onClick={() => {
              if (filters.includes('BJJ')) {
                setFilters(filters.filter(f => f !== 'BJJ'));
              } else {
                setFilters([...filters, 'BJJ']);
              }
            }}
          />
          <Chip 
            label="Wrestling" 
            size="small"
            color={filters.includes('Wrestling') ? 'primary' : 'default'}
            onClick={() => {
              if (filters.includes('Wrestling')) {
                setFilters(filters.filter(f => f !== 'Wrestling'));
              } else {
                setFilters([...filters, 'Wrestling']);
              }
            }}
          />
          <Chip 
            label="Kickboxing" 
            size="small"
            color={filters.includes('Kickboxing') ? 'primary' : 'default'}
            onClick={() => {
              if (filters.includes('Kickboxing')) {
                setFilters(filters.filter(f => f !== 'Kickboxing'));
              } else {
                setFilters([...filters, 'Kickboxing']);
              }
            }}
          />
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {filteredGyms.length} gyms found
        </Typography>
        
        <List dense sx={{ 
          maxHeight: 300, 
          overflow: 'auto', 
          borderRadius: 2, 
          border: `1px solid ${theme.palette.divider}`,
          '&::-webkit-scrollbar': {
            width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: 10
          }
        }}>
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton width="80%" />}
                  secondary={<Skeleton width="60%" />}
                />
              </ListItem>
            ))
          ) : filteredGyms.length === 0 ? (
            <ListItem>
              <ListItemText 
                primary="No gyms found"
                secondary="Try adjusting your search or filters"
              />
            </ListItem>
          ) : (
            filteredGyms.map(gym => (
              <ListItem 
                key={gym.id}
                button
                onClick={() => handleSelectGym(gym)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  backgroundColor: selectedGym?.id === gym.id ? 
                    alpha(theme.palette.primary.main, 0.08) : 'transparent',
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      prospectiveGyms.includes(gym.id) ? (
                        <CheckCircleIcon 
                          color="success" 
                          fontSize="small" 
                          sx={{ backgroundColor: 'white', borderRadius: '50%' }}
                        />
                      ) : null
                    }
                  >
                    <Avatar 
                      src={gym.image}
                      alt={gym.name}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={gym.name}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption">{gym.city}</Typography>
                    </Box>
                  }
                />
                <Rating 
                  value={gym.rating} 
                  precision={0.1} 
                  size="small" 
                  readOnly 
                  icon={<StarIcon fontSize="inherit" />} 
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      {/* Map */}
      <Box sx={{ height: '100%', width: '100%' }}>
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken="pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xsNnAxeHgwMDRxbzNlbzR3cTEzZzBzZSJ9.IvW8EvwTB0OnIsDZ98W-Bg"
          ref={mapRef}
          attributionControl={false}
        >
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />
          <GeolocateControl
            position="top-right"
            trackUserLocation
            showUserHeading
          />
          
          {filteredGyms.map(gym => (
            <Marker
              key={gym.id}
              latitude={gym.latitude}
              longitude={gym.longitude}
              anchor="bottom"
              onClick={e => {
                // Prevent click from propagating to the map
                e.originalEvent.stopPropagation();
                handleMarkerClick(gym);
              }}
            >
              <Tooltip title={gym.name}>
                <Box 
                  sx={{ 
                    cursor: 'pointer',
                    animation: popupInfo?.id === gym.id ? 'pulse 1.5s infinite' : 'none',
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(1)',
                        opacity: 1
                      },
                      '50%': {
                        transform: 'scale(1.1)',
                        opacity: 0.9
                      },
                      '100%': {
                        transform: 'scale(1)',
                        opacity: 1
                      }
                    }
                  }}
                >
                  <IconButton
                    sx={{ 
                      backgroundColor: prospectiveGyms.includes(gym.id) ? 
                        theme.palette.success.main : theme.palette.primary.main,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: prospectiveGyms.includes(gym.id) ? 
                          theme.palette.success.dark : theme.palette.primary.dark,
                      },
                      boxShadow: theme.shadows[3],
                      p: 0.5,
                      height: 32,
                      width: 32
                    }}
                  >
                    <MapIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Tooltip>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              latitude={popupInfo.latitude}
              longitude={popupInfo.longitude}
              anchor="bottom"
              closeOnClick={false}
              onClose={() => setPopupInfo(null)}
              closeButton={false}
              maxWidth="300px"
            >
              <Card elevation={0} sx={{ overflow: 'visible', borderRadius: 2 }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600 }}>
                      {popupInfo.name}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => setPopupInfo(null)}
                      sx={{ mt: -0.5, mr: -0.5 }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Rating value={popupInfo.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="caption" color="text.secondary">
                      ({popupInfo.reviews})
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 18, mt: 0.2, color: theme.palette.text.secondary }} />
                    <Typography variant="caption" color="text.secondary">
                      {popupInfo.address}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                    <Button 
                      variant="contained" 
                      size="small" 
                      startIcon={<InfoIcon />}
                      onClick={() => handleSelectGym(popupInfo)}
                      fullWidth
                      sx={{ borderRadius: 4 }}
                    >
                      Details
                    </Button>
                    <Button 
                      variant={prospectiveGyms.includes(popupInfo.id) ? "outlined" : "contained"}
                      color={prospectiveGyms.includes(popupInfo.id) ? "success" : "primary"}
                      size="small" 
                      startIcon={prospectiveGyms.includes(popupInfo.id) ? <CheckCircleIcon /> : <AddIcon />}
                      onClick={() => handleAddToProspective(popupInfo.id)}
                      fullWidth
                      sx={{ borderRadius: 4 }}
                    >
                      {prospectiveGyms.includes(popupInfo.id) ? "Added" : "Scout"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Popup>
          )}
        </Map>
      </Box>

      {/* Gym Details Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { 
            width: { xs: '100%', sm: 450 },
            borderRadius: { xs: '12px 12px 0 0', sm: '12px 0 0 12px' },
            borderLeft: `1px solid ${theme.palette.divider}`,
            boxShadow: { xs: 'none', sm: theme.shadows[8] },
            background: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(10px)',
            height: { xs: '85%', sm: '100%' },
            bottom: { xs: 0, sm: 'auto' },
            top: { xs: 'auto', sm: 0 }
          },
        }}
      >
        {selectedGym && (
          <Box sx={{ overflow: 'auto', height: '100%' }}>
            <Box sx={{ position: 'relative', height: 200 }}>
              <Box
                component="img"
                src={selectedGym.image}
                alt={selectedGym.name}
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              />
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)' 
              }} />
              
              <Box sx={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                p: 2,
                color: 'white'
              }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  {selectedGym.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOnIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">
                    {selectedGym.city}
                  </Typography>
                </Box>
              </Box>
              
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8, 
                  color: 'white',
                  backgroundColor: alpha('#000', 0.4),
                  '&:hover': {
                    backgroundColor: alpha('#000', 0.6),
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Rating value={selectedGym.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary">
                    ({selectedGym.reviews} reviews)
                  </Typography>
                </Box>
                <Button 
                  variant={prospectiveGyms.includes(selectedGym.id) ? "outlined" : "contained"}
                  color={prospectiveGyms.includes(selectedGym.id) ? "success" : "primary"}
                  size="small" 
                  startIcon={prospectiveGyms.includes(selectedGym.id) ? <CheckCircleIcon /> : <AddIcon />}
                  onClick={() => handleAddToProspective(selectedGym.id)}
                  sx={{ borderRadius: 4 }}
                >
                  {prospectiveGyms.includes(selectedGym.id) ? "Added to Scout List" : "Add to Scout List"}
                </Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Established in {selectedGym.established}, {selectedGym.name} is home to {selectedGym.fighters} fighters, 
                  {selectedGym.champions} champions, and {selectedGym.coaches} professional coaches.
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {selectedGym.tags.map(tag => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Contact Information
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                  <LocationOnIcon sx={{ color: theme.palette.text.secondary, mt: 0.3 }} />
                  <Typography variant="body2">
                    {selectedGym.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <PhoneIcon sx={{ color: theme.palette.text.secondary }} />
                  <Typography variant="body2">
                    {selectedGym.phone}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LanguageIcon sx={{ color: theme.palette.text.secondary }} />
                  <Typography variant="body2">
                    <a href={selectedGym.website} target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                      {selectedGym.website.replace('https://', '')}
                    </a>
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<DirectionsIcon />}
                  fullWidth
                  sx={{ borderRadius: 4 }}
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedGym.latitude},${selectedGym.longitude}`, '_blank')}
                >
                  Directions
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<PhoneIcon />}
                  fullWidth
                  sx={{ borderRadius: 4 }}
                  onClick={() => window.open(`tel:${selectedGym.phone.replace(/\s+/g, '')}`, '_blank')}
                >
                  Call
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Facilities & Amenities
              </Typography>
              
              <Grid container spacing={1} sx={{ mb: 3 }}>
                {selectedGym.amenities.map(amenity => (
                  <Grid item xs={6} key={amenity}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      border: `1px solid ${theme.palette.divider}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                      <Typography variant="body2">{amenity}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Scouting Notes
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Add your scouting notes here..."
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <Button 
                variant="contained" 
                fullWidth
                sx={{ borderRadius: 4 }}
              >
                Save Notes
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default GymMap;
