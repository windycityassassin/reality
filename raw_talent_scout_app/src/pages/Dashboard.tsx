import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  LinearProgress,
  useTheme,
  alpha
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';

// Sample data - this would come from your API in a real application
const upcomingTryouts = [
  { id: 1, city: 'Mumbai', date: 'April 10, 2025', registrations: 72, capacity: 100 },
  { id: 2, city: 'Delhi', date: 'April 17, 2025', registrations: 84, capacity: 100 },
  { id: 3, city: 'Bangalore', date: 'April 24, 2025', registrations: 45, capacity: 100 },
];

const topProspects = [
  { id: 1, name: 'Rajiv Kumar', weightClass: 'Lightweight', wins: 8, losses: 0, image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Aisha Patel', weightClass: 'Women\'s Strawweight', wins: 7, losses: 1, image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Vikram Singh', weightClass: 'Welterweight', wins: 6, losses: 0, image: 'https://images.unsplash.com/photo-1567013127542-490d757e6349?q=80&w=200&auto=format&fit=crop' },
];

const recentActivity = [
  { id: 1, type: 'Scout Report', title: 'New prospect evaluation from Hyderabad gym', time: '2 hours ago', avatar: '🔍' },
  { id: 2, type: 'Fighter Update', title: 'Rajiv Kumar updated training footage', time: '5 hours ago', avatar: '🥋' },
  { id: 3, type: 'Tryout Registration', title: '15 new registrations for Mumbai tryouts', time: '1 day ago', avatar: '📝' },
  { id: 4, type: 'Show Planning', title: 'Episode 3 matchups finalized', time: '2 days ago', avatar: '📺' },
];

const Dashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Welcome Header */}
      <Box 
        sx={{ 
          mb: 4, 
          p: 3, 
          borderRadius: 3, 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '-50%', 
          right: '-10%', 
          width: '300px', 
          height: '300px', 
          borderRadius: '50%', 
          backgroundColor: alpha('#fff', 0.1),
          zIndex: 0
        }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="700">
            Welcome to RAW Talent Scout
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, maxWidth: '600px' }}>
            Your command center for discovering the next generation of MMA fighters across India. Scout, evaluate, and manage talent for the revolutionary RAW reality show.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              backgroundColor: 'white', 
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 0.9)
              }
            }}
          >
            Start Scouting
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
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
                Gyms Mapped
              </Typography>
              <Typography variant="h4" fontWeight="700">
                3,486
              </Typography>
              <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon fontSize="small" /> 12 new this week
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), p: 2, color: theme.palette.primary.main }}>
              <PlaceIcon fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
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
                Upcoming Tryouts
              </Typography>
              <Typography variant="h4" fontWeight="700">
                5
              </Typography>
              <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon fontSize="small" /> Next: Mumbai, Apr 10
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), p: 2, color: theme.palette.secondary.main }}>
              <CalendarTodayIcon fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
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
                Fighter Database
              </Typography>
              <Typography variant="h4" fontWeight="700">
                248
              </Typography>
              <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <GroupIcon fontSize="small" /> 24 new this month
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), p: 2, color: theme.palette.info.main }}>
              <GroupIcon fontSize="large" />
            </Avatar>
          </Paper>
        </Grid>

        {/* Tryout Registration Status */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`,
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="600">
                Tryout Registration Status
              </Typography>
              <Button 
                variant="text" 
                color="primary" 
                endIcon={<ArrowForwardIcon />}
                size="small"
              >
                View All
              </Button>
            </Box>
            <Grid container spacing={2}>
              {upcomingTryouts.map((tryout) => (
                <Grid item xs={12} md={4} key={tryout.id}>
                  <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{tryout.city}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                        {tryout.date}
                      </Typography>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Registrations</span>
                          <span>{tryout.registrations}/{tryout.capacity}</span>
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={(tryout.registrations / tryout.capacity) * 100} 
                          sx={{ 
                            mt: 1, 
                            mb: 1,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                            }
                          }}
                        />
                      </Box>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        fullWidth
                        size="small"
                        sx={{ mt: 1, borderRadius: '999px' }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`,
              height: '100%'
            }}
          >
            <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        {activity.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{ display: 'block', fontWeight: 500 }}
                          >
                            {activity.type}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                          >
                            {activity.time}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
            <Button 
              variant="text" 
              color="primary" 
              fullWidth
              sx={{ mt: 2 }}
            >
              View All Activity
            </Button>
          </Paper>
        </Grid>

        {/* Top Prospects */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="600">
                Top Prospects
              </Typography>
              <Button 
                variant="text" 
                color="primary" 
                endIcon={<ArrowForwardIcon />}
                size="small"
              >
                View All
              </Button>
            </Box>
            <Grid container spacing={2}>
              {topProspects.map((prospect) => (
                <Grid item xs={12} sm={6} md={4} key={prospect.id}>
                  <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="180"
                        image={prospect.image}
                        alt={prospect.name}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                          {prospect.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {prospect.weightClass}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
                          {prospect.wins}-{prospect.losses} Record
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
