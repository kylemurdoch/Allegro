const firebaseConfig = {
    apiKey: "AIzaSyB6ou-aLMhUuZFbsJIiWXoF4bttM0p74jU",
    authDomain: "comp2930allegro.firebaseapp.com",
    databaseURL: "https://comp2930allegro.firebaseio.com",
    projectId: "comp2930allegro",
    storageBucket: "comp2930allegro.appspot.com",
    messagingSenderId: "753719895600",
    appId: "1:753719895600:web:3807ab0a81ddf827"
};
firebase.initializeApp(firebaseConfig);
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "../menu.html",
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>"
};

// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);