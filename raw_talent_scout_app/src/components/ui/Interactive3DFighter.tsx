import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Interactive3DFighterProps {
  name: string;
  nickname?: string;
  specialty?: string;
  backgroundImage?: string;
  fighterImage?: string;
}

const Interactive3DFighter: React.FC<Interactive3DFighterProps> = ({
  name,
  nickname = '',
  specialty = '',
  backgroundImage = 'https://source.unsplash.com/featured/?octagon,mma',
  fighterImage = 'https://source.unsplash.com/featured/?mma,fighter'
}) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const fighterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Initialize animations
  useEffect(() => {
    if (!containerRef.current) return;

    // Initial animations
    const tl = gsap.timeline();
    
    tl.fromTo(
      fighterRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );
    
    if (textRef.current) {
      tl.fromTo(
        textRef.current.querySelectorAll('.text-animate'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
        "-=0.7"
      );
    }
    
    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.querySelectorAll('.stat-item'),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }

    // Scroll trigger animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
      onUpdate: (self) => {
        if (fighterRef.current) {
          // Rotate fighter slightly as user scrolls
          gsap.to(fighterRef.current, {
            rotationY: self.progress * 10 - 5,
            scale: 1 + self.progress * 0.05,
            duration: 0.5
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovered) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotations based on mouse position
    const rotX = ((mouseY / rect.height) - 0.5) * 10;
    const rotY = ((mouseX / rect.width) - 0.5) * 10;
    
    setRotation({ x: rotX, y: rotY });
    
    if (fighterRef.current) {
      gsap.to(fighterRef.current, {
        rotationY: rotY,
        rotationX: rotX,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out"
      });
    }
    
    // Parallax effect on background
    gsap.to(containerRef.current.querySelector('.bg-layer'), {
      x: rotY * 5,
      y: rotX * 5,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  // Stats items
  const stats = [
    { label: 'Striking', value: 92 },
    { label: 'Grappling', value: 85 },
    { label: 'Endurance', value: 88 },
    { label: 'Fight IQ', value: 90 },
  ];

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: '75vh',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 5,
        boxShadow: `0 20px 80px ${alpha(theme.palette.primary.main, 0.2)}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        cursor: 'pointer',
        '&:hover': {
          '& .fighter-highlight': {
            opacity: 1,
            filter: 'blur(60px)'
          }
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer with gradient overlay */}
      <Box
        className="bg-layer"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
            zIndex: 1
          }
        }}
      />
      
      {/* Animated glow effects */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.4)} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: 0.6,
          zIndex: 1
        }}
      />
      
      {/* Fighter image with 3D effect */}
      <Box
        ref={fighterRef}
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.2s ease',
        }}
      >
        <Box
          sx={{
            width: { xs: '250px', md: '400px' },
            height: { xs: '250px', md: '400px' },
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: `0 20px 40px ${alpha('#000', 0.3)}`,
            transform: 'translateZ(20px)',
            transition: 'all 0.3s ease'
          }}
        >
          <img 
            src={fighterImage} 
            alt={name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
          />
        </Box>
        
        {/* Highlight glow effect on hover */}
        <Box
          className="fighter-highlight"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.6)} 0%, transparent 70%)`,
            opacity: 0,
            transition: 'opacity 0.5s ease',
            filter: 'blur(40px)',
            zIndex: -1
          }}
        />
      </Box>
      
      {/* Fighter info text */}
      <Box
        ref={textRef}
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '7%',
          zIndex: 3,
          color: 'white',
          textAlign: 'left',
          maxWidth: '50%'
        }}
      >
        <Typography 
          variant="overline" 
          className="text-animate"
          sx={{ 
            opacity: 0,
            display: 'block',
            color: alpha(theme.palette.common.white, 0.7),
            letterSpacing: '0.2em',
            fontWeight: 600,
            textTransform: 'uppercase',
            mb: 1
          }}
        >
          {specialty}
        </Typography>
        <Typography 
          variant="h2" 
          className="text-animate"
          sx={{ 
            opacity: 0,
            fontWeight: 900,
            textShadow: '0 2px 15px rgba(0,0,0,0.3)',
            mb: 1,
            fontSize: { xs: '2rem', md: '3rem', lg: '4rem' }
          }}
        >
          {name}
        </Typography>
        <Typography 
          variant="h4" 
          className="text-animate"
          sx={{ 
            opacity: 0,
            fontWeight: 600,
            color: theme.palette.secondary.main,
            textShadow: `0 0 10px ${alpha(theme.palette.secondary.main, 0.7)}`,
            fontStyle: 'italic',
            mb: 3
          }}
        >
          "{nickname}"
        </Typography>
      </Box>
      
      {/* Fighter stats */}
      <Box
        ref={statsRef}
        sx={{
          position: 'absolute',
          top: '15%',
          right: '7%',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5
        }}
      >
        {stats.map((stat, index) => (
          <Box 
            key={index}
            className="stat-item"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              opacity: 0
            }}
          >
            <Typography
              sx={{ 
                color: alpha(theme.palette.common.white, 0.8),
                fontWeight: 600,
                minWidth: '100px'
              }}
            >
              {stat.label}
            </Typography>
            <Box
              sx={{
                width: '150px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: alpha(theme.palette.common.white, 0.2),
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${stat.value}%`,
                  backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 0 10px ${alpha(theme.palette.secondary.main, 0.7)}`,
                }}
              />
            </Box>
            <Typography
              sx={{ 
                color: theme.palette.common.white,
                fontWeight: 700
              }}
            >
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Interactive3DFighter;
