# Exemplos de Uso - Work Component

## Índice
1. [Uso Básico](#uso-básico)
2. [Customização de Conteúdo](#customização-de-conteúdo)
3. [Customização Visual](#customização-visual)
4. [Integração com CMS](#integração-com-cms)
5. [Casos de Uso Avançados](#casos-de-uso-avançados)
6. [Troubleshooting](#troubleshooting)

---

## Uso Básico

### Exemplo 1: Importação Simples

```typescript
// app/page.tsx
import Work from '@/components/Work';

export default function Home() {
  return (
    <main>
      <Work />
    </main>
  );
}
```

**Resultado:**
- Exibe todos os projetos do arquivo `data/projects.ts`
- Configuração padrão (autoplay, navegação, paginação)
- Textos padrão ("Nossos Projetos", "EsferaDataSCI")

---

## Customização de Conteúdo

### Exemplo 2: Projetos Customizados

```typescript
import Work, { WorkItem } from '@/components/Work';

export default function PortfolioPage() {
  const customProjects: WorkItem[] = [
    {
      img: '/assets/img/project-1.jpg',
      name: 'E-commerce Moderno',
      description: 'Loja online completa com carrinho e checkout',
      href: '/projetos/ecommerce',
      category: 'E-commerce',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
      featured: true,
    },
    {
      img: '/assets/img/project-2.jpg',
      name: 'Dashboard Analytics',
      description: 'Dashboard com gráficos em tempo real',
      href: '/projetos/dashboard',
      category: 'Dashboard',
      technologies: ['React', 'D3.js', 'WebSocket'],
    },
  ];

  return <Work items={customProjects} />;
}
```

### Exemplo 3: Filtrar Projetos

```typescript
import Work from '@/components/Work';
import { getFeaturedProjects, getProjectsByCategory } from '@/data/projects';

// Apenas projetos em destaque
export function FeaturedWorks() {
  return <Work items={getFeaturedProjects()} title="Projetos em Destaque" />;
}

// Apenas uma categoria
export function WebSystemsWorks() {
  return (
    <Work
      items={getProjectsByCategory('Sistema Web')}
      title="Sistemas Web"
      description="Nossas soluções em sistemas web"
    />
  );
}
```

### Exemplo 4: Busca Dinâmica

```typescript
'use client';

import { useState } from 'react';
import Work from '@/components/Work';
import { searchProjects, projectsData } from '@/data/projects';

export default function SearchableWorks() {
  const [query, setQuery] = useState('');
  const filteredProjects = query ? searchProjects(query) : projectsData;

  return (
    <div>
      <input
        type="search"
        placeholder="Buscar projetos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-8 px-4 py-2 border rounded-lg"
      />
      <Work
        items={filteredProjects}
        title={query ? `Resultados para "${query}"` : 'Todos os Projetos'}
      />
    </div>
  );
}
```

---

## Customização Visual

### Exemplo 5: Textos Personalizados

```typescript
<Work
  title="Nosso Portfólio"
  subtitle="Trabalhos Realizados em 2025"
  description="Confira os projetos que desenvolvemos este ano para nossos clientes"
/>
```

### Exemplo 6: Configuração de Autoplay

```typescript
// Autoplay mais lento
<Work autoplayDelay={6000} />

// Sem autoplay
<Work autoplayDelay={0} />

// Autoplay customizado (componente local)
const customConfig = {
  autoplayDelay: 5000,
  showNavigation: true,
  showPagination: true,
};

<Work {...customConfig} />
```

### Exemplo 7: Controles Customizados

```typescript
// Sem navegação (apenas bullets)
<Work showNavigation={false} />

// Sem paginação (apenas setas)
<Work showPagination={false} />

// Sem controles (apenas swipe)
<Work showNavigation={false} showPagination={false} />
```

---

## Integração com CMS

### Exemplo 8: Fetch de API

```typescript
import { useQuery } from '@tanstack/react-query';
import Work from '@/components/Work';

async function fetchProjects() {
  const res = await fetch('/api/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export default function DynamicWorks() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  if (isLoading) return <WorkSkeleton />;
  if (error) return <WorkError error={error} />;

  return <Work items={projects} />;
}

// Skeleton loading
function WorkSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[500px] bg-gray-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

// Error state
function WorkError({ error }: { error: Error }) {
  return (
    <div className="container mx-auto text-center py-20">
      <p className="text-red-500">Erro ao carregar projetos: {error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-accent text-primary rounded-lg"
      >
        Tentar Novamente
      </button>
    </div>
  );
}
```

### Exemplo 9: Server Component (Next.js App Router)

```typescript
// app/projetos/page.tsx
import Work from '@/components/Work';
import { WorkItem } from '@/components/Work';

async function getProjects(): Promise<WorkItem[]> {
  const res = await fetch('https://api.example.com/projects', {
    next: { revalidate: 3600 }, // ISR: revalidar a cada hora
  });

  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }

  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <Work items={projects} />
    </main>
  );
}

// Error boundary
export function generateMetadata() {
  return {
    title: 'Nossos Projetos | EsferaDataSCI',
    description: 'Conheça os projetos desenvolvidos pela EsferaDataSCI',
  };
}
```

### Exemplo 10: Integração com Strapi CMS

```typescript
import Work, { WorkItem } from '@/components/Work';

interface StrapiProject {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    slug: string;
    category: string;
  };
}

async function getStrapiProjects(): Promise<WorkItem[]> {
  const res = await fetch('http://localhost:1337/api/projects?populate=*', {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });

  const { data } = await res.json();

  return data.map((project: StrapiProject) => ({
    img: `http://localhost:1337${project.attributes.image.data.attributes.url}`,
    name: project.attributes.title,
    description: project.attributes.description,
    href: `/projetos/${project.attributes.slug}`,
    category: project.attributes.category,
  }));
}

export default async function StrapiProjectsPage() {
  const projects = await getStrapiProjects();
  return <Work items={projects} />;
}
```

---

## Casos de Uso Avançados

### Exemplo 11: Filtros por Categoria com State

```typescript
'use client';

import { useState } from 'react';
import Work from '@/components/Work';
import { projectsData, getCategories } from '@/data/projects';

export default function FilterableWorks() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = getCategories();

  const filteredProjects =
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Filtros */}
      <div className="container mx-auto mb-8">
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-accent text-primary'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-accent text-primary'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Carrossel */}
      <Work
        items={filteredProjects}
        title={selectedCategory === 'all' ? 'Todos os Projetos' : selectedCategory}
        key={selectedCategory} // Força re-render do Swiper
      />
    </div>
  );
}
```

### Exemplo 12: Modal com Detalhes

```typescript
'use client';

