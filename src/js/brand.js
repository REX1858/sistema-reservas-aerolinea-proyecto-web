/* ============================================
   Terra Sky – brand.js
   Valores globales de marca: colores, logo,
   nombre y tagline. Fuente única de verdad.
   Inyecta el logo canónico en todas las páginas.
   ============================================ */

'use strict';

/* ─── Configuración de marca ──────────────────────────────────────────────── */
const BRAND = {

  /* Identidad textual */
  line1:   'TERRA',
  line2:   'SKY',
  tagline: 'AEROLÍNEA',

  /* Paleta — espejo de las CSS custom properties en style.css */
  colors: {
    primary:     '#0B3D91',
    primaryDark: '#3569c2',
    cyan:        '#0099E6',
    cyanDark:    '#0077B3',
    accent:      '#FF6A00',
    accentDark:  '#CC5400',
    white:       '#ffffff',
    gray50:      '#f8fafc',
    gray100:     '#f1f5f9',
    gray200:     '#e2e8f0',
    gray400:     '#94a3b8',
    gray500:     '#64748b',
    gray600:     '#475569',
    gray700:     '#334155',
    gray800:     '#1e293b',
    gray900:     '#0f172a',
  },

  /* ── SVG canónico: sobre fondo oscuro (header / footer)
        Círculo blanco + avión azul */
  get svgOnDark() {
    const p = this.colors.primary;
    return `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="18" cy="18" r="18" fill="#ffffff"/>
  <path d="M10 22 L18 8 L26 22 L18 19 Z" fill="${p}"/>
  <rect x="12" y="22" width="12" height="2.5" rx="1.25" fill="${p}"/>
</svg>`;
  },

  /* ── SVG canónico: sobre fondo claro (login / cards)
        Círculo azul + avión blanco */
  get svgOnLight() {
    const p = this.colors.primary;
    return `<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="22" cy="22" r="22" fill="${p}"/>
  <path d="M12 27 L22 10 L32 27 L22 23 Z" fill="#ffffff"/>
  <rect x="15" y="27" width="14" height="3" rx="1.5" fill="#ffffff"/>
</svg>`;
  },
};

/* ─── Sincronizar CSS custom properties ──────────────────────────────────── */
(function syncCSSVars() {
  const s = document.documentElement.style;
  const c = BRAND.colors;
  s.setProperty('--col-primary',      c.primary);
  s.setProperty('--col-primary-dark', c.primaryDark);
  s.setProperty('--col-cyan',         c.cyan);
  s.setProperty('--col-cyan-dark',    c.cyanDark);
  s.setProperty('--col-accent',       c.accent);
  s.setProperty('--col-accent-dark',  c.accentDark);
})();

/* ─── Inyección automática del logo en toda página ──────────────────────── */
document.addEventListener('DOMContentLoaded', function injectBrand() {

  /* Helper: reemplaza innerHTML solo si el nodo existe */
  function fill(selector, html) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.innerHTML = html;
    });
  }

  /* ── Header: .logo-icon / .logo-text ── */
  fill('.logo-icon',  BRAND.svgOnDark);
  fill('.logo-text',
    `<span class="logo-brand">${BRAND.line1}</span>` +
    `<span class="logo-sub">${BRAND.line2}</span>`
  );

  /* ── Footer: .footer-logo-icon / .footer-logo-text ── */
  fill('.footer-logo-icon', BRAND.svgOnDark);
  fill('.footer-logo-text',
    `<span class="footer-logo-brand">${BRAND.line1}</span>` +
    `<span class="footer-logo-sub">${BRAND.line2}</span>`
  );

  /* ── Login mobile: .login-logo-icon / .login-logo-text ── */
  fill('.login-logo-icon', BRAND.svgOnLight);
  fill('.login-logo-text',
    `<span class="login-logo-brand">${BRAND.line1}</span>` +
    `<span class="login-logo-sub">${BRAND.line2}</span>`
  );

  /* ── Login brand panel (fondo oscuro): .login-brand-logo-icon / .login-brand-logo-text ── */
  fill('.login-brand-logo-icon', BRAND.svgOnDark);
  fill('.login-brand-logo-text',
    `<span class="login-brand-name">${BRAND.line1}</span>` +
    `<span class="login-brand-sub">${BRAND.line2}</span>`
  );
});

/* Exponer globalmente para uso desde otros scripts */
window.BRAND = BRAND;
