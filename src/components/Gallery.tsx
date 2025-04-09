import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ImageType {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
  height: string;
}

interface GalleryItemProps {
  height?: string;
}

interface FilterButtonProps {
  active: boolean;
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-family: 'Playfair Display', serif;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #2c3e50;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }

  svg {
    font-size: 1.1rem;
  }
`;

const GalleryContainer = styled.div`
  padding: 2rem;
  margin-top: 80px;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  min-height: 100vh;
`;

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-family: 'Playfair Display', serif;
  }
  
  p {
    color: #6c757d;
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const GalleryItem = styled(motion.div)<GalleryItemProps>`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: ${props => props.height || '400px'};
  background: #fff;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const GalleryOverlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: white;
  z-index: 2;
  transform: translateY(100%);
  transition: transform 0.3s ease;

  ${GalleryItem}:hover & {
    transform: translateY(0);
  }

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-family: 'Playfair Display', serif;
  }

  p {
    margin: 0;
    font-size: 1rem;
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<FilterButtonProps>`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 30px;
  background-color: ${props => props.active ? '#2c3e50' : 'white'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.active ? '#2c3e50' : '#f8f9fa'};
  }
`;

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredImages, setFilteredImages] = useState<ImageType[]>([]);

  const filters = [
    { id: 'all', label: 'Tous', icon: '🎨' },
    { id: 'wedding', label: 'Mariages', icon: '💑' },
    { id: 'portrait', label: 'Portraits', icon: '👤' },
    { id: 'landscape', label: 'Paysages', icon: '🏔️' },
    { id: 'event', label: 'Événements', icon: '🎉' }
  ];

  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a',
      title: 'Mariage en Provence',
      category: 'wedding',
      description: 'Une célébration intime dans les champs de lavande',
      height: '500px'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b',
      title: 'Portrait Urbain',
      category: 'portrait',
      description: 'Séance photo dans les rues de Paris',
      height: '400px'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      title: 'Alpes Françaises',
      category: 'landscape',
      description: 'Coucher de soleil sur les montagnes',
      height: '600px'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      title: 'Gala de Charité',
      category: 'event',
      description: 'Soirée de gala au profit des enfants',
      height: '450px'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
      title: 'Portrait Nature',
      category: 'portrait',
      description: 'Séance photo en extérieur',
      height: '550px'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97',
      title: 'Mariage Élégant',
      category: 'wedding',
      description: 'Cérémonie au château',
      height: '500px'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      title: 'Mariage sur la Plage',
      category: 'wedding',
      description: 'Cérémonie au coucher du soleil',
      height: '450px'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4',
      title: 'Paysage Montagneux',
      category: 'landscape',
      description: 'Vue panoramique des Alpes',
      height: '500px'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad',
      title: 'Portrait Artistique',
      category: 'portrait',
      description: 'Portrait en studio noir et blanc',
      height: '600px'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
      title: 'Festival de Musique',
      category: 'event',
      description: 'Concert en plein air',
      height: '450px'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      title: 'Lever de Soleil',
      category: 'landscape',
      description: 'Paysage matinal dans les Pyrénées',
      height: '550px'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
      title: 'Gala de Mode',
      category: 'event',
      description: 'Défilé de haute couture',
      height: '500px'
    }
  ];

  useEffect(() => {
    const filtered = activeFilter === 'all'
      ? images
      : images.filter(img => img.category === activeFilter);
    setFilteredImages(filtered);
  }, [activeFilter]);

  return (
    <>
      <Nav>
        <Logo to="/">PhotoPro</Logo>
        <NavLinks>
          <NavLink to="/">
            <FontAwesomeIcon icon="home" /> Accueil
          </NavLink>
          <NavLink to="/gallery">
            <FontAwesomeIcon icon="images" /> Galerie
          </NavLink>
        </NavLinks>
      </Nav>
      <GalleryContainer>
        <GalleryHeader>
          <h1>Ma Galerie</h1>
          <p>Découvrez mes meilleures œuvres à travers différentes catégories</p>
        </GalleryHeader>

        <FilterContainer>
          {filters.map(filter => (
            <FilterButton
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.icon} {filter.label}
            </FilterButton>
          ))}
        </FilterContainer>

        <GalleryGrid
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence>
            {filteredImages.map(image => (
              <GalleryItem
                key={image.id}
                height={image.height}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={`${image.src}?auto=format&fit=crop&w=800&q=80`} 
                  alt={image.title}
                  loading="lazy"
                />
                <GalleryOverlay
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </GalleryOverlay>
              </GalleryItem>
            ))}
          </AnimatePresence>
        </GalleryGrid>
      </GalleryContainer>
    </>
  );
};

export default Gallery; 