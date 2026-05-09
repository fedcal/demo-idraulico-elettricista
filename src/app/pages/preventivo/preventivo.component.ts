import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-preventivo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Richiedi un preventivo gratuito</h1>
        <p>Compila il modulo — risposta entro 2 ore (urgenze: chiama subito il <a href="tel:800123456">800 123 456</a>).</p>
      </div>
    </section>

    <article class="demo-container content">
      <div class="prev-layout">

        <!-- FORM -->
        <section class="form-block">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">

            <fieldset class="fieldset">
              <legend>Dati personali</legend>
              <div class="field">
                <label for="nome">Nome e cognome *</label>
                <input id="nome" type="text" formControlName="nome" autocomplete="name" />
              </div>
              <div class="row2">
                <div class="field">
                  <label for="telefono">Telefono *</label>
                  <input id="telefono" type="tel" formControlName="telefono" autocomplete="tel" />
                </div>
                <div class="field">
                  <label for="email">Email *</label>
                  <input id="email" type="email" formControlName="email" autocomplete="email" />
                </div>
              </div>
              <div class="field">
                <label for="indirizzo">Indirizzo intervento *</label>
                <input id="indirizzo" type="text" formControlName="indirizzo" placeholder="Via, numero, città" />
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend>Dettagli intervento</legend>
              <div class="field" *ngIf="servizi$ | async as tipi">
                <label for="tipoIntervento">Tipo di intervento *</label>
                <select id="tipoIntervento" formControlName="tipoIntervento">
                  <option value="">— Seleziona servizio —</option>
                  <option *ngFor="let s of tipi" [value]="s.id">{{ s.icona }} {{ s.nome }}</option>
                </select>
              </div>
              <div class="field">
                <label>Urgenza?</label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input type="radio" formControlName="urgenza" value="si" />
                    <span class="radio-badge radio-badge--si">Si, ho urgenza (H24)</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" formControlName="urgenza" value="no" />
                    <span class="radio-badge radio-badge--no">No, posso aspettare</span>
                  </label>
                </div>
              </div>
              <div class="field">
                <label for="descrizione">Descrivi il problema *</label>
                <textarea id="descrizione" formControlName="descrizione" rows="4"
                  placeholder="Descrivi brevemente il problema o l'intervento richiesto..."></textarea>
              </div>
              <div class="field">
                <label for="foto">Foto del problema (mock upload)</label>
                <div class="foto-upload" (click)="mockFotoClick()" (keydown.enter)="mockFotoClick()" tabindex="0" role="button" aria-label="Carica foto">
                  <span aria-hidden="true">📷</span>
                  <span *ngIf="!fotoMockNome()">Clicca per caricare una foto (max 5MB)</span>
                  <span *ngIf="fotoMockNome()" class="foto-nome">{{ fotoMockNome() }}</span>
                </div>
                <p class="field-hint">Demo: nessuna foto viene realmente caricata.</p>
              </div>
            </fieldset>

            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679) per la gestione della richiesta di preventivo. *
              </label>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-submit" [disabled]="form.invalid">
                Invia richiesta preventivo
              </button>
            </div>
            <p class="form-disclaimer">
              Demo non funzionale: nessuna richiesta viene realmente inviata. Per urgenze chiama il <a href="tel:800123456">800 123 456</a>.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou__icon" aria-hidden="true">✅</span>
              <h2>Richiesta ricevuta!</h2>
              <p>
                Grazie <strong>{{ form.value.nome }}</strong>. In un sito reale riceveresti una conferma email
                e un nostro tecnico ti ricontatterà
                <strong>{{ form.value.urgenza === 'si' ? 'entro 30 minuti' : 'entro 2 ore' }}</strong>
                al numero indicato.
              </p>
              <p *ngIf="form.value.urgenza === 'si'" class="urgenza-note">
                Hai indicato urgenza: per accelerare i tempi chiama anche il <a href="tel:800123456">800 123 456</a>.
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>

        <!-- INFO LATERALE -->
        <aside class="side-info">
          <div class="side-card side-card--urgenza">
            <h3>Urgenza? Chiama subito</h3>
            <a href="tel:800123456" class="tel-big">📞 800 123 456</a>
            <p>Gratuito — Attivi 24h/7g</p>
          </div>
          <div class="side-card">
            <h3>Perché sceglierci</h3>
            <ul class="side-list">
              <li>Preventivo scritto gratuito</li>
              <li>Tecnici abilitati D.M. 37/08</li>
              <li>Garanzia 12 mesi</li>
              <li>Fattura fiscale sempre</li>
              <li>Intervento in 30–60 min</li>
            </ul>
          </div>
          <div class="side-card">
            <h3>Orari ufficio</h3>
            <p class="side-orari">Lun–Ven: 08:00–19:00<br />Sabato: 08:00–13:00<br />Urgenze: 24h/7g</p>
          </div>
        </aside>

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
      .page-header p { color: var(--color-fg-muted); margin: 0; font-size: 0.95rem; }
      .content { padding: 3rem 1rem 4rem; }
      .prev-layout {
        display: grid;
        grid-template-columns: 1fr 280px;
        gap: 2.5rem;
        align-items: start;
      }
      @media (max-width: 780px) {
        .prev-layout { grid-template-columns: 1fr; }
        .side-info { order: -1; }
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
      }
      .fieldset {
        border: none;
        padding: 0;
        margin: 0 0 1.75rem;
      }
      legend {
        font-weight: 700;
        font-size: 1rem;
        margin-bottom: 1rem;
        color: var(--color-fg-default);
        padding: 0;
        width: 100%;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 0.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.3rem;
        color: var(--color-fg-default);
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .row2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      @media (max-width: 480px) { .row2 { grid-template-columns: 1fr; } }
      .radio-group {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 0.25rem;
      }
      .radio-label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        cursor: pointer;
      }
      .radio-badge {
        padding: 0.3rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.85rem;
        font-weight: 600;
      }
      .radio-badge--si {
        background: #fff7ed;
        color: var(--color-accent);
        border: 1px solid #fed7aa;
      }
      .radio-badge--no {
        background: #f0fdf4;
        color: var(--color-success);
        border: 1px solid #bbf7d0;
      }
      .foto-upload {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        border: 2px dashed var(--color-border);
        border-radius: var(--radius-sm);
        cursor: pointer;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        background: #ffffff;
        transition: border-color 0.15s ease;
      }
      .foto-upload:hover, .foto-upload:focus {
        border-color: var(--color-accent);
        outline: none;
      }
      .foto-nome { color: var(--color-success); font-weight: 600; }
      .field-hint { margin: 0.3rem 0 0; font-size: 0.75rem; color: var(--color-fg-muted); font-style: italic; }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }
      .field--checkbox input { margin-top: 0.2rem; flex-shrink: 0; }
      .field--checkbox label { font-weight: 400; font-size: 0.82rem; color: var(--color-fg-muted); }
      .form-actions { margin-bottom: 0.75rem; }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-submit {
        background: var(--color-accent);
        color: #ffffff;
        width: 100%;
        justify-content: center;
        font-size: 1rem;
      }
      .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
      .btn-submit:not(:disabled):hover { background: #c2410c; }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin: 0;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou__icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
      .thankyou h2 { color: var(--color-success); margin: 0 0 0.75rem; }
      .thankyou p { color: var(--color-fg-muted); margin: 0 0 0.75rem; }
      .urgenza-note { color: var(--color-accent); font-weight: 600; font-size: 0.9rem; }
      /* ASIDE */
      .side-info { display: flex; flex-direction: column; gap: 1rem; }
      .side-card {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .side-card--urgenza {
        background: var(--color-accent);
        color: #ffffff;
        border-color: transparent;
        text-align: center;
      }
      .side-card--urgenza h3 { color: #ffffff; margin: 0 0 0.75rem; font-size: 1rem; }
      .side-card--urgenza p { color: rgba(255,255,255,0.85); margin: 0.5rem 0 0; font-size: 0.85rem; }
      .tel-big {
        display: block;
        font-size: 1.3rem;
        font-weight: 800;
        color: #ffffff;
        text-decoration: none;
      }
      .tel-big:hover { text-decoration: underline; color: #ffffff; }
      .side-card h3 { margin: 0 0 0.75rem; font-size: 0.95rem; }
      .side-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
      .side-list li {
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        padding-left: 1rem;
        position: relative;
      }
      .side-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-success);
        font-weight: 700;
      }
      .side-orari { margin: 0; font-size: 0.875rem; color: var(--color-fg-muted); line-height: 1.6; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreventivoComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly submitted = signal(false);
  readonly fotoMockNome = signal<string | null>(null);

  readonly servizi$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi)
  );

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    indirizzo: ['', Validators.required],
    tipoIntervento: ['', Validators.required],
    urgenza: ['no', Validators.required],
    descrizione: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue]
  });

  mockFotoClick(): void {
    const fakeFiles = ['foto_perdita.jpg', 'guasto_caldaia.jpg', 'quadro_elettrico.jpg', 'wc_rotto.jpg'];
    const chosen = fakeFiles[Math.floor(Math.random() * fakeFiles.length)];
    this.fotoMockNome.set(chosen);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ urgenza: 'no', privacy: false });
    this.submitted.set(false);
    this.fotoMockNome.set(null);
  }
}
