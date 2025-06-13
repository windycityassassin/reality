import React, { useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Chip,
  Grid,
  Paper,
  useTheme, 
  alpha,
  LinearProgress,
  linearProgressClasses,
  styled,
  Avatar
} from '@mui/material';
import { gsap } from 'gsap';
import { PremiumButton } from './index';

// Styled components
const StyledLinearProgress = styled(LinearProgress)(({ theme, color }) => ({
  height: 12,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: alpha(theme.palette.grey[900], 0.1),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    background: `linear-gradient(90deg, ${
      theme.palette[color as keyof typeof theme.palette] 
        ? alpha((theme.palette[color as keyof typeof theme.palette] as any).main, 0.8)
        : theme.palette.primary.main
    }, ${
      theme.palette[color as keyof typeof theme.palette] 
        ? alpha((theme.palette[color as keyof typeof theme.palette] as any).light, 0.9) 
        : theme.palette.primary.light
    })`,
  },
}));

interface SkillBarProps {
  name: string;
  value: number;
  color?: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, value, color = "primary" }) => {
  const theme = useTheme();
  const progressRef = useRef(null);
  
  useEffect(() => {
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: 0 },
        { 
          width: `${value}%`, 
          duration: 1.5, 
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, [value]);

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {value}%
        </Typography>
      </Box>
      <StyledLinearProgress
        variant="determinate"
        value={100}
        color={color as any}
      />
      <Box
        ref={progressRef}
        sx={{
          height: 12,
          borderRadius: 8,
          width: 0,
          mt: -1.5,
          background: `linear-gradient(90deg, ${
            theme.palette[color as keyof typeof theme.palette] 
              ? alpha((theme.palette[color as keyof typeof theme.palette] as any).main, 0.8)
              : theme.palette.primary.main
          }, ${
            theme.palette[color as keyof typeof theme.palette] 
              ? alpha((theme.palette[color as keyof typeof theme.palette] as any).light, 0.9) 
              : theme.palette.primary.light
          })`,
        }}
      />
    </Box>
  );
};

interface FighterProfileProps {
  name: string;
  nickname?: string;
  weightClass?: string;
  age?: number;
  height?: string;
  weight?: string;
  reach?: string;
  record?: string;
  avatarUrl?: string;
  imageLarge?: string;
  nationality?: string;
  team?: string;
  skills?: {
    striking: number;
    grappling: number;
    stamina: number;
    strength: number;
    speed: number;
    technique: number;
  };
  notes?: string;
  tags?: string[];
  highlighted?: boolean;
}

