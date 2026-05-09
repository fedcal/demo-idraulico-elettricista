import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="site-header__inner">
        <a routerLink="/" class="brand" aria-label="Home Tecnoservizi 24h">
          <span class="brand__icon" aria-hidden="true">🔧</span>
          <span class="brand__text">Tecnoservizi 24h</span>
        </a>
        <div class="site-header__right">
          <a href="tel:800123456" class="urgenza-cta" aria-label="Chiama per urgenza 24 ore">
            <span aria-hidden="true">🚨</span> URGENZA 24h — 800 123 456
          </a>
          <nav class="site-nav" aria-label="Navigazione principale">
            <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
            <a routerLink="/servizi" routerLinkActive="is-active">Servizi</a>
            <a routerLink="/chi-siamo" routerLinkActive="is-active">Chi siamo</a>
            <a routerLink="/zone" routerLinkActive="is-active">Zone</a>
            <a routerLink="/preventivo" routerLinkActive="is-active" class="cta">Preventivo</a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .site-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--color-bg-default);
        border-bottom: 1px solid var(--color-border);
        backdrop-filter: blur(8px);
      }
      .site-header__inner {
        max-width: 1080px;
        margin: 0 auto;
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: var(--color-fg-default);
        font-weight: 700;
        font-size: 1.15rem;
        flex-shrink: 0;
      }
      .brand__icon {
        font-size: 1.5rem;
      }
      .site-header__right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.4rem;
      }
      .urgenza-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        background: var(--color-accent);
        color: #ffffff;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.85rem;
        padding: 0.35rem 0.9rem;
        border-radius: var(--radius-sm);
        letter-spacing: 0.02em;
        animation: pulse-accent 2.5s ease-in-out infinite;
      }
      .urgenza-cta:hover {
        background: #c2410c;
        text-decoration: none;
      }
      @keyframes pulse-accent {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.85; }
      }
      .site-nav {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        align-items: center;
      }
      .site-nav a {
        color: var(--color-fg-muted);
        text-decoration: none;
        font-size: 0.9rem;
        padding: 0.35rem 0.6rem;
        border-radius: var(--radius-sm);
      }
      .site-nav a:hover {
        color: var(--color-fg-default);
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .site-nav a.is-active {
        color: var(--color-accent);
        font-weight: 600;
      }
      .site-nav a.cta {
        background: var(--color-fg-default);
        color: #ffffff;
        padding: 0.4rem 0.9rem;
        font-weight: 600;
      }
      .site-nav a.cta:hover {
        background: #32383f;
        color: #ffffff;
      }
      @media (max-width: 680px) {
        .site-header__inner {
          flex-direction: column;
          align-items: stretch;
        }
        .site-header__right {
          align-items: stretch;
        }
        .urgenza-cta {
          text-align: center;
          justify-content: center;
        }
        .site-nav {
          gap: 0.35rem;
          font-size: 0.82rem;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
