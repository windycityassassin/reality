import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme, alpha, Container } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

gsap.registerPlugin(ScrollTrigger);

export interface GalleryItem {
  id: string | number;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  category?: string;
}

interface HorizontalScrollGalleryProps {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
}

const HorizontalScrollGallery: React.FC<HorizontalScrollGalleryProps> = ({
  items,
  title = 'Fighter Gallery',
  subtitle = 'Explore our top MMA fighters from around the world'
}) => {
  const theme = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleNext = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('.gallery-card')?.clientWidth || 0;
    const scrollAmount = cardWidth + 20; // card width + gap
    
    gsap.to(container, {
      scrollLeft: container.scrollLeft + scrollAmount,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handlePrev = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('.gallery-card')?.clientWidth || 0;
    const scrollAmount = cardWidth + 20; // card width + gap
    
    gsap.to(container, {
      scrollLeft: container.scrollLeft - scrollAmount,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleItemClick = (index: number) => {
    if (!isDragging) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (!galleryRef.current || !trackRef.current || !scrollContainerRef.current) return;

    // Animate gallery title and subtitle on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(
      galleryRef.current.querySelector('.gallery-title'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    
    tl.fromTo(
      galleryRef.current.querySelector('.gallery-subtitle'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.5"
    );

    tl.fromTo(
      galleryRef.current.querySelector('.gallery-controls'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );

    // Animate track indicator based on scroll position
    const updateTrackIndicator = () => {
      if (!scrollContainerRef.current || !trackRef.current) return;
      
      const container = scrollContainerRef.current;
      const totalScrollWidth = container.scrollWidth - container.clientWidth;
      const scrollProgress = container.scrollLeft / totalScrollWidth;
      
      gsap.to(trackRef.current.querySelector('.track-progress'), {
        width: `${scrollProgress * 100}%`,
        duration: 0.1
      });
    };

    scrollContainerRef.current.addEventListener('scroll', updateTrackIndicator);

    // Animate cards on load
    const cards = scrollContainerRef.current.querySelectorAll('.gallery-card');
    gsap.fromTo(
      cards,
      { 
        x: 100, 
        opacity: 0 
      },
      { 
        x: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "power2.out",
        delay: 0.5
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', updateTrackIndicator);
      }
    };
  }, [items]);

  return (
    <Box 
      ref={galleryRef} 
      sx={{ 
        py: 8,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: theme.palette.background.default
      }}
    >
      <Container maxWidth="xl" sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
          <Box>
            <Typography 
              variant="h2" 
              className="gallery-title"
              sx={{ 
                fontWeight: 800,
                mb: 1,
                opacity: 0
              }}
            >
              {title}
            </Typography>
            
            <Typography 
              variant="h5" 
              className="gallery-subtitle"
              sx={{ 
                fontWeight: 300,
                color: alpha(theme.palette.text.primary, 0.7),
                maxWidth: '60%',
                opacity: 0
              }}
            >
              {subtitle}
            </Typography>
          </Box>
          
          <Box 
            className="gallery-controls"
            sx={{ 
              display: 'flex', 
              gap: 2,
              opacity: 0 
            }}
          >
            <Button
              onClick={handlePrev}
              variant="outlined"
              sx={{
                minWidth: { xs: '40px', md: '60px' },
                height: { xs: '40px', md: '60px' },
                borderRadius: '50%',
                p: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              <ArrowBackIcon />
            </Button>
            
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                minWidth: { xs: '40px', md: '60px' },
                height: { xs: '40px', md: '60px' },
                borderRadius: '50%',
                p: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark
                }
              }}
            >
              <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Container>
      
      {/* Track indicator */}
      <Container maxWidth="xl">
        <Box 
          ref={trackRef}
          sx={{ 
            height: '3px', 
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: '2px',
            mb: 4,
            overflow: 'hidden'
          }}
        >
          <Box 
            className="track-progress"
            sx={{ 
              height: '100%', 
              width: '0%', 
              backgroundColor: theme.palette.primary.main,
              borderRadius: '2px'
            }} 
          />
        </Box>
      </Container>
      
      {/* Horizontal scrolling gallery */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          pl: { xs: 2, md: 4, lg: 8 },
          pr: { xs: 2, md: 4, lg: 8 },
          pb: 4,
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari, Opera
          msOverflowStyle: 'none', // IE, Edge
          scrollBehavior: 'smooth',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {items.map((item, index) => (
          <Box
            key={item.id}
            className="gallery-card"
            sx={{
              minWidth: { xs: '300px', md: '380px', lg: '440px' },
              height: { xs: '450px', md: '520px' },
              mr: { xs: 2, md: 3 },
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: activeIndex === index 
                ? `0 20px 50px ${alpha(theme.palette.primary.main, 0.3)}`
                : `0 10px 30px ${alpha(theme.palette.common.black, 0.1)}`,
              transition: 'all 0.4s ease',
              transform: activeIndex === index ? 'translateY(-20px) scale(1.02)' : 'none',
              cursor: isDragging ? 'grabbing' : 'pointer',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`
              }
            }}
            onClick={() => handleItemClick(index)}
          >
            {/* Card image */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '60%',
                  background: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.9)} 0%, transparent 100%)`,
                  zIndex: 1
                }
              }}
            />
            
            {/* Category tag */}
            {item.category && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  zIndex: 2,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.9),
                  color: theme.palette.common.white,
                  borderRadius: '20px',
                  padding: '5px 15px',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  boxShadow: `0 4px 10px ${alpha(theme.palette.common.black, 0.2)}`
                }}
              >
                {item.category}
              </Box>
            )}
            
            {/* Card content */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: 4,
                zIndex: 2,
                color: theme.palette.common.white
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                {item.title}
              </Typography>
              
              {item.subtitle && (
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    fontWeight: 300,
                    opacity: 0.9,
                    maxWidth: '90%'
                  }}
                >
                  {item.subtitle}
                </Typography>
              )}
              
              {item.link && (
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: `0 10px 20px ${alpha(theme.palette.secondary.main, 0.3)}`,
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 15px 25px ${alpha(theme.palette.secondary.main, 0.4)}`
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = item.link!;
                  }}
                >
                  View Profile
                </Button>
              )}
            </Box>
          </Box>
        ))}
        
        {/* Add spacer for better UX */}
        <Box sx={{ minWidth: { xs: '100px', md: '200px' } }} />
      </Box>
    </Box>
  );
};

export default HorizontalScrollGallery;
