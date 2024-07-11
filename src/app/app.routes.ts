import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'episodes',
  },
  {
    path: 'episodes',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/episodes/episodes.page').then((m) => m.EpisodesPage),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/episode/episode.page').then((m) => m.EpisodePage),
      },
    ],
  },
];
