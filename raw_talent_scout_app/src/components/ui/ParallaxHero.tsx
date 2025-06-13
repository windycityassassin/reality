import React, { useRef, useEffect } from 'react';
import { Box, Typography, Container, Button, useTheme, alpha } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxHeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaAction?: () => void;
  backgroundImage?: string;
  layers?: {
    image: string;
    depth: number;
    position?: 'left' | 'right' | 'center' | 'top' | 'bottom';
  }[];
}

const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  title,
  subtitle,
  ctaText = 'Explore',
  ctaAction,
  backgroundImage = 'https://source.unsplash.com/featured/?mma,octagon',
  layers = []
}) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Default parallax layers if none provided
  const defaultLayers = [
    {
      image: 'https://source.unsplash.com/featured/?mma,fighter',
      depth: 0.2,
      position: 'right' as const
    },
    {
      image: 'https://source.unsplash.com/featured/?boxing,gloves',
      depth: 0.4,
      position: 'left' as const
    },
    {
      image: 'https://source.unsplash.com/featured/?championship,belt',
      depth: 0.6,
      position: 'bottom' as const
    }
  ];

  const parallaxLayers = layers.length > 0 ? layers : defaultLayers;

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="char"
        style={{ 
          display: 'inline-block',
          opacity: 0,
          transform: 'translateY(100%)'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize animations
    const tl = gsap.timeline();
    
    // Animate background
    tl.fromTo(
      containerRef.current.querySelector('.background-image'),
      { scale: 1.2 },
      { scale: 1, duration: 2, ease: "power2.out" }
    );
    
    // Animate title characters
    if (titleRef.current) {
      tl.to(
        titleRef.current.querySelectorAll('.char'),
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 1,
          ease: "power3.out"
        },
        "-=1.5"
      );
    }
    
    // Animate subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
    }
    
    // Animate CTA button
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }
    
    // Create parallax effect on scroll
    layersRef.current.forEach((layer, index) => {
      if (!layer) return;
      
      // Parallax scroll effect
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const depth = parallaxLayers[index].depth;
          const yTranslation = self.progress * 100 * depth;
          gsap.to(layer, {
            y: yTranslation,
            ease: "none",
            duration: 0.5
          });
        }
      });
    });

    // Parallax mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        
        const depth = parallaxLayers[index].depth * 30;
        gsap.to(layer, {
          x: mouseX * depth,
          y: mouseY * depth,
          duration: 1,
          ease: "power2.out"
        });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [parallaxLayers]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background image */}
      <Box
        className="background-image"
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
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.85)} 0%, ${alpha(theme.palette.primary.main, 0.5)} 100%)`,
            zIndex: 1
          }
        }}
      />

      {/* Parallax layers */}
      {parallaxLayers.map((layer, index) => (
        <Box
          key={index}
          ref={(el: HTMLDivElement | null) => layersRef.current[index] = el}
          sx={{
            position: 'absolute',
            zIndex: 2,
            ...(layer.position === 'left' && {
              left: { xs: '-10%', md: '5%' },
              top: '50%',
              transform: 'translateY(-50%)'
            }),
            ...(layer.position === 'right' && {
              right: { xs: '-10%', md: '5%' },
              top: '50%',
              transform: 'translateY(-50%)'
            }),
            ...(layer.position === 'top' && {
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)'
            }),
            ...(layer.position === 'bottom' && {
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)'
            }),
            ...(layer.position === 'center' && {
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            })
          }}
        >
          <Box
            sx={{
              width: { xs: '150px', md: '300px' },
              height: { xs: '150px', md: '300px' },
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: `0 20px 80px ${alpha(theme.palette.common.black, 0.3)}`,
              opacity: 0.9
            }}
          >
            <img 
              src={layer.image} 
              alt="Parallax Layer" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover'
              }}
            />
          </Box>
        </Box>
      ))}

      {/* Hero content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <Box ref={titleRef} sx={{ mb: 2 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 800,
                color: theme.palette.common.white,
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem' },
                lineHeight: 1.1,
                textShadow: '0 5px 30px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em'
              }}
            >
              {splitText(title)}
            </Typography>
          </Box>
          
          {subtitle && (
            <Box ref={subtitleRef}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 300,
                  color: alpha(theme.palette.common.white, 0.9),
                  maxWidth: '800px',
                  margin: '0 auto',
                  mb: 4
                }}
              >
                {subtitle}
              </Typography>
            </Box>
          )}
          
          {ctaText && (
            <Box ref={ctaRef}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={ctaAction}
                sx={{
                  borderRadius: '50px',
                  padding: '12px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: `0 10px 30px ${alpha(theme.palette.secondary.main, 0.4)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 15px 30px ${alpha(theme.palette.secondary.main, 0.6)}`
                  }
                }}
              >
                {ctaText}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      
      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 3
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: alpha(theme.palette.common.white, 0.6),
            letterSpacing: '0.2em',
            fontSize: '0.7rem',
            mb: 1
          }}
        >
          SCROLL DOWN
        </Typography>
        <Box
          sx={{
            width: '30px',
            height: '50px',
            border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
            borderRadius: '15px',
            display: 'flex',
            justifyContent: 'center',
            padding: '5px 0'
          }}
        >
          <Box
            sx={{
              width: '6px',
              height: '10px',
              backgroundColor: theme.palette.common.white,
              borderRadius: '3px',
              opacity: 0.6,
              animation: 'scrollDown 1.5s infinite',
              '@keyframes scrollDown': {
                '0%': {
                  transform: 'translateY(0)',
                  opacity: 0.6
                },
                '50%': {
                  transform: 'translateY(15px)',
                  opacity: 0.3
                },
                '100%': {
                  transform: 'translateY(0)',
                  opacity: 0.6
                }
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ParallaxHero;
