// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000',
  frontend: 'http://localhost:8100',
  firebase: {
    apiKey: "AIzaSyCukubMJi_vfYogJwDBCuNSIA77StbLgoQ",
    authDomain: "hukedev-familyrecipes.firebaseapp.com",
    projectId: "hukedev-familyrecipes",
    storageBucket: "hukedev-familyrecipes.firebasestorage.app",
    messagingSenderId: "121613746719",
    appId: "1:121613746719:web:b73f503c156c0265414b2a",
    measurementId: "G-002FVW32DK"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