import { useState } from 'react';
import Work, { WorkItem } from '@/components/Work';
import { projectsData } from '@/data/projects';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Extender WorkItem para abrir modal
interface WorkItemWithModal extends WorkItem {
  longDescription?: string;
  gallery?: string[];
  client?: string;
  year?: number;
}

export default function WorksWithModal() {
  const [selectedProject, setSelectedProject] = useState<WorkItemWithModal | null>(null);

  // Modificar items para abrir modal
  const itemsWithModalTrigger = projectsData.map((item) => ({
    ...item,
    // Capturar clique com preventDefault
    onClick: (e: React.MouseEvent) => {
      if (!item.href || item.href === '') {
        e.preventDefault();
        setSelectedProject(item as WorkItemWithModal);
      }
    },
  }));

  return (
    <>
      <Work items={itemsWithModalTrigger} />

      {/* Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src={selectedProject?.img}
              alt={selectedProject?.name}
              className="w-full rounded-lg"
            />
            <p>{selectedProject?.longDescription || selectedProject?.description}</p>
            {selectedProject?.technologies && (
              <div>
                <h4 className="font-bold mb-2">Tecnologias:</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-accent/20 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### Exemplo 13: Diferentes Layouts por Página

```typescript
// Página Home - Apenas Featured
// app/page.tsx
import Work from '@/components/Work';
import { getFeaturedProjects } from '@/data/projects';

export default function HomePage() {
  return (
    <Work
      items={getFeaturedProjects()}
      title="Projetos em Destaque"
      autoplayDelay={5000}
    />
  );
}

// Página Portfolio - Todos
// app/portfolio/page.tsx
import Work from '@/components/Work';
import { projectsData } from '@/data/projects';

export default function PortfolioPage() {
  return (
    <Work
      items={projectsData}
      title="Portfólio Completo"
      subtitle="Nossos Trabalhos"
      showNavigation={true}
      showPagination={true}
    />
  );
}

// Página About - Últimos projetos
// app/sobre/page.tsx
import Work from '@/components/Work';
import { projectsData } from '@/data/projects';

export default function AboutPage() {
  const recentProjects = projectsData
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 3);

  return (
    <Work
      items={recentProjects}
      title="Trabalhos Recentes"
      autoplayDelay={0}
      showPagination={false}
    />
  );
}
```

### Exemplo 14: Lazy Loading com Intersection Observer

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Work = dynamic(() => import('@/components/Work'), {
  ssr: false,
  loading: () => <WorkSkeleton />,
});

export default function LazyWork() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[600px]">
      {isVisible ? <Work /> : <WorkSkeleton />}
    </div>
  );
}

function WorkSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-12 animate-pulse">
        <div className="h-4 bg-gray-200 w-32 mx-auto mb-4" />
        <div className="h-8 bg-gray-200 w-48 mx-auto mb-3" />
        <div className="h-4 bg-gray-200 w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[500px] bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
```

### Exemplo 15: Tracking de Analytics

```typescript
'use client';

import { useEffect } from 'react';
import Work, { WorkItem } from '@/components/Work';
import { projectsData } from '@/data/projects';

export default function WorkWithAnalytics() {
  // Track visualização da seção
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_name: 'Projects Carousel',
        items: projectsData.map((item, index) => ({
          item_id: item.href,
          item_name: item.name,
          item_category: item.category,
          index: index,
        })),
      });
    }
  }, []);

  // Modificar items para trackear cliques
  const itemsWithTracking = projectsData.map((item) => ({
    ...item,
    onClick: () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'select_item', {
          item_list_name: 'Projects Carousel',
          items: [
            {
              item_id: item.href,
              item_name: item.name,
              item_category: item.category,
            },
          ],
        });
      }
    },
  }));

  return <Work items={itemsWithTracking} />;
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      event: string,
      params: Record<string, unknown>
    ) => void;
  }
}
```

---

## Troubleshooting

### Problema: Swiper não renderiza

**Sintoma:**
```
Nada aparece na tela, apenas espaço em branco
```

**Solução:**
```typescript
// 1. Verificar importação do CSS
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/styles/swiper-custom.css';

// 2. Verificar se items tem dados
console.log('Projects:', items); // Deve ter array com items

// 3. Verificar console por erros
// Abrir DevTools (F12) → Console
```

### Problema: Imagens não carregam

**Sintoma:**
```
Placeholder do Next.js aparece mas imagem real não carrega
```

**Solução:**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite todas as imagens HTTPS
      },
    ],
    // OU específico
    domains: ['seu-dominio.com'],
  },
};

module.exports = nextConfig;
```

### Problema: TypeScript errors

**Sintoma:**
```
Type 'X' is not assignable to type 'Y'
```

**Solução:**
```typescript
// Usar a interface correta
import { WorkItem } from '@/components/Work';

const items: WorkItem[] = [ ... ];

// Se precisar extender
interface CustomWorkItem extends WorkItem {
  customField?: string;
}
```

### Problema: Autoplay não funciona

**Sintoma:**
```
Carrossel não gira automaticamente
```

**Solução:**
```typescript
// 1. Verificar se autoplayDelay > 0
<Work autoplayDelay={5000} /> // OK
<Work autoplayDelay={0} /> // Desabilitado

// 2. Verificar reduced motion
// Se usuário tem prefers-reduced-motion, autoplay é desabilitado
// Testar em navegador sem essa preferência

// 3. Verificar se tem mais de 1 slide
// Loop precisa de pelo menos 2 slides
```

### Problema: CSS não está aplicado

**Sintoma:**
```
Swiper aparece sem estilos customizados
```

**Solução:**
```typescript
// 1. Importar CSS no layout
// app/layout.tsx
import '@/styles/swiper-custom.css';

// 2. Verificar se arquivo existe
// styles/swiper-custom.css deve existir

// 3. Verificar ordem de imports
import 'swiper/css'; // Primeiro os CSS do Swiper
import '@/styles/swiper-custom.css'; // Depois o customizado
```

### Problema: Performance ruim

**Sintoma:**
```
Carrossel trava ou fica lento
```

**Solução:**
```typescript
// 1. Otimizar imagens
<Image
  quality={75} // Reduzir de 85 para 75
  sizes="(max-width: 768px) 320px, 380px"
/>

// 2. Desabilitar coverflow em mobile
breakpoints={{
  320: { effect: 'slide' }, // Mais leve
  768: { effect: 'coverflow' },
}}

// 3. Reduzir animações
// Remover ou reduzir backdrop-filter
// Usar transform ao invés de outras propriedades
```

---

## Dicas Finais

### Best Practices

1. **Sempre valide os dados:**
```typescript
if (!items || items.length === 0) {
  return <EmptyState />;
}
```

2. **Use loading states:**
```typescript
if (isLoading) return <Skeleton />;
if (error) return <Error />;
return <Work items={data} />;
```

3. **Adicione alt texts descritivos:**
```typescript
alt={`Screenshot do projeto ${item.name} mostrando ${item.description}`}
```

4. **Teste acessibilidade:**
```bash
# Lighthouse no DevTools
# axe DevTools extension
# Navegação por teclado (Tab, arrows)
# Screen reader (NVDA, VoiceOver)
```

5. **Monitor performance:**
```bash
npm run build
# Verificar bundle size
# Testar em dispositivos reais
# Usar Lighthouse
```

### Recursos Adicionais

- [Swiper API](https://swiperjs.com/swiper-api)
- [Next.js Image](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Última atualização:** 14 de outubro de 2025
