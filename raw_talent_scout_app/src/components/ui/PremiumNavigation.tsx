import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  alpha,
  styled
} from '@mui/material';
import { gsap } from 'gsap';
import { useLocation, useNavigate } from 'react-router-dom';

// Styled components
const NavContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 16,
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 15px 40px ${alpha(theme.palette.common.black, 0.15)}`,
  }
}));

interface NavItemProps {
  theme?: any;
  active: boolean;
}

const NavItem = styled(ListItemButton)<NavItemProps>(({ theme, active }) => ({
  borderRadius: 12,
  marginBottom: 8,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(1.5, 2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: active 
      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.primary.light, 0.08)} 100%)`
      : 'transparent',
    opacity: active ? 1 : 0,
    transition: 'opacity 0.3s ease',
    borderRadius: 'inherit',
    zIndex: 0,
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    '& .MuiTypography-root': {
      transform: 'translateX(5px)',
    },
    '& .MuiListItemIcon-root': {
      transform: 'scale(1.1) rotate(5deg)',
    },
    '&::before': {
      opacity: 0.7,
    }
  },
  '& .MuiListItemIcon-root': {
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    minWidth: 42,
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 1,
  },
  '& .MuiTypography-root': {
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 1,
  }
}));

interface NavItemTextProps {
  theme?: any;
  active: boolean;
}

const NavItemText = styled(ListItemText)<NavItemTextProps>(({ theme, active }) => ({
  '& .MuiTypography-root': {
    fontWeight: active ? 600 : 500,
    fontSize: '0.95rem',
    color: active ? theme.palette.text.primary : theme.palette.text.secondary,
    letterSpacing: '0.02em',
  }
}));

// Active indicator that slides between items
const ActiveIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: 4,
  borderRadius: 4,
  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  left: 0,
  zIndex: 2,
}));

// Navigation section header
const NavSection = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: alpha(theme.palette.text.secondary, 0.7),
  margin: theme.spacing(2, 0, 1.5, 2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 30,
    height: 2,
    borderRadius: 2,
    background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.5)}, transparent)`,
  }
}));

// Interface definitions
interface NavItemType {
  title: string;
  path: string;
  icon: React.ReactElement;
  badge?: number | string;
}

interface NavSectionType {
  title?: string;
  items: NavItemType[];
}

interface PremiumNavigationProps {
  sections: NavSectionType[];
  animated?: boolean;
  compact?: boolean;
  onNavigate?: (path: string) => void;
}

const PremiumNavigation: React.FC<PremiumNavigationProps> = ({
  sections = [],
  animated = true,
  compact = false,
  onNavigate
}) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  
  // Track the active item to position the indicator
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  
  // Find the active item based on current path
  useEffect(() => {
    let foundActiveIndex = null;
    let itemIndex = 0;
    
    sections.forEach(section => {
      section.items.forEach((item, idx) => {
        if (location.pathname === item.path) {
          foundActiveIndex = itemIndex;
        }
        itemIndex++;
      });
    });
    
    setActiveItemIndex(foundActiveIndex);
  }, [location.pathname, sections]);
  
  // Position the active indicator
  useEffect(() => {
    if (activeIndicatorRef.current && activeItemIndex !== null && itemRefs.current[activeItemIndex]) {
      const activeItem = itemRefs.current[activeItemIndex];
      
      if (activeItem) {
        gsap.to(activeIndicatorRef.current, {
          top: activeItem.offsetTop + 8,
          height: activeItem.offsetHeight - 16,
          duration: 0.4,
          ease: "power3.out"
        });
      }
    }
  }, [activeItemIndex, compact]);
  
  // Entrance animation
  useEffect(() => {
    if (animated && containerRef.current) {
      const navItems = containerRef.current.querySelectorAll('.nav-item');
      const navHeaders = containerRef.current.querySelectorAll('.nav-section-header');
      
      gsap.set(navItems, { 
        x: -30,
        opacity: 0,
      });
      
      gsap.set(navHeaders, {
        y: -10,
        opacity: 0,
      });
      
      gsap.set(activeIndicatorRef.current, {
        scaleY: 0,
      });
      
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.to(navHeaders, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
      })
      .to(navItems, {
        x: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
      }, "-=0.6")
      .to(activeIndicatorRef.current, {
        scaleY: 1,
        duration: 0.4,
      }, "-=0.3");
    }
  }, [animated]);
  
  // Handle navigation
  const handleItemClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };
  
  return (
    <NavContainer ref={containerRef}>
      {/* Active indicator that moves between items */}
      <ActiveIndicator ref={activeIndicatorRef} />
      
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} sx={{ mb: 3 }}>
          {section.title && (
            <NavSection className="nav-section-header">
              {section.title}
            </NavSection>
          )}
          
          <List sx={{ px: 1.5 }}>
            {section.items.map((item, itemIndex) => {
              // Calculate the overall item index across all sections
              let globalItemIndex = 0;
              for (let i = 0; i < sectionIndex; i++) {
                globalItemIndex += sections[i].items.length;
              }
              globalItemIndex += itemIndex;
              
              const isActive = location.pathname === item.path;
              
              return (
                <ListItem 
                  key={itemIndex} 
                  disablePadding 
                  className="nav-item"
                  ref={el => itemRefs.current[globalItemIndex] = el}
                >
                  <NavItem 
                    active={isActive}
                    onClick={() => handleItemClick(item.path)}
                  >
                    {item.icon && (
                      <ListItemIcon>
                        {React.cloneElement(item.icon, { 
                          fontSize: compact ? 'small' : 'medium',
                          sx: { 
                            transition: 'all 0.3s ease',
                            ...(isActive && {
                              filter: `drop-shadow(0 0 6px ${alpha(theme.palette.primary.main, 0.6)})`,
                            })
                          }
                        })}
                      </ListItemIcon>
                    )}
                    
                    <NavItemText 
                      active={isActive}
                      primary={item.title} 
                      sx={{ 
                        opacity: compact ? 0 : 1,
                        width: compact ? 0 : 'auto',
                        transition: 'all 0.3s ease',
                      }}
                    />
                    
                    {item.badge && (
                      <Box
                        sx={{
                          minWidth: 22,
                          height: 22,
                          borderRadius: 11,
                          backgroundColor: isActive 
                            ? theme.palette.primary.main
                            : alpha(theme.palette.grey[500], 0.2),
                          color: isActive 
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.secondary,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          ml: 1,
                          transition: 'all 0.3s ease',
                          boxShadow: isActive 
                            ? `0 0 8px ${alpha(theme.palette.primary.main, 0.5)}`
                            : 'none',
                        }}
                      >
                        {item.badge}
                      </Box>
                    )}
                  </NavItem>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ))}
    </NavContainer>
  );
};

export default PremiumNavigation;
