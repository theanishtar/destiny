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
  Map<String,String> mapTime = new Map<String,String>();
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
    stompClient.send(
      destination: '/app/fetchAllUsers',
      body: 'Hello STOMP!',
    );
    // Subscribe đến một topic
    stompClient.subscribe(
      destination: '/topic/public',
      callback: (stomp.StompFrame frame) {
        // Xử lý tin nhắn nhận được từ topic
        print('Received STOMP Message: ${frame.body}');
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
              mapTime[v['user_id'].toString()]=model.online;
            }
          }
        }

        _streamController.add(frame.body!);
      },
    );
  }

  void sendMessage() {
    // Gửi tin nhắn STOMP
    stompClient.send(
      destination: '/app/chat',
      body: 'Hello STOMP!',
    );
  }

  String customTime(String time, int check) {
    if (time == '') return '';
    String dateTime = '';
    DateTime date1 = DateTime.parse(time);
    DateTime date2 = DateTime.now();
    int day = date2.day; // Lấy ngày trong tháng (1-31)
    int month = date2.month; // Lấy tháng (1-12)
    int year = date2.year;
    DateTime date3 = DateTime(year, month, day);

    if (date1.isBefore(date3)) {
      dateTime = getDayOfWeek(time, check);
      return dateTime;
    } else if (date1.isAfter(date2)) {
      return '';
    } else {
      DateTime date = DateTime.now();
      DateTime date1 = DateTime.parse(time);

      // Lấy thời gian ở dạng milliseconds từ epoch (1/1/1970)
      int time1 = date.millisecondsSinceEpoch;
      int time2 = date1.millisecondsSinceEpoch;

      // Tính toán khoảng thời gian (đơn vị milliseconds)
      int timeDifference = (time1 - time2)
          .abs(); // Lấy giá trị tuyệt đối để đảm bảo giá trị luôn là dương

      // Chuyển khoảng thời gian thành giờ, phút, giây, và mili giây (tùy ý)
      int milliseconds = timeDifference % 1000;
      int seconds = (timeDifference ~/ 1000) % 60;
      int minutes = (timeDifference ~/ (1000 * 60)) % 60;
      int hours = timeDifference ~/ (1000 * 60 * 60);

      if (hours == 0) {
        return '$minutes phút trước';
      } else {
        return '$hours giờ trước';
      }
    }
  }

  String getDayOfWeek(String dateString, int check) {
  DateTime dateTemp = DateTime.parse(dateString);
  DateTime currentDate = DateTime.now();
  String checkTime = '';

  // Tìm ngày đầu tiên trong tuần (ngày chủ nhật)
  DateTime firstDayOfWeek = currentDate.subtract(Duration(days: currentDate.weekday));
  
  // Tìm ngày cuối cùng trong tuần (ngày thứ bảy)
  DateTime lastDayOfWeek = firstDayOfWeek.add(Duration(days: 6));

  // Định dạng ngày thành chuỗi
  String startDate = firstDayOfWeek.toIso8601String().substring(0, 10);
  String endDate = lastDayOfWeek.toIso8601String().substring(0, 10);

  if (check > 0) {
    String hours = dateTemp.hour < 10 ? '0${dateTemp.hour}' : dateTemp.hour.toString();
    String minutes = dateTemp.minute < 10 ? '0${dateTemp.minute}' : dateTemp.minute.toString();
    checkTime = ' lúc $hours:$minutes';
  }

  String year = dateTemp.year.toString();
  String month = (dateTemp.month < 10 ? '0${dateTemp.month}' : dateTemp.month.toString());
  String day = (dateTemp.day < 10 ? '0${dateTemp.day}' : dateTemp.day.toString());

  if (dateTemp.isAfter(DateTime.parse(startDate)) && dateTemp.isBefore(DateTime.parse(endDate))) {
    List<String> daysOfWeek = ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'];
    // Lấy thứ của ngày (0 = Chủ Nhật, 1 = Thứ Hai, 2 = Thứ Ba, v.v.)
    int dayOfWeek = dateTemp.weekday - 1; // Trừ 1 để chuyển sang đúng index trong mảng daysOfWeek
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

}
