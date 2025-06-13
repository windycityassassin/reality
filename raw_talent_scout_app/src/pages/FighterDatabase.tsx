import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DownloadIcon from '@mui/icons-material/Download';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';

// Sample data - this would come from your API in a real application
const SAMPLE_FIGHTERS = [
  {
    id: 1,
    name: 'Rajiv Kumar',
    nickname: 'The Cobra',
    age: 24,
    weightClass: 'Lightweight',
    height: '5\'9"',
    weight: '155 lbs',
    reach: '72"',
    record: { wins: 8, losses: 0, draws: 0 },
    knockouts: 5,
    submissions: 2,
    origin: 'Mumbai',
    gym: 'Tiger MMA Academy',
    styles: ['Kickboxing', 'BJJ'],
    strengths: ['Striking', 'Clinch Work'],
    status: 'Prospect',
    scoutingNotes: 'Excellent striking with powerful right hand. Quick on his feet with good takedown defense.',
    lastFight: '2023-12-15',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=200&auto=format&fit=crop',
    videoUrl: 'https://example.com/videos/rajiv-kumar'
  },
  {
    id: 2,
    name: 'Aisha Patel',
    nickname: 'The Mantis',
    age: 26,
    weightClass: 'Women\'s Strawweight',
    height: '5\'4"',
    weight: '115 lbs',
    reach: '65"',
    record: { wins: 7, losses: 1, draws: 0 },
    knockouts: 1,
    submissions: 5,
    origin: 'Delhi',
    gym: 'Warriors Combat Club',
    styles: ['Wrestling', 'BJJ'],
    strengths: ['Grappling', 'Submissions'],
    status: 'Contender',
    scoutingNotes: 'Exceptional ground game. Very technical with smooth transitions. Needs improvement in striking defense.',
    lastFight: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=200&auto=format&fit=crop',
    videoUrl: 'https://example.com/videos/aisha-patel'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    nickname: 'The Tiger',
    age: 28,
    weightClass: 'Welterweight',
    height: '5\'11"',
    weight: '170 lbs',
    reach: '74"',
    record: { wins: 6, losses: 0, draws: 0 },
    knockouts: 4,
    submissions: 1,
    origin: 'Bangalore',
    gym: 'Elite Fight Systems',
    styles: ['Muay Thai', 'Wrestling'],
    strengths: ['Power', 'Athleticism'],
    status: 'Prospect',
    scoutingNotes: 'Very explosive athlete. Powerful striker with good wrestling background. Sometimes overcommits to strikes.',
    lastFight: '2024-02-05',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e6349?q=80&w=200&auto=format&fit=crop',
    videoUrl: 'https://example.com/videos/vikram-singh'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    nickname: 'The Assassin',
    age: 25,
    weightClass: 'Women\'s Flyweight',
    height: '5\'6"',
    weight: '125 lbs',
    reach: '67"',
    record: { wins: 5, losses: 1, draws: 1 },
    knockouts: 3,
    submissions: 1,
    origin: 'Pune',
    gym: 'Apex MMA',
    styles: ['Karate', 'Kickboxing'],
    strengths: ['Speed', 'Technique'],
    status: 'Contender',
    scoutingNotes: 'Excellent karate background with point fighting precision. Very quick with good movement.',
    lastFight: '2023-11-28',
    image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=200&auto=format&fit=crop',
    videoUrl: 'https://example.com/videos/priya-sharma'
  },
  {
    id: 5,
    name: 'Arjun Reddy',
    nickname: 'The Samurai',
    age: 29,
    weightClass: 'Middleweight',
    height: '6\'1"',
    weight: '185 lbs',
    reach: '78"',
    record: { wins: 9, losses: 2, draws: 0 },
    knockouts: 6,
    submissions: 1,
    origin: 'Hyderabad',
    gym: 'Combat Fight Club',
    styles: ['Boxing', 'Judo'],
    strengths: ['Boxing', 'Takedowns'],
    status: 'Veteran',
    scoutingNotes: 'Skilled boxer with powerful judo throws. Very experienced fighter with good fight IQ.',
    lastFight: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&auto=format&fit=crop',
    videoUrl: 'https://example.com/videos/arjun-reddy'
  },
  {
    id: 6,
    name: 'Neha Gupta',
    nickname: 'The Scorpion',
    age: 23,
    weightClass: 'Women\'s Bantamweight',
    height: '5\'7"',
    weight: '135 lbs',
    reach: '69"',
    record: { wins: 4, losses: 0, draws: 0 },
    knockouts: 1,
    submissions: 3,
    origin: 'Kolkata',
    gym: 'Revolution MMA',
    styles: ['BJJ', 'Muay Thai'],
    strengths: ['Ground Game', 'Clinch Work'],
    status: 'Prospect',
    scoutingNotes: 'Rising star with exceptional ground game. Very technical with good fight awareness.',
    lastFight: '2024-02-18',
    image: 'https://images.unsplash.com/photo-1622557850710-0685e3d673c4?q=80&w=200&auto=format&fit=crop',
    videoUrl: 'https://example.com/videos/neha-gupta'
  }
];

