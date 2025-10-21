# Sugestão: Testes Unitários para Componente FAQ
## Complemento aos Testes E2E Playwright

---

## 📋 Contexto

Atualmente, o componente FAQ possui **testes E2E completos com Playwright** (15 casos de teste).

Para uma cobertura ainda mais robusta, recomenda-se adicionar **testes unitários** com:
- **Jest** (test runner)
- **React Testing Library** (RTL) (testes de componentes React)

---

## 🎯 Benefícios de Adicionar Testes Unitários

| Testes E2E (Playwright) | Testes Unitários (Jest + RTL) |
|-------------------------|-------------------------------|
| Validam fluxo completo | Validam lógica isolada |
| Lentos (~1-2 min) | Rápidos (~5-10 segundos) |
| Simulam usuário real | Testam comportamento do componente |
| Rodados antes de deploy | Rodados em cada commit (CI/CD) |

**Combinando ambos:** Cobertura de 100% + Feedback rápido

---

## 📦 Instalação de Dependências

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

---

## ⚙️ Configuração Jest

### 1. Criar `jest.config.js`

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    '!components/**/*.stories.{js,jsx}',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/tests/e2e/'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

### 2. Criar `jest.setup.js`

```javascript
import '@testing-library/jest-dom';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  fadeIn: jest.fn(),
}));
```

### 3. Atualizar `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

---

## 🧪 Testes Unitários - FaqItem.jsx

### Arquivo: `components/__tests__/FaqItem.test.jsx`

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FaqItem from '../FaqItem';

