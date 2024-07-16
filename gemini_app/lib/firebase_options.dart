// File generated by FlutterFire CLI.
// ignore_for_file: type=lint
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyCOGdMy6SALzTqNfVy8MO2FKli0nCBTfEY',
    appId: '1:903463834709:web:e86312fdc74634d040f0dc',
    messagingSenderId: '903463834709',
    projectId: 'gemini-dev-competition',
    authDomain: 'gemini-dev-competition.firebaseapp.com',
    storageBucket: 'gemini-dev-competition.appspot.com',
    measurementId: 'G-NY43MWTMEE',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyAVcqZkYXcO_eyoAZwpiw7PTiHRJBu84xE',
    appId: '1:903463834709:android:df887790a2e24ba940f0dc',
    messagingSenderId: '903463834709',
    projectId: 'gemini-dev-competition',
    storageBucket: 'gemini-dev-competition.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyCpLCVWmLYzWSIqy4ZPaH9k1n1kbVCf3ew',
    appId: '1:903463834709:ios:b923fb4b13e708db40f0dc',
    messagingSenderId: '903463834709',
    projectId: 'gemini-dev-competition',
    storageBucket: 'gemini-dev-competition.appspot.com',
    iosBundleId: 'com.example.geminiApp',
  );

}