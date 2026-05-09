// Tipi TypeScript per i dati mock di Tecnoservizi 24h — Idraulico Elettricista

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface ContattiAzienda {
  telefonoUrgenze: string;
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    facebook?: string;
    instagram?: string;
  };
}

export interface OrariApertura {
  urgenze: string;
  ufficio: string;
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface Prezzi {
  tariffaOraria: string;
  chiamataUrgenza: string;
  preventivoGratuito: boolean;
  garanziaMesi: number;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  indirizzo: Indirizzo;
  contatti: ContattiAzienda;
  orari: OrariApertura;
  prezzi: Prezzi;
  certificazioni: string[];
  metaSeo: MetaSeo;
}

export interface CategoriaServizio {
  id: string;
  nome: string;
  ordine: number;
}

export interface Servizio {
  id: number;
  categoria: string;
  nome: string;
  descrizione: string;
  prezzoOrario: number;
  urgenza: boolean;
  icona: string;
}

export interface ServiziData {
  categorie: CategoriaServizio[];
  servizi: Servizio[];
}

export interface Zona {
  id: number;
  nome: string;
  distanzaKm: number;
  municipio: string;
  tempoMedioMin: number;
  copertura: 'completa' | 'parziale';
}

export interface ZoneData {
  raggio: number;
  centroKm: string;
  zone: Zona[];
}

export interface Tecnico {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  specialita: string[];
  certificazioni: string[];
}

export interface TeamData {
  team: Tecnico[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface FaqData {
  faq: FaqItem[];
}
