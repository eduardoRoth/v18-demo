import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { FullEpisodeResponse } from '../../models/episodes.model';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    JsonPipe,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonSpinner,
    DatePipe,
    IonText,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/episodes"></ion-back-button>
        </ion-buttons>
        <ion-title> Episode detail </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      @if (episode(); as episode) {
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>
              Episode {{ episode.mal_id }}
            </ion-card-subtitle>
            <ion-card-title>
              <ion-text color="primary">
                {{ episode.title }}
              </ion-text>
            </ion-card-title>
            <ion-card-subtitle>
              Aired
              <ion-text color="tertiary">
                {{ episode.aired | date: 'MMMM d, yyyy' }}
              </ion-text>
            </ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <p>
              {{ episode.synopsis }}
            </p>
          </ion-card-content>
        </ion-card>
      } @else {
        <div class="ion-text-center ion-padding">
          <ion-spinner></ion-spinner>
        </div>
      }
    </ion-content>
  `,
  styles: ``,
})
export class EpisodePage {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  constructor() {}
  episode = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id) => !!id),
      switchMap((id) =>
        this.http.get<FullEpisodeResponse>(
          `https://api.jikan.moe/v4/anime/35790/episodes/${id}`,
        ),
      ),
      map((response) => response.data),
    ),
  );
}
