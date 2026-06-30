import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowLeft, Instagram, Mail, MessageSquare, ExternalLink, ChevronRight, Video, Camera, Hash, Palette } from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const PROJECTS: Project[] = [
  { id: 1, title: 'Viral YouTube Thumbnails', category: 'Graphic Design', description: 'High-CTR thumbnail designs for major tech and lifestyle creators.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRdPLjQIGvK4SjYGfJJXoSvkUZhRo6NImpiLxZBuQ7WDy87QKce6j0EqjpR9Ot5XAZWVEohuT44zpHYi2cf87fzo7I0XmYWcpmyJyDkhXFwgrbWCbh5FS63QO8WI7UjXDnYGDM_4fGVJxcZU7AhkbHf8hyEGBVSQExi3oBGyhrhZXGZlU-tg6ZbAlN6ec/s1280/1000192667.png' },
  { id: 6, title: 'Premium Studio Brochure', category: 'Graphic Design', description: 'Elegant editorial layouts for architecture and design firms.', image: 'https://i.ibb.co/vxy6FPRp/heinekenposter.jpg' },
  { id: 7, title: 'High-Conversion Advertisements', category: 'Graphic Design', description: 'Strategic ad creatives for regional digital marketing campaigns.', image: 'https://i.ibb.co/JF5HTyc3/Premium-Textile-Impact-Influencer-Ad-Suite.png' },
  { id: 8, title: 'Business Card & Identity', category: 'Branding', description: 'Minimalist and textured corporate identity for luxury studios.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh54pkKdOmeEhxefFYZgA16Ke6qzCRhqS8fOmOKw3IZ4FUL1coDB-CRdV37QZvSZr4cgLEJpndgTDqP4QQ05LGiA9bI3XCvN_aqLbDCquYD58VbHwWdgCasc6qDKkR1K0qCPRJqBBvpT-Ii2CBkMEEER-zRgq1SB2_KlMCQVe6AntDSvmFVyes_mnbkmtE/s1050/1.png' },
  { id: 9, title: 'Urban Video Highlights', category: 'Video Editing', description: 'Fast-paced cinematic editing for urban exploration and streetwear.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi0YhfCLw50LfsnrZpXoKdYMKpjOoUgfgAve-IjWVSfOhi1D-nUmk4xcppBzwAxrMg3UXNTkHB_DIN1hEMbv4De7XAtPnlwfhANwrusfB_EJ6qxzaddhPgZh0l5vmYDTNqsTcaobysSb3lkTDReFDWOYl8eohZyQOuSSuszzrvi8K_-9Cs0U7pb79RZSk4/s6000/pexels-griffinw-5309164.jpg' },
  { id: 10, title: 'Tech Review Thumbnail Designs', category: 'Social Media', description: 'High-contrast, high-CTR YouTube thumbnail design for tech reviews.', image: 'https://blogger.googleusercontent.com/img/a/AVvXsEinU-Tf9rvVBUnPEtSluceTsAnTz5-kKcYJHT0xhh0NLa2Be8NhwpM0k750r09q3YZaHsTscT5at4bwUIPiVvdGc-dY-0FzQlvzJvO4nst6oJgYQN8kWi2z_gyQ5FbpWVOMJRmVib8oiEZHsA7ovbryTpIlSKO_dgAXyCYj5toxkPm6uDUOpVEjPOz2U98' },
  { id: 11, title: 'Product Ad Creatives', category: 'Social Media', description: 'Strategic Instagram ad creatives for high-conversion product launches.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_YcMImmBymO_XpGUndgXCPrPY9kc6_LYNNEN9ozj1EVmjTO9ePwoY7fEddCkgeBFaAgYlm0Sfn-mZjvpxGchltjV22kxeGCinllJbv35Nr8cXl_ubBVR-E_cDadeK8Eo-v5tvZAnZV4Os5QHK-Ged4FtbosJxcV6zdjlZhNNBfHb2zZ6VsBni78qJA3s/s1376/Cinematic%2016_9%20Pinterest-style%20premium%20advertisement%20for%20digital%20product%20brand.%20Cream,%20brown,%20and%20gold%20color%20palette.%20Left%20side_%20bold%20modern%20sans-serif%20headline%20_Your%20Content%20Deserves%20Premium%20Design_%20with%20elegant%20.jpg' },
  { id: 12, title: 'Elite Story Templates', category: 'Social Media', description: 'Modern, minimalist story templates for luxury brand engagement.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisuGzrdf3U88902J1VE5LAkkSMNTYqBYz9qK5jx7Ka9yKmW2dNtj4nBc5ed2gnfRQi_bS162ERYiB1LKNo6sFVqZK3Woub4Umu85qQqz2XCiVxZbdDdYy09vuoFObiYoaoGfs_sb7IpGDf5zCIRyxntAIPvCTpT8aWiPQjpuMBhIlLEkamkRAaLdkeU58/s1920/unflower.png' },
  { id: 14, title: 'Carousel Layouts for Posts', category: 'Social Media', description: 'Multi-slide carousel layouts for educational and informative content.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWWVg-FthRQv0WvN9fMRhH4ZBKAkPubhYgh_p2-kLnlgQkPrR6bfEJ4hPlOeRYfPcL1nHmYGj0km3bYNq6nUYkaYCKaemmPpgXxpAe9pKpmJeKSqlgsflNyUr67KHIY4iLafPpoi1aeURevw8RuGu39r2j4DPeeata3UG_hZ0ACLCM2q5H0fVZPoKPqFg/s4320/carousel%20layouts%20for%20posts.png' },
  { id: 15, title: 'E-commerce Promotional Banners', category: 'Social Media', description: 'Eye-catching promotional banners for sales and seasonal offers.', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800' },
  { id: 16, title: 'Luxury Brand Posts', category: 'Social Media', description: 'Cohesive and elegant brand announcement posts for high-end labels.', image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800' },
  { id: 17, title: 'Gaming Highlights Thumbnail Designs', category: 'Social Media', description: 'Explosive, high-energy gaming thumbnails optimized for search and viral potential.', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800' },
  { id: 18, title: 'Streetwear Brand Posts Series', category: 'Social Media', description: 'Urban aesthetic social media series for a major streetwear drop.', image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&q=80&w=800' },
  { id: 19, title: 'Podcast Cover Thumbnail Designs', category: 'Social Media', description: 'Clean and authoritative cover designs for tech and business podcasts.', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800' },
  { id: 20, title: 'Startup Launch Brand Posts', category: 'Social Media', description: 'Professional and minimalist brand posts announcing a seed funding round.', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800' },
  { id: 13, title: 'Professional Portrait Retouching', category: 'Photo Editing', description: 'Advanced skin retouching, frequency separation, and facial feature enhancement for high-end fashion photography.', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800' },
  { id: 22, title: 'Cinematic Color Grading', category: 'Photo Editing', description: 'Atmospheric color grading and moody palette development for architectural and street photography.', image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=800' },
  { id: 23, title: 'Luxury Watch Product Editing', category: 'Photo Editing', description: 'Surfacing cleanup, reflection management, and composite lighting for high-end product catalogs.', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800' },
  { id: 24, title: 'Surreal Composition Art', category: 'Photo Editing', description: 'Dreamlike photo manipulations combining multiple exposures and custom atmospheric effects.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800' },
  { id: 25, title: 'Beauty Skin Retouching Suite', category: 'Photo Editing', description: 'Advanced frequency separation and texture preservation for high-end beauty shoots.', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800' },
  { id: 26, title: 'Summer Teal & Orange Color Grade', category: 'Photo Editing', description: 'Vibrant cinematic color adjustment for outdoor lifestyle and travel content.', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800' },
  { id: 27, title: 'Sneaker Product Enhancement', category: 'Photo Editing', description: 'Dynamic lighting adjustments and material texture popping for footwear marketing.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
  { id: 28, title: 'Double Exposure Photo Manipulation', category: 'Photo Editing', description: 'Creative blending of portraits and nature imagery for artistic conceptual series.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800' },
  { id: 29, title: 'Linear / Basic Editing', category: 'Video Editing', description: 'Clean and structured basic video assembly with smooth pacing and narrative flow.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800' },
  { id: 30, title: 'Cinematic Color Grading', category: 'Video Editing', description: 'Professional color correction and cinematic grading to enhance mood and visual depth.', image: 'https://media.istockphoto.com/id/2176279182/photo/silhouette-of-electrician-officer-climbs-a-pole-and-uses-a-cable-car-to-maintain-a-high.jpg?s=612x612&w=0&k=20&c=nziHlnz8xEHQT9tR7h8Ce7gdZ6jw5Y1-I5hFSAAU5gg=' },
  { id: 31, title: 'Reels Editing', category: 'Video Editing', description: 'High-energy, fast-paced transitions and sync-to-beat editing for engaging short-form content.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjawEe9mX3-BMA_GnAIrhcQ0zFpoVMmV5YldgVkEzGB8_NX9ZaxS9YpWy9vghQcKudOZN2uKraHmzECpktDB_EFd1W_ndE0b_o0hQUJm-8OrCRJvM3iIOTHWi-Tp9neTcZ3l_dwQHv3s554ebid8P_8M8WROX5tb6QWskzbH-fbZ3cHNXDb9nGKyvY5SPA/s3840/pexels-exeroniq-36444162.jpg' },
  { id: 32, title: 'Wedding & Events Editing', category: 'Video Editing', description: 'Emotional storytelling and elegant highlights for weddings and high-profile live events.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-1o5xfW3BIZvr_waExWRDMA-mQ52mg9dt-tvgOVql6hI5xepBwpt-0DI05iDP4XfM9BtKeMwg8vhzCLf9QH6Asm9_g66sObMFxz2R8xXLke-Y0jYyqmU1ZYXVlTnVZVtRtoI4V_5uXPBZraIELq9fE8Kj3J0l6YMIuNkwgnhkb6IfYVMhAn65rhOYbQo/s5736/pexels-alexfu-1188751.jpg' },
  { id: 33, title: 'YouTube / Social Media Editing', category: 'Video Editing', description: 'Dynamic multi-camera editing optimized for viewer retention and platform engagement.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmtXC8YnIQRx5TAnylrETlCVte0qvmiEDktXBO5Y4ku8zI6WRNGJ_r_PJJsxI5-vd9Ane3iEzHXVwujpVCqdivelNLAiZtmfnn7i_IHaZaKsP4VAbOnLsMWFZReGKANzqqHZAuTgvuz2I9nJ37QAHf6pTgNAp6azb6der2YlNaUVPhS1XVWxv1nlcUblM/s7688/pexels-muhammed-cetinkaya-470437330-17115910.jpg' },
  { id: 34, title: 'Commercial / Ad Editing', category: 'Video Editing', description: 'Impactful sales-driven video ads with custom call-to-actions and motion graphics.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEif-6HAzDcBRnDgBF0lgZHgI2H6depyPVxchvxhOkTH54FtFyJU_e_isM_nmKzxSufbEp_rlIvdv-IHauxNL3r5ZQL3B1PBUpqchlWljzYAJSNGSfQRoteEqC8t-jfTyI4TaF2L9wrT0rvZNSD-zXZ86_Uf_k8BVBYiwXOt1MTfTX-7d4yGEx0zpzBTb2c/s5892/pexels-mart-production-7679440.jpg' },
];

const SKILLS = [
  { name: 'Adobe Photoshop', level: 95 },
  { name: 'Adobe Illustrator', level: 90 },
  { name: 'Premiere Pro', level: 90 },
  { name: 'After Effects', level: 85 },
  { name: 'Lightroom', level: 92 },
  { name: 'Canva', level: 90 },
  { name: 'CapCut', level: 85 },
  { name: 'Social Strategy', level: 88 },
];

const SERVICES = [
  { title: 'Graphic Design', icon: Palette, description: 'Brand identities, professional layouts, and strategic visual assets.', features: ['Logo Design', 'Brand Identity', 'Poster & Banner Design', 'Brochure Layouts', 'Advertisement Creatives', 'Business Cards'] },
  { title: 'Video Editing', icon: Video, description: 'High-energy reels, cinematic highlights, and YouTube production.', features: ['Linear / Basic Editing', 'Cinematic Color Grading', 'Reels Editing', 'Wedding & Events Editing', 'YouTube / Social Media Editing', 'Commercial / Ad Editing'] },
  { title: 'Photo Editing', icon: Camera, description: 'Creative retouching, color grading, and professional image manipulation.', features: ['Retouching (Enhancement)', 'Color Grading', 'Product Photo Editing', 'Composition / Photo Manipulation'] },
  { title: 'Social Media', icon: Hash, description: 'Viral strategy and high-impact assets to dominate digital platforms.', features: ['Thumbnail Designs', 'Ad Creatives', 'Story Templates', 'Carousel Layouts for Posts', 'Promotional Banners', 'Brand Posts'] },
];

const TIMELINE = [
  { year: '2021', event: 'Started creative journey as a freelance editor' },
  { year: '2022', event: 'Secured first major agency partnership' },
  { year: '2023', event: 'Expanded into professional photo editing & branding' },
  { year: '2024', event: 'Launched independent creative studio' },
  { year: '2026', event: 'Professional portfolio launch & regional client expansion' },
];

// --- Components ---

interface CategoryDetailProps {
  key?: string | number;
  category: string;
  onBack: () => void;
  setSelectedProject: (p: Project) => void;
}

const CategoryDetail = ({ category, onBack, setSelectedProject }: CategoryDetailProps) => {
  const [activeSubFilter, setActiveSubFilter] = useState('All');
  
  const categoryProjects = category === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === category || (category === 'Graphic Design' && p.category === 'Branding'));

  const filteredProjects = activeSubFilter === 'All'
    ? categoryProjects
    : categoryProjects.filter(p => p.title.toLowerCase().includes(activeSubFilter.toLowerCase()) || p.description.toLowerCase().includes(activeSubFilter.toLowerCase()));

  const features = SERVICES.find(s => s.title === category)?.features;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[60] bg-beige overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-24">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-heading text-xs font-black uppercase tracking-widest mb-12 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="mb-16">
          <span className="font-heading text-xs font-black tracking-widest text-gold uppercase mb-4 block underline decoration-gold underline-offset-8">Portfolio</span>
          <h2 className="text-6xl md:text-8xl font-display leading-none mb-4">{category}</h2>
          <p className="text-soft-gray font-bold uppercase tracking-widest max-w-xl mb-12">
            A deep dive into my {category.toLowerCase()} projects, focusing on high-impact visual storytelling and technical precision.
          </p>

          {features && (
            <div className="space-y-8">
              <h4 className="font-heading text-[10px] font-black uppercase tracking-[0.4em] text-gold/60">Service Focus</h4>
              <div className="flex flex-wrap gap-4 max-w-4xl">
                <button 
                  onClick={() => setActiveSubFilter('All')}
                  className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${activeSubFilter === 'All' ? 'bg-charcoal text-white border-charcoal' : 'text-charcoal border-charcoal/10 hover:border-gold'}`}
                >
                  All Projects
                </button>
                {features.map((feature) => (
                  <button 
                    key={feature} 
                    onClick={() => setActiveSubFilter(feature)}
                    className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${activeSubFilter === feature ? 'bg-gold text-charcoal border-gold' : 'text-charcoal border-charcoal/10 hover:border-gold'}`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[400px]">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] bg-charcoal overflow-hidden mb-6 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 p-4 rounded-full">
                      <ExternalLink className="text-charcoal w-6 h-6" />
                    </div>
                  </div>
                </div>
                <span className="text-gold font-bold uppercase text-[10px] tracking-tighter mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-display mb-4">{project.title}</h3>
                <p className="text-soft-gray text-sm leading-relaxed mb-6">{project.description}</p>
                <div className="w-12 h-px bg-charcoal/20"></div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 bg-charcoal/5 rounded-full flex items-center justify-center mb-6">
                <Hash className="text-charcoal/20 w-8 h-8" />
              </div>
              <h4 className="text-xl font-display mb-2">More projects coming soon</h4>
              <p className="text-soft-gray text-sm max-w-xs">I'm currently updating my portfolio with recent {activeSubFilter} works.</p>
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-24 p-12 bg-charcoal text-white text-center">
          <h3 className="text-4xl font-display mb-6">Inspired by these visuals?</h3>
          <p className="text-soft-gray mb-8">Let's collaborate on your next project and create something legendary.</p>
          <button 
            onClick={() => { onBack(); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 300); }}
            className="bg-gold text-charcoal px-10 py-5 font-heading font-black uppercase tracking-widest hover:bg-white transition-all"
          >
            Start a Project
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = ({ onNavigateHome }: { onNavigateHome: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-beige/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); onNavigateHome(); window.scrollTo(0,0); }}
          className="text-2xl font-display font-bold tracking-tighter hover:text-gold transition-colors"
        >
          GAURAV <span className="text-gold">DIXIT.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => onNavigateHome()}
              className="font-heading text-sm font-semibold uppercase tracking-widest hover:text-gold transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-beige border-b border-charcoal/10 flex flex-col items-center py-8 gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                onNavigateHome();
                const target = document.querySelector(link.href);
                if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="font-heading text-lg font-bold uppercase tracking-widest hover:text-gold"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-charcoal pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.ibb.co/5N5YccQ/one-step.png"
          alt="Hero Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-left">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[2px] bg-gold"></div>
            <span className="font-heading text-sm font-bold tracking-[0.4em] text-gold uppercase">Creative Professional</span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-heading font-black leading-[0.8] mb-12 text-white">
            Design That <br />
            <span className="font-serif italic text-gold font-normal lowercase pr-4">Speaks</span> <br />
            Volumes
          </h1>

          <p className="max-w-xl text-soft-gray font-medium text-lg md:text-xl mb-12">
            Graphic design, video editing & photo retouching — crafted with intention to make your brand unforgettable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#work" className="bg-gold text-charcoal px-10 py-5 rounded-none font-heading font-bold uppercase tracking-widest hover:bg-white transition-all duration-300">
              View Work
            </a>
            <a href="#contact" className="border-2 border-white text-white px-10 py-5 rounded-none font-heading font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-300">
              Hire Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-beige relative overflow-hidden">
              <img
                src="https://i.ibb.co/5N5YccQ/one-step.png"
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold hidden md:flex items-center justify-center p-8 text-center text-white">
              <span className="font-display text-4xl leading-tight">5+ YEARS EXP.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-heading text-xs font-black tracking-widest text-gold uppercase mb-4 block underline decoration-gold underline-offset-8">Gaurav Dixit</span>
            <h2 className="text-5xl md:text-6xl font-display mb-8">Passionate about <br/>visual storytelling.</h2>
            <div className="space-y-6 text-soft-gray text-lg leading-relaxed">
              <p>
                I thrive at the intersection of streetwear culture and professional creative agency standards. My journey started with a fascination for urban aesthetics and evolved into a full-scale obsession with visual impact.
              </p>
              <p>
                Whether it's crafting a brand identity from scratch or editing high-energy reels, I've spent over 5 years shaping visuals through video editing and photo retouching. Graphic design entered my workflow naturally from there — and in the past year, it's become a core part of what I offer.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h4 className="text-charcoal font-heading font-black text-4xl">50+</h4>
                  <p className="text-sm font-bold uppercase tracking-wider">HAPPY CLIENTS</p>
                </div>
                <div>
                  <h4 className="text-charcoal font-heading font-black text-4xl">200+</h4>
                  <p className="text-sm font-bold uppercase tracking-wider">Projects Delivered</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ onSelectCategory }: { onSelectCategory: (cat: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Graphic Design', 'Video Editing', 'Photo Editing', 'Social Media', 'Branding'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS.slice(0, 6) // Curated selection for the front page
    : PROJECTS.filter(p => p.category === activeCategory || (activeCategory === 'Graphic Design' && p.category === 'Branding'));

  return (
    <section id="work" className="py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl font-display leading-none mb-4">SELECTED<br/>WORKS</h2>
            <p className="text-soft-gray font-bold uppercase tracking-widest">Case studies of creative impact</p>
          </div>
          <div className="flex flex-wrap gap-4 overflow-x-auto pb-4 max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 font-heading text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-charcoal text-white' : 'hover:text-gold'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
           layout
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => onSelectCategory(project.category)}
                className="group relative overflow-hidden bg-white cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end text-left">
                  <span className="text-gold font-bold uppercase text-xs tracking-tighter mb-2">{project.category}</span>
                  <h3 className="text-white text-3xl font-display mb-4">{project.title}</h3>
                  <button className="flex items-center gap-2 text-white font-heading text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors">
                    View Project <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {activeCategory !== 'All' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <button 
              onClick={() => onSelectCategory(activeCategory)}
              className="font-heading text-sm font-black uppercase tracking-[0.3em] text-charcoal hover:text-gold transition-colors inline-flex items-center gap-4"
            >
              View All {activeCategory} Projects <ChevronRight />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-charcoal text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-6xl font-display mb-6">THE<br/>ARSENAL</h2>
            <p className="text-soft-gray mb-12">I use the industry's most powerful tools to bring your creative vision to life with precision and speed.</p>
            <div className="flex flex-wrap gap-4">
              {['Creative', 'Strategic', 'Quality Delivery', 'Data-Driven'].map(tag => (
                <span key={tag} className="px-4 py-2 border border-white/20 font-heading text-[10px] font-bold uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-end mb-4">
                  <span className="font-heading font-black uppercase tracking-widest text-sm">{skill.name}</span>
                  <span className="font-display text-2xl text-gold">{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/10 w-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full bg-gold"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = ({ onSelectCategory }: { onSelectCategory: (cat: string) => void }) => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-display mb-4">SERVICES</h2>
          <p className="text-soft-gray font-bold uppercase tracking-[0.3em] inline-block pb-2 border-b-2 border-gold">Tailored Creative Solutions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/10 border border-charcoal/10">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onSelectCategory(service.title)}
              className="bg-white p-10 hover:bg-beige transition-colors group cursor-pointer flex flex-col h-full"
            >
              <service.icon className="w-12 h-12 mb-8 text-gold group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-display mb-4">{service.title}</h3>
              <p className="text-soft-gray leading-relaxed text-sm mb-6">{service.description}</p>
              
              {service.features && (
                <ul className="space-y-2 mb-8 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-charcoal/60">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <button className="font-heading text-[10px] font-black uppercase tracking-widest text-charcoal flex items-center gap-2 group-hover:text-gold transition-colors mt-auto">
                View Portfolio <ChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section className="py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
             <h2 className="text-6xl font-display mb-4">THE<br/>JOURNEY</h2>
             <p className="text-soft-gray">A timeline of growth and creative evolution.</p>
          </div>
          <div className="lg:w-2/3 space-y-12">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-8 group"
              >
                <span className="font-display text-4xl text-gold group-hover:scale-110 transition-transform">{item.year}</span>
                <div className="pt-2">
                  <p className="font-heading font-black uppercase tracking-widest text-sm mb-2">{item.event}</p>
                  <div className="w-12 h-[1px] bg-charcoal/30"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
const [formData, setFormData] = useState({ name: '', email: '', service: 'Graphic Design', message: '' });
const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.message) return;
  setFormStatus('sending');
  
  // Store submissions locally
  const storedMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
  storedMessages.push({ ...formData, timestamp: new Date().toISOString() });
  localStorage.setItem('portfolio_messages', JSON.stringify(storedMessages));

  // Send via mailto fallback (no backend needed)
  const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.service} — ${formData.name}`);
  const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`);
  window.open(`mailto:dixitg700@gmail.com?subject=${subject}&body=${body}`, '_blank');
  setFormStatus('sent');
  setTimeout(() => { setFormStatus('idle'); setFormData({ name: '', email: '', service: 'Graphic Design', message: '' }); }, 4000);
};
  return (
    <section id="contact" className="py-24 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl md:text-8xl font-display mb-8">LET'S<br/>CREATE.</h2>
            <p className="text-soft-gray text-xl mb-12">Ready to kickstart your next project? Drop a message and let's turn your ideas into digital reality.</p>

            <div className="space-y-8">
              <a href="mailto:dixitg700@gmail.com" className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-soft-gray mb-1">Email Me</p>
                  <p className="font-heading text-lg font-bold group-hover:text-gold transition-colors">dixitg700@gmail.com</p>
                </div>
              </a>
              <a href="https://www.instagram.com/offx.gaurav_3" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Instagram className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-soft-gray mb-1">Follow Me</p>
                  <p className="font-heading text-lg font-bold group-hover:text-gold transition-colors">@offx.gaurav_3</p>
                </div>
              </a>
              <a href="https://wa.me/917388340027" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <MessageSquare className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-soft-gray mb-1">WhatsApp</p>
                  <p className="font-heading text-lg font-bold group-hover:text-gold transition-colors">+91 73883 40027</p>
                </div>
              </a>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 glass-card p-10 mt-10 lg:mt-0"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold block">Your Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border-b border-white/20 py-4 px-0 focus:outline-none focus:border-gold transition-colors font-heading text-sm" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold block">Your Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border-b border-white/20 py-4 px-0 focus:outline-none focus:border-gold transition-colors font-heading text-sm" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gold block">Service Needed</label>
              <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-white/5 border-b border-white/20 py-4 px-0 focus:outline-none focus:border-gold transition-colors font-heading text-sm appearance-none bg-transparent">
                <option className="bg-charcoal">Graphic Design</option>
                <option className="bg-charcoal">Video Editing</option>
                <option className="bg-charcoal">Photo Editing</option>
                <option className="bg-charcoal">Social Media</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gold block">Brief Project Detail</label>
              <textarea rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border-b border-white/20 py-4 px-0 focus:outline-none focus:border-gold transition-colors font-heading text-sm resize-none" placeholder="Tell me about your project..." required></textarea>
            </div>
            <button 
  type="submit"
  disabled={formStatus === 'sending' || formStatus === 'sent'}
  className="w-full bg-gold text-charcoal font-heading font-black uppercase tracking-widest py-6 hover:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
>
  {formStatus === 'sending' ? 'Opening Email...' : formStatus === 'sent' ? '✓ Message Prepared!' : 'Send Message'}
</button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-beige border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="font-display text-xl">GAURAV <span className="text-gold">DIXIT.</span></p>
        <p className="text-soft-gray text-xs font-bold uppercase tracking-widest">© 2026 ALL RIGHTS RESERVED. DESIGNED WITH PASSION.</p>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/offx.gaurav_3" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
          </a>
          <a href="mailto:dixitg700@gmail.com">
            <Mail className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
          </a>
          <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" title="Behance Portfolio">
            <ExternalLink className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync with browser history for back button support
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setSelectedCategory(event.state?.category || null);
      setSelectedProject(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetCategory = (cat: string | null) => {
    if (cat) {
      window.history.pushState({ category: cat }, '', `#${cat.toLowerCase().replace(/\s+/g, '-')}`);
      // Scroll to top of the new view
      window.scrollTo(0, 0);
    } else {
      window.history.pushState(null, '', ' ');
    }
    setSelectedCategory(cat);
    setSelectedProject(null);
  };

  const handleNavigateHome = () => handleSetCategory(null);

  return (
    <div className="scroll-smooth">
      <Navbar onNavigateHome={handleNavigateHome} />
      
      <main className={selectedCategory ? 'hidden' : 'block'}>
        <Hero />
        <About />
        <Skills />
        <Portfolio onSelectCategory={handleSetCategory} />
        <Services onSelectCategory={handleSetCategory} />
        <Experience />
        <Contact />
      </main>

      <AnimatePresence mode="wait">
        {selectedCategory && (
          <CategoryDetail 
            key={selectedCategory}
            category={selectedCategory} 
            onBack={() => window.history.back()}
            setSelectedProject={setSelectedProject}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-8 right-8 text-white hover:text-gold transition-colors z-[110]"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
            >
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain shadow-2xl"
              />
              <div className="mt-8 text-center text-white max-w-2xl">
                <span className="text-gold font-bold uppercase text-xs tracking-tighter mb-2 block">{selectedProject.category}</span>
                <h3 className="text-3xl font-display mb-4">{selectedProject.title}</h3>
                <p className="text-soft-gray text-sm">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
