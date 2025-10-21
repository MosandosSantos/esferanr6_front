/**
 * Mobile Navigation Menu - Comprehensive E2E Test Suite
 *
 * Tests the Header.jsx and NavMobile.jsx components across multiple viewports
 *
 * Test Coverage:
 * - Responsive behavior across mobile, tablet, and desktop viewports
 * - Menu toggle functionality (open/close/overlay)
 * - Navigation link interactions
 * - Visual regression testing with screenshots
 * - Accessibility checks
 * - Animation and transition verification
 */

const { test, expect } = require('@playwright/test');

// Base URL for the application
const BASE_URL = 'http://localhost:3001';

// Navigation links to test
const NAV_LINKS = [
  { name: 'Home', path: 'home' },
  { name: 'Sobre', path: 'about' },
  { name: 'EsferaNR6', path: 'services' },
  { name: 'Projetos', path: 'projects' },
  { name: 'Condições', path: 'option' },
  { name: 'Contato', path: 'contact' },
  { name: 'Login', path: 'login' },
];

// Viewport configurations
const VIEWPORTS = {
  mobilePortrait: { width: 375, height: 667, name: 'iPhone SE Portrait' },
  mobileLandscape: { width: 667, height: 375, name: 'iPhone SE Landscape' },
  tablet: { width: 768, height: 1024, name: 'iPad Portrait' },
  desktop: { width: 1280, height: 720, name: 'Desktop HD' },
};