interface Fighter {
  id: number;
  name: string;
  nickname: string;
  age: number;
  weightClass: string;
  height: string;
  weight: string;
  reach: string;
  record: { wins: number; losses: number; draws: number; };
  knockouts: number;
  submissions: number;
  origin: string;
  gym: string;
  styles: string[];
  strengths: string[];
  status: string;
  scoutingNotes: string;
  lastFight: string;
  image: string;
  videoUrl: string;
}

const FighterDatabase: React.FC = () => {
  const theme = useTheme();
  
  // State
  const [fighters, setFighters] = useState<Fighter[]>(SAMPLE_FIGHTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Handle filter menu
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setAnchorEl(null);
  };
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle fighter menu
  const handleFighterMenuOpen = (event: React.MouseEvent<HTMLElement>, fighter: Fighter) => {
    event.stopPropagation();
    setSelectedFighter(fighter);
    setAnchorEl(event.currentTarget);
  };
  
  const handleFighterMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Filter fighters based on search query and selected status
  const filteredFighters = fighters.filter(fighter => {
    const matchesSearch = searchQuery === '' || 
      fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fighter.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fighter.weightClass.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || fighter.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight="700">
          Fighter Database
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{ borderRadius: 4 }}
        >
          Add Fighter
        </Button>
      </Box>
      
      {/* Search and Filter Bar */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 3, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <TextField
          placeholder="Search fighters..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ flexGrow: 1, minWidth: '250px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 4 }
          }}
        />
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            sx={{ borderRadius: 4 }}
          >
            Filter
          </Button>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
            PaperProps={{
              sx: { width: 200, borderRadius: 2 }
            }}
          >
            <MenuItem onClick={() => { setSelectedStatus('all'); handleFilterClose(); }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                All Fighters
                {selectedStatus === 'all' && <CheckCircleIcon fontSize="small" color="primary" />}
              </Box>
            </MenuItem>
            <MenuItem onClick={() => { setSelectedStatus('Prospect'); handleFilterClose(); }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                Prospects
                {selectedStatus === 'Prospect' && <CheckCircleIcon fontSize="small" color="primary" />}
              </Box>
            </MenuItem>
            <MenuItem onClick={() => { setSelectedStatus('Contender'); handleFilterClose(); }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                Contenders
                {selectedStatus === 'Contender' && <CheckCircleIcon fontSize="small" color="primary" />}
              </Box>
            </MenuItem>
            <MenuItem onClick={() => { setSelectedStatus('Veteran'); handleFilterClose(); }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                Veterans
                {selectedStatus === 'Veteran' && <CheckCircleIcon fontSize="small" color="primary" />}
              </Box>
            </MenuItem>
          </Menu>
          
          <Divider orientation="vertical" flexItem />
          
          <IconButton 
            color={viewMode === 'grid' ? 'primary' : 'default'} 
            onClick={() => setViewMode('grid')}
          >
            <GridViewIcon />
          </IconButton>
          <IconButton 
            color={viewMode === 'list' ? 'primary' : 'default'} 
            onClick={() => setViewMode('list')}
          >
            <ViewListIcon />
          </IconButton>
          
          <Divider orientation="vertical" flexItem />
          
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 4 }}
          >
            Export
          </Button>
        </Box>
      </Paper>
      
      {/* Tabs */}
      <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { height: 3, borderRadius: '3px 3px 0 0' } }}
        >
          <Tab label="All Fighters" />
          <Tab label="Lightweight" />
          <Tab label="Welterweight" />
          <Tab label="Middleweight" />
          <Tab label="Women's Divisions" />
        </Tabs>
      </Box>
      
      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filteredFighters.length} fighter{filteredFighters.length !== 1 ? 's' : ''} found
      </Typography>
      
      {/* Grid View */}
      {viewMode === 'grid' && (
        <Grid container spacing={3}>
          {filteredFighters.map(fighter => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={fighter.id}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: 3, 
                  overflow: 'hidden',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[5],
                    cursor: 'pointer'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={fighter.image}
                    alt={fighter.name}
                  />
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(4px)',
                    borderRadius: '50%'
                  }}>
                    <IconButton 
                      size="small"
                      onClick={(e) => handleFighterMenuOpen(e, fighter)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(4px)',
                    p: 1
                  }}>
                    <Chip 
                      label={fighter.status} 
                      size="small" 
                      color={
                        fighter.status === 'Prospect' ? 'primary' : 
                        fighter.status === 'Contender' ? 'secondary' : 'default'
                      }
                    />
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {fighter.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    "{fighter.nickname}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      {fighter.weightClass}
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {fighter.record.wins}-{fighter.record.losses}-{fighter.record.draws}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 2 }}>
                    {fighter.styles.map(style => (
                      <Chip key={style} label={style} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* List View */}
      {viewMode === 'list' && (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fighter</TableCell>
                <TableCell>Weight Class</TableCell>
                <TableCell>Record</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Gym</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFighters.map(fighter => (
                <TableRow 
                  key={fighter.id}
                  hover
                  sx={{ 
                    '&:hover': { 
                      cursor: 'pointer',
                      backgroundColor: alpha(theme.palette.primary.main, 0.04)
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={fighter.image} alt={fighter.name} sx={{ width: 40, height: 40 }} />
                      <Box>
                        <Typography variant="body1" fontWeight="500">
                          {fighter.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          "{fighter.nickname}"
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{fighter.weightClass}</TableCell>
                  <TableCell>{fighter.record.wins}-{fighter.record.losses}-{fighter.record.draws}</TableCell>
                  <TableCell>{fighter.age}</TableCell>
                  <TableCell>{fighter.origin}</TableCell>
                  <TableCell>{fighter.gym}</TableCell>
                  <TableCell>
                    <Chip 
                      label={fighter.status} 
                      size="small" 
                      color={
                        fighter.status === 'Prospect' ? 'primary' : 
                        fighter.status === 'Contender' ? 'secondary' : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleFighterMenuOpen(e, fighter)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      {/* Fighter Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && selectedFighter !== null}
        onClose={handleFighterMenuClose}
        PaperProps={{
          sx: { width: 200, borderRadius: 2 }
        }}
      >
        <MenuItem onClick={handleFighterMenuClose}>
          View Profile
        </MenuItem>
        <MenuItem onClick={handleFighterMenuClose}>
          Edit Fighter
        </MenuItem>
        <MenuItem onClick={handleFighterMenuClose}>
          Add to Show
        </MenuItem>
        <MenuItem onClick={handleFighterMenuClose}>
          Schedule Tryout
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleFighterMenuClose} sx={{ color: theme.palette.error.main }}>
          Remove Fighter
        </MenuItem>
      </Menu>
      
      {/* Empty State */}
      {filteredFighters.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
            <PersonIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
          </Avatar>
          <Typography variant="h6" gutterBottom>
            No fighters found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
            We couldn't find any fighters matching your search criteria. Try adjusting your filters or add a new fighter.
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            sx={{ borderRadius: 4 }}
          >
            Add Fighter
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FighterDatabase;
