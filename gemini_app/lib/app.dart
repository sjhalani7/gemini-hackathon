import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:gemini_app/pages/login_page.dart';
import 'package:gemini_app/pages/home_page.dart';

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  void initState() {
    super.initState();

    // wait for auth listener to be setup
    wait();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gemini App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: StreamBuilder(
        initialData: null,
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) =>
            snapshot.data != null ? const HomePage() : const LoginPage(),
      ),
    );
  }

  Future<void> wait() async =>
      await Future.delayed(const Duration(milliseconds: 500));
}