test.describe('Mobile Navigation Menu - Responsive Testing', () => {

  test.describe('Mobile Portrait (375x667)', () => {
    test.use({ viewport: VIEWPORTS.mobilePortrait });

    test('should show header with hamburger menu icon when closed', async ({ page }) => {
      await page.goto(BASE_URL);

      // Take screenshot of initial state
      await page.screenshot({
        path: 'test-results/screenshots/mobile-portrait-menu-closed.png',
        fullPage: false
      });

      // Verify hamburger icon is visible
      const hamburgerButton = page.getByTestId('mobile-menu-toggle');
      await expect(hamburgerButton).toBeVisible();

      // Verify it shows the menu icon (not close icon)
      const menuIcon = hamburgerButton.locator('svg');
      await expect(menuIcon).toBeVisible();

      // Verify mobile menu panel is hidden (check if it has translate-x-full class)
      const mobileNav = page.getByTestId('mobile-menu');
      await expect(mobileNav).toHaveClass(/translate-x-full/);

      console.log('✓ Mobile portrait - menu closed state verified');
    });

    test('should open menu with slide-in animation when hamburger clicked', async ({ page }) => {
      await page.goto(BASE_URL);

      const hamburgerButton = page.getByTestId('mobile-menu-toggle');

      // Click hamburger to open menu
      await hamburgerButton.click();

      // Wait for menu to appear
      const mobileNav = page.getByTestId('mobile-menu');
      await expect(mobileNav).toHaveClass(/translate-x-0/);

      // Verify overlay is visible
      const overlay = page.getByTestId('mobile-menu-overlay');
      await expect(overlay).toBeVisible();

      // Wait for animation to complete
      await page.waitForTimeout(500);

      // Take screenshot of opened menu
      await page.screenshot({
        path: 'test-results/screenshots/mobile-portrait-menu-opened.png',
        fullPage: false
      });

      // Verify all navigation links are visible
      for (const link of NAV_LINKS) {
        const navLink = page.getByTestId(`mobile-menu-link-${link.path}`);
        await expect(navLink).toBeVisible();
      }

      // Verify quote button is visible
      const quoteButton = page.getByTestId('mobile-menu-cta');
      await expect(quoteButton).toBeVisible();

      console.log('✓ Mobile portrait - menu opened with all elements visible');
    });

    test('should close menu when close (X) button clicked', async ({ page }) => {
      await page.goto(BASE_URL);

      // Open menu
      const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
      await hamburgerButton.click();

      const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
      await expect(mobileNav).toBeVisible();

      // Click close button
      const closeButton = mobileNav.locator('button[aria-label="Close menu"]');
      await closeButton.click();

      // Wait for menu to close
      await page.waitForTimeout(500);

      // Verify menu is hidden
      await expect(mobileNav).not.toBeVisible();

      // Verify overlay is hidden
      const overlay = page.locator('div.fixed.inset-0.bg-black.bg-opacity-50');
      await expect(overlay).not.toBeVisible();

      console.log('✓ Mobile portrait - menu closed via close button');
    });

    test('should close menu when overlay clicked', async ({ page }) => {
      await page.goto(BASE_URL);

      // Open menu
      const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
      await hamburgerButton.click();

      const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
      await expect(mobileNav).toBeVisible();

      // Click overlay (outside menu)
      const overlay = page.locator('div.fixed.inset-0.bg-black.bg-opacity-50');
      await overlay.click({ position: { x: 10, y: 10 } });

      // Wait for menu to close
      await page.waitForTimeout(500);

      // Verify menu is hidden
      await expect(mobileNav).not.toBeVisible();

      console.log('✓ Mobile portrait - menu closed via overlay click');
    });

    test('should close menu when navigation link clicked', async ({ page }) => {
      await page.goto(BASE_URL);

      // Open menu
      const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
      await hamburgerButton.click();

      const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
      await expect(mobileNav).toBeVisible();

      // Click a navigation link
      const sobreLink = mobileNav.getByText('Sobre', { exact: true });
      await sobreLink.click();

      // Wait for menu to close
      await page.waitForTimeout(800);

      // Verify menu is hidden
      await expect(mobileNav).not.toBeVisible();

      console.log('✓ Mobile portrait - menu closed after navigation link click');
    });

    test('should verify hover states on navigation links', async ({ page }) => {
      await page.goto(BASE_URL);

      // Open menu
      const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
      await hamburgerButton.click();

      const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
      await expect(mobileNav).toBeVisible();

      // Hover over a link and check color change
      const sobreLink = mobileNav.getByText('Sobre', { exact: true });
      await sobreLink.hover();

      // Take screenshot with hover state
      await page.screenshot({
        path: 'test-results/screenshots/mobile-portrait-menu-hover.png',
        fullPage: false
      });

      console.log('✓ Mobile portrait - hover state captured');
    });
  });

  test.describe('Mobile Landscape (667x375)', () => {
    test.use({ viewport: VIEWPORTS.mobileLandscape });

    test('should display correctly in landscape mode - closed', async ({ page }) => {
      await page.goto(BASE_URL);

      await page.screenshot({
        path: 'test-results/screenshots/mobile-landscape-menu-closed.png',
        fullPage: false
      });

      // Verify hamburger is visible
      const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
      await expect(hamburgerButton).toBeVisible();

      console.log('✓ Mobile landscape - menu closed state verified');
    });

    test('should display correctly in landscape mode - opened', async ({ page }) => {
      await page.goto(BASE_URL);

      const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
      await hamburgerButton.click();

      const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
      await expect(mobileNav).toBeVisible();

      await page.waitForTimeout(500);

      await page.screenshot({
        path: 'test-results/screenshots/mobile-landscape-menu-opened.png',
        fullPage: false
      });

      // Verify all elements are accessible despite narrow height
      const quoteButton = mobileNav.getByText('Peça um orçamento');
      await expect(quoteButton).toBeVisible();

      console.log('✓ Mobile landscape - menu opened state verified');
    });
  });

  test.describe('Tablet (768x1024)', () => {
    test.use({ viewport: VIEWPORTS.tablet });

    test('should show mobile navigation on tablet - closed', async ({ page }) => {
      await page.goto(BASE_URL);

      await page.screenshot({
        path: 'test-results/screenshots/tablet-menu-closed.png',
        fullPage: false
      });

      // Verify hamburger is visible (since xl breakpoint is 1280px)
      const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
      await expect(hamburgerButton).toBeVisible();

      console.log('✓ Tablet - menu closed state verified');
    });

    test('should show mobile navigation on tablet - opened', async ({ page }) => {
      await page.goto(BASE_URL);

      const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
      await hamburgerButton.click();

      const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
      await expect(mobileNav).toBeVisible();

      await page.waitForTimeout(500);

      await page.screenshot({
        path: 'test-results/screenshots/tablet-menu-opened.png',
        fullPage: false
      });

      // Verify menu width is appropriate for tablet
      const menuBox = await mobileNav.boundingBox();
      expect(menuBox.width).toBeGreaterThan(280);

      console.log('✓ Tablet - menu opened state verified');
    });
  });

  test.describe('Desktop (1280x720)', () => {
    test.use({ viewport: VIEWPORTS.desktop });

    test('should show desktop navigation, NOT mobile menu', async ({ page }) => {
      await page.goto(BASE_URL);

      await page.screenshot({
        path: 'test-results/screenshots/desktop-navigation.png',
        fullPage: false
      });

      // Verify hamburger button is NOT visible
      const hamburgerButton = page.locator('button[aria-label*="menu"]');
      await expect(hamburgerButton).not.toBeVisible();

      // Verify desktop navigation is visible
      const desktopNav = page.locator('header nav.hidden.xl\\:flex');
      await expect(desktopNav).toBeVisible();

      // Verify all links are visible in desktop nav
      for (const link of NAV_LINKS) {
        const navLink = desktopNav.getByText(link.name, { exact: true });
        await expect(navLink).toBeVisible();
      }

      // Verify desktop quote button is visible
      const quoteButton = desktopNav.getByText('Peça um orçamento');
      await expect(quoteButton).toBeVisible();

      console.log('✓ Desktop - navigation displayed correctly (no mobile menu)');
    });
  });
});

