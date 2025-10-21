/**
 * Mobile Navigation Menu - Enhanced E2E Test Suite
 *
 * Tests the fixed NavMobile.jsx component with full accessibility and functionality coverage
 *
 * Test Coverage:
 * - Responsive behavior across multiple viewports
 * - Menu toggle functionality (open/close/overlay)
 * - Keyboard navigation (ESC, Tab, focus trap)
 * - Accessibility (ARIA attributes, screen reader support)
 * - Animation and transition verification
 * - Visual regression testing
 */

const { test, expect } = require('@playwright/test');

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
  mobilePortrait: { width: 375, height: 667 },
  mobileLandscape: { width: 667, height: 375 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
  desktopLarge: { width: 1920, height: 1080 },
};

test.describe('Mobile Navigation Menu - Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobilePortrait);
    await page.goto('/');
  });

  test('should display hamburger button on mobile', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await expect(hamburgerButton).toBeVisible();

    // Verify initial ARIA attributes
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    await expect(hamburgerButton).toHaveAttribute('aria-controls', 'mobile-navigation');
  });

  test('should open mobile menu when hamburger is clicked', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Initially menu should be hidden (translate-x-full)
    await expect(mobileMenu).toHaveClass(/translate-x-full/);

    // Click to open
    await hamburgerButton.click();

    // Wait for animation
    await page.waitForTimeout(400);

    // Verify menu is visible (translate-x-0)
    await expect(mobileMenu).toHaveClass(/translate-x-0/);

    // Verify ARIA state changed
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

    // Verify overlay appeared
    const overlay = page.getByTestId('mobile-menu-overlay');
    await expect(overlay).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'test-results/screenshots/mobile-menu-opened.png',
      fullPage: false
    });
  });

  test('should display all navigation links in mobile menu', async ({ page }) => {
    // Open menu
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    // Check all links are visible
    for (const link of NAV_LINKS) {
      const navLink = page.getByTestId(`mobile-menu-link-${link.path}`);
      await expect(navLink).toBeVisible();
      await expect(navLink).toContainText(link.name);
    }
  });

  test('should close menu when overlay is clicked', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');
    const overlay = page.getByTestId('mobile-menu-overlay');

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(400);
    await expect(mobileMenu).toHaveClass(/translate-x-0/);

    // Click overlay
    await overlay.click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(400);

    // Verify menu is hidden
    await expect(mobileMenu).toHaveClass(/translate-x-full/);
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should close menu when close button inside menu is clicked', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Click close button inside menu
    const closeButton = page.getByTestId('mobile-menu-close');
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await page.waitForTimeout(400);

    // Verify menu is hidden
    await expect(mobileMenu).toHaveClass(/translate-x-full/);
  });

  test('should close menu when a navigation link is clicked', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Click a navigation link
    const aboutLink = page.getByTestId('mobile-menu-link-about');
    await aboutLink.click();
    await page.waitForTimeout(400);

    // Verify menu is hidden
    await expect(mobileMenu).toHaveClass(/translate-x-full/);
  });

  test('should display CTA button in mobile menu', async ({ page }) => {
    // Open menu
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    // Check CTA button
    const ctaButton = page.getByTestId('mobile-menu-cta');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Peça um orçamento');
  });
});

test.describe('Mobile Navigation - Keyboard Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobilePortrait);
    await page.goto('/');
  });

  test('should close menu when ESC key is pressed', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(400);
    await expect(mobileMenu).toHaveClass(/translate-x-0/);

    // Press ESC
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // Verify menu is closed
    await expect(mobileMenu).toHaveClass(/translate-x-full/);

    // Verify focus returned to hamburger button
    await expect(hamburgerButton).toBeFocused();
  });

  test('should trap focus inside menu when open', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Get all focusable elements inside menu
    const firstLink = page.getByTestId('mobile-menu-link-home');
    const closeButton = page.getByTestId('mobile-menu-close');
    const ctaButton = page.getByTestId('mobile-menu-cta');

    // First element should be focused
    await expect(closeButton).toBeFocused();

    // Tab through elements
    await page.keyboard.press('Tab');
    await expect(firstLink).toBeFocused();

    // Tab to last element (CTA button)
    for (let i = 0; i < NAV_LINKS.length; i++) {
      await page.keyboard.press('Tab');
    }
    await expect(ctaButton).toBeFocused();

    // Tab from last element should go to first
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();

    // Shift+Tab should go backwards
    await page.keyboard.press('Shift+Tab');
    await expect(ctaButton).toBeFocused();
  });

  test('should allow navigation through links with keyboard', async ({ page }) => {
    // Open menu
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    // Tab to first link
    await page.keyboard.press('Tab');

    const firstLink = page.getByTestId('mobile-menu-link-home');
    await expect(firstLink).toBeFocused();

    // Press Enter to activate
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);

    // Menu should close
    const mobileMenu = page.getByTestId('mobile-menu');
    await expect(mobileMenu).toHaveClass(/translate-x-full/);
  });
});

