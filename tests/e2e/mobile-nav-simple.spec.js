/**
 * Mobile Navigation Menu - Simple E2E Test Suite
 * Tests the NavMobile.jsx component
 */

const { test, expect } = require('@playwright/test');

test.describe('Mobile Navigation Menu', () => {

  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3001');
  });

  test('should display hamburger button on mobile', async ({ page }) => {
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await expect(hamburgerButton).toBeVisible();
    console.log('✓ Hamburger button is visible');
  });

  test('should open mobile menu when hamburger is clicked', async ({ page }) => {
    // Click hamburger button
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await hamburgerButton.click();

    // Wait for animation
    await page.waitForTimeout(400);

    // Verify menu is visible
    const mobileMenu = page.getByTestId('mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Verify overlay is visible
    const overlay = page.getByTestId('mobile-menu-overlay');
    await expect(overlay).toBeVisible();

    console.log('✓ Mobile menu opened successfully');
  });

  test('should display all navigation links in mobile menu', async ({ page }) => {
    // Open menu
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Check all links
    const links = ['home', 'about', 'services', 'projects', 'option', 'contact', 'login'];

    for (const link of links) {
      const navLink = page.getByTestId(`mobile-menu-link-${link}`);
      await expect(navLink).toBeVisible();
    }

    console.log('✓ All navigation links are visible');
  });

  test('should close menu when overlay is clicked', async ({ page }) => {
    // Open menu
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Click overlay
    const overlay = page.getByTestId('mobile-menu-overlay');
    await overlay.click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(400);

    // Verify menu is hidden (check for translate-x-full class)
    const mobileMenu = page.getByTestId('mobile-menu');
    await expect(mobileMenu).toHaveClass(/translate-x-full/);

    console.log('✓ Menu closed when overlay clicked');
  });

  test('should close menu when a navigation link is clicked', async ({ page }) => {
    // Open menu
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Click a navigation link
    const aboutLink = page.getByTestId('mobile-menu-link-about');
    await aboutLink.click();
    await page.waitForTimeout(400);

    // Verify menu is hidden
    const mobileMenu = page.getByTestId('mobile-menu');
    await expect(mobileMenu).toHaveClass(/translate-x-full/);

    console.log('✓ Menu closed when navigation link clicked');
  });

  test('should display CTA button in mobile menu', async ({ page }) => {
    // Open menu
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await hamburgerButton.click();
    await page.waitForTimeout(400);

    // Check CTA button
    const ctaButton = page.getByTestId('mobile-menu-cta');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Peça um orçamento');

    console.log('✓ CTA button is visible in mobile menu');
  });

  test('should hide mobile menu on desktop viewport', async ({ page }) => {
    // Change to desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('http://localhost:3001');

    // Verify hamburger button is not visible
    const hamburgerButton = page.getByTestId('mobile-menu-toggle');
    await expect(hamburgerButton).not.toBeVisible();

    console.log('✓ Mobile menu hidden on desktop viewport');
  });
});
