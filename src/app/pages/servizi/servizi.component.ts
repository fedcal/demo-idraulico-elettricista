import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Servizio } from '../../data/types';

interface CategoriaView {
  id: string;
  nome: string;
  servizi: Servizio[];
}

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri servizi</h1>
        <p>15 interventi idraulici ed elettrici — preventivo gratuito, intervento H24 per urgenze.</p>
      </div>
    </section>

    <div class="urgenza-strip">
      <div class="demo-container urgenza-strip__inner">
        <span aria-hidden="true">🚨</span>
        <strong>Urgenza? Chiamaci subito:</strong>
        <a href="tel:800123456" class="urgenza-tel">800 123 456</a>
        <span class="sep" aria-hidden="true">|</span>
        <a routerLink="/preventivo" class="urgenza-prev">oppure richiedi preventivo →</a>
      </div>
    </div>

    <article class="demo-container content" *ngIf="view$ | async as view">
      <section *ngFor="let cat of view" class="categoria-block" [id]="cat.id">
        <h2>{{ cat.nome }}</h2>
        <ul class="servizi-list">
          <li *ngFor="let s of cat.servizi" class="servizio-item">
            <div class="servizio-item__header">
              <span class="servizio-item__icon" aria-hidden="true">{{ s.icona }}</span>
              <h3>{{ s.nome }}</h3>
              <span class="servizio-item__prezzo">€{{ s.prezzoOrario }}/ora</span>
            </div>
            <p class="servizio-item__desc">{{ s.descrizione }}</p>
            <div class="servizio-item__footer">
              <span *ngIf="s.urgenza" class="badge-urgenza">Intervento urgenze H24</span>
              <a routerLink="/preventivo" class="link-prev">Richiedi preventivo →</a>
            </div>
          </li>
        </ul>
      </section>

      <div class="servizi-note">
        <p>
          Tariffe indicative. Il preventivo scritto viene sempre rilasciato prima dell'inizio dei lavori.
          Supplemento urgenza notturna (20:00–08:00) e festivi: €30. IVA inclusa nei prezzi.
        </p>
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
      .urgenza-strip {
        background: #fff7ed;
        border-bottom: 1px solid #fed7aa;
      }
      .urgenza-strip__inner {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex-wrap: wrap;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        font-size: 0.95rem;
      }
      .urgenza-tel {
        color: var(--color-accent);
        font-weight: 800;
        font-size: 1.05rem;
        text-decoration: none;
      }
      .urgenza-tel:hover { text-decoration: underline; }
      .urgenza-prev {
        color: var(--color-fg-muted);
        text-decoration: none;
        font-size: 0.875rem;
      }
      .urgenza-prev:hover { color: var(--color-accent); }
      .sep { color: var(--color-border); }
      .content { padding: 3rem 1rem; }
      .categoria-block {
        margin-bottom: 3.5rem;
      }
      .categoria-block h2 {
        font-size: 1.4rem;
        margin: 0 0 1.25rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.25rem;
      }
      .servizio-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .servizio-item__header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .servizio-item__icon { font-size: 1.6rem; }
      .servizio-item__header h3 {
        margin: 0;
        font-size: 1rem;
        flex: 1;
      }
      .servizio-item__prezzo {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 0.9rem;
        flex-shrink: 0;
      }
      .servizio-item__desc {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        flex: 1;
      }
      .servizio-item__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.25rem;
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
      .link-prev {
        color: var(--color-accent);
        font-size: 0.8rem;
        font-weight: 600;
        text-decoration: none;
        margin-left: auto;
      }
      .link-prev:hover { text-decoration: underline; }
      .servizi-note {
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        padding: 1rem 1.5rem;
        margin-top: 1rem;
      }
      .servizi-note p {
        margin: 0;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.servizi$.pipe(
    map((data) =>
      data.categorie
        .sort((a, b) => a.ordine - b.ordine)
        .map((cat): CategoriaView => ({
          id: cat.id,
          nome: cat.nome,
          servizi: data.servizi.filter((s) => s.categoria === cat.id)
        }))
    )
  );
}
