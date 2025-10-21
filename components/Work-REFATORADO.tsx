'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import Pretitle from './Pretitle';
import { RiArrowRightUpLine, RiCheckboxBlankCircleFill } from 'react-icons/ri';

// Lazy load Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/swiper-custom.css'; // Arquivo CSS separado

// Types
export interface WorkItem {
  img: string;
  name: string;
  description: string;
  href: string;
  target?: '_blank' | '_self';
  rel?: string;
  category?: string;
  technologies?: string[];
}

interface WorkProps {
  items?: WorkItem[];
  title?: string;
  subtitle?: string;
  description?: string;
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
}

// Default data - idealmente viria de props ou arquivo separado
const defaultWorkData: WorkItem[] = [
  {
    img: '/assets/img/work/site1.jpg',
    name: 'Blindagem Trabalhista',
    description: 'Sistema de Acompanhamento de Documentos trabalhistas',
    href: '/projetos/blindagem-trabalhista',
    category: 'Sistema Web',
    technologies: ['Next.js', 'React', 'TypeScript'],
  },
  {
    img: '/assets/img/work/site2.jpg',
    name: 'Gestão de Documentos',
    description: 'Sistema de Gestão de Documentos',
    href: '/projetos/gestao-documentos',
    category: 'Sistema Web',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    img: '/assets/img/work/site3.jpg',
    name: 'Landing Page',
    description: 'Landing Page de Alta conversão',
    href: '/projetos/landing-page',
    category: 'Marketing',
    technologies: ['Next.js', 'Tailwind CSS'],
  },
  {
    img: '/assets/img/work/site4.jpg',
    name: 'Hiran Rangers Br',
    target: '_blank',
    rel: 'noopener noreferrer',
    description: 'Site dos Hiran Rangers do Brasil',
    href: 'https://hiranrangers.com.br',
    category: 'Website',
    technologies: ['React', 'CSS3'],
  },
];

// Componente de Slide separado para melhor organização
interface WorkSlideProps {
  item: WorkItem;
  index: number;
}

const WorkSlide: React.FC<WorkSlideProps> = ({ item, index }) => {
  const hasValidHref = item.href && item.href !== '';

  return (
    <article
      className="relative h-[500px] w-full max-w-[380px] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-accent/50 group"
      role="group"
      aria-label={`Projeto ${index + 1}: ${item.name}`}
    >
      {/* Imagem com overlay gradiente */}
      <div className="relative h-full w-full">
        <Image
          src={item.img}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          alt={`Screenshot do projeto ${item.name} - ${item.description}`}
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 400px"
          priority={index === 0}
          quality={85}
        />

        {/* Overlay gradiente escuro */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"
          aria-hidden="true"
        />
      </div>

      {/* Conteúdo com glassmorphism */}
      <div className="absolute left-0 right-0 bottom-0 p-6 backdrop-blur-md bg-black/40 border-t border-white/10">
        <div className="space-y-3">
          <h3 className="text-white font-primary font-bold text-xl tracking-[1px] uppercase transition-colors duration-300 group-hover:text-accent">
            {item.name}
          </h3>

          <div className="flex items-start gap-3 text-white/90">
            <RiCheckboxBlankCircleFill
              className="text-accent text-lg mt-1 flex-shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed">{item.description}</p>
          </div>

          {/* Categorias/Tags (opcional) */}
          {item.category && (
            <span className="inline-block text-xs text-accent/80 uppercase tracking-wider">
              {item.category}
            </span>
          )}
        </div>

        {/* Botão de ação */}
        {hasValidHref ? (
          <Link
            href={item.href}
            target={item.target}
            rel={item.rel}
            className="absolute top-6 right-6 w-[50px] h-[50px] bg-accent text-primary text-2xl flex justify-center items-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-45 hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
            aria-label={`Ver detalhes do projeto ${item.name}`}
          >
            <RiArrowRightUpLine aria-hidden="true" />
            <span className="sr-only">Abrir projeto</span>
          </Link>
        ) : (
          <div
            className="absolute top-6 right-6 w-[50px] h-[50px] bg-accent/50 text-primary text-2xl flex justify-center items-center rounded-full shadow-lg cursor-not-allowed opacity-50"
            aria-label="Projeto em desenvolvimento"
          >
            <RiArrowRightUpLine aria-hidden="true" />
          </div>
        )}
      </div>
    </article>
  );
};

// Componente principal
const Work: React.FC<WorkProps> = ({
  items = defaultWorkData,
  title = 'Nossos Projetos',
  subtitle = 'EsferaDataSCI',
  description = 'Conheça os nossos projetos em diversas áreas.',
  autoplayDelay = 4500,
  showNavigation = true,
  showPagination = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Memoizar configuração do Swiper
  const swiperConfig = useMemo(
    () => ({
      effect: 'coverflow' as const,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto' as const,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: showPagination
        ? {
            clickable: true,
            dynamicBullets: true,
          }
        : false,
      navigation: showNavigation,
      autoplay:
        !prefersReducedMotion && autoplayDelay > 0
          ? {
              delay: autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false,
      loop: items.length > 1,
      modules: [EffectCoverflow, Pagination, Navigation, Autoplay],
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
          effect: 'slide' as const, // Disable coverflow em mobile
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 30,
          effect: 'slide' as const,
        },
        768: {
          slidesPerView: 'auto' as const,
          spaceBetween: 40,
          effect: 'coverflow' as const,
        },
        1024: {
          slidesPerView: 'auto' as const,
          spaceBetween: 50,
          effect: 'coverflow' as const,
        },
      },
    }),
    [items.length, autoplayDelay, showNavigation, showPagination, prefersReducedMotion]
  );

  // Memoizar renderização dos slides
  const slides = useMemo(
    () =>
      items.map((item, index) => (
        <SwiperSlide key={`${item.name}-${index}`}>
          <WorkSlide item={item} index={index} />
        </SwiperSlide>
      )),
    [items]
  );

  return (
    <section className="pt-16 xl:pt-32" id="projects" aria-labelledby="projects-heading">
      <div className="container mx-auto">
        <div className="text-center max-w-[540px] mx-auto xl:mb-20">
          <Pretitle text={title} center />
          <h2 id="projects-heading" className="h2 mb-3">
            {subtitle}
          </h2>
          <p className="mb-11 max-w-[480px] mx-auto">{description}</p>
        </div>
      </div>

      {/* Carrossel com Swiper */}
      <div className="container mx-auto px-4 pb-20">
        {items.length > 0 ? (
          <Swiper
            {...swiperConfig}
            className="work-swiper"
            aria-label="Carrossel de projetos da EsferaDataSCI"
          >
            {slides}
          </Swiper>
        ) : (
          <div className="text-center py-20">
            <p className="text-secondary">Nenhum projeto disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
