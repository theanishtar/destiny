// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
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
        return macos;
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
    apiKey: 'AIzaSyBJbb35x5IWeD8LaAptFOARDOCz-oEJid4',
    appId: '1:657490885713:web:1739dde38a29f027e20c70',
    messagingSenderId: '657490885713',
    projectId: 'destiny-davisy',
    authDomain: 'destiny-davisy.firebaseapp.com',
    storageBucket: 'destiny-davisy.appspot.com',
    measurementId: 'G-2H8D03768X',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyA9TJHd9udWXWPcSMBxvNz2nV0E8Wg75F0',
    appId: '1:657490885713:android:b0b85967f0ba978ae20c70',
    messagingSenderId: '657490885713',
    projectId: 'destiny-davisy',
    storageBucket: 'destiny-davisy.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyD0May3l30MwDBhgQw8YILEaiEEZytGNmQ',
    appId: '1:657490885713:ios:7283cb6616ef4ce1e20c70',
    messagingSenderId: '657490885713',
    projectId: 'destiny-davisy',
    storageBucket: 'destiny-davisy.appspot.com',
    iosBundleId: 'com.example.loginSignup',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyD0May3l30MwDBhgQw8YILEaiEEZytGNmQ',
    appId: '1:657490885713:ios:010c46749e48528be20c70',
    messagingSenderId: '657490885713',
    projectId: 'destiny-davisy',
    storageBucket: 'destiny-davisy.appspot.com',
    iosBundleId: 'com.example.loginSignup.RunnerTests',
  );
}
