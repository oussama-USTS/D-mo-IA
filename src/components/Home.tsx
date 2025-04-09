import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${props => props.isScrolled ? '1rem' : '1.5rem'} 2rem;
  background: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)<{ isScrolled: boolean }>`
  font-size: 1.8rem;
  font-weight: 300;
  color: ${props => props.isScrolled ? '#333' : 'white'};
  text-decoration: none;
  letter-spacing: 2px;
  font-family: 'Playfair Display', serif;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)<{ isScrolled: boolean }>`
  color: ${props => props.isScrolled ? '#333' : 'white'};
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;
  padding: 0.5rem 0;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: #a8c69f;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const SocialButton = styled.a<{ isScrolled: boolean }>`
  color: ${props => props.isScrolled ? '#333' : 'white'};
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #a8c69f;
  }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const HeroSection = styled.section`
  height: 90vh;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
              url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  padding: 1rem 2rem;
  background-color: #a8c69f;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8ab17d;
  }
`;

const AboutSection = styled.section`
  padding: 5rem 2rem;
  background-color: white;
  text-align: center;
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const LatestProjects = styled.section`
  padding: 5rem 2rem;
  background-color: #f9f9f9;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') no-repeat center center fixed;
  background-size: cover;
  color: white;
  text-align: center;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: 3px solid #a8c69f;
  }

  p {
    font-style: italic;
    margin: 1rem 0;
    line-height: 1.6;
  }

  h4 {
    color: #a8c69f;
    margin: 0;
  }
`;

const PricingSection = styled.section`
  padding: 5rem 2rem;
  background-color: white;
  text-align: center;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
`;

const PricingCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 2px solid #f0f0f0;

  &:hover {
    transform: translateY(-10px);
    border-color: #a8c69f;
  }

  h3 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .price {
    font-size: 2.5rem;
    color: #a8c69f;
    margin: 1rem 0;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    text-align: left;

    li {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;

      &:before {
        content: "✓";
        color: #a8c69f;
        position: absolute;
        left: 0;
      }
    }
  }
`;

const BookButton = styled.button`
  padding: 1rem 2rem;
  background-color: #a8c69f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: #8ab17d;
  }
`;

const Footer = styled.footer`
  background-color: #1a1a1a;
  color: white;
  padding: 5rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #a8c69f;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #a8c69f;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;

  a {
    color: white;
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: #a8c69f;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
`;

const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Mariage en Provence",
      description: "Une célébration intime dans les champs de lavande",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Portraits Urbains",
      description: "Série de portraits artistiques en milieu urbain",
      image: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Nature Sauvage",
      description: "Paysages spectaculaires des Alpes françaises",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marie & Pierre",
      role: "Mariés en 2023",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Sarah a capturé les moments les plus précieux de notre mariage avec une sensibilité extraordinaire. Chaque photo raconte une histoire."
    },
    {
      id: 2,
      name: "Thomas Laurent",
      role: "Séance Portrait",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Une expérience photo exceptionnelle ! Sarah sait mettre à l'aise et capturer la personnalité de chacun."
    },
    {
      id: 3,
      name: "Sophie Martin",
      role: "Événement d'entreprise",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      text: "Professionnalisme et créativité au rendez-vous. Les photos de notre événement ont dépassé nos attentes."
    }
  ];

  const pricingPlans = [
    {
      id: 1,
      title: "Portrait Individuel",
      price: "150€",
      features: [
        "Séance d'1 heure",
        "10 photos retouchées",
        "Galerie privée en ligne",
        "Livraison sous 7 jours",
        "Format haute résolution"
      ]
    },
    {
      id: 2,
      title: "Mariage Essentiel",
      price: "1500€",
      features: [
        "Couverture de 8 heures",
        "300+ photos retouchées",
        "Album photo premium",
        "Galerie privée en ligne",
        "2 photographes"
      ]
    },
    {
      id: 3,
      title: "Événement Pro",
      price: "800€",
      features: [
        "Couverture de 4 heures",
        "150+ photos retouchées",
        "Livraison express 48h",
        "Droits commerciaux inclus",
        "Format web optimisé"
      ]
    }
  ];

  return (
    <>
      <Header isScrolled={isScrolled}>
        <Logo to="/" isScrolled={isScrolled}>Sarah Martin</Logo>
        <Nav>
          <NavLink to="/" isScrolled={isScrolled}>Accueil</NavLink>
          <NavLink to="/gallery" isScrolled={isScrolled}>Galerie</NavLink>
          <NavLink to="/about" isScrolled={isScrolled}>À Propos</NavLink>
          <NavLink to="/contact" isScrolled={isScrolled}>Contact</NavLink>
          <SocialButton href="https://instagram.com" target="_blank" isScrolled={isScrolled}>
            <i className="fab fa-instagram"></i>
          </SocialButton>
        </Nav>
      </Header>

      <HomeContainer>
        <HeroSection>
          <Title>Sarah Martin</Title>
          <Subtitle>Photographe Professionnelle</Subtitle>
          <Button to="/gallery">Découvrir mes œuvres</Button>
        </HeroSection>

        <AboutSection>
          <AboutContent>
            <h2>À Propos</h2>
            <p>
              Passionnée par la photographie depuis plus de 10 ans, je capture les moments précieux 
              de la vie avec une approche artistique unique. Spécialisée dans les portraits, 
              les mariages et les paysages, je m'efforce de créer des images qui racontent 
              des histoires et évoquent des émotions.
            </p>
          </AboutContent>
        </AboutSection>

        <LatestProjects>
          <h2>Derniers Projets</h2>
          <ProjectsGrid>
            {projects.map((project) => (
              <ProjectCard key={project.id}>
                <ProjectImage 
                  src={project.image}
                  alt={project.title}
                />
                <ProjectInfo>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </ProjectInfo>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </LatestProjects>

        <TestimonialsSection>
          <h2>Ce Que Disent Mes Clients</h2>
          <TestimonialGrid>
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id}>
                <img src={testimonial.image} alt={testimonial.name} />
                <p>"{testimonial.text}"</p>
                <h4>{testimonial.name}</h4>
                <small>{testimonial.role}</small>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </TestimonialsSection>

        <PricingSection>
          <h2>Mes Forfaits</h2>
          <p>Des solutions adaptées à vos besoins</p>
          <PricingGrid>
            {pricingPlans.map(plan => (
              <PricingCard key={plan.id}>
                <h3>{plan.title}</h3>
                <div className="price">{plan.price}</div>
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <BookButton>Réserver</BookButton>
              </PricingCard>
            ))}
          </PricingGrid>
        </PricingSection>
      </HomeContainer>

      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>À Propos de Moi</h3>
            <p>Photographe passionnée capturant les moments précieux de la vie. Basée à Paris et disponible pour des projets dans toute la France.</p>
            <SocialLinks>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-pinterest"></i>
              </a>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact</h3>
            <ul>
              <li><i className="fas fa-phone"></i> +33 6 12 34 56 78</li>
              <li><i className="fas fa-envelope"></i> contact@sarahmartin.com</li>
              <li><i className="fas fa-map-marker-alt"></i> Paris, France</li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Liens Rapides</h3>
            <ul>
              <li><Link to="/gallery">Galerie</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/pricing">Tarifs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </FooterSection>
        </FooterContent>
        <Copyright>
          © {new Date().getFullYear()} Sarah Martin Photography. Tous droits réservés.
        </Copyright>
      </Footer>
    </>
  );
};

export default Home; 