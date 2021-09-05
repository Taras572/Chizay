// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_URL: 'http://localhost:3000/',
  
  firebaseConfig : {
    apiKey: "AIzaSyBPjL3U_H0sNp2GCAV9eYCy0w7tFq35Bc8",
    authDomain: "place-c36d0.firebaseapp.com",
    projectId: "place-c36d0",
    storageBucket: "place-c36d0.appspot.com",
    messagingSenderId: "283704752937",
    appId: "1:283704752937:web:0a0d173d64ece6d87b9538"
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
