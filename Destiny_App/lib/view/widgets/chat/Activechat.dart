import 'package:flutter/material.dart';

class ActiveChat extends StatelessWidget {
  const ActiveChat({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: 25, left: 5),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: [
            for (int i = 0; i < 30; i++)
              Padding(
                padding: EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                child: Container(
                  width: 65,
                  height: 65,
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(35),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.5),
                          blurRadius: 10,
                          spreadRadius: 2,
                          offset: Offset(0, 3),
                        )
                      ]),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(35),
                    child: Image.asset("assets/images/conan.png"),
                  ),
                ),
              )
          ],
        ),
      ),
    );
  }
}
