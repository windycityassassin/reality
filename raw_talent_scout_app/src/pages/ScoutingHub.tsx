import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  Tabs,
  Tab,
  Divider,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  alpha
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupsIcon from '@mui/icons-material/Groups';
import ScheduleIcon from '@mui/icons-material/Schedule';

// Sample data
const UPCOMING_TRYOUTS = [
  {
    id: 1,
    city: 'Mumbai',
    location: 'Tiger MMA Academy',
    date: '2025-04-10',
    time: '10:00 AM - 4:00 PM',
    registeredFighters: 72,
    capacity: 100,
    status: 'Upcoming',
    scouts: ['Amit Sharma', 'Priya Patel'],
    categories: ['Lightweight', 'Welterweight', 'Middleweight'],
  },
  {
    id: 2,
    city: 'Delhi',
    location: 'Warriors Combat Club',
    date: '2025-04-17',
    time: '10:00 AM - 4:00 PM',
    registeredFighters: 84,
    capacity: 100,
    status: 'Upcoming',
    scouts: ['Raj Kumar', 'Neha Gupta', 'Vikram Singh'],
    categories: ['Flyweight', 'Bantamweight', 'Featherweight'],
  },
  {
    id: 3,
    city: 'Bangalore',
    location: 'Elite Fight Systems',
    date: '2025-04-24',
    time: '10:00 AM - 4:00 PM',
    registeredFighters: 45,
    capacity: 100,
    status: 'Upcoming',
    scouts: ['Arjun Reddy', 'Sunita Verma'],
    categories: ['Lightweight', 'Women\'s Strawweight', 'Women\'s Flyweight'],
  }
];

const SCOUT_REPORTS = [
  {
    id: 1,
    title: 'Mumbai Pre-Tryout Assessment',
    date: '2025-03-14',
    scouts: ['Amit Sharma'],
    prospectsFound: 8,
    status: 'Completed',
    summary: 'Visited 4 gyms in Mumbai area. Found several promising lightweight prospects with strong striking backgrounds.'
  },
  {
    id: 2,
    title: 'Delhi Gym Tour',
    date: '2025-03-08',
    scouts: ['Raj Kumar', 'Neha Gupta'],
    prospectsFound: 12,
    status: 'Completed',
    summary: 'Comprehensive tour of 6 gyms across Delhi. Excellent talent pool in bantamweight and featherweight divisions.'
  },
  {
    id: 3,
    title: 'Hyderabad Scouting Trip',
    date: '2025-03-01',
    scouts: ['Vikram Singh'],
    prospectsFound: 5,
    status: 'Completed',
    summary: 'Small but high-quality talent pool. Found an exceptional welterweight prospect with Olympic wrestling background.'
  },
];

const EVALUATION_CRITERIA = [
  { id: 1, name: 'Technical Striking', description: 'Evaluation of punches, kicks, knees, elbows, and overall striking technique.', weight: 20 },
  { id: 2, name: 'Grappling Skills', description: 'Assessment of wrestling, judo, and overall takedown abilities.', weight: 20 },
  { id: 3, name: 'Ground Game', description: 'Evaluation of BJJ skills, submissions, ground control, and defense.', weight: 20 },
  { id: 4, name: 'Athleticism', description: 'Speed, power, agility, coordination, and overall physical attributes.', weight: 15 },
  { id: 5, name: 'Fight IQ', description: 'Strategic thinking, adaptability, and decision-making during fights.', weight: 10 },
  { id: 6, name: 'Cardio & Conditioning', description: 'Cardiovascular endurance and overall physical conditioning.', weight: 10 },
  { id: 7, name: 'Personality & Marketability', description: 'Charisma, communication skills, and potential fan appeal.', weight: 5 },
];

interface TryoutEvent {
  id: number;
  city: string;
  location: string;
  date: string;
  time: string;
  registeredFighters: number;
  capacity: number;
  status: string;
  scouts: string[];
  categories: string[];
}

interface ScoutReport {
  id: number;
  title: string;
  date: string;
  scouts: string[];
  prospectsFound: number;
  status: string;
  summary: string;
}

interface EvaluationCriterion {
  id: number;
  name: string;
  description: string;
  weight: number;
}

