import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, alpha, useTheme } from '@mui/material';
import { gsap } from 'gsap';

interface ImmersiveHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  imagePath?: string;
  buttonText?: string;
  overlayOpacity?: number;
  height?: string | number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  animated?: boolean;
}

const ImmersiveHero: React.FC<ImmersiveHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  imagePath,
  buttonText,
  overlayOpacity = 0.8,
  height = '70vh',
  primaryColor,
  secondaryColor,
  accentColor,
  animated = true
}) => {
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);
  
  // Use the provided colors or fallback to theme defaults
  const primary = primaryColor || theme.palette.primary.main;
  const secondary = secondaryColor || theme.palette.secondary.main;
  const accent = accentColor || (theme.palette.accent as any)?.main || theme.palette.warning.main;

  useEffect(() => {
    if (animated && heroRef.current && titleRef.current && overlayRef.current) {
      // Initial states
      gsap.set(overlayRef.current, { 
        opacity: 0.95,
      });
      
      gsap.set(titleRef.current.querySelectorAll('span'), { 
        y: 60, 
        opacity: 0 
      });
      
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { 
          y: 30, 
          opacity: 0 
        });
      }
      
      if (decorationRef.current) {
        gsap.set(decorationRef.current.querySelectorAll('.decoration-element'), {
          scale: 0,
          opacity: 0,
          rotation: -15
        });
      }
      
      // Animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.to(overlayRef.current, { 
        opacity: 0.8, 
        duration: 1.8,
      })
      .to(titleRef.current.querySelectorAll('span'), { 
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
      }, "-=1.5")
      .to(subtitleRef.current, { 
        y: 0,
        opacity: 1,
        duration: 1,
      }, "-=1")
      if (decorationRef.current) {
        tl.to(decorationRef.current.querySelectorAll('.decoration-element'), {
        scale: 1,
        opacity: 1,
        rotation: 0,
        stagger: 0.1,
        duration: 1.2
      }, "-=1");
      }
      
      // Parallax effect on mouse move
      if (heroRef.current) {
        const handleMouseMove = (e: MouseEvent) => {
          const xValue = (e.clientX - window.innerWidth / 2) / 40;
          const yValue = (e.clientY - window.innerHeight / 2) / 40;
          
          if (decorationRef.current) {
            gsap.to(decorationRef.current.querySelectorAll('.decoration-element'), {
              x: xValue,
              y: yValue,
              duration: 1,
              ease: "power2.out"
            });
          }
          
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              x: xValue * 0.2,
              y: yValue * 0.2,
              duration: 1,
              ease: "power2.out"
            });
          }
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }
  }, [animated]);

  // Split title into individual spans for animation
  const titleSpans = title.split(' ').map((word, index) => (
    <span key={index} style={{ display: 'inline-block', marginRight: '0.5rem' }}>
      {word}
    </span>
  ));

  return (
    <Box
      ref={heroRef}
      sx={{
        position: 'relative',
        height,
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : (imagePath ? `url(${imagePath})` : 'none'),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: !imagePath ? alpha(primary, 0.03) : 'transparent',
      }}
    >
      {/* Background overlay with gradient */}
      <Box
        ref={overlayRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: (backgroundImage || imagePath) 
            ? `linear-gradient(135deg, ${alpha(primary, overlayOpacity)} 0%, ${alpha(secondary, overlayOpacity - 0.1)} 100%)`
            : `linear-gradient(135deg, ${alpha(primary, 0.02)} 0%, ${alpha(secondary, 0.05)} 100%)`,
          zIndex: 1,
        }}
      />
      
      {/* Decorative elements */}
      <Box
        ref={decorationRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {/* Circle decoration */}
        <Box
          className="decoration-element"
          sx={{
            position: 'absolute',
            top: '10%',
            right: '15%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: `2px solid ${alpha(accent, 0.3)}`,
            opacity: 0.7,
          }}
        />
        
        {/* Small accents */}
        <Box
          className="decoration-element"
          sx={{
            position: 'absolute',
            bottom: '25%',
            left: '10%',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: accent,
            boxShadow: `0 0 30px 5px ${alpha(accent, 0.5)}`,
          }}
        />
        
        <Box
          className="decoration-element"
          sx={{
            position: 'absolute',
            top: '30%',
            right: '25%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: secondary,
            boxShadow: `0 0 20px 3px ${alpha(secondary, 0.4)}`,
          }}
        />
        
        {/* Abstract lines */}
        <Box
          className="decoration-element"
          sx={{
            position: 'absolute',
            top: '40%',
            left: '5%',
            width: '150px',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${alpha(accent, 0.8)}, transparent)`,
            transform: 'rotate(30deg)',
          }}
        />
        
        <Box
          className="decoration-element"
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '200px',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${alpha(primary, 0.6)}, transparent)`,
            transform: 'rotate(-20deg)',
          }}
        />
      </Box>
      
      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
        <Typography
          ref={titleRef}
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: subtitle ? 2 : 0,
            color: imagePath ? 'white' : 'text.primary',
            textShadow: imagePath ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          {titleSpans}
        </Typography>
        
        {subtitle && (
          <Typography
            ref={subtitleRef}
            variant="h4"
            sx={{
              fontWeight: 400,
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.9,
              color: imagePath ? 'white' : 'text.secondary',
              fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.8rem' },
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default ImmersiveHero;
