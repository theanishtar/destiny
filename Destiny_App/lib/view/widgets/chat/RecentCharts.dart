import 'package:flutter/material.dart';
import 'package:login_signup/utils/gobal.colors.dart';

class RecentCharts extends StatelessWidget {
  const RecentCharts({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 20),
      padding: EdgeInsets.symmetric(horizontal: 10, vertical: 25),
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
              topLeft: Radius.circular(35), topRight: Radius.circular(35)),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              blurRadius: 10,
              spreadRadius: 2,
              offset: Offset(0, 2),
            )
          ]),
      child: Column(children: [
        for (int i = 0; i < 10; i++)
          Padding(
            padding: EdgeInsets.symmetric(vertical: 15),
            child: InkWell(
              onTap: () {
                Navigator.pushNamed(context, "chatPage");
              },
              child: Container(
                height: 65,
                child: Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(35),
                      child: Image.asset(
                        "assets/images/conan.png",
                        height: 65,
                        width: 65,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Lê Bích Vi",
                            style: TextStyle(
                                fontSize: 18,
                                color: GlobalColors.mainColor,
                                fontWeight: FontWeight.bold),
                          ),
                          SizedBox(height: 10),
                          Text(
                            "Xin chào,Bạn khỏe không ?",
                            style:
                                TextStyle(fontSize: 16, color: Colors.black54),
                          )
                        ],
                      ),
                    ),
                    Spacer(),
                    Padding(
                      padding: const EdgeInsets.only(right: 10),
                      child: Column(
                        children: [
                          Text(
                            "12:30",
                            style:
                                TextStyle(fontSize: 15, color: Colors.black54),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Container(
                            height: 23,
                            width: 23,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                                color: GlobalColors.mainColor,
                                borderRadius: BorderRadius.circular(25)),
                            child: Text(
                              "1",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold),
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
          )
      ]),
    );
  }
}