const FighterProfile: React.FC<FighterProfileProps> = ({
  name = "Alex Thompson",
  nickname = "The Destroyer",
  weightClass = "Middleweight",
  age = 27,
  height = "6'1\"",
  weight = "185 lbs",
  reach = "74\"",
  record = "12-2-0",
  avatarUrl,
  imageLarge,
  nationality = "USA",
  team = "Alpha Fight Team",
  skills = {
    striking: 85,
    grappling: 72,
    stamina: 90,
    strength: 78,
    speed: 88,
    technique: 82
  },
  notes = "Explosive striker with a rapidly developing ground game. Shows excellent fight IQ and adapts well mid-fight.",
  tags = ["Kickboxing", "BJJ Blue Belt", "College Wrestling"],
  highlighted = false
}) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation
    if (containerRef.current && imageRef.current && contentRef.current && headingRef.current) {
      gsap.set(imageRef.current, { 
        x: -50, 
        opacity: 0,
        scale: 0.9,
      });
      
      gsap.set(contentRef.current, { 
        x: 50, 
        opacity: 0 
      });
      
      gsap.set(headingRef.current.querySelectorAll('.animate-text'), { 
        y: 30, 
        opacity: 0 
      });
      
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
      
      tl.to(imageRef.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
      })
      .to(headingRef.current.querySelectorAll('.animate-text'), {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
      }, "-=0.8")
      .to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
      }, "-=0.6");
    }
  }, []);
  
  // Calculate overall rating
  const overallRating = Math.round(
    Object.values(skills).reduce((sum, curr) => sum + curr, 0) / Object.values(skills).length
  );
  
  return (
    <Paper
      ref={containerRef}
      elevation={highlighted ? 12 : 4}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease',
        background: `linear-gradient(135deg, ${
          highlighted 
            ? alpha(theme.palette.background.paper, 0.8) 
            : alpha(theme.palette.background.paper, 0.6)
        } 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${
          highlighted 
            ? alpha(theme.palette.primary.main, 0.2) 
            : alpha(theme.palette.divider, 0.1)
        }`,
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: highlighted 
            ? `0 20px 30px ${alpha(theme.palette.primary.main, 0.2)}` 
            : `0 15px 25px ${alpha(theme.palette.common.black, 0.1)}`,
        }
      }}
    >
      {/* Background decoration elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '50%',
          background: highlighted 
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`
            : 'transparent',
          clipPath: 'polygon(100px 0, 100% 0, 100% 100%, 0 100%)',
          zIndex: 0,
        }}
      />
      
      {/* Highlighted marker */}
      {highlighted && (
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 2,
            background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.light} 100%)`,
            color: theme.palette.warning.contrastText,
            borderRadius: 20,
            px: 2,
            py: 0.5,
            fontWeight: 'bold',
            boxShadow: `0 3px 10px ${alpha(theme.palette.warning.main, 0.3)}`,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Top Prospect
        </Box>
      )}
      
      <Grid container>
        {/* Fighter image column */}
        <Grid item xs={12} md={5} ref={imageRef}>
          <Box
            sx={{
              height: '100%',
              minHeight: { xs: '300px', md: '400px' },
              position: 'relative',
              overflow: 'hidden',
              borderRadius: { xs: '0 0 30px 0', md: '0 30px 30px 0' },
              boxShadow: `inset -10px 0 20px ${alpha(theme.palette.common.black, 0.1)}`,
            }}
          >
            {/* Fighter image */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${imageLarge || 'https://source.unsplash.com/featured/?mma,fighter'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                filter: 'saturate(1.2)',
                zIndex: 1,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 100%)`,
                  zIndex: 2,
                }
              }}
            />
            
            {/* Fighter name overlay */}
            <Box
              ref={headingRef}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: 3,
                zIndex: 3,
                color: 'white',
              }}
            >
              <Typography 
                variant="h4" 
                component="h2" 
                className="animate-text"
                sx={{
                  fontWeight: 800,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  mb: 0.5,
                }}
              >
                {name}
              </Typography>
              
              {nickname && (
                <Typography 
                  variant="h6" 
                  className="animate-text"
                  sx={{
                    fontWeight: 400,
                    mb: 1,
                    fontStyle: 'italic',
                    opacity: 0.9,
                    textShadow: '0 2px 5px rgba(0,0,0,0.3)',
                  }}
                >
                  "{nickname}"
                </Typography>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="animate-text">
                <Typography 
                  variant="body2" 
                  sx={{
                    backgroundColor: alpha(theme.palette.common.white, 0.2),
                    backdropFilter: 'blur(5px)',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontWeight: 600,
                  }}
                >
                  {weightClass}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{
                    backgroundColor: alpha(theme.palette.common.white, 0.2),
                    backdropFilter: 'blur(5px)',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    fontWeight: 600,
                  }}
                >
                  Record: {record}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        
        {/* Fighter details column */}
        <Grid item xs={12} md={7} ref={contentRef}>
          <Box sx={{ p: 3 }}>
            {/* Basic info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Age</Typography>
                <Typography variant="body1" fontWeight={600}>{age}</Typography>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Height</Typography>
                <Typography variant="body1" fontWeight={600}>{height}</Typography>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Weight</Typography>
                <Typography variant="body1" fontWeight={600}>{weight}</Typography>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Reach</Typography>
                <Typography variant="body1" fontWeight={600}>{reach}</Typography>
              </Grid>
            </Grid>
            
            {/* Team and nationality */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              {avatarUrl && (
                <Avatar 
                  src={avatarUrl} 
                  alt={name}
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  }}
                />
              )}
              
              <Box>
                <Typography variant="body2" color="text.secondary">Team</Typography>
                <Typography variant="body1" fontWeight={600}>{team}</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>{nationality}</Typography>
              </Box>
            </Box>
            
            {/* Overall rating */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 3,
                p: 2,
                backgroundColor: alpha(theme.palette.background.default, 0.5),
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Typography variant="h6" fontWeight={600}>Overall Rating</Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  color: highlighted ? theme.palette.primary.main : 'text.primary',
                }}
              >
                {overallRating}
              </Typography>
            </Box>
            
            {/* Skills */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Skills Breakdown</Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <SkillBar name="Striking" value={skills.striking} color="primary" />
                <SkillBar name="Grappling" value={skills.grappling} color="secondary" />
                <SkillBar name="Stamina" value={skills.stamina} color="info" />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <SkillBar name="Strength" value={skills.strength} color="warning" />
                <SkillBar name="Speed" value={skills.speed} color="error" />
                <SkillBar name="Technique" value={skills.technique} color="success" />
              </Grid>
            </Grid>
            
            {/* Tags */}
            {tags && tags.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Specialties</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {tags.map((tag, index) => (
                    <Chip 
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
            
            {/* Notes */}
            {notes && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Scout Notes</Typography>
                <Typography variant="body2">{notes}</Typography>
              </Box>
            )}
            
            {/* Action button */}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <PremiumButton 
                variant="contained"
                gradientColor={highlighted ? "primary" : "secondary"}
                glowEffect
              >
                View Full Profile
              </PremiumButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FighterProfile;
