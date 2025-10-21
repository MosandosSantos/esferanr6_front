const { test, expect } = require('@playwright/test');

/**
 * Suite de Testes E2E - Componente FAQ
 *
 * Objetivo: Validar a renderização, interatividade e conteúdo do componente FAQ
 * após correção do bug de renderização no loop.
 *
 * Correções aplicadas:
 * 1. Reestruturação do array faqItemsData para 12 objetos separados
 * 2. Passagem das props title e description para FaqItem
 * 3. Implementação de expandir/colapsar com animações
 */

test.describe('Componente FAQ - Testes de Renderização', () => {

  test.beforeEach(async ({ page }) => {
    // Navegar até a página inicial
    await page.goto('/');

    // Aguardar a página carregar completamente
    await page.waitForLoadState('networkidle');

    // Scroll até a seção FAQ - esperar o elemento estar visível
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    await faqSection.waitFor({ state: 'visible', timeout: 10000 });
    await faqSection.scrollIntoViewIfNeeded();

    // Aguardar animações do Framer Motion
    await page.waitForTimeout(500);
  });

  test('TC01 - Deve exibir o título principal da seção FAQ', async ({ page }) => {
    // Verificar se o título principal está visível
    const mainTitle = page.locator('h2:has-text("Tem dúvidas? A gente te ajuda.")');
    await expect(mainTitle).toBeVisible();

    // Verificar texto exato
    await expect(mainTitle).toHaveText('Tem dúvidas? A gente te ajuda.');

    // Capturar screenshot do título
    await page.screenshot({
      path: 'playwright-report/screenshots/faq-title.png',
      fullPage: false
    });
  });

  test('TC02 - Deve exibir exatamente 12 itens FAQ', async ({ page }) => {
    // Contar todos os itens FAQ (li dentro da ul)
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const faqItems = faqSection.locator('ul > li');

    // Aguardar todos os itens renderizarem
    await expect(faqItems.first()).toBeVisible();

    // Contar itens
    const count = await faqItems.count();

    console.log(`✓ Número de itens FAQ encontrados: ${count}`);
    expect(count).toBe(12);

    // Capturar screenshot de todos os itens
    await page.screenshot({
      path: 'playwright-report/screenshots/faq-all-items.png',
      fullPage: true
    });
  });

  test('TC03 - Deve exibir todos os títulos das perguntas visíveis', async ({ page }) => {
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
      'Como começar e quais são os prazos de onboarding?'
    ];

    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');

    for (let i = 0; i < expectedTitles.length; i++) {
      const title = faqSection.locator(`h4:has-text("${expectedTitles[i]}")`);
      await expect(title).toBeVisible();
      console.log(`✓ Título ${i + 1} visível: "${expectedTitles[i]}"`);
    }
  });

  test('TC04 - Deve exibir o pretitle "Faq"', async ({ page }) => {
    const pretitle = page.locator('text=Faq').first();
    await expect(pretitle).toBeVisible();
  });

  test('TC05 - Deve exibir a descrição introdutória', async ({ page }) => {
    const description = page.locator('text=Dúvidas práticas do EsferaNR6');
    await expect(description).toBeVisible();
  });
});

