import 'dart:convert';
import 'dart:ffi';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SuccessfulRegistrationDialog extends StatefulWidget {
  @override
  _SuccessfulRegistrationDialogState createState() =>
      _SuccessfulRegistrationDialogState();
}

class _SuccessfulRegistrationDialogState
    extends State<SuccessfulRegistrationDialog> {
  late SocketManager socketManager = SocketManager();
  List? user;
  List<int> selectedUserIds = [];
  bool isFollowingDisabled = true;
  bool isFollowing = false; // Biến state để kiểm soát tiến trình loading

  Future<void> getData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type': 'application/json',
    };

    http.Response response;
    response = await http.get(
      Uri.parse(
          ApiEndPoints.baseUrl + "v1/user/following/load/suggestregister"),
      headers: headers,
    );
    if (response.statusCode == 200) {
      setState(() {
        List data = jsonDecode(utf8.decode(response.bodyBytes));
        user = data;
      });
    }
  }

  void updateFollowingButtonState() {
    if (selectedUserIds.length >= 5) {
      setState(() {
        isFollowingDisabled = false;
      });
    } else {
      setState(() {
        isFollowingDisabled = true;
      });
    }
  }

  List<bool> _isChecked = [];

  @override
  void initState() {
    super.initState();
    _isChecked = [];
    this.getData().then((_) {
      if (user != null) {
        setState(() {
          _isChecked = List<bool>.filled(user!.length, false);
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.6,
            child: user != null && user!.isNotEmpty
                ? ListView.builder(
                    itemCount: user!.length,
                    itemBuilder: (BuildContext context, int index) {
                      return ListTile(
                        leading: CircleAvatar(
                          child: Image.network(user![index]['avatar']),
                        ),
                        title: Row(
                          children: [
                            Expanded(
                              flex: 2,
                              child: Text(
                                user![index]['fullname'],
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(fontSize: 16),
                              ),
                            ),
                            Checkbox(
                              value: _isChecked[index],
                              onChanged: (bool? value) {
                                setState(() {
                                  _isChecked[index] = value ?? false;
                                  if (_isChecked[index]) {
                                    selectedUserIds
                                        .add(user![index]['user_id']);
                                  } else {
                                    selectedUserIds
                                        .remove(user![index]['user_id']);
                                  }
                                  updateFollowingButtonState();
                                });
                              },
                            ),
                          ],
                        ),
                      );
                    },
                  )
                : CircularProgressIndicator(),
          ),
          SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed: () async {
                  SharedPreferences prefs =
                      await SharedPreferences.getInstance();
                  var value = await prefs.getString('token');
                  var headers = {
                    'Authorization': 'Bearer $value',
                    'Content-Type': 'application/json',
                  };

                  http.Response response;
                  response = await http.get(
                    Uri.parse(ApiEndPoints.baseUrl +
                        "v1/user/following/load/suggestregister"),
                    headers: headers,
                  );
                  if (response.statusCode == 200) {
                    setState(() {
                      List data = jsonDecode(utf8.decode(response.bodyBytes));
                      user = data;
                    });
                  }
                },
                child: Text('Tải lại'),
              ),
              ElevatedButton(
                onPressed: isFollowingDisabled || isFollowing
                    ? null
                    : () {
                        setState(() {
                          isFollowing = true;
                        });
                        socketManager.sendNotifyFollow(
                            selectedUserIds); // No need for await here
                        setState(() {
                          isFollowing = false;
                        });
                      },
                child: isFollowing
                    ? CircularProgressIndicator()
                    : Text('Theo dõi'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
