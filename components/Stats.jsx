'use client';
import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from 'react-countup';

const statsData = [
  {
    endCountNum: 100, 
    endCountText: '%',
    text: 'Clientes Satisfeitos',
  },
  {
    endCountNum: 8, 
    endCountText: '',
    text: 'Projetos bem sucedidos em 2025',
  },
  {
    endCountNum: 300208, 
    endCountText: '+',
    text: 'Linhas de Código entregues',
  },
  {
    endCountNum: 33, 
    endCountText: '+',
    text: 'Anos de experiência',
  },
];

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <div ref={ref} className="mt-16 xl:mt-32 bg-primary py-10 w-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-white">
          {statsData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-5xl font-semibold flex items-end">
                {inView && (
                  <CountUp
                    start={0}
                    end={item.endCountNum}
                    delay={0.5}
                    duration={3}
                  />
                )}
                {item.endCountText && (
                  <span className="ml-1 text-accent text-3xl">{item.endCountText}</span>
                )}
              </div>
              <p className="mt-2 text-lg text-center">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;