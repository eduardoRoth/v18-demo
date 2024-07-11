import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  imports: [IonHeader, IonContent, IonToolbar, IonTitle],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content> </ion-content>
  `,
  styles: ``,
  standalone: true,
})
export class HomeComponent {
  constructor() {}
}
