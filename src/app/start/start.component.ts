import { Component } from '@angular/core';
import { IonIcon, IonTabBar, IonTabButton, IonTabs  } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { CommonModule } from '@angular/common'; // Hier hinzufügen

@Component({
  selector: 'app-start',
  templateUrl: 'start.component.html',
  styleUrls: ['start.component.css'],
  imports: [CommonModule, IonIcon, IonTabBar, IonTabButton, IonTabs],
})
export class StartComponent {
  constructor() {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({ library, playCircle, radio, search });
  }
}