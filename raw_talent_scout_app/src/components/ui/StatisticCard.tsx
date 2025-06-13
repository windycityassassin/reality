import React from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  alpha,
  SvgIconProps
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactElement<SvgIconProps>;
  trend?: number;
  trendLabel?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'champion' | 'fighter' | 'success' | 'error' | 'warning';
  prefix?: string;
  suffix?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  color = 'primary',
  prefix = '',
  suffix = '',
}) => {
  const theme = useTheme();
  const paletteColor = (theme.palette[color as keyof typeof theme.palette] as any) || theme.palette.primary;
  const colorValue = paletteColor.main || theme.palette.primary.main;
  
  return (
    <Box 
      sx={{
        position: 'relative',
        p: 2.5,
        borderRadius: 3,
        background: alpha(theme.palette.background.paper, 0.7),
        backdropFilter: 'blur(8px)',
        border: `1px solid ${alpha(colorValue, 0.1)}`,
        boxShadow: `0 4px 20px ${alpha(colorValue, 0.08)}`,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `0 8px 25px ${alpha(colorValue, 0.15)}`,
          transform: 'translateY(-3px)',
        }
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(colorValue, 0.08)} 0%, rgba(0,0,0,0) 70%)`,
          zIndex: 0,
        }}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          bottom: -10,
          left: -10,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(colorValue, 0.06)} 0%, rgba(0,0,0,0) 70%)`,
          zIndex: 0,
        }}
      />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: alpha(theme.palette.text.secondary, 0.8),
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '0.75rem',
            }}
          >
            {title}
          </Typography>
          
          {icon && (
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: alpha(colorValue, 0.1),
                color: colorValue,
              }}
            >
              {React.cloneElement(icon, { fontSize: 'small' })}
            </Box>
          )}
        </Box>
        
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            my: 1,
            letterSpacing: '-0.02em',
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {prefix && (
            <Typography 
              component="span" 
              sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 500, 
                color: alpha(theme.palette.text.primary, 0.7),
                mr: 0.5,
                mb: 0.4
              }}
            >
              {prefix}
            </Typography>
          )}
          
          {value}
          
          {suffix && (
            <Typography 
              component="span" 
              sx={{ 
                fontSize: '1.1rem', 
                fontWeight: 500, 
                color: alpha(theme.palette.text.primary, 0.7),
                ml: 0.5,
                mb: 0.4
              }}
            >
              {suffix}
            </Typography>
          )}
        </Typography>
        
        {(trend !== undefined) && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mt: 1.5,
              backgroundColor: trend >= 0 
                ? alpha(theme.palette.success.main, 0.1) 
                : alpha(theme.palette.error.main, 0.1),
              color: trend >= 0 ? theme.palette.success.main : theme.palette.error.main,
              py: 0.5,
              px: 1,
              borderRadius: 6,
              width: 'fit-content'
            }}
          >
            {trend >= 0 ? <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />}
            <Typography variant="caption" fontWeight={600}>
              {trend > 0 ? '+' : ''}{trend}% {trendLabel}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StatisticCard;