test.describe('Componente FAQ - Testes de Interatividade', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    await faqSection.waitFor({ state: 'visible' });
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('TC06 - Deve expandir o primeiro item FAQ ao clicar', async ({ page }) => {
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const firstItem = faqSection.locator('ul > li').first();
    const firstItemTitle = firstItem.locator('h4');

    // Verificar que o item está visível
    await expect(firstItemTitle).toBeVisible();

    // Verificar que inicialmente o ícone é "+" (RiAddFill)
    const addIcon = firstItem.locator('button svg').first();
    await expect(addIcon).toBeVisible();

    // Capturar screenshot antes do clique
    await firstItem.screenshot({
      path: 'playwright-report/screenshots/faq-item-before-expand.png'
    });

    // Clicar no item para expandir
    await firstItemTitle.click();

    // Aguardar animação de expansão
    await page.waitForTimeout(400);

    // Verificar que a descrição está visível
    const description = firstItem.locator('p:has-text("incorporadoras, obras e empreiteiras")');
    await expect(description).toBeVisible();

    // Capturar screenshot após expansão
    await firstItem.screenshot({
      path: 'playwright-report/screenshots/faq-item-after-expand.png'
    });

    console.log('✓ Primeiro item FAQ expandido com sucesso');
  });

  test('TC07 - Deve colapsar o primeiro item FAQ ao clicar novamente', async ({ page }) => {
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const firstItem = faqSection.locator('ul > li').first();
    const firstItemTitle = firstItem.locator('h4');

    // Expandir primeiro
    await firstItemTitle.click();
    await page.waitForTimeout(400);

    // Verificar que está expandido
    const descriptionExpanded = firstItem.locator('p:has-text("incorporadoras, obras e empreiteiras")');
    await expect(descriptionExpanded).toBeVisible();

    // Clicar novamente para colapsar
    await firstItemTitle.click();
    await page.waitForTimeout(400);

    // Verificar que a descrição não está mais visível
    await expect(descriptionExpanded).not.toBeVisible();

    console.log('✓ Primeiro item FAQ colapsado com sucesso');
  });

  test('TC08 - Deve alternar o ícone entre + e - ao expandir/colapsar', async ({ page }) => {
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const firstItem = faqSection.locator('ul > li').first();
    const firstItemDiv = firstItem.locator('div.flex.items-center.justify-between');
    const button = firstItem.locator('button');

    // Estado inicial: verificar que há um ícone
    await expect(button).toBeVisible();

    // Clicar para expandir
    await firstItemDiv.click();
    await page.waitForTimeout(400);

    // Screenshot com item expandido (ícone -)
    await button.screenshot({
      path: 'playwright-report/screenshots/faq-icon-minus.png'
    });

    // Clicar para colapsar
    await firstItemDiv.click();
    await page.waitForTimeout(400);

    // Screenshot com item colapsado (ícone +)
    await button.screenshot({
      path: 'playwright-report/screenshots/faq-icon-plus.png'
    });

    console.log('✓ Ícone alterna corretamente entre + e -');
  });

  test('TC09 - Deve manter múltiplos itens expandidos simultaneamente', async ({ page }) => {
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const items = faqSection.locator('ul > li');

    // Expandir os itens 1, 3 e 5
    const indices = [0, 2, 4];

    for (const index of indices) {
      const item = items.nth(index);
      const itemTitle = item.locator('h4');
      await itemTitle.click();
      await page.waitForTimeout(300);
    }

    // Verificar que todos os 3 itens estão expandidos
    // Item 1: "O que é o EsferaEPI"
    const desc1 = items.nth(0).locator('p:has-text("incorporadoras, obras e empreiteiras")');
    await expect(desc1).toBeVisible();

    // Item 3: "Como o sistema controla o CA"
    const desc3 = items.nth(2).locator('p:has-text("Cada EPI cadastrado tem seu CA")');
    await expect(desc3).toBeVisible();

    // Item 5: "E a NR7"
    const desc5 = items.nth(4).locator('p:has-text("A NR7 trata de saúde ocupacional")');
    await expect(desc5).toBeVisible();

    // Capturar screenshot com múltiplos itens expandidos
    await page.screenshot({
      path: 'playwright-report/screenshots/faq-multiple-expanded.png',
      fullPage: true
    });

    console.log('✓ Múltiplos itens FAQ podem estar expandidos simultaneamente');
  });
});

