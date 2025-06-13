import React, { useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  useTheme, 
  alpha, 
  Paper 
} from '@mui/material';
import { StatisticCard } from './index';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { gsap } from 'gsap';

interface StatItem {
  title: string;
  value: string | number;
  icon?: React.ReactElement;
  trend?: number;
  trendLabel?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'champion' | 'fighter' | 'success' | 'error' | 'warning';
  prefix?: string;
  suffix?: string;
}

interface StatsDashboardProps {
  title?: string;
  stats: StatItem[];
  animated?: boolean;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({
  title = 'Performance Metrics',
  stats = [],
  animated = true
}) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Set default stats if none are provided
  const defaultStats: StatItem[] = [
    {
      title: 'STRENGTH RATING',
      value: 89,
      icon: <FitnessCenterIcon />,
      trend: 7,
      trendLabel: 'vs last month',
      color: 'primary',
      suffix: '/100'
    },
    {
      title: 'REACTION TIME',
      value: 0.21,
      icon: <TimerIcon />,
      trend: -5,
      trendLabel: 'vs last month',
      color: 'accent',
      suffix: 's'
    },
    {
      title: 'IMPROVEMENT RATE',
      value: 24.8,
      icon: <TrendingUpIcon />,
      trend: 12,
      trendLabel: 'vs last month',
      color: 'success',
      suffix: '%'
    },
    {
      title: 'WIN RATE',
      value: 78,
      icon: <EmojiEventsIcon />,
      trend: 3,
      trendLabel: 'vs last month',
      color: 'champion',
      suffix: '%'
    }
  ];
  
  const displayStats = stats.length > 0 ? stats : defaultStats;
  
  useEffect(() => {
    if (animated && containerRef.current) {
      // Initial states
      gsap.set(containerRef.current, { 
        y: 40,
        opacity: 0
      });
      
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          y: 30,
          opacity: 0
        });
      }
      
      statsRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.set(ref, {
            y: 40,
            opacity: 0
          });
        }
      });
      
      // Animation timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
      
      tl.to(containerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8
      })
      .to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, "-=0.6")
      .to(statsRefs.current, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8
      }, "-=0.6");
    }
  }, [animated, displayStats.length]);
  
  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: 3,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.1)}`,
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.03)} 0%, rgba(0,0,0,0) 70%)`,
          zIndex: 0,
          borderRadius: '50%',
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          left: '30%',
          width: 250,
          height: 250,
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.03)} 0%, rgba(0,0,0,0) 70%)`,
          zIndex: 0,
          borderRadius: '50%',
        }}
      />
      
      {/* Header */}
      {title && (
        <Typography
          ref={titleRef}
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            marginBottom: 4,
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: 0,
              width: 60,
              height: 4,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.3)})`,
            }
          }}
        >
          {title}
        </Typography>
      )}
      
      {/* Stats Grid */}
      <Grid container spacing={3}>
        {displayStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box ref={(el: HTMLDivElement | null) => statsRefs.current[index] = el}>
              <StatisticCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                trendLabel={stat.trendLabel}
                color={stat.color}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsDashboard;
