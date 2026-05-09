# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Blu primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi logo SVG in `public/logo.svg`.

## Cambiare i metadati SEO

Edita `src/index.html` per title globale, meta description, Open Graph.

---

## Possibili Sviluppi Customizzabili

### Dominio Tecnico

1. **Preventivo AI da foto LLaVA**
   - Upload immagine problema
   - Detect tipo guasto (perdita, cortocircuito)
   - Stima costo automatica

2. **GPS tracking tecnico Uber-style**
   - Mappa cliente con ETA realtime
   - Notifica arrivo imminente

3. **Photo before/after con AI**
   - Documentazione completamento
   - Verify stato lavoro vs preventivo

### Operational

4. **Inventory parts auto-reorder**
   - Stock tracking cartucce/valvole
   - Alert minimo → ordine automatico

5. **Recurring maintenance contracts**
   - Caldaia annual service
   - A/C stagionale

6. **Emergency hotline 24/7**
   - Chatbot AI triage urgenza
   - Escalation tecnico on-call

### Routing & Fleet

7. **Multi-tecnico routing AI**
   - Assignment job → tecnico più vicino
   - Slot disponibilità realtime

8. **Fatturazione e-SDI integrata**
   - Ricevuta digitale immediata
   - Garanzia 24 mesi tracciata

### GDPR & Legal

9. **Attestato conformità impianto**
   - Upload documento post-intervento
   - Compliance verificabile

10. **Certificazioni tecnico**
    - Badge visibili cliente
    - Marchio qualità CNA/ADOC

11. **Pagamenti in-app**
    - Stripe/Satispay caparra preventivo

12. **Esportazione dossier cliente**
    - ZIP con foto + fatture

13. **SLA tracking visible**
    - Timer "tecnico in 23 minuti"

14. **Feedback NPS post-job**
    - Widget survey automatico

15. **Auto-fatturazione contratti**
    - Ciclo ricorrente caldaia
    - Invoice auto-generata

---

## Note Implementative

- **Stack**: Angular 21 SSR + Spring Boot + Ollama LLaVA
- **Deploy**: Vercel demo + VPS cliente e-SDI
- **Timeline**: 10–14 settimane per vertical full-featured
