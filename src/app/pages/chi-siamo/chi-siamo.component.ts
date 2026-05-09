import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Dal 2008 al servizio di Roma — 5 tecnici certificati, oltre 50.000 interventi completati.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>La storia di Tecnoservizi 24h</h2>
        <p>
          Tecnoservizi 24h nasce nel 2008 dall'iniziativa di Luca Romano, idraulico e termoidraulico con oltre 22 anni
          di esperienza maturata nei cantieri romani. L'idea era semplice quanto necessaria: offrire un servizio di
          pronto intervento idraulico ed elettrico davvero affidabile, disponibile ogni ora del giorno e della notte,
          con prezzi trasparenti e garanzia scritta.
        </p>
        <p>
          In 17 anni di attività il team si è ampliato fino a 5 tecnici specializzati — idraulici, termoidraulici ed
          elettricisti — tutti con abilitazioni D.M. 37/08 e assicurazione RC professionale. Oggi copriamo Roma e
          un raggio di 30 km, intervenendo su privati, condomini e aziende.
        </p>
      </section>

      <section class="valori">
        <h2>I nostri impegni</h2>
        <ul class="valori-grid">
          <li>
            <h3>Trasparenza</h3>
            <p>Preventivo scritto sempre rilasciato prima di iniziare. Nessun costo nascosto, sempre fattura fiscale.</p>
          </li>
          <li>
            <h3>Competenza</h3>
            <p>Solo tecnici abilitati D.M. 37/08. Rilasciamo dichiarazione di conformità per ogni impianto installato.</p>
          </li>
          <li>
            <h3>Garanzia</h3>
            <p>12 mesi su manodopera e materiali. Se il problema si ripresenta, ritorniamo senza costi aggiuntivi.</p>
          </li>
          <li>
            <h3>Puntualità</h3>
            <p>Tempo medio intervento 30–60 minuti dall'emergenza. Rispettiamo sempre gli appuntamenti concordati.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as teamData">
        <h2>Il team</h2>
        <ul class="team-grid">
          <li *ngFor="let t of teamData.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ t.nome.charAt(0) }}</div>
            <h3>{{ t.nome }}</h3>
            <p class="team-card__role">{{ t.ruolo }}</p>
            <p class="team-card__bio">{{ t.bio }}</p>
            <p class="team-card__exp">{{ t.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of t.specialita">{{ s }}</li>
            </ul>
            <ul class="team-card__cert">
              <li *ngFor="let c of t.certificazioni">✓ {{ c }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="certif" *ngIf="info$ | async as info">
        <h2>Certificazioni e abilitazioni</h2>
        <ul class="certif-list">
          <li *ngFor="let c of info.certificazioni">
            <span aria-hidden="true">🏅</span> {{ c }}
          </li>
        </ul>
      </section>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 { margin-bottom: 1rem; }
      .story p { line-height: 1.7; margin-bottom: 1rem; color: var(--color-fg-muted); }
      .valori { margin-bottom: 4rem; }
      .valori h2 { text-align: center; margin-bottom: 2rem; }
      .valori-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .valori-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .valori-grid h3 { margin: 0 0 0.5rem; color: var(--color-accent); }
      .valori-grid p { margin: 0; color: var(--color-fg-muted); font-size: 0.9rem; }
      .team { margin-bottom: 4rem; }
      .team h2 { text-align: center; margin-bottom: 2rem; }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 { margin: 0 0 0.25rem; }
      .team-card__role { margin: 0 0 0.75rem; color: var(--color-accent); font-weight: 600; font-size: 0.875rem; }
      .team-card__bio { font-size: 0.875rem; color: var(--color-fg-muted); margin-bottom: 0.5rem; text-align: left; }
      .team-card__exp { font-size: 0.8rem; font-weight: 600; margin-bottom: 0.5rem; }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0 0 0.75rem;
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        padding: 0.2rem 0.45rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .team-card__cert {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
      }
      .team-card__cert li {
        font-size: 0.72rem;
        color: var(--color-success);
        margin-bottom: 0.2rem;
      }
      .certif { margin-bottom: 2rem; }
      .certif h2 { margin-bottom: 1.5rem; }
      .certif-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 0.75rem;
      }
      .certif-list li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-sm);
        font-size: 0.9rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly info$ = this.mockData.info$;
}
