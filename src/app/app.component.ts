import { Component, NgZone, Optional, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { IonApp, IonRouterOutlet,Platform } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline,heartOutline, addCircleOutline, heart, removeOutline, closeOutline, restaurant, list,close } from 'ionicons/icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private router: Router, private zone: NgZone, private platform: Platform, private location: Location,  // Hier hinzufügen

    @Optional() private routerOutlet?: IonRouterOutlet
  ) {


    this.initializeApp();
   
    addIcons({
      'home-outline': homeOutline,
      'heart-outline': heartOutline,
      'add-circle-outline': addCircleOutline,
      'heart': heart,
      'remove-circle-outline': removeOutline,
      'close': close,
      'close-outline': closeOutline,
      'list': list,
      'restaurant': restaurant
    });   
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            // Example url: https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            ///https://familienrezepte.app/app/detail/67bee7b8e53d967336546457
            const slug = event.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // If no match, do nothing - let regular routing
            // logic take over
        });
    });

    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(999, () => {
        console.log('Back Pressed');
  
        // Wenn Router Outlet vorhanden und kann zurück navigieren
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        }
        // Ansonsten mit Angular Location zurück navigieren
        else {
          this.zone.run(() => {
            this.location.back();
          });
        }
      });
    });

  }
}
