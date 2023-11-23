import 'dart:async';
import 'dart:convert';
import 'dart:ffi';

import 'package:get/get.dart';
import 'package:image/image.dart';
import 'package:login_signup/models/UserModel.dart';
import 'package:login_signup/utils/api.dart';
import 'package:stomp_dart_client/stomp.dart' as stomp;
import 'package:stomp_dart_client/stomp_frame.dart' as stomp;
import 'package:stomp_dart_client/stomp_config.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SocketManager {
  static final SocketManager _instance = SocketManager._internal();
  factory SocketManager() {
    return _instance;
  }

  SocketManager._internal();
  late stomp.StompClient stompClient;
  final StreamController<String> _streamController = StreamController<String>();
  var user_id = 0;
  UserModel userChatPage = new UserModel();
  bool isConnected = false;
  Map<String, UserModel> mapUser = new Map<String, UserModel>();
  Map<String, String> mapTime = new Map<String, String>();
  List<dynamic> listMessages = [];
  void connectWebSocket() {
    if (isConnected) {
      return; // Already connected, no need to reconnect
    }
    final socketUrl = ApiEndPoints.baseUrl + 'chat';
    stompClient = stomp.StompClient(
      config: StompConfig.sockJS(
        url: socketUrl,
        onConnect: onConnectCallback,
        onWebSocketError: (dynamic error) => print(error.toString()),
      ),
    );

    if (stompClient != null) {
      print(stompClient.config.url);
      stompClient.activate();
    } else {
      print('StompClient is null');
    }
  }

  stomp.StompClient getSocket() {
    return stompClient;
  }

  void onConnectCallback(stomp.StompFrame frame) async {
    isConnected = true;
    SharedPreferences prefs = await SharedPreferences.getInstance();
    user_id = await prefs.getInt('id') ?? 0;
    var check = 26;
    stompClient.send(destination: '/app/fetchAllUsers');

    stompClient.subscribe(
        destination: '/topic/status/messages/$user_id',
        callback: (stomp.StompFrame frame) {
          String? data = frame.body;
          print('size: ' + data.toString());
          // List<dynamic> datajson = jsonDecode(Utf8Decoder().convert((frame.body)!));
          List<dynamic> datajson = json.decode(data!);
          listMessages = [...listMessages, ...datajson];
          print('size: ' + listMessages.length.toString());
          if (data != null) {
            bool type = false;
            int to_user_id = this.userChatPage.user_id;

            stompClient.send(
                destination: '/app/reload/messages/$type/$to_user_id/$user_id');
          }
        });

//     stompClient.subscribe(
//   destination: '/topic/status/messages/$user_id',
//   callback: (stomp.StompFrame frame) {
//     // List<int>? bodyBytes = (frame.body).;
//     String? data = frame.body;
//     // print('size: ' + bodyBytes.toString());

//     // List<dynamic> datajson = jsonDecode(Utf8Decoder().convert(bodyBytes!));

//         Map<String, dynamic> datajson = json.decode(data!);
//     listMessages = [...listMessages, ...datajson];
//     print('size: ' + listMessages.length.toString());

//     if (bodyBytes != null) {
//       bool type = false;
//       int to_user_id = this.userChatPage.user_id;

//       stompClient.send(
//         destination: '/app/reload/messages/$type/$to_user_id/$user_id',
//       );
//     }
//   },
// );

    // Subscribe đến một topic
    stompClient.subscribe(
      destination: '/topic/public',
      callback: (stomp.StompFrame frame) {
        // Xử lý tin nhắn nhận được từ topic
        // print('Received STOMP Message: ${frame.body}');
        String? data = frame.body;

        Map<String, dynamic> datajson = json.decode(data!);

        for (var key in datajson.keys) {
          if (key == user_id.toString()) {
            var value = datajson[key];
            for (var v in value) {
              UserModel model = new UserModel();
              model.type = v['type'].toString();
              model.user_id = int.parse(v['user_id'].toString());
              model.username = v['username'];
              model.fullname = v['fullname'];
              model.email = v['email'];
              model.avatar = v['avatar'].toString();
              model.messageUnRead = int.parse(v['messageUnRead'].toString());
              model.lastMessage = v['lastMessage'];
              model.online = customTime(v['online'], 0);
              model.isFriend = bool.parse(v['friend'].toString());
              mapUser[v['user_id'].toString()] = model;
              mapTime[v['user_id'].toString()] = v['online'];
            }
          }
        }
        _streamController.add(frame.body!);
        // startInterval();
      },
    );
  }

  void updateMapTime() {
    mapTime.forEach((key, value) {
      mapUser[key]!.online = customTime(value, 0);
    });
    // mapUser.forEach((key, value) {
    //   value.online=customTime(value.online, 0);
    // });
  }

  void sendMessage(int from, String text, String img, int to,
      String typeMessage, List<String> images) {
    // Gửi tin nhắn STOMP
    stompClient.send(
      destination: '/app/chat/$to',
      body: jsonEncode({
        'fromLogin': from,
        'message': text,
        'avatar': img,
        'typeMessage': typeMessage,
        'linkImages': images
      }),
    );
  }

  getCustomTimeMessages(String time) {
    DateTime date = DateTime.parse(time);
    String hours = (date.hour < 10)
        ? '0' + (date.hour.toString())
        : (date.hour.toString());
    String minutes = (date.minute < 10)
        ? '0' + (date.minute.toString())
        : (date.minute.toString());
    String newTime = hours + ':' + minutes;
    return newTime;
  }

  String customTime(String time, int check) {
    if (time == '') return '';
    String dateTime = '';
    DateTime date1 = DateTime.parse(time);
    DateTime date2 = DateTime.now();
    int day = date2.day;
    int month = date2.month;
    int year = date2.year;
    DateTime date3 = DateTime(year, month, day);
    int time1 = date2.millisecondsSinceEpoch;
    int time2 = date1.millisecondsSinceEpoch;
    int timeDifference = (time1 - time2).abs();
    int milliseconds = timeDifference % 1000;
    int minutes = ((timeDifference / (1000 * 60)) % 60).floor();
    int hours = (timeDifference / (1000 * 60 * 60)).floor();

    if (date1.isBefore(date3) && hours > 24) {
      dateTime = getDayOfWeek(time, check);
      return dateTime;
    } else if (date1.isAfter(date2) && hours > 24) {
      return '';
    } else {
      if (hours == 0) {
        return '$minutes' + 'p trước';
      } else {
        return '$hours' + 'h trước';
      }
    }
  }

  String getDayOfWeek(String dateString, int check) {
    DateTime dateTemp = DateTime.parse(dateString);
    DateTime currentDate = DateTime.now();
    String checkTime = '';

    // Tìm ngày đầu tiên trong tuần (ngày chủ nhật)
    DateTime firstDayOfWeek =
        currentDate.subtract(Duration(days: currentDate.weekday));

    // Tìm ngày cuối cùng trong tuần (ngày thứ bảy)
    DateTime lastDayOfWeek = firstDayOfWeek.add(Duration(days: 6));

    // Định dạng ngày thành chuỗi
    String startDate = firstDayOfWeek.toIso8601String().substring(0, 10);
    String endDate = lastDayOfWeek.toIso8601String().substring(0, 10);

    if (check > 0) {
      String hours =
          dateTemp.hour < 10 ? '0${dateTemp.hour}' : dateTemp.hour.toString();
      String minutes = dateTemp.minute < 10
          ? '0${dateTemp.minute}'
          : dateTemp.minute.toString();
      checkTime = ' lúc $hours:$minutes';
    }

    String year = dateTemp.year.toString();
    String month = (dateTemp.month < 10
        ? '0${dateTemp.month}'
        : dateTemp.month.toString());
    String day =
        (dateTemp.day < 10 ? '0${dateTemp.day}' : dateTemp.day.toString());

    if (dateTemp.isAfter(DateTime.parse(startDate)) &&
        dateTemp.isBefore(DateTime.parse(endDate))) {
      List<String> daysOfWeek = [
        'CN',
        'Th2',
        'Th3',
        'Th4',
        'Th5',
        'Th6',
        'Th7'
      ];
      // Lấy thứ của ngày (0 = Chủ Nhật, 1 = Thứ Hai, 2 = Thứ Ba, v.v.)
      int dayOfWeek = dateTemp.weekday -
          1; // Trừ 1 để chuyển sang đúng index trong mảng daysOfWeek
      // Trả về tên thứ
      return daysOfWeek[dayOfWeek] + checkTime;
    } else if (check > 0) {
      if (int.parse(year) <= currentDate.year) {
        return 'Ngày $day tháng $month$checkTime';
      } else {
        return 'Ngày $day tháng $month năm $year$checkTime';
      }
    } else {
      if (int.parse(year) <= currentDate.year) {
        return '$day-$month';
      } else {
        return '$day-$month-$year';
      }
    }
  }

  String checkDate(String date) {
    if (date == null) {
      return '';
    }

    DateTime date1 = DateTime.parse(date.substring(0, 10));

    DateTime now = DateTime.now();
    int day = now.day;
    int month = now.month;
    int year = now.year;
    DateTime date2 = DateTime(year, month, day);

    if (date1.isBefore(date2) && date2.day - 1 == date1.day) {
      return 'Hôm qua';
    } else if (date1.isBefore(date2) &&
        date2.day - 1 > int.parse(date.substring(8, 10))) {
      String yearString = date1.year < date2.year ? '-${date1.year}' : '';
      String monthString =
          (date1.month + 1 < 10) ? '0${date1.month + 1}' : '${date1.month + 1}';
      String dayString = (date1.day < 10) ? '0${date1.day}' : '${date1.day}';
      return '$dayString-$monthString$yearString';
    } else {
      return 'Hôm nay';
    }
  }

  String getCustomTime(String time) {
    print("time: " + time);
    DateTime date = DateTime.parse(time);
    String hours = (date.hour < 10)
        ? '0' + (date.hour).toString()
        : (date.hour).toString();
    String minutes = (date.minute < 10)
        ? '0' + (date.minute).toString()
        : (date.minute).toString();
    String newTime = hours + ':' + minutes;
    return newTime;
  }
}
