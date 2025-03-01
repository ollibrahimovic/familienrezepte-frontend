import { Component, NgZone, Optional, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { AlertController, IonApp, IonRouterOutlet,Platform } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline,heartOutline, addCircleOutline, heart, removeOutline, closeOutline, restaurant, list,close, shareSocialOutline, camera } from 'ionicons/icons';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';

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
      'restaurant': restaurant,
      'share-social-outline': shareSocialOutline,
      'camera': camera
    });   

    Keyboard.setAccessoryBarVisible({ isVisible: true }); // Falls du eine Leiste über der Tastatur willst
    Keyboard.setResizeMode({ mode: KeyboardResize.Body }); // Alternativ 'ionic' testen
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            // Example url: https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            const slug = event.url.split(".com").pop();
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
