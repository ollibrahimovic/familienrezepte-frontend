import { Component, NgZone, Optional, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { AlertController, IonApp, IonRouterOutlet,Platform } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline,heartOutline, addCircleOutline, heart, removeOutline, closeOutline, restaurant, list,close } from 'ionicons/icons';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private router: Router, private zone: NgZone, private platform: Platform, private location: Location,  // Hier hinzufügen
    private alertController: AlertController,
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
      
        console.log('appUrlOpen', event.url);
        this.zone.run(() => {
            if (event.url.includes(environment.frontend)) {
              const slug = event.url.split(".com").pop();
              console.log('slug', slug);

              if (slug) {
                  console.log('this.router.navigateByUrl(slug);', slug);

                  this.router.navigateByUrl(slug);
              }
            }
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
           
            var path = this.location.path();
            console.log('old path', path)  ;      
            this.location.back();
            
            if(path === '/app/home' && path === this.location.path()) {              
              this.presentCancelAlert()
            }
          });
        }
      });
    });

  }

  async presentCancelAlert() {
    const alert = await this.alertController.create({
      header: 'Verlassen',
      message: 'Wollen Sie die App verlassen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel'
        },
        {
          text: 'Ja',
          handler: () => {            
            App.exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
}
