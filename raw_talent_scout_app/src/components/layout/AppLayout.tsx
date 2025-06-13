import React, { useState } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Avatar,
  Tooltip,
  Badge,
  Divider,
  useTheme,
  alpha,
  Button
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// Premium MMA-themed Logo component 
const Logo = () => (
  <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0040A0" />
        <stop offset="100%" stopColor="#002D73" />
      </linearGradient>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F2D77E" />
        <stop offset="100%" stopColor="#BF9B30" />
      </linearGradient>
      <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3" />
      </filter>
      <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
        <feComposite in="SourceGraphic" in2="glow" operator="over" />
      </filter>
    </defs>
    <rect width="120" height="120" rx="24" fill="url(#logoGradient)" filter="url(#shadowFilter)"/>
    <path d="M30 45 H90" stroke="#D20A0A" strokeWidth="5" strokeLinecap="round" />
    <text x="60" y="75" fontFamily="Inter, sans-serif" fontSize="42" fontWeight="900" textAnchor="middle" fill="white" letterSpacing="-1" filter="url(#glowFilter)">RAW</text>
    <path d="M25 85 L95 85" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    <path d="M35 93 L85 93" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="95" cy="25" r="12" fill="url(#goldGradient)" stroke="#D20A0A" strokeWidth="1" />
    <text x="95" y="29" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle" fill="white">PRO</text>
  </svg>
);

const drawerWidth = 280;

interface AppLayoutProps {
  children: React.ReactNode;
}

// Define MenuItem interface for type-safety
interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  highlight?: boolean;
}

