import React from 'react';
import { 
  Button, 
  ButtonProps, 
  styled, 
  alpha, 
  useTheme, 
  Box 
} from '@mui/material';

// Enhanced Button component with premium styling
interface PremiumButtonProps extends ButtonProps {
  gradientColor?: 'primary' | 'secondary' | 'accent' | 'champion' | 'fighter';
  glowEffect?: boolean;
  animated?: boolean;
  glassMorphism?: boolean;
}

const StyledButton = styled(Button)<{
  gradientColor: string;
  glowEffect?: boolean;
  animated?: boolean;
  glassMorphism?: boolean;
}>(({ theme, gradientColor, glowEffect, animated, glassMorphism }) => {
  // Get the correct palette color or fall back to primary
  const paletteColor = (theme.palette[gradientColor as keyof typeof theme.palette] as any) || theme.palette.primary;
  const colorMain = paletteColor.main || theme.palette.primary.main;
  const colorLight = paletteColor.light || theme.palette.primary.light;
  const colorDark = paletteColor.dark || theme.palette.primary.dark;
  
  return {
    position: 'relative',
    borderRadius: 12,
    textTransform: 'none',
    padding: '10px 24px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: 'none',
    overflow: 'hidden',
    
    ...(glassMorphism && {
      background: alpha(colorMain, 0.15),
      backdropFilter: 'blur(8px)',
      color: colorMain,
      border: `1px solid ${alpha(colorMain, 0.2)}`,
      '&:hover': {
        background: alpha(colorMain, 0.25),
        boxShadow: `0 6px 12px ${alpha(colorMain, 0.2)}`,
      }
    }),
    
    ...(!glassMorphism && {
      background: `linear-gradient(135deg, ${colorLight} 0%, ${colorMain} 100%)`,
      boxShadow: glowEffect ? `0 6px 12px ${alpha(colorMain, 0.25)}` : 'none',
      '&:hover': {
        background: `linear-gradient(135deg, ${colorMain} 0%, ${colorDark} 100%)`,
        boxShadow: glowEffect ? `0 8px 16px ${alpha(colorMain, 0.35)}` : '0 4px 8px rgba(0, 0, 0, 0.15)',
      }
    }),
    
    ...(animated && {
      '&:hover': {
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(1px)',
      }
    })
  };
});

const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  gradientColor = 'primary',
  glowEffect = true,
  animated = true,
  glassMorphism = false,
  ...rest
}) => {
  const theme = useTheme();
  
  return (
    <StyledButton
      gradientColor={gradientColor}
      glowEffect={glowEffect}
      animated={animated}
      glassMorphism={glassMorphism}
      disableElevation
      {...rest}
    >
      {/* Subtle shine effect overlay */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0))',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />
      
      {children}
    </StyledButton>
  );
};

export default PremiumButton;