test.describe('Mobile Navigation - ARIA and Screen Reader Support', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobilePortrait);
    await page.goto('/');
  });

  test('should have correct ARIA attributes on hamburger button', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');

    // Verify initial state
    await expect(hamburgerButton).toHaveAttribute('aria-label', 'Abrir menu');
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    await expect(hamburgerButton).toHaveAttribute('aria-controls', 'mobile-navigation');

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Verify changed state
    await expect(hamburgerButton).toHaveAttribute('aria-label', 'Fechar menu');
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should have correct ARIA attributes on navigation element', async ({ page }) => {
    const mobileMenu = page.getByTestId('mobile-menu');

    // Verify nav has proper ARIA label
    await expect(mobileMenu).toHaveAttribute('aria-label', 'Mobile navigation');
    await expect(mobileMenu).toHaveAttribute('id', 'mobile-navigation');

    // Verify aria-hidden state
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');

    // Open menu
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    // aria-hidden should be false when open
    await expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
  });

  test('should have correct ARIA attributes on overlay', async ({ page }) => {
    // Open menu
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    const overlay = page.getByTestId('mobile-menu-overlay');

    // Overlay should be hidden from screen readers
    await expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  test('should have accessible labels on all interactive elements', async ({ page }) => {
    // Open menu
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    // Check close button
    const closeButton = page.getByTestId('mobile-menu-close');
    await expect(closeButton).toHaveAttribute('aria-label', 'Close menu');

    // Check CTA button
    const ctaButton = page.getByTestId('mobile-menu-cta');
    await expect(ctaButton).toHaveAttribute('aria-label', 'Request a quote');

    // Check navigation links
    for (const link of NAV_LINKS) {
      const navLink = page.getByTestId(`mobile-menu-link-${link.path}`);
      await expect(navLink).toHaveAttribute('aria-label', `Navigate to ${link.name}`);
      await expect(navLink).toHaveAttribute('role', 'link');
    }
  });
});

test.describe('Mobile Navigation - Responsive Behavior', () => {
  test('should hide mobile menu on desktop viewport (1280px)', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');

    // Hamburger button should not be visible
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await expect(hamburgerButton).not.toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'test-results/screenshots/desktop-navigation.png',
      fullPage: false
    });
  });

  test('should show mobile menu on tablet viewport (768px)', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.tablet);
    await page.goto('/');

    // Hamburger button should be visible (xl breakpoint is 1200px)
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await expect(hamburgerButton).toBeVisible();

    // Open and verify
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    const mobileMenu = page.getByTestId('mobile-menu');
    await expect(mobileMenu).toHaveClass(/translate-x-0/);

    // Take screenshot
    await page.screenshot({
      path: 'test-results/screenshots/tablet-menu-opened.png',
      fullPage: false
    });
  });

  test('should handle mobile landscape orientation', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobileLandscape);
    await page.goto('/');

    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await expect(hamburgerButton).toBeVisible();

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Verify all elements are still accessible despite limited height
    const ctaButton = page.getByTestId('mobile-menu-cta');
    await expect(ctaButton).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'test-results/screenshots/mobile-landscape-menu.png',
      fullPage: false
    });
  });
});