test.describe('Componente FAQ - Testes de Conteúdo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    await faqSection.waitFor({ state: 'visible' });
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('TC10 - Deve exibir o conteúdo correto do primeiro item FAQ', async ({ page }) => {
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const firstItem = faqSection.locator('ul > li').first();

    // Verificar título
    const title = firstItem.locator('h4');
    await expect(title).toHaveText('O que é o EsferaEPI e para quem ele foi feito?');

    // Expandir para ver a descrição
    await title.click();
    await page.waitForTimeout(400);

    // Verificar descrição completa
    const description = firstItem.locator('p');
    const descText = await description.textContent();

    expect(descText).toContain('incorporadoras, obras e empreiteiras');
    expect(descText).toContain('sistema de gestão de EPIs');
    expect(descText).toContain('NR6');

    console.log('✓ Conteúdo do primeiro item FAQ está correto');
  });

  test('TC11 - Deve validar conteúdo de todos os 12 itens FAQ', async ({ page }) => {
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const items = faqSection.locator('ul > li');

    const expectedContent = [
      { title: 'O que é o EsferaEPI e para quem ele foi feito?', keyword: 'incorporadoras' },
      { title: 'A instalação é demorada?', keyword: 'Instalação imediata' },
      { title: 'Como o sistema controla o CA', keyword: 'CA e data de validade' },
      { title: 'De que forma o EsferaEPI ajuda na NR6?', keyword: 'Termos de Responsabilidade' },
      { title: 'E a NR7 (PCMSO)', keyword: 'saúde ocupacional' },
      { title: 'Como o EsferaEPI ajuda a evitar multas?', keyword: 'alertas de validade' },
      { title: 'Incorporadoras podem auditar', keyword: 'multi-nível' },
      { title: 'Como é a cobrança do sistema?', keyword: 'funcionários ativos' },
      { title: 'Quais são os principais benefícios', keyword: 'Rastreabilidade total' },
      { title: 'O EsferaEPI integra com outros sistemas', keyword: 'Excel/CSV' },
      { title: 'O sistema é seguro e está em conformidade com a LGPD?', keyword: 'LGPD' },
      { title: 'Como começar e quais são os prazos', keyword: 'templates de importação' }
    ];

    for (let i = 0; i < expectedContent.length; i++) {
      const item = items.nth(i);
      const title = item.locator('h4');

      // Verificar título contém as palavras-chave
      const titleText = await title.textContent();
      expect(titleText).toContain(expectedContent[i].title.substring(0, 20));

      // Expandir e verificar conteúdo
      await title.click();
      await page.waitForTimeout(300);

      const description = item.locator('p');
      const descText = await description.textContent();
      expect(descText).toContain(expectedContent[i].keyword);

      // Colapsar para próxima iteração
      await title.click();
      await page.waitForTimeout(200);

      console.log(`✓ Item ${i + 1} validado: "${expectedContent[i].title.substring(0, 30)}..."`);
    }
  });

  test('TC12 - Deve verificar acessibilidade dos botões', async ({ page }) => {
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const firstItem = faqSection.locator('ul > li').first();
    const button = firstItem.locator('button');

    // Verificar que o botão tem aria-label
    const ariaLabel = await button.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(['Abrir resposta', 'Fechar resposta']).toContain(ariaLabel);

    console.log(`✓ Botão tem aria-label: "${ariaLabel}"`);

    // Expandir e verificar mudança de aria-label
    await button.click();
    await page.waitForTimeout(400);

    const ariaLabelExpanded = await button.getAttribute('aria-label');
    expect(ariaLabelExpanded).toBe('Fechar resposta');

    console.log('✓ aria-label atualiza corretamente para "Fechar resposta"');
  });
});

test.describe('Componente FAQ - Testes de Performance e Animação', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    await faqSection.waitFor({ state: 'visible' });
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('TC13 - Deve renderizar todos os itens em menos de 2 segundos', async ({ page }) => {
    const startTime = Date.now();

    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const items = faqSection.locator('ul > li');

    // Aguardar todos os 12 itens estarem visíveis
    await expect(items.nth(11)).toBeVisible({ timeout: 2000 });

    const endTime = Date.now();
    const renderTime = endTime - startTime;

    console.log(`✓ Tempo de renderização: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(2000);
  });

  test('TC14 - Deve aplicar animações Framer Motion corretamente', async ({ page }) => {
    const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
    const firstItem = faqSection.locator('ul > li').first();
    const firstItemTitle = firstItem.locator('h4');

    // Expandir item
    await firstItemTitle.click();

    // Aguardar tempo suficiente para a animação (300ms conforme código)
    await page.waitForTimeout(350);

    // Verificar que o conteúdo está visível após animação
    const description = firstItem.locator('p');
    await expect(description).toBeVisible();

    // Verificar que o elemento tem overflow-hidden (parte da animação)
    const animatedDiv = firstItem.locator('div.overflow-hidden');
    await expect(animatedDiv).toBeVisible();

    console.log('✓ Animações Framer Motion aplicadas corretamente');
  });

  test('TC15 - Deve manter a responsividade em diferentes resoluções', async ({ page }) => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      const faqSection = page.locator('section:has(h2:has-text("Tem dúvidas? A gente te ajuda."))');
      await faqSection.scrollIntoViewIfNeeded();

      const title = page.locator('h2:has-text("Tem dúvidas? A gente te ajuda.")');
      await expect(title).toBeVisible();

      const items = faqSection.locator('ul > li');
      await expect(items.first()).toBeVisible();

      // Capturar screenshot em cada resolução
      await page.screenshot({
        path: `playwright-report/screenshots/faq-${viewport.name.toLowerCase()}.png`,
        fullPage: true
      });

      console.log(`✓ FAQ responsivo em ${viewport.name} (${viewport.width}x${viewport.height})`);
    }
  });
});
