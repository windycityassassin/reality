import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Switch,
  TextField,
  Button,
  FormControlLabel,
  Alert,
  Snackbar,
  Avatar,
  useTheme
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import StorageIcon from '@mui/icons-material/Storage';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';

const Settings: React.FC = () => {
  const theme = useTheme();
  
  // State
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);
  
  // Dummy user profile
  const [profile, setProfile] = useState({
    name: 'Raj Kapoor',
    email: 'raj.kapoor@rawmma.com',
    role: 'Head Scout',
    phone: '+91 98765 43210',
  });
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      newFighters: true,
      tryoutAlerts: true,
      systemUpdates: true,
    },
    appearance: {
      darkMode: false,
      highContrast: false,
      fontSize: 'medium',
    },
    privacy: {
      shareData: true,
      locationTracking: true,
      analytics: true,
    },
    system: {
      autoSync: true,
      offlineMode: false,
      dataUsage: 'unlimited',
    }
  });
  
  // Handle profile change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle toggle change
  const handleToggleChange = (section: string, setting: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof typeof settings],
        [setting]: e.target.checked
      }
    });
  };
  
  // Handle save
  const handleSave = () => {
    setSaved(true);
    // In a real app, you would send the settings to an API
  };
  
  // Handle close snackbar
  const handleCloseSnackbar = () => {
    setSaved(false);
  };
  
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="700">
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your scouting app preferences and account settings
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Settings Menu */}
        <Grid item xs={12} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              overflow: 'hidden'
            }}
          >
            <List component="nav" sx={{ p: 0 }}>
              <ListItem 
                button 
                selected={activeSection === 'profile'}
                onClick={() => setActiveSection('profile')}
                sx={{ 
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              
              <Divider />
              
              <ListItem 
                button 
                selected={activeSection === 'notifications'}
                onClick={() => setActiveSection('notifications')}
                sx={{ 
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              
              <Divider />
              
              <ListItem 
                button 
                selected={activeSection === 'appearance'}
                onClick={() => setActiveSection('appearance')}
                sx={{ 
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Appearance" />
              </ListItem>
              
              <Divider />
              
              <ListItem 
                button 
                selected={activeSection === 'privacy'}
                onClick={() => setActiveSection('privacy')}
                sx={{ 
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Privacy & Security" />
              </ListItem>
              
              <Divider />
              
              <ListItem 
                button 
                selected={activeSection === 'system'}
                onClick={() => setActiveSection('system')}
                sx={{ 
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary="System" />
              </ListItem>
              
              <Divider />
              
              <ListItem 
                button 
                selected={activeSection === 'about'}
                onClick={() => setActiveSection('about')}
                sx={{ 
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Settings Content */}
        <Grid item xs={12} md={9}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              minHeight: 600
            }}
          >
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <Box>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Profile Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage your account information and preferences
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar 
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      mr: 3,
                      bgcolor: theme.palette.primary.main
                    }}
                  >
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{profile.name}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {profile.role}
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                      Change Photo
                    </Button>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Role"
                      name="role"
                      value={profile.role}
                      onChange={handleProfileChange}
                      variant="outlined"
                      margin="normal"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      sx={{ mt: 2, borderRadius: 3 }}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <Box>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Notification Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Control how you receive notifications and alerts
                </Typography>
                
                <Typography variant="subtitle1" fontWeight="600" sx={{ mt: 3, mb: 2 }}>
                  Notification Channels
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Email Notifications" 
                      secondary="Receive notifications via email"
                    />
                    <Switch 
                      edge="end"
                      checked={settings.notifications.email}
                      onChange={handleToggleChange('notifications', 'email')}
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Push Notifications" 
                      secondary="Receive notifications on your device"
                    />
                    <Switch 
                      edge="end"
                      checked={settings.notifications.push}
                      onChange={handleToggleChange('notifications', 'push')}
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="SMS Notifications" 
                      secondary="Receive important alerts via SMS"
                    />
                    <Switch 
                      edge="end"
                      checked={settings.notifications.sms}
                      onChange={handleToggleChange('notifications', 'sms')}
                    />
                  </ListItem>
                </List>
                
                <Typography variant="subtitle1" fontWeight="600" sx={{ mt: 4, mb: 2 }}>
                  Notification Types
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="New Fighter Alerts" 
                      secondary="Get notified when new fighters are added to the database"
                    />
                    <Switch 
                      edge="end"
                      checked={settings.notifications.newFighters}
                      onChange={handleToggleChange('notifications', 'newFighters')}
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Tryout Alerts" 
                      secondary="Get notified about upcoming tryouts and events"
                    />
                    <Switch 
                      edge="end"
                      checked={settings.notifications.tryoutAlerts}
                      onChange={handleToggleChange('notifications', 'tryoutAlerts')}
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="System Updates" 
                      secondary="Get notified about app updates and maintenance"
                    />
                    <Switch 
                      edge="end"
                      checked={settings.notifications.systemUpdates}
                      onChange={handleToggleChange('notifications', 'systemUpdates')}
                    />
                  </ListItem>
                </List>
                
                <Button 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{ mt: 3, borderRadius: 3 }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
            
            {/* About Section */}
            {activeSection === 'about' && (
              <Box>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  About RAW Scouting
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  flexDirection: 'column',
                  my: 4
                }}>
                  <Typography variant="h1" sx={{ mb: 1, fontSize: '3rem' }}>
                    🥊
                  </Typography>
                  <Typography variant="h5" fontWeight="600">
                    RAW Talent Scout
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Version 1.0.0
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="body1" paragraph>
                  RAW Talent Scout is a premium MMA scouting application designed to help the Reality Association of Wrestling find and develop the best fighting talent across India.
                </Typography>
                
                <Typography variant="body1" paragraph>
                  The app provides powerful tools for talent scouts, including fighter databases, gym mapping, scouting reports, and analytics to make data-driven decisions.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                    Technical Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="App Version" 
                        secondary="1.0.0 (Build 234)"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText 
                        primary="Last Updated" 
                        secondary="March 16, 2025"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText 
                        primary="Framework" 
                        secondary="React 18.2.0 with TypeScript 5.1.6"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText 
                        primary="Contact Support" 
                        secondary="support@rawmma.com"
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Save Notification */}
      <Snackbar
        open={saved}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
