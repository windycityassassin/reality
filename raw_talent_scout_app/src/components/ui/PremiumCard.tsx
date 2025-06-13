import React from 'react';
import { 
  Box, 
  Card, 
  CardProps, 
  Typography, 
  styled, 
  useTheme,
  alpha
} from '@mui/material';

// Enhanced Card component with premium styling
interface PremiumCardProps extends CardProps {
  title?: string;
  subtitle?: string;
  glowColor?: 'primary' | 'secondary' | 'accent' | 'champion';
  elevation?: number;
  glassMorphism?: boolean;
  decorative?: boolean;
}

const StyledCard = styled(Card)<{
  glassMorphism?: boolean; 
  decorative?: boolean;
  glowColor?: string;
}>(({ theme, glassMorphism, decorative, glowColor }) => ({
  borderRadius: 16,
  position: 'relative',
  overflow: 'visible',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  ...(glassMorphism && {
    background: alpha(theme.palette.background.paper, 0.7),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  }),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 14px 28px ${alpha(
      ((theme.palette[glowColor as keyof typeof theme.palette] as any)?.main) || theme.palette.primary.main, 
      0.15
    )}`,
  }
}));

const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  title,
  subtitle,
  glowColor = 'primary',
  elevation = 0,
  glassMorphism = false,
  decorative = false,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <StyledCard 
      elevation={elevation} 
      glassMorphism={glassMorphism}
      decorative={decorative}
      glowColor={glowColor}
      {...rest}
    >
      {/* Decorative elements */}
      {decorative && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${(theme.palette[glowColor as keyof typeof theme.palette] as any).light} 0%, ${(theme.palette[glowColor as keyof typeof theme.palette] as any).main} 100%)`,
              boxShadow: `0 0 10px ${alpha((theme.palette[glowColor as keyof typeof theme.palette] as any).main, 0.5)}`,
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: -4,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: (theme.palette[glowColor as keyof typeof theme.palette] as any).main,
              opacity: 0.6,
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: -30,
              left: 20,
              right: 20,
              height: 3,
              background: `linear-gradient(90deg, transparent 0%, ${alpha((theme.palette[glowColor as keyof typeof theme.palette] as any).main, 0.7)} 50%, transparent 100%)`,
              borderRadius: 2,
              zIndex: 0,
            }}
          />
        </>
      )}

      {/* Card content */}
      <Box sx={{ p: 3, position: 'relative', zIndex: 2 }}>
        {(title || subtitle) && (
          <Box sx={{ mb: 2 }}>
            {title && (
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ 
                  fontWeight: 700,
                  position: 'relative',
                  display: 'inline-block',
                  mb: subtitle ? 0.5 : 0,
                  ...(decorative && {
                    background: `linear-gradient(90deg, ${(theme.palette[glowColor as keyof typeof theme.palette] as any).main}, ${(theme.palette[glowColor as keyof typeof theme.palette] as any).light})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  })
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ 
                  opacity: 0.8,
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Box>
    </StyledCard>
  );
};

export default PremiumCard;