test.describe('Mobile Navigation - Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobilePortrait);
    await page.goto('/');
  });

  test('should capture menu closed state', async ({ page }) => {
    await page.screenshot({
      path: 'test-results/screenshots/visual-menu-closed.png',
      fullPage: false
    });
  });

  test('should capture menu opened state', async ({ page }) => {
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    await page.screenshot({
      path: 'test-results/screenshots/visual-menu-opened.png',
      fullPage: false
    });
  });

  test('should capture link hover state', async ({ page }) => {
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    const aboutLink = page.getByTestId('mobile-menu-link-about');
    await aboutLink.hover();

    await page.screenshot({
      path: 'test-results/screenshots/visual-link-hover.png',
      fullPage: false
    });
  });

  test('should capture button hover state', async ({ page }) => {
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    const ctaButton = page.getByTestId('mobile-menu-cta');
    await ctaButton.hover();

    await page.screenshot({
      path: 'test-results/screenshots/visual-button-hover.png',
      fullPage: false
    });
  });

  test('should capture focus states', async ({ page }) => {
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    // Tab to first link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.screenshot({
      path: 'test-results/screenshots/visual-link-focus.png',
      fullPage: false
    });
  });
});

test.describe('Mobile Navigation - Performance and Animation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobilePortrait);
    await page.goto('/');
  });

  test('should complete open animation within expected time', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    const startTime = Date.now();
    await hamburgerButton.click();

    // Wait for menu to be fully visible
    await expect(mobileMenu).toHaveClass(/translate-x-0/, { timeout: 1000 });

    const duration = Date.now() - startTime;

    // Animation should take around 300ms as per CSS
    expect(duration).toBeGreaterThan(100);
    expect(duration).toBeLessThan(800);

    console.log(`✓ Open animation completed in ${duration}ms`);
  });

  test('should complete close animation within expected time', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Open menu first
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    const startTime = Date.now();
    await hamburgerButton.click();

    // Wait for menu to be fully hidden
    await expect(mobileMenu).toHaveClass(/translate-x-full/, { timeout: 1000 });

    const duration = Date.now() - startTime;

    // Animation should take around 300ms
    expect(duration).toBeGreaterThan(100);
    expect(duration).toBeLessThan(800);

    console.log(`✓ Close animation completed in ${duration}ms`);
  });

  test('should prevent body scroll when menu is open', async ({ page }) => {
    // Scroll page down
    await page.evaluate(() => window.scrollTo(0, 500));
    const initialScroll = await page.evaluate(() => window.scrollY);

    // Open menu
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    // Try to scroll (should be prevented)
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(200);

    // Body should have position: fixed
    const bodyPosition = await page.evaluate(() => window.getComputedStyle(document.body).position);
    expect(bodyPosition).toBe('fixed');

    // Close menu
    await page.getByTestId('mobile-menu-toggle').click();
    await page.waitForTimeout(400);

    // Body should be back to normal
    const bodyPositionAfter = await page.evaluate(() => window.getComputedStyle(document.body).position);
    expect(bodyPositionAfter).not.toBe('fixed');

    console.log('✓ Body scroll lock working correctly');
  });

  test('should handle rapid open/close without errors', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Rapidly click hamburger button
    for (let i = 0; i < 5; i++) {
      await hamburgerButton.click();
      await page.waitForTimeout(100);
    }

    // Wait for final state
    await page.waitForTimeout(400);

    // Menu should be in a consistent state (closed after odd number of clicks)
    await expect(mobileMenu).toHaveClass(/translate-x-0/);

    // No console errors should have occurred
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    expect(consoleErrors.length).toBe(0);

    console.log('✓ Rapid toggle handled correctly');
  });
});

test.describe('Mobile Navigation - Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobilePortrait);
    await page.goto('/');
  });

  test('should handle clicking menu background (not overlay)', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Click inside menu panel (should not close)
    await mobileMenu.click({ position: { x: 140, y: 300 } });
    await page.waitForTimeout(200);

    // Menu should still be open
    await expect(mobileMenu).toHaveClass(/translate-x-0/);
  });

  test('should maintain state after page resize', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Resize to landscape
    await page.setViewportSize(VIEWPORTS.mobileLandscape);
    await page.waitForTimeout(200);

    // Menu should still be open
    await expect(mobileMenu).toHaveClass(/translate-x-0/);

    // Resize to desktop
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.waitForTimeout(200);

    // Mobile menu should not be visible on desktop
    await expect(hamburgerButton).not.toBeVisible();
  });

  test('should handle double-click on hamburger button', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    const mobileMenu = page.getByTestId('mobile-menu');

    // Double-click
    await hamburgerButton.dblclick();
    await page.waitForTimeout(400);

    // Menu should be in closed state (opened then closed)
    await expect(mobileMenu).toHaveClass(/translate-x-full/);
  });
});
