/**
 * Projects Data
 *
 * Arquivo centralizado com os dados dos projetos da EsferaDataSCI
 *
 * @description
 * - Mantenha este arquivo atualizado com os projetos mais recentes
 * - Adicione imagens de alta qualidade (1200x800px recomendado)
 * - Use URLs válidas ou deixe como string vazia se em desenvolvimento
 * - Categorias disponíveis: "Sistema Web", "Website", "Marketing", "E-commerce", "API"
 */

export interface WorkItem {
  img: string;
  name: string;
  description: string;
  href: string;
  target?: '_blank' | '_self';
  rel?: string;
  category?: string;
  technologies?: string[];
  featured?: boolean;
  year?: number;
  client?: string;
}

export const projectsData: WorkItem[] = [
  {
    img: '/assets/img/work/site1.jpg',
    name: 'Blindagem Trabalhista',
    description: 'Sistema de Acompanhamento de Documentos trabalhistas',
    href: '/projetos/blindagem-trabalhista',
    category: 'Sistema Web',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    featured: true,
    year: 2025,
    client: 'Empresa Privada',
  },
  {
    img: '/assets/img/work/site2.jpg',
    name: 'Gestão de Documentos',
    description: 'Sistema de Gestão de Documentos com controle de versões e permissões',
    href: '/projetos/gestao-documentos',
    category: 'Sistema Web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS S3'],
    featured: true,
    year: 2024,
    client: 'Escritório de Advocacia',
  },
  {
    img: '/assets/img/work/site3.jpg',
    name: 'Landing Page de Alta Conversão',
    description: 'Landing Page otimizada para conversão com Analytics integrado',
    href: '/projetos/landing-page',
    category: 'Marketing',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Google Analytics'],
    featured: false,
    year: 2024,
    client: 'Startup Tech',
  },
  {
    img: '/assets/img/work/site4.jpg',
    name: 'Hiran Rangers Br',
    description: 'Site institucional dos Hiran Rangers do Brasil com galeria e eventos',
    href: 'https://hiranrangers.com.br',
    target: '_blank',
    rel: 'noopener noreferrer',
    category: 'Website',
    technologies: ['React', 'CSS3', 'Firebase', 'Netlify'],
    featured: false,
    year: 2024,
    client: 'Hiran Rangers Brasil',
  },
];

/**
 * Filtra projetos por categoria
 */
export const getProjectsByCategory = (category: string): WorkItem[] => {
  return projectsData.filter((project) => project.category === category);
};

/**
 * Retorna apenas projetos em destaque
 */
export const getFeaturedProjects = (): WorkItem[] => {
  return projectsData.filter((project) => project.featured);
};

/**
 * Retorna projetos por ano
 */
export const getProjectsByYear = (year: number): WorkItem[] => {
  return projectsData.filter((project) => project.year === year);
};

/**
 * Retorna todas as categorias únicas
 */
export const getCategories = (): string[] => {
  const categories = projectsData
    .map((project) => project.category)
    .filter((category): category is string => category !== undefined);
  return Array.from(new Set(categories));
};

/**
 * Retorna todas as tecnologias únicas
 */
export const getTechnologies = (): string[] => {
  const technologies = projectsData.flatMap((project) => project.technologies || []);
  return Array.from(new Set(technologies));
};

/**
 * Busca projetos por termo
 */
export const searchProjects = (searchTerm: string): WorkItem[] => {
  const term = searchTerm.toLowerCase();
  return projectsData.filter(
    (project) =>
      project.name.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.category?.toLowerCase().includes(term) ||
      project.technologies?.some((tech) => tech.toLowerCase().includes(term))
  );
};

export default projectsData;
