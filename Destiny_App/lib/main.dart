import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:login_signup/view/chatPage.view.dart';
import 'package:login_signup/view/edit_profile.view.dart';
import 'package:login_signup/view/login.view.dart';
import 'package:login_signup/view/login_signup_screen.dart';
import 'package:login_signup/view/screens/message.view.dart';
import 'package:login_signup/view/screens/profile.view.dart';
import 'package:login_signup/view/signup.view.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          scaffoldBackgroundColor: Color(0xFFF5F5F3),
          appBarTheme: AppBarTheme(
            backgroundColor: Color(0xFFF5F5F3),
            foregroundColor: Color(0xFF113953),
          )),
      // home: MessageView(),
      routes: {
        "/": (context) => HomeScreen(),
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
  const MyHomePage({super.key, required this.title});
  final String title;
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
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