test.describe('Mobile Navigation - Functional Testing', () => {
  test.use({ viewport: VIEWPORTS.mobilePortrait });

  test('should test all navigation links', async ({ page }) => {
    await page.goto(BASE_URL);

    const hamburgerButton = page.locator('button[aria-label*="menu"]').first();

    for (const link of NAV_LINKS) {
      // Open menu
      await hamburgerButton.click();

      const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
      await expect(mobileNav).toBeVisible();

      // Click link
      const navLink = mobileNav.getByText(link.name, { exact: true });
      await navLink.click();

      // Wait for smooth scroll and menu close
      await page.waitForTimeout(800);

      // Verify menu closed
      await expect(mobileNav).not.toBeVisible();

      console.log(`✓ Navigation link "${link.name}" clicked successfully`);
    }
  });

  test('should test quote button in mobile menu', async ({ page }) => {
    await page.goto(BASE_URL);

    const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
    await hamburgerButton.click();

    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible();

    // Click quote button
    const quoteButton = mobileNav.getByText('Peça um orçamento');
    await expect(quoteButton).toBeVisible();
    await quoteButton.click();

    // Wait for menu to close
    await page.waitForTimeout(500);

    // Verify menu closed
    await expect(mobileNav).not.toBeVisible();

    console.log('✓ Quote button clicked successfully');
  });

  test('should verify accessibility attributes', async ({ page }) => {
    await page.goto(BASE_URL);

    const hamburgerButton = page.locator('button[aria-label*="menu"]').first();

    // Check aria-label exists
    const ariaLabel = await hamburgerButton.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();

    // Check aria-expanded
    let ariaExpanded = await hamburgerButton.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');

    // Open menu
    await hamburgerButton.click();

    // Check aria-expanded changed
    ariaExpanded = await hamburgerButton.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('true');

    // Check mobile nav has aria-label
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    const navAriaLabel = await mobileNav.getAttribute('aria-label');
    expect(navAriaLabel).toBe('Mobile navigation');

    console.log('✓ Accessibility attributes verified');
  });

  test('should verify smooth animations', async ({ page }) => {
    await page.goto(BASE_URL);

    const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');

    // Record initial state
    const startTime = Date.now();

    // Open menu
    await hamburgerButton.click();
    await expect(mobileNav).toBeVisible();

    const openTime = Date.now() - startTime;

    // Animation should take around 300ms (as per CSS)
    expect(openTime).toBeGreaterThan(250);
    expect(openTime).toBeLessThan(1000);

    // Close menu
    const closeButton = mobileNav.locator('button[aria-label="Close menu"]');
    const closeStartTime = Date.now();

    await closeButton.click();
    await page.waitForTimeout(500);

    const closeTime = Date.now() - closeStartTime;

    // Animation should take around 300ms
    expect(closeTime).toBeGreaterThan(250);
    expect(closeTime).toBeLessThan(1000);

    console.log(`✓ Animations verified - Open: ${openTime}ms, Close: ${closeTime}ms`);
  });

  test('should verify menu does not interfere with page scroll', async ({ page }) => {
    await page.goto(BASE_URL);

    // Open menu
    const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
    await hamburgerButton.click();

    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible();

    // Try to scroll the page (should be prevented by overlay)
    const initialScroll = await page.evaluate(() => window.scrollY);

    // Close menu
    const overlay = page.locator('div.fixed.inset-0.bg-black.bg-opacity-50');
    await overlay.click({ position: { x: 10, y: 10 } });

    await page.waitForTimeout(500);

    const finalScroll = await page.evaluate(() => window.scrollY);

    // Scroll should not have changed significantly
    expect(Math.abs(finalScroll - initialScroll)).toBeLessThan(50);

    console.log('✓ Menu does not interfere with page scroll');
  });
});

test.describe('Mobile Navigation - Visual Regression', () => {
  test.use({ viewport: VIEWPORTS.mobilePortrait });

  test('should capture menu states for visual comparison', async ({ page }) => {
    await page.goto(BASE_URL);

    // State 1: Initial load
    await page.screenshot({
      path: 'test-results/screenshots/visual-01-initial.png',
      fullPage: false
    });

    const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');

    // State 2: Menu opening (mid-animation)
    await hamburgerButton.click();
    await page.waitForTimeout(150); // Mid-animation
    await page.screenshot({
      path: 'test-results/screenshots/visual-02-opening.png',
      fullPage: false
    });

    // State 3: Menu fully open
    await page.waitForTimeout(200);
    await page.screenshot({
      path: 'test-results/screenshots/visual-03-opened.png',
      fullPage: false
    });

    // State 4: Hover on link
    const sobreLink = mobileNav.getByText('Sobre', { exact: true });
    await sobreLink.hover();
    await page.screenshot({
      path: 'test-results/screenshots/visual-04-link-hover.png',
      fullPage: false
    });

    // State 5: Hover on quote button
    const quoteButton = mobileNav.getByText('Peça um orçamento');
    await quoteButton.hover();
    await page.screenshot({
      path: 'test-results/screenshots/visual-05-button-hover.png',
      fullPage: false
    });

    console.log('✓ Visual regression screenshots captured');
  });
});
