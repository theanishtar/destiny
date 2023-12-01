import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:login_signup/SplashScreen.dart';
import 'package:login_signup/firebase_options.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:login_signup/view/chatPage.view.dart';
import 'package:login_signup/view/edit_profile.view.dart';
import 'package:login_signup/view/login.view.dart';
import 'package:login_signup/view/login_signup_screen.dart';
import 'package:login_signup/view/screens/message.view.dart';
import 'package:login_signup/view/screens/profile.view.dart';
import 'package:login_signup/view/signup.view.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: Color(0xFFF5F5F3),
        appBarTheme: AppBarTheme(
          backgroundColor: Color(0xFFF5F5F3),
          foregroundColor: Color(0xFF113953),
        ),
      ),
      routes: {
        "/": (context) => SplashScreen(), // or whatever title you want
        "loginView": (context) => LoginView(),
        "signupView": (context) => SignupView(),
        "messageView": (context) => MessageView(),
        "bottomNavbar": (context) => BottomNavBar(),
        "chatPage": (context) => ChatPage(),
        "profile": (context) => ProfileView(),
        "editProfile": (context) => EditProfile(),
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  final String title;

  const MyHomePage({Key? key, required this.title}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline6,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