// Section label for menu groups
const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'relative', mt: 3, mb: 1, mx: 3 }}>
      <Typography
        variant="caption"
        component="h3"
        sx={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          position: 'relative',
          zIndex: 2,
          display: 'inline-block',
          color: alpha(theme.palette.text.secondary, 0.9),
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </Typography>
      <Box sx={{ 
        position: 'absolute', 
        height: 1, 
        left: 0, 
        right: 0, 
        bottom: -4,
        background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.5)}, ${alpha(theme.palette.primary.main, 0)})`,
        borderRadius: 1,
      }} />
    </Box>
  );
};

// Menu item with notification badge support
interface NavigationItemProps {
  item: MenuItem;
  isActive: boolean;
  onClick: () => void;
}

const NavigationItem = ({ item, isActive, onClick }: NavigationItemProps) => {
  const theme = useTheme();
  
  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        onClick={onClick}
        selected={isActive}
        sx={{
          borderRadius: 2.5,
          py: 1.4,
          px: 2.2,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': isActive && !item.highlight ? {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            borderRadius: '10px',
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 0 10px rgba(0, 64, 160, 0.3)',
          } : {},
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            transform: 'translateX(3px)',
          },
          '&.Mui-selected': !item.highlight && {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
            },
          },
          ...(item.highlight && {
            background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            boxShadow: '0 4px 12px rgba(210, 10, 10, 0.2)',
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
              transform: 'translateY(-1px) translateX(3px)',
              boxShadow: '0 6px 16px rgba(210, 10, 10, 0.25)',
            },
            '&:active': {
              transform: 'translateY(1px) translateX(3px)',
              boxShadow: '0 2px 8px rgba(210, 10, 10, 0.2)',
            },
            '&.Mui-selected': {
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              },
            },
          }),
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isActive 
              ? item.highlight 
                ? 'white' 
                : 'primary.main'
              : item.highlight 
                ? 'white' 
                : 'neutral.main',
            '& .MuiSvgIcon-root': {
              transition: 'transform 0.2s ease',
              ...(isActive && { transform: 'scale(1.1)' }),
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.name} 
          primaryTypographyProps={{
            fontWeight: isActive ? 700 : 500,
            variant: 'body2',
            letterSpacing: isActive ? '0.02em' : 'normal',
            sx: {
              transition: 'all 0.2s ease',
              position: 'relative',
              ...(isActive && !item.highlight && {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }),
            }
          }}
        />
        {item.badge && (
          <Badge 
            badgeContent={item.badge} 
            color={item.highlight ? 'primary' : 'secondary'}
            sx={{ 
              transform: 'scale(0.9)',
              '& .MuiBadge-badge': {
                boxShadow: '0 0 0 1.5px white',
                fontWeight: 600,
                fontSize: '0.7rem',
              } 
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Premium menu items with badges and highlights
  const mainMenuItems: MenuItem[] = [
    { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { name: 'Gym Map', icon: <MapIcon />, path: '/map' },
    { name: 'Fighter Database', icon: <PeopleIcon />, path: '/fighters', badge: 12 },
  ];
  
  const scoutingMenuItems: MenuItem[] = [
    { name: 'Scouting Hub', icon: <SearchIcon />, path: '/scouting' },
    { name: 'Show Manager', icon: <MovieIcon />, path: '/show', highlight: true, badge: 3 },
    { name: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
  ];
  
  const settingsMenuItems: MenuItem[] = [
    { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const premiumMenuItems: MenuItem[] = [
    { name: 'Premium UI', icon: <EmojiEventsIcon />, path: '/premium-ui', highlight: true },
    { name: 'UI Showcase', icon: <DesignServicesIcon />, path: '/ui-showcase' },
  ];

  const isPathActive = (path: string) => {
    return location.pathname === path;
  };

  // Define drawer content
  const drawerContent = (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          px: open ? 3 : 1.5,
          pt: 2.5,
          pb: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {open && (
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 800,
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            <Box sx={{ mr: 1.8, display: 'flex' }}>
              <Logo />
            </Box>
            <Box sx={{ position: 'relative' }}>
              RAW Scout
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: -4, 
                  left: 0, 
                  right: 0, 
                  height: 2, 
                  backgroundImage: 'linear-gradient(90deg, rgba(255,215,0,0) 0%, rgba(255,215,0,1) 50%, rgba(255,215,0,0) 100%)',
                  borderRadius: 4,
                }}
              />
            </Box>
          </Typography>
        )}
        <IconButton 
          onClick={toggleDrawer}
          sx={{
            backgroundColor: 'rgba(0, 64, 160, 0.04)',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(0, 64, 160, 0.08)',
            }
          }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Main navigation section */}
      <Box sx={{ px: 2, py: 2.5 }}>
        {open && (
          <Box sx={{ px: 1, mb: 1 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontSize: '0.6875rem', 
                textTransform: 'uppercase', 
                color: 'text.secondary',
                letterSpacing: '0.08em',
                fontWeight: 700,
              }}
            >
              Navigation
            </Typography>
          </Box>
        )}
        
        <List sx={{ px: 0, mt: 0.5 }}>
          {mainMenuItems.map((item) => (
            <NavigationItem
              key={item.name}
              item={item}
              isActive={isPathActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </List>

        {open && <SectionLabel>Talent Scouting</SectionLabel>}
        <List sx={{ px: 0, mt: 0.5 }}>
          {scoutingMenuItems.map((item) => (
            <NavigationItem
              key={item.name}
              item={item}
              isActive={isPathActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </List>

        {open && <SectionLabel>Premium Features</SectionLabel>}
        <List sx={{ px: 0, mt: 0.5 }}>
          {premiumMenuItems.map((item) => (
            <NavigationItem
              key={item.name}
              item={item}
              isActive={isPathActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </List>

        {open && <SectionLabel>System</SectionLabel>}
        <List sx={{ px: 0, mt: 0.5 }}>
          {settingsMenuItems.map((item) => (
            <NavigationItem
              key={item.name}
              item={item}
              isActive={isPathActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </List>

        {/* Premium badge at the bottom */}
        {open && (
          <Box 
            sx={{ 
              mx: 2, 
              mt: 4, 
              p: 2.5,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.champion.main} 0%, ${theme.palette.champion.dark} 100%)`,
              boxShadow: '0 10px 20px rgba(191, 155, 48, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '120px',
                height: '120px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
            />
            <Box 
              sx={{ 
                position: 'absolute',
                bottom: '-30px',
                left: '-20px',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                filter: 'blur(3px)',
              }}
            />
            <Box 
              sx={{ 
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '8px',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.5)',
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Box 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  mr: 1.5, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #FFD700 0%, #BF9B30 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                }}
              >
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'white' }} />
              </Box>
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 800, letterSpacing: '0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                PRO ACCESS
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)', display: 'block', mb: 2.5, fontWeight: 500, lineHeight: 1.4, letterSpacing: '0.01em' }}>
              You have premium features unlocked with championship-level access
            </Typography>
            <Button 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.95)', 
                color: theme.palette.champion.dark,
                fontWeight: 700,
                px: 2,
                py: 0.75,
                borderRadius: 6,
                textTransform: 'none',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                },
                '&:active': {
                  transform: 'translateY(1px)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              Manage Subscription
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : 72}px)` },
          ml: { sm: `${open ? drawerWidth : 72}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          background: `linear-gradient(90deg, ${alpha(theme.palette.background.paper, 0.85)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          backdropFilter: 'blur(20px)',
          color: theme.palette.text.primary,
          boxShadow: '0 4px 30px rgba(0, 64, 160, 0.1)',
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            height: 64,
            px: { xs: 1, sm: 3 },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
              {[...mainMenuItems, ...scoutingMenuItems, ...settingsMenuItems].find((item) => item.path === location.pathname)?.name || 'Dashboard'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ ml: 1 }}>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="User Profile">
              <IconButton sx={{ ml: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>S</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: open ? drawerWidth : 72 }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: open ? drawerWidth : 72,
              overflow: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open={open}
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${open ? drawerWidth : 72}px)` },
          ml: { sm: `${open ? drawerWidth : 72}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.97)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.03)} 0%, rgba(0,0,0,0) 70%)`,
            zIndex: 0,
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.02)} 0%, rgba(0,0,0,0) 70%)`,
            zIndex: 0,
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '30%',
            right: '10%',
            width: 10,
            height: 10,
            backgroundColor: theme.palette.accent.main,
            borderRadius: '50%',
            boxShadow: `0 0 20px 2px ${alpha(theme.palette.accent.main, 0.3)}`,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '15%',
            width: 8,
            height: 8,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '50%',
            boxShadow: `0 0 15px 2px ${alpha(theme.palette.secondary.main, 0.3)}`,
            zIndex: 0,
          }}
        />
        <Toolbar />
        <Box 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            position: 'relative',
            zIndex: 1,
            minHeight: 'calc(100vh - 64px)',
            '& > *': {
              position: 'relative',
              zIndex: 2
            }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
