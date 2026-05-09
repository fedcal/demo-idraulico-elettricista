# Tier di Funcionalità

## Tier Avanzato — €4.500–6.000 (380 ore)

Destinato a **reti di tecnici** con urgenza di automazione e gestione fleet.

### Core Features

1. **Preventivo AI da foto**
   - Upload immagine problema (rubinetto, pompa, interruttore)
   - Ollama LLaVA analizza tipo guasto + severity
   - Stima costo automatica basata su manuale prezzi

2. **GPS tracking tecnico realtime**
   - Mappa cliente vede ETA tecnico (Uber-style)
   - Tecnico condivide posizione durante job
   - Job completed notification automatica

3. **Photo before/after**
   - Cliente carica foto problema iniziale
   - Tecnico documenta completamento con foto
   - AI verify stato lavoro vs preventivo

4. **Inventory parts auto-reorder**
   - Tracking cartucce, valvole, sanitari
   - Alert stock minimo → ordine automatico supplier
   - Costo stimato prossima settimana

5. **Recurring maintenance contracts**
   - Caldaia annual service scheduling
   - Condizionatore stagionale (inizio estate/inverno)
   - Notifiche cliente + pre-compilate fatture

6. **Emergency hotline 24/7**
   - Chatbot AI triage urgenza
   - Livello 1: diagnosi remote IA
   - Escalation a tecnico on-call

7. **Multi-tecnico routing AI**
   - Job assignment → tecnico più vicino (distanza/skills)
   - Slot disponibili real-time
   - Push notification accettazione

8. **Fatturazione e-SDI integrata**
   - Ricevuta digitale immediata dopo job
   - Garanzia 24 mesi automatica nella fattura
   - Cassa Edile / Conti Correnti Postali supportati

### ROI Stimato
+€3.000–5.000/anno per tecnico (acquisition + retention + upsell maintenance)

---

## Customization Consigliate

- **Attestato di conformità**: upload documento impianto post-intervento
- **Certificazioni tecnico**: badge visibili cliente (ADOC, marchio qualità Cna)
- **Pagamenti in-app**: integrazione Stripe/Satispay per caparra preventivo
- **Esportazione dossier cliente**: folder zip con tutte le foto + fatture
- **SLA tracking**: timer visibile cliente "tecnico in 23 minuti"
- **Feedback NPS**: widget post-job survey
- **Materiali forniti**: listing con foto articoli installati
- **Preventivi storici**: search archive cliente per rifare same lavoro
- **Auto-fatturazione**: ciclo ricorrente caldaia auto-genere fattura
- **Report manutenzione annuale**: analisi trend guasti per preventiva
- **Customer KYC**: verifica ISTAT domiciliato prima scheduling
- **Garanzia estesa**: upsell polizza +24 mesi extra

---

## Note Tecniche

- **Modello IA**: Ollama `llama3.1:8b` + `llava:7b` vision (VPS Hetzner)
- **Database**: PostgreSQL + Redis cache (60s TTL tracking)
- **Compliance**: e-fatturazione SDI 1.9.1, GDPR dati cliente
- **Browser compat**: Chrome 120+, Safari 17+ (mobile-first)
