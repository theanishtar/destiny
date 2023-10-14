import 'package:flutter/material.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/bottomnavbar.dart';

class ButtonGlobalSignup extends StatelessWidget {
  const ButtonGlobalSignup({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.pushNamed(context, "bottomNavbar");
      },
      child: Container(
        alignment: Alignment.center,
        height: 55,
        decoration: BoxDecoration(
          color: GlobalColors.mainColor,
          borderRadius: BorderRadius.circular(6),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
            ),
          ],
        ),
        child: const Text(
          "Đăng ký",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
        ),
      ),
    );
  }
}
