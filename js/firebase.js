/* MoviesAura — Firebase foundation (Step 1) */
(function () {
  "use strict";

  var config = window.MoviesAuraFirebaseConfig;
  var firebaseReady = false;

  function hasRealConfig(value) {
    return typeof value === "string" && value.trim() !== "" && !value.includes("YOUR_");
  }

  if (!config) {
    console.warn("MoviesAura Firebase: configuration file was not loaded.");
    return;
  }

  var requiredKeys = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId"
  ];

  var configured = requiredKeys.every(function (key) {
    return hasRealConfig(config[key]);
  });

  if (!configured) {
    console.info("MoviesAura Firebase: configuration placeholders are still present. Firebase is not initialized yet.");
    window.MoviesAuraFirebase = {
      configured: false,
      app: null,
      db: null
    };
    return;
  }

  if (typeof firebase === "undefined") {
    console.error("MoviesAura Firebase: Firebase SDK failed to load.");
    return;
  }

  try {
    var app = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
    var db = firebase.firestore();
    firebaseReady = true;

    window.MoviesAuraFirebase = {
      configured: true,
      ready: firebaseReady,
      app: app,
      db: db,
      contents: db.collection("contents")
    };

    console.info("MoviesAura Firebase: Firestore foundation initialized.");
  } catch (error) {
    console.error("MoviesAura Firebase: initialization failed.", error);
    window.MoviesAuraFirebase = {
      configured: true,
      ready: false,
      app: null,
      db: null,
      error: error
    };
  }
})();
