import app from './firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC7qGTLWX2SoVb0WFJ4skewuS_QX04onSY",
    authDomain: "app-react-redux-2d70d.firebaseapp.com",
    projectId: "app-react-redux-2d70d",
    storageBucket: "app-react-redux-2d70d.appspot.com",
    messagingSenderId: "687164659652",
    appId: "1:687164659652:web:59ef7c7fba72a983a03691"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

const auth = app.auth()

export { auth, app }