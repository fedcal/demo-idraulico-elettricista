import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <!-- URGENZA BANNER -->
    <div class="urgenza-banner" role="alert">
      <span aria-hidden="true">🚨</span>
      <strong>Guasto? Perdita d'acqua? Blackout elettrico?</strong>
      Chiamaci subito —
      <a href="tel:800123456" class="urgenza-banner__tel">800 123 456</a>
      — Interveniamo H24 anche di domenica
    </div>

    <!-- HERO -->
    <section class="hero">
      <div class="demo-container">
        <h1>Idraulico ed Elettricista a Roma<br /><span class="hero__accent">24/7 Urgenze</span></h1>
        <p class="hero-tagline">Tecnoservizi 24h — pronto intervento Roma e 30 km. Preventivo gratuito, garanzia 12 mesi, fattura fiscale.</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat__num">22+</span>
            <span class="stat__label">anni di esperienza</span>
          </div>
          <div class="stat">
            <span class="stat__num">5</span>
            <span class="stat__label">tecnici specializzati</span>
          </div>
          <div class="stat">
            <span class="stat__num">15</span>
            <span class="stat__label">servizi disponibili</span>
          </div>
          <div class="stat">
            <span class="stat__num">12</span>
            <span class="stat__label">mesi di garanzia</span>
          </div>
        </div>
        <div class="hero-actions">
          <a href="tel:800123456" class="btn btn-urgenza">
            <span aria-hidden="true">📞</span> Chiama URGENZA 24h
          </a>
          <a routerLink="/preventivo" class="btn btn-preventivo">Preventivo gratuito</a>
          <a routerLink="/servizi" class="btn btn-secondary">Tutti i servizi</a>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features demo-container">
      <h2>Perché scegliere Tecnoservizi 24h</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">⚡</span>
          <h3>Intervento rapido</h3>
          <p>In media 30–60 minuti dal primo contatto. Per le emergenze notturne siamo sempre operativi.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🛡️</span>
          <h3>Garanzia 12 mesi</h3>
          <p>Tutti i lavori sono garantiti 12 mesi su manodopera e materiali. Torniamo senza costi aggiuntivi.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📄</span>
          <h3>Preventivo scritto</h3>
          <p>Prima di iniziare rilasciamo sempre un preventivo scritto dettagliato. Nessuna sorpresa in fattura.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🧾</span>
          <h3>Fattura fiscale</h3>
          <p>Emettiamo regolare fattura elettronica per ogni intervento. Valida per detrazioni fiscali 50%.</p>
        </li>
      </ul>
    </section>

    <!-- SERVIZI IN EVIDENZA -->
    <section class="featured demo-container" *ngIf="serviziFeatured$ | async as servizi">
      <div class="section-header">
        <h2>Interventi più richiesti</h2>
        <a routerLink="/servizi" class="link-more">Tutti i 15 servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <span class="servizio-card__icon" aria-hidden="true">{{ s.icona }}</span>
          <h3>{{ s.nome }}</h3>
          <p class="servizio-card__desc">{{ s.descrizione }}</p>
          <div class="servizio-card__footer">
            <span class="servizio-card__prezzo">da €{{ s.prezzoOrario }}/ora</span>
            <span *ngIf="s.urgenza" class="badge-urgenza">Urgenza H24</span>
          </div>
        </li>
      </ul>
    </section>

    <!-- FAQ RAPIDE -->
    <section class="faq-section demo-container" *ngIf="faq$ | async as faq">
      <h2>Domande frequenti</h2>
      <ul class="faq-list">
        <li *ngFor="let item of faq.faq.slice(0, 4)" class="faq-item">
          <h3>{{ item.domanda }}</h3>
          <p>{{ item.risposta }}</p>
        </li>
      </ul>
    </section>

    <!-- CTA BAND -->
    <section class="cta-band">
      <div class="demo-container">
        <h2>Hai un'urgenza adesso?</h2>
        <p>Disponibili 24 ore su 24 — domeniche e festivi compresi. Chiama il numero verde gratuito.</p>
        <div class="hero-actions">
          <a href="tel:800123456" class="btn btn-urgenza">
            <span aria-hidden="true">📞</span> 800 123 456 — Gratuito
          </a>
          <a href="https://wa.me/393389001122" target="_blank" rel="noopener" class="btn btn-wa">
            <span aria-hidden="true">💬</span> WhatsApp
          </a>
          <a routerLink="/preventivo" class="btn btn-secondary-inv">Richiedi preventivo</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .urgenza-banner {
        background: var(--color-accent);
        color: #ffffff;
        text-align: center;
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
      .urgenza-banner__tel {
        color: #ffffff;
        font-weight: 800;
        font-size: 1rem;
        text-decoration: underline;
      }
      .hero {
        padding: 4rem 1rem 3.5rem;
        text-align: center;
        background: linear-gradient(180deg, #fff7ed 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(1.8rem, 5vw, 3.2rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
        line-height: 1.2;
      }
      .hero__accent {
        color: var(--color-accent);
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-stats {
        display: flex;
        justify-content: center;
        gap: 2.5rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
      }
      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .stat__num {
        font-size: 2rem;
        font-weight: 800;
        color: var(--color-accent);
        line-height: 1;
      }
      .stat__label {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        margin-top: 0.2rem;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.7rem 1.4rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-urgenza {
        background: var(--color-accent);
        color: #ffffff;
        font-size: 1rem;
        padding: 0.8rem 1.6rem;
      }
      .btn-urgenza:hover {
        background: #c2410c;
        text-decoration: none;
        color: #ffffff;
      }
      .btn-preventivo {
        background: var(--color-fg-default);
        color: #ffffff;
      }
      .btn-preventivo:hover {
        background: #32383f;
        text-decoration: none;
        color: #ffffff;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .btn-wa {
        background: #25d366;
        color: #ffffff;
      }
      .btn-wa:hover {
        background: #1da851;
        text-decoration: none;
        color: #ffffff;
      }
      .btn-secondary-inv {
        background: transparent;
        color: #ffffff;
        border: 1px solid rgba(255,255,255,0.4);
      }
      .btn-secondary-inv:hover {
        background: rgba(255,255,255,0.1);
        text-decoration: none;
        color: #ffffff;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-subtle);
      }
      .feature-icon {
        font-size: 2.2rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured {
        padding: 3rem 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
      }
      .servizio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .servizio-card__icon {
        font-size: 1.8rem;
      }
      .servizio-card h3 {
        margin: 0;
        font-size: 1rem;
      }
      .servizio-card__desc {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        flex: 1;
      }
      .servizio-card__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 0.25rem;
      }
      .servizio-card__prezzo {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 0.9rem;
      }
      .badge-urgenza {
        background: #fff7ed;
        color: var(--color-accent);
        border: 1px solid #fed7aa;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
      }
      .faq-section {
        padding: 3rem 1rem 4rem;
        background: var(--color-bg-subtle);
        margin: 0 0 0;
      }
      .faq-section h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
        gap: 1.25rem;
      }
      .faq-item {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .faq-item h3 {
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
        color: var(--color-fg-default);
      }
      .faq-item p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-fg-muted);
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
        font-size: clamp(1.5rem, 4vw, 2.2rem);
      }
      .cta-band p {
        color: rgba(255,255,255,0.8);
        margin: 0 0 2rem;
      }
      @media (max-width: 600px) {
        .faq-list {
          grid-template-columns: 1fr;
        }
        .hero-stats {
          gap: 1.5rem;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly serviziFeatured$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi.filter((s) => s.urgenza).slice(0, 6))
  );

  readonly faq$ = this.mockData.faq$;
}
