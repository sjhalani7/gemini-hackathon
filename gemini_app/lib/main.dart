import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:gemini_app/firebase_options.dart';
import 'package:gemini_app/app.dart';

void main() async {
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const App());
}
