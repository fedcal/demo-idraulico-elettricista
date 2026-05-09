import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Tecnoservizi 24h — Idraulico ed Elettricista Roma H24'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — Tecnoservizi 24h'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Tecnoservizi 24h'
  },
  {
    path: 'zone',
    loadComponent: () => import('./pages/zone/zone.component').then((m) => m.ZoneComponent),
    title: 'Zone copertura Roma — Tecnoservizi 24h'
  },
  {
    path: 'preventivo',
    loadComponent: () => import('./pages/preventivo/preventivo.component').then((m) => m.PreventivoComponent),
    title: 'Richiedi preventivo — Tecnoservizi 24h'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
