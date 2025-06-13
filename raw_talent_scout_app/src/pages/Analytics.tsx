import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Tooltip,
  Divider,
  useTheme,
  alpha,
  LinearProgress
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Avatar from '@mui/material/Avatar';

// Mock data for charts - in a real app, you would integrate with Chart.js or similar
const Analytics: React.FC = () => {
  const theme = useTheme();
  
  // State
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('year');
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle time range change
  const handleTimeRangeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeRange(event.target.value as string);
  };
  
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight="700">
          Analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="time-range-label">Time Range</InputLabel>
            <Select
              labelId="time-range-label"
              id="time-range"
              value={timeRange}
              label="Time Range"
              onChange={handleTimeRangeChange as any}
              sx={{ borderRadius: 4 }}
            >
              <MenuItem value="week">Past Week</MenuItem>
              <MenuItem value="month">Past Month</MenuItem>
              <MenuItem value="quarter">Past Quarter</MenuItem>
              <MenuItem value="year">Past Year</MenuItem>
              <MenuItem value="all">All Time</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 4 }}
          >
            Export Data
          </Button>
        </Box>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Fighters
              </Typography>
              <Typography variant="h4" fontWeight="700">
                248
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon fontSize="small" /> +24% vs. last period
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), p: 2, color: theme.palette.primary.main }}>
              <PeopleIcon fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Tryout Registrations
              </Typography>
              <Typography variant="h4" fontWeight="700">
                842
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon fontSize="small" /> +67% vs. last period
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), p: 2, color: theme.palette.secondary.main }}>
              <SportsMmaIcon fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Active Gyms
              </Typography>
              <Typography variant="h4" fontWeight="700">
                3,486
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon fontSize="small" /> +12% vs. last period
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), p: 2, color: theme.palette.info.main }}>
              <LocationOnIcon fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Signed Contracts
              </Typography>
              <Typography variant="h4" fontWeight="700">
                32
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon fontSize="small" /> +45% vs. last period
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), p: 2, color: theme.palette.success.main }}>
              <DoneAllIcon fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { height: 3, borderRadius: '3px 3px 0 0' } }}
        >
          <Tab label="Fighter Analytics" />
          <Tab label="Scouting Analytics" />
          <Tab label="Show Performance" />
          <Tab label="Regional Insights" />
        </Tabs>
      </Box>
      
      {/* Fighter Analytics Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                border: `1px solid ${theme.palette.divider}`,
                mb: 3,
                height: 400,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="600">
                  Fighter Registrations Over Time
                </Typography>
                <Tooltip title="Shows the trend of fighter registrations over the selected time period">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                  [Chart Placeholder: Line chart showing fighter registrations over time]
                </Typography>
              </Box>
            </Paper>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                border: `1px solid ${theme.palette.divider}`,
                height: 400,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="600">
                  Fighter Distribution by Weight Class
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="division-label">Division</InputLabel>
                    <Select
                      labelId="division-label"
                      id="division"
                      value="all"
                      label="Division"
                      sx={{ borderRadius: 4 }}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="men">Men's Divisions</MenuItem>
                      <MenuItem value="women">Women's Divisions</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                  [Chart Placeholder: Bar chart showing fighter distribution by weight class]
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                border: `1px solid ${theme.palette.divider}`,
                mb: 3,
                height: 400,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="600">
                  Fighter Styles Breakdown
                </Typography>
                <Tooltip title="Distribution of fighter primary fighting styles">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320 }}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                  [Chart Placeholder: Pie chart showing breakdown of fighter styles]
                </Typography>
              </Box>
            </Paper>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                border: `1px solid ${theme.palette.divider}`,
                height: 400,
              }}
            >
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Top States by Fighter Count
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              {/* State rankings */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" fontWeight="500">
                    Maharashtra
                  </Typography>
                  <Typography variant="body2">
                    68 fighters
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" fontWeight="500">
                    Delhi
                  </Typography>
                  <Typography variant="body2">
                    52 fighters
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={65} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" fontWeight="500">
                    Karnataka
                  </Typography>
                  <Typography variant="body2">
                    45 fighters
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={56} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" fontWeight="500">
                    Telangana
                  </Typography>
                  <Typography variant="body2">
                    32 fighters
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={40} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" fontWeight="500">
                    Tamil Nadu
                  </Typography>
                  <Typography variant="body2">
                    27 fighters
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={34} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Analytics;
