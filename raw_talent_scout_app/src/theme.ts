import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Premium MMA design system color palette
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    neutral: Palette['primary'];
    fighter: Palette['primary'];
    champion: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
    fighter?: PaletteOptions['primary'];
    champion?: PaletteOptions['primary'];
  }
}

// Create the base theme
let theme = createTheme({
  palette: {
    primary: {
      main: '#0040A0', // Deep blue - represents professionalism and strength
      light: '#3B68B8',
      dark: '#002D73',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#D20A0A', // Strong red - represents passion and intensity
      light: '#E53935',
      dark: '#B71C1C',
      contrastText: '#ffffff',
    },
    accent: {
      main: '#FFD700', // Gold - represents championship and excellence
      light: '#FFF59D',
      dark: '#FFC400',
      contrastText: '#000000',
    },
    neutral: {
      main: '#44474F', // Deep neutral - sophisticated, premium feel
      light: '#BFC3CC',
      dark: '#292C35',
      contrastText: '#ffffff',
    },
    fighter: {
      main: '#6200EA', // Energetic purple - representing fighter spirit
      light: '#9D46FF',
      dark: '#3700B3',
      contrastText: '#ffffff',
    },
    champion: {
      main: '#BF9B30', // Rich gold - representing championship status
      light: '#F2D77E',
      dark: '#856B1A',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8F9FC', // Crisp, clean background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121', // Near black - clear readability
      secondary: '#5F6368', // Medium gray - professional supporting text
    },
    error: {
      main: '#C62828', // Deep red - clear error state
      light: '#EF5350',
      dark: '#B71C1C',
    },
    warning: {
      main: '#FF6D00', // Bright orange - attention-grabbing
      light: '#FF9E40',
      dark: '#E65100',
    },
    info: {
      main: '#1976D2', // Information blue
      light: '#64B5F6',
      dark: '#0D47A1',
    },
    success: {
      main: '#2E7D32', // Rich green - clear success state
      light: '#4CAF50',
      dark: '#1B5E20',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Segoe UI", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      textTransform: 'uppercase',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.75rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.25,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      letterSpacing: '-0.005em',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: 0,
      lineHeight: 1.35,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: 0,
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      letterSpacing: 0,
      lineHeight: 1.45,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.55,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: '0.9375rem',
      letterSpacing: '0.05em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      letterSpacing: '0.03em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
  },
  shape: {
    borderRadius: 10, // Apple's rounded corners
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.02)',
    '0px 3px 3px -2px rgba(0,0,0,0.05),0px 2px 6px 0px rgba(0,0,0,0.03),0px 1px 8px 0px rgba(0,0,0,0.02)',
    '0px 3px 5px -1px rgba(0,0,0,0.05),0px 4px 8px 0px rgba(0,0,0,0.03),0px 1px 10px 0px rgba(0,0,0,0.02)',
    '0px 4px 5px -2px rgba(0,0,0,0.05),0px 6px 10px 1px rgba(0,0,0,0.03),0px 2px 14px 1px rgba(0,0,0,0.02)',
    '0px 6px 10px -3px rgba(0,0,0,0.05),0px 9px 16px 2px rgba(0,0,0,0.03),0px 3px 16px 2px rgba(0,0,0,0.02)',
    '0px 8px 11px -5px rgba(0,0,0,0.05),0px 12px 18px 3px rgba(0,0,0,0.03),0px 5px 16px 3px rgba(0,0,0,0.02)',
    '0px 9px 12px -6px rgba(0,0,0,0.05),0px 16px 20px 4px rgba(0,0,0,0.03),0px 6px 18px 4px rgba(0,0,0,0.02)',
    '0px 10px 14px -7px rgba(0,0,0,0.05),0px 20px 26px 5px rgba(0,0,0,0.03),0px 8px 20px 5px rgba(0,0,0,0.02)',
    '0px 12px 16px -8px rgba(0,0,0,0.05),0px 24px 28px 6px rgba(0,0,0,0.03),0px 10px 22px 6px rgba(0,0,0,0.02)',
    '0px 14px 18px -9px rgba(0,0,0,0.05),0px 28px 32px 7px rgba(0,0,0,0.03),0px 12px 24px 7px rgba(0,0,0,0.02)',
    '0px 16px 20px -10px rgba(0,0,0,0.05),0px 32px 34px 8px rgba(0,0,0,0.03),0px 14px 26px 8px rgba(0,0,0,0.02)',
    '0px 18px 22px -11px rgba(0,0,0,0.05),0px 36px 38px 9px rgba(0,0,0,0.03),0px 16px 28px 9px rgba(0,0,0,0.02)',
    '0px 20px 24px -12px rgba(0,0,0,0.05),0px 40px 42px 10px rgba(0,0,0,0.03),0px 18px 30px 10px rgba(0,0,0,0.02)',
    '0px 22px 26px -13px rgba(0,0,0,0.05),0px 44px 46px 11px rgba(0,0,0,0.03),0px 20px 32px 11px rgba(0,0,0,0.02)',
    '0px 24px 28px -14px rgba(0,0,0,0.05),0px 48px 50px 12px rgba(0,0,0,0.03),0px 22px 34px 12px rgba(0,0,0,0.02)',
    'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none' // Complete the 25 elements
  ],
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 10.01%)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50%',
            transform: 'scale(10,10)',
            opacity: 0,
            transition: 'transform .3s, opacity .5s',
          },
          '&:active::after': {
            transform: 'scale(0,0)',
            opacity: 0.3,
            transition: '0s',
          },
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, #0040A0 0%, #002D73 100%)`,
          boxShadow: '0 4px 10px rgba(0, 64, 160, 0.3)',
          '&:hover': {
            boxShadow: '0 7px 15px rgba(0, 64, 160, 0.4)',
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, #D20A0A 0%, #B71C1C 100%)`,
          boxShadow: '0 4px 10px rgba(210, 10, 10, 0.3)',
          '&:hover': {
            boxShadow: '0 7px 15px rgba(210, 10, 10, 0.4)',
          },
        },
        sizeSmall: {
          padding: '8px 16px',
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '14px 28px',
          fontSize: '1rem',
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05)',
          },
          border: '1px solid rgba(229, 231, 235, 0.5)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), linear-gradient(to bottom, rgba(0, 64, 160, 0.03), rgba(210, 10, 10, 0.03))',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
          borderRight: '1px solid rgba(229, 231, 235, 0.5)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 52,
          height: 32,
          padding: 0,
        },
        switchBase: {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              border: 'none',
              backgroundColor: '#0040A0',
            },
          },
        },
        thumb: {
          width: 28,
          height: 28,
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        },
        track: {
          borderRadius: 16,
          border: 'none',
          backgroundColor: '#E5E7EB',
          opacity: 1,
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '2px solid #FFFFFF',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '8px',
          padding: '2px 2px',
          height: 'auto',
          minHeight: '32px',
        },
        label: {
          padding: '4px 12px',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: '0 8px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 64, 160, 0.03)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px 20px',
          borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
        },
        head: {
          fontWeight: 700,
          backgroundColor: 'transparent',
          color: '#44474F', // neutral main
          borderBottom: '2px solid rgba(0, 64, 160, 0.2)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.75rem',
        },
      },
    },
  },
});

// Make fonts responsive
theme = responsiveFontSizes(theme);

export default theme;
