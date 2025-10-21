"use client";

import Image from "next/image";
import Link from "next/link";
import Pretitle from "./Pretitle";

import { RiArrowRightUpLine, RiCheckboxBlankCircleFill } from "react-icons/ri";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const workData = [
  {
    img: "/assets/img/work/site1.jpg",
    name: "Blindagem Trabalhista",
    description: "Sistema de Acompanhmento de Documentos trabalhistas",
    href: "",
  },
  {
    img: "/assets/img/work/site2.jpg",
    name: "Gestão de Documentos",
    description: "Sistema de Gestão de Documentos",
    href: "",
  },
  {
    img: "/assets/img/work/site3.jpg",
    name: "Landing Page",
    description: "Landing Page de Alta conversão",
    href: "",
  },
  {
    img: "/assets/img/work/site4.jpg",
    name: "Hiran Rangers Br",
    target:"_blank",
    rel:"noopener noreferrer",
    description: "Site dos Hiran Rangers do Brasil",
    href: "",
  },
]

const Work = () => {
  return (
    <div className="pt-16 xl:pt-32" id="projects">
      <div className="container mx-auto">
        <div className='text-center max-w-[540px] mx-auto xl:mb-20'>
          <Pretitle text="Nossos Projetos" center />
          <h2 className="h2 mb-3">EsferaDataSCI</h2>
          <p className="mb-11 max-w-[480px] mx-auto">
            Conheça os nossos projetos em diversas áreas.
          </p>
        </div>
      </div>

      {/* Carrossel Moderno com Swiper */}
      <div className="container mx-auto px-4 pb-20">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 'auto',
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 'auto',
              spaceBetween: 50,
            },
          }}
          className="mySwiper"
        >
          {workData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[340px] w-full max-w-[600px] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-accent/50 group">
                {/* Imagem com overlay gradiente */}
                <div className="relative h-full w-full">
                  <Image
                    src={item.img}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={item.name}
                  />

                  {/* Overlay gradiente escuro */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                </div>

                {/* Conteúdo com glassmorphism */}
                <div className="absolute left-0 right-0 bottom-0 p-6 backdrop-blur-md bg-black/40 border-t border-white/10">
                  <div className="space-y-3">
                    <h4 className="text-white font-primary font-bold text-xl tracking-[1px] uppercase transition-colors duration-300 group-hover:text-accent">
                      {item.name}
                    </h4>
                    <div className="flex items-start gap-3 text-white/90">
                      <RiCheckboxBlankCircleFill className="text-accent text-lg mt-1 flex-shrink-0 animate-pulse" />
                      <p className="text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <Link
                    href={item.href || "#"}
                    target={item.target}
                    rel={item.rel}
                    className="absolute top-6 right-6 w-[50px] h-[50px] bg-accent text-primary text-2xl flex justify-center items-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-45 hover:shadow-accent/50"
                  >
                    <RiArrowRightUpLine />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Estilos customizados inline para Swiper */}
        <style jsx global>{`
          .mySwiper {
            padding: 40px 0 80px 0;
          }

          .mySwiper .swiper-slide {
            width: 600px;
            height: 340px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .mySwiper .swiper-slide-active {
            transform: scale(1.05);
            z-index: 10;
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: var(--accent, #10b981);
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            transition: all 0.3s ease;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: var(--accent, #10b981);
            color: white;
            transform: scale(1.1);
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 20px;
            font-weight: bold;
          }

          .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            width: 12px;
            height: 12px;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet-active {
            background: var(--accent, #10b981);
            width: 30px;
            border-radius: 6px;
          }

          @media (max-width: 768px) {
            .mySwiper .swiper-slide {
              width: 340px;
              height: 190px;
            }

            .swiper-button-next,
            .swiper-button-prev {
              width: 40px;
              height: 40px;
            }

            .swiper-button-next::after,
            .swiper-button-prev::after {
              font-size: 16px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Work
