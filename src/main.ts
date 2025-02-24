import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { homeOutline, heartOutline, addCircleOutline, heart, removeOutline, close, closeOutline, list, restaurant } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);


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

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ],
});