describe('FaqItem Component', () => {
  const mockTitle = 'O que é o EsferaEPI?';
  const mockDescription = 'Sistema de gestão de EPIs para incorporadoras, obras e empreiteiras.';

  describe('Renderização', () => {
    test('deve renderizar o título corretamente', () => {
      render(<FaqItem title={mockTitle} description={mockDescription} />);
      expect(screen.getByText(mockTitle)).toBeInTheDocument();
    });

    test('deve renderizar a descrição quando expandido', () => {
      render(<FaqItem title={mockTitle} description={mockDescription} />);

      // Clicar para expandir
      const titleElement = screen.getByText(mockTitle);
      fireEvent.click(titleElement);

      expect(screen.getByText(mockDescription)).toBeInTheDocument();
    });

    test('não deve renderizar a descrição quando colapsado', () => {
      render(<FaqItem title={mockTitle} description={mockDescription} />);
      expect(screen.queryByText(mockDescription)).not.toBeInTheDocument();
    });

    test('deve renderizar o botão com aria-label', () => {
      render(<FaqItem title={mockTitle} description={mockDescription} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Abrir resposta');
    });
  });

  describe('Interatividade', () => {
    test('deve expandir ao clicar no título', () => {
      render(<FaqItem title={mockTitle} description={mockDescription} />);

      const titleElement = screen.getByText(mockTitle);
      fireEvent.click(titleElement);

      expect(screen.getByText(mockDescription)).toBeInTheDocument();
    });

    test('deve colapsar ao clicar novamente', () => {
      render(<FaqItem title={mockTitle} description={mockDescription} />);

      const titleElement = screen.getByText(mockTitle);

      // Expandir
      fireEvent.click(titleElement);
      expect(screen.getByText(mockDescription)).toBeInTheDocument();

      // Colapsar
      fireEvent.click(titleElement);
      expect(screen.queryByText(mockDescription)).not.toBeInTheDocument();
    });

    test('deve alternar aria-label ao expandir/colapsar', () => {
      render(<FaqItem title={mockTitle} description={mockDescription} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Abrir resposta');

      // Expandir
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-label', 'Fechar resposta');

      // Colapsar
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-label', 'Abrir resposta');
    });
  });

  describe('Estilos', () => {
    test('deve ter border-b e border-border/50', () => {
      const { container } = render(<FaqItem title={mockTitle} description={mockDescription} />);
      const wrapper = container.querySelector('.border-b.border-border\\/50');
      expect(wrapper).toBeInTheDocument();
    });

    test('deve ter py-6 no container clicável', () => {
      const { container } = render(<FaqItem title={mockTitle} description={mockDescription} />);
      const clickableDiv = container.querySelector('.py-6');
      expect(clickableDiv).toBeInTheDocument();
    });

    test('deve ter cursor-pointer no elemento clicável', () => {
      const { container } = render(<FaqItem title={mockTitle} description={mockDescription} />);
      const clickableDiv = container.querySelector('.cursor-pointer');
      expect(clickableDiv).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    test('deve aceitar título vazio', () => {
      render(<FaqItem title="" description={mockDescription} />);
      // Não deve quebrar
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('deve aceitar descrição vazia', () => {
      render(<FaqItem title={mockTitle} description="" />);

      fireEvent.click(screen.getByText(mockTitle));

      // Não deve quebrar, mas não renderiza nada
      expect(screen.queryByText(mockDescription)).not.toBeInTheDocument();
    });

    test('deve aceitar título e descrição longos', () => {
      const longTitle = 'A'.repeat(200);
      const longDesc = 'B'.repeat(500);

      render(<FaqItem title={longTitle} description={longDesc} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();

      fireEvent.click(screen.getByText(longTitle));
      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });
  });
});
```

---

## 🧪 Testes Unitários - Faq.jsx

### Arquivo: `components/__tests__/Faq.test.jsx`

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Faq from '../Faq';

describe('Faq Component', () => {
  describe('Renderização', () => {
    test('deve renderizar o título principal', () => {
      render(<Faq />);
      expect(screen.getByText('Tem dúvidas? A gente te ajuda.')).toBeInTheDocument();
    });

    test('deve renderizar o pretitle "Faq"', () => {
      render(<Faq />);
      expect(screen.getByText('Faq')).toBeInTheDocument();
    });

    test('deve renderizar a descrição introdutória', () => {
      render(<Faq />);
      expect(screen.getByText(/Dúvidas práticas do EsferaNR6/i)).toBeInTheDocument();
    });

    test('deve renderizar exatamente 12 itens FAQ', () => {
      const { container } = render(<Faq />);
      const items = container.querySelectorAll('ul > li');
      expect(items).toHaveLength(12);
    });

    test('deve renderizar todos os títulos esperados', () => {
      render(<Faq />);

      const expectedTitles = [
        'O que é o EsferaEPI e para quem ele foi feito?',
        'A instalação é demorada?',
        'Como o sistema controla o CA (Certificado de Aprovação)?',
        'De que forma o EsferaEPI ajuda na NR6?',
        'E a NR7 (PCMSO) — qual a relação com o EsferaEPI?',
        'Como o EsferaEPI ajuda a evitar multas?',
        'Incorporadoras podem auditar as empreiteiras? E as obras?',
        'Como é a cobrança do sistema?',
        'Quais são os principais benefícios práticos no dia a dia?',
        'O EsferaEPI integra com outros sistemas e facilita a migração?',
        'O sistema é seguro e está em conformidade com a LGPD?',
        'Como começar e quais são os prazos de onboarding?',
      ];

      expectedTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });

  describe('Estrutura', () => {
    test('deve renderizar dentro de uma section com pt-16 xl:pt-32', () => {
      const { container } = render(<Faq />);
      const section = container.querySelector('section.pt-16.xl\\:pt-32');
      expect(section).toBeInTheDocument();
    });

    test('deve renderizar container mx-auto', () => {
      const { container } = render(<Faq />);
      const containerDiv = container.querySelector('.container.mx-auto');
      expect(containerDiv).toBeInTheDocument();
    });

    test('deve renderizar lista ul', () => {
      const { container } = render(<Faq />);
      const ul = container.querySelector('ul');
      expect(ul).toBeInTheDocument();
    });
  });

  describe('Dados', () => {
    test('deve ter array faqItemsData com 12 itens', () => {
      const { container } = render(<Faq />);
      const items = container.querySelectorAll('ul > li');
      expect(items).toHaveLength(12);
    });

    test('cada item deve ter title e description únicos', () => {
      const { container } = render(<Faq />);
      const items = container.querySelectorAll('ul > li');

      const titles = [];
      items.forEach(item => {
        const h4 = item.querySelector('h4');
        titles.push(h4.textContent);
      });

      // Verificar que não há títulos duplicados
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(12);
    });
  });

  describe('Interatividade', () => {
    test('deve permitir expandir múltiplos itens simultaneamente', () => {
      render(<Faq />);

      const item1 = screen.getByText('O que é o EsferaEPI e para quem ele foi feito?');
      const item2 = screen.getByText('A instalação é demorada?');

      fireEvent.click(item1);
      fireEvent.click(item2);

      // Ambos devem estar expandidos
      expect(screen.getByText(/incorporadoras, obras e empreiteiras/i)).toBeInTheDocument();
      expect(screen.getByText(/Instalação imediata/i)).toBeInTheDocument();
    });

    test('expandir um item não deve afetar outros', () => {
      render(<Faq />);

      const item1 = screen.getByText('O que é o EsferaEPI e para quem ele foi feito?');
      const item2 = screen.getByText('A instalação é demorada?');

      // Expandir item 1
      fireEvent.click(item1);
      expect(screen.getByText(/incorporadoras, obras e empreiteiras/i)).toBeInTheDocument();

      // Item 2 ainda deve estar colapsado
      expect(screen.queryByText(/Instalação imediata/i)).not.toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    test('deve ter h2 para título principal', () => {
      const { container } = render(<Faq />);
      const h2 = container.querySelector('h2');
      expect(h2).toBeInTheDocument();
      expect(h2).toHaveClass('h2');
    });

    test('deve ter h4 para títulos dos itens', () => {
      const { container } = render(<Faq />);
      const h4s = container.querySelectorAll('h4');
      expect(h4s).toHaveLength(12);
    });

    test('todos os botões devem ter aria-label', () => {
      const { container } = render(<Faq />);
      const buttons = container.querySelectorAll('button');

      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });
  });
});
```

---

## 🧪 Testes de Integração

### Arquivo: `components/__tests__/Faq.integration.test.jsx`

```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Faq from '../Faq';

describe('Faq Integration Tests', () => {
  test('deve expandir e colapsar todos os itens sequencialmente', async () => {
    render(<Faq />);

    const allTitles = [
      'O que é o EsferaEPI e para quem ele foi feito?',
      'A instalação é demorada?',
      'Como o sistema controla o CA (Certificado de Aprovação)?',
    ];

    for (const title of allTitles) {
      const titleElement = screen.getByText(title);

      // Expandir
      fireEvent.click(titleElement);
      await waitFor(() => {
        const parent = titleElement.closest('li');
        expect(parent.querySelector('p')).toBeInTheDocument();
      });

      // Colapsar
      fireEvent.click(titleElement);
      await waitFor(() => {
        const parent = titleElement.closest('li');
        expect(parent.querySelector('p')).not.toBeInTheDocument();
      });
    }
  });

  test('deve manter estado independente para cada item', () => {
    render(<Faq />);

    const titles = [
      'O que é o EsferaEPI e para quem ele foi feito?',
      'A instalação é demorada?',
      'Como o sistema controla o CA (Certificado de Aprovação)?',
    ];

    // Expandir todos
    titles.forEach(title => {
      fireEvent.click(screen.getByText(title));
    });

    // Todos devem estar expandidos
    titles.forEach(title => {
      const parent = screen.getByText(title).closest('li');
      expect(parent.querySelector('p')).toBeInTheDocument();
    });

    // Colapsar o primeiro
    fireEvent.click(screen.getByText(titles[0]));

    // Primeiro deve estar colapsado
    const firstParent = screen.getByText(titles[0]).closest('li');
    expect(firstParent.querySelector('p')).not.toBeInTheDocument();

    // Outros ainda expandidos
    const secondParent = screen.getByText(titles[1]).closest('li');
    expect(secondParent.querySelector('p')).toBeInTheDocument();
  });

  test('deve renderizar corretamente após múltiplas interações', () => {
    render(<Faq />);

    const firstTitle = screen.getByText('O que é o EsferaEPI e para quem ele foi feito?');

    // Múltiplas expansões/colapsos
    for (let i = 0; i < 5; i++) {
      fireEvent.click(firstTitle); // Expandir
      fireEvent.click(firstTitle); // Colapsar
    }

    // Estado final deve ser colapsado
    const parent = firstTitle.closest('li');
    expect(parent.querySelector('p')).not.toBeInTheDocument();
  });
});
```

---

## 📊 Executar Testes Unitários

```bash
# Rodar todos os testes unitários
npm test

# Rodar em modo watch (desenvolvimento)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage

# Rodar testes unitários E e2e
npm run test:all
```

---

## 📈 Cobertura de Código Esperada

Com os testes acima, você deve atingir:

| Componente | Linhas | Funções | Branches | Statements |
|------------|--------|---------|----------|------------|
| **Faq.jsx** | 100% | 100% | 100% | 100% |
| **FaqItem.jsx** | 100% | 100% | 100% | 100% |

---

## 🎯 Vantagens da Combinação E2E + Unitários

| Aspecto | E2E (Playwright) | Unitários (Jest + RTL) |
|---------|------------------|------------------------|
| **Velocidade** | 1-2 minutos | 5-10 segundos |
| **Feedback** | Final do fluxo | Imediato |
| **Isolamento** | Baixo (testa tudo) | Alto (testa componente) |
| **Custo** | Alto | Baixo |
| **Confiabilidade** | Simulação real | Lógica isolada |
| **CI/CD** | Deploy | Todo commit |

**Estratégia Recomendada:**
1. ✅ Testes unitários em todo commit (fast feedback)
2. ✅ Testes E2E antes de merge/deploy (confiança total)

---

## 🚀 Próximos Passos

1. ✅ Instalar dependências Jest + RTL
2. ✅ Configurar Jest (config + setup)
3. ✅ Criar testes unitários para FaqItem
4. ✅ Criar testes unitários para Faq
5. ✅ Criar testes de integração
6. ✅ Configurar CI/CD para rodar testes automaticamente
7. ✅ Atingir 100% de cobertura

---

**Documento criado por:** Claude Code - Especialista em Testing
**Data:** 12 de outubro de 2025
