import 'package:flutter/material.dart';

class ButtonCustom extends StatelessWidget {
  final Color customCorlor;
  final String text;
  final void Function()? onTap;

  const ButtonCustom(
      {super.key,
      required this.customCorlor,
      required this.text,
      required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        height: 60,
        margin: EdgeInsets.symmetric(horizontal: 25),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          color: customCorlor,
        ),
        child: Center(
          child: Text(
            text,
            style: TextStyle(
                color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }
}
