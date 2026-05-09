import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, NgClass, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Zone coperte a Roma</h1>
        <p>Interveniamo in tutta Roma e nei comuni entro 30 km dal centro. Urgenze H24 in tutte le zone.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="zone$ | async as data">
      <div class="zone-intro">
        <div class="zone-intro__badge">
          <span class="badge-raggio">Raggio {{ data.raggio }} km</span>
          <span class="badge-centro">da {{ data.centroKm }}</span>
        </div>
        <p>
          Le zone con <strong>copertura completa</strong> garantiscono intervento entro 45 minuti.
          Le zone <strong>parziale</strong> (comuni extra-Roma) richiedono un tempo stimato di 40–55 minuti.
        </p>
      </div>

      <div class="zone-legend">
        <span class="legend-item legend-completa">Copertura completa</span>
        <span class="legend-item legend-parziale">Copertura parziale (comuni)</span>
      </div>

      <ul class="zone-grid">
        <li
          *ngFor="let z of data.zone"
          class="zona-card"
          [ngClass]="{ 'zona-card--parziale': z.copertura === 'parziale' }"
        >
          <div class="zona-card__head">
            <h3>{{ z.nome }}</h3>
            <span
              class="zona-badge"
              [ngClass]="{
                'zona-badge--completa': z.copertura === 'completa',
                'zona-badge--parziale': z.copertura === 'parziale'
              }"
            >{{ z.copertura === 'completa' ? 'Completa' : 'Parziale' }}</span>
          </div>
          <ul class="zona-meta">
            <li>
              <span class="meta-label">Municipio</span>
              <span>{{ z.municipio }}</span>
            </li>
            <li>
              <span class="meta-label">Distanza</span>
              <span>{{ z.distanzaKm === 0 ? 'Centro' : z.distanzaKm + ' km' }}</span>
            </li>
            <li>
              <span class="meta-label">Tempo medio</span>
              <span>~{{ z.tempoMedioMin }} min</span>
            </li>
          </ul>
        </li>
      </ul>

      <div class="zone-cta">
        <h2>La tua zona non è in lista?</h2>
        <p>Contattaci — valutiamo zone non elencate in base alla disponibilità dei tecnici.</p>
        <div class="zone-cta__actions">
          <a href="tel:800123456" class="btn btn-urgenza">📞 800 123 456 — Chiama adesso</a>
          <a routerLink="/preventivo" class="btn btn-secondary">Richiedi preventivo</a>
        </div>
      </div>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0; }
      .content { padding: 3rem 1rem; }
      .zone-intro {
        margin-bottom: 2rem;
      }
      .zone-intro__badge {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 1rem;
        flex-wrap: wrap;
      }
      .badge-raggio {
        background: var(--color-accent);
        color: #ffffff;
        font-weight: 700;
        padding: 0.4rem 1rem;
        border-radius: 9999px;
        font-size: 0.9rem;
      }
      .badge-centro {
        font-size: 0.875rem;
        color: var(--color-fg-muted);
      }
      .zone-intro p {
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        margin: 0;
      }
      .zone-legend {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
      }
      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.85rem;
      }
      .legend-item::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .legend-completa::before { background: #1a7f37; }
      .legend-parziale::before { background: #9a6700; }
      .zone-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 3rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
      }
      .zona-card {
        padding: 1.1rem 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .zona-card--parziale {
        background: #fffbeb;
        border-color: #fde68a;
      }
      .zona-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .zona-card__head h3 {
        margin: 0;
        font-size: 0.95rem;
      }
      .zona-badge {
        font-size: 0.68rem;
        font-weight: 700;
        padding: 0.15rem 0.45rem;
        border-radius: 9999px;
        flex-shrink: 0;
      }
      .zona-badge--completa {
        background: #dafbe1;
        color: var(--color-success);
      }
      .zona-badge--parziale {
        background: #fff8c5;
        color: var(--color-warning);
      }
      .zona-meta {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
      .zona-meta li {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
      }
      .meta-label { font-weight: 600; color: var(--color-fg-default); }
      .zone-cta {
        text-align: center;
        padding: 3rem 2rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin-top: 1rem;
      }
      .zone-cta h2 { margin: 0 0 0.75rem; }
      .zone-cta p { color: var(--color-fg-muted); margin: 0 0 1.5rem; }
      .zone-cta__actions {
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
      }
      .btn-urgenza:hover {
        background: #c2410c;
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZoneComponent {
  private readonly mockData = inject(MockDataService);

  readonly zone$ = this.mockData.zone$;
}