const ScoutingHub: React.FC = () => {
  const theme = useTheme();
  
  // State
  const [tabValue, setTabValue] = useState(0);
  const [tryouts, setTryouts] = useState<TryoutEvent[]>(UPCOMING_TRYOUTS);
  const [scoutReports, setScoutReports] = useState<ScoutReport[]>(SCOUT_REPORTS);
  const [criteria, setCriteria] = useState<EvaluationCriterion[]>(EVALUATION_CRITERIA);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
          Scouting Hub
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AssessmentIcon />}
            sx={{ borderRadius: 4 }}
          >
            New Report
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 4 }}
          >
            Schedule Tryout
          </Button>
        </Box>
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { height: 3, borderRadius: '3px 3px 0 0' } }}
        >
          <Tab label="Tryouts" icon={<EventIcon />} iconPosition="start" />
          <Tab label="Scout Reports" icon={<AssessmentIcon />} iconPosition="start" />
          <Tab label="Evaluation Criteria" icon={<CheckCircleIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {/* Tryouts Tab */}
      {tabValue === 0 && (
        <Box>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              placeholder="Search tryouts..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4 }
              }}
            />
            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value="Upcoming"
                label="Status"
                sx={{ borderRadius: 4 }}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Grid container spacing={3}>
            {tryouts.map((tryout) => (
              <Grid item xs={12} md={4} key={tryout.id}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 3, 
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[5],
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Box sx={{ bgcolor: theme.palette.primary.main, p: 2, color: 'white' }}>
                    <Typography variant="h6" fontWeight="600">
                      {tryout.city} Tryouts
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarTodayIcon fontSize="small" />
                      <Typography variant="body2">
                        {formatDate(tryout.date)} • {tryout.time}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                      <LocationOnIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {tryout.location}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Registrations
                        </Typography>
                        <Typography variant="body2" fontWeight="500">
                          {tryout.registeredFighters}/{tryout.capacity}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(tryout.registeredFighters / tryout.capacity) * 100} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                          }
                        }}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Weight Categories:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {tryout.categories.map((category, index) => (
                        <Chip key={index} label={category} size="small" />
                      ))}
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Assigned Scouts:
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {tryout.scouts.map((scout, index) => (
                        <Avatar
                          key={index}
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            fontSize: '0.875rem',
                            marginLeft: index > 0 ? -1 : 0,
                            border: `2px solid ${theme.palette.background.paper}` 
                          }}
                        >
                          {scout.charAt(0)}
                        </Avatar>
                      ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        variant="outlined" 
                        fullWidth
                        sx={{ borderRadius: 4 }}
                      >
                        Details
                      </Button>
                      <Button 
                        variant="contained" 
                        fullWidth
                        sx={{ borderRadius: 4 }}
                      >
                        Manage
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              sx={{ borderRadius: 4 }}
            >
              View All Tryouts
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Scout Reports Tab */}
      {tabValue === 1 && (
        <Box>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              placeholder="Search reports..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4 }
              }}
            />
          </Box>
          
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}`, mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Scouts</TableCell>
                  <TableCell>Prospects Found</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scoutReports.map((report) => (
                  <TableRow 
                    key={report.id}
                    hover
                    sx={{ 
                      '&:hover': { 
                        cursor: 'pointer',
                        backgroundColor: alpha(theme.palette.primary.main, 0.04)
                      },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body1" fontWeight="500">
                        {report.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(report.date)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex' }}>
                        {report.scouts.map((scout, index) => (
                          <Chip 
                            key={index} 
                            label={scout} 
                            size="small" 
                            sx={{ mr: 0.5 }} 
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="600" color="primary">
                        {report.prospectsFound} fighters
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={report.status} 
                        size="small" 
                        color={report.status === 'Completed' ? 'success' : 'default'} 
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ borderRadius: 4 }}
                      >
                        View Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: alpha(theme.palette.info.main, 0.05)
            }}
          >
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Scout Report Template
            </Typography>
            <Typography variant="body2" paragraph>
              Use our standardized template to ensure consistent evaluation across all scouting trips and tryouts.
              This helps maintain an objective assessment and makes it easier to compare fighters across different regions.
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ borderRadius: 4 }}
            >
              Download Template
            </Button>
          </Paper>
        </Box>
      )}
      
      {/* Evaluation Criteria Tab */}
      {tabValue === 2 && (
        <Box>
          <Typography variant="body1" paragraph>
            RAW's fighter evaluation framework uses the following criteria to assess fighter potential and fit for the reality show.
            These criteria are weighted based on importance to our competition format.
          </Typography>
          
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}`, mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Criterion</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {criteria.map((criterion) => (
                  <TableRow key={criterion.id}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="500">
                        {criterion.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{criterion.description}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`${criterion.weight}%`} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ borderRadius: 4 }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              sx={{ borderRadius: 4 }}
            >
              Reset to Default
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ borderRadius: 4 }}
            >
              Add Criterion
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ScoutingHub;
