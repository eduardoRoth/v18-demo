import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';
import { EpisodesResponse } from '../../models/episodes.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonAvatar,
    IonLabel,
    IonNote,
    IonButton,
    IonIcon,
    DecimalPipe,
    IonThumbnail,
    RouterLink,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title>Anime</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      @for (episode of episodes(); track episode.mal_id; let odd = $odd) {
        <ion-item
          [class]="odd ? 'odd' : 'even'"
          lines="none"
          button
          [detail]="true"
          [routerLink]="'' + episode.mal_id"
        >
          <ion-thumbnail slot="start">
            <img [src]="episode.images.jpg.image_url" [alt]="episode.title" />
          </ion-thumbnail>
          <ion-label>
            <p>
              {{ episode.episode }}
            </p>
            <h2>
              <strong>{{ episode.title }}</strong>
            </h2>
          </ion-label>
        </ion-item>
      } @empty {
        <ion-item lines="none">
          <ion-label class="ion-text-center"> No episodes </ion-label>
        </ion-item>
      }
    </ion-content>
  `,
  styles: `
    .odd {
      --background: var(--ion-color-light);
    }
  `,
})
export class EpisodesPage {
  private readonly http = inject(HttpClient);
  episodes = toSignal(
    this.http
      .get<EpisodesResponse>(
        `https://api.jikan.moe/v4/anime/35790/videos/episodes`,
      )
      .pipe(
        map((response) => response.data),
        map((episodes) => episodes.sort((a, b) => a.mal_id - b.mal_id)),
      ),
  );
  constructor() {
    addIcons({
      star,
    });
  }
}
