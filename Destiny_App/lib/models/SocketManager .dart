import 'dart:async';
import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image/image.dart';
import 'package:login_signup/models/ApiManager.dart';
import 'package:login_signup/models/UserModel.dart';
import 'package:login_signup/models/MessagesModel.dart';
import 'package:login_signup/utils/api.dart';
import 'package:stomp_dart_client/stomp.dart' as stomp;
import 'package:stomp_dart_client/stomp_frame.dart' as stomp;
import 'package:stomp_dart_client/stomp_config.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:login_signup/models/NotifyModel.dart';

class SocketManager {
  static final SocketManager _instance = SocketManager._internal();
  factory SocketManager() {
    return _instance;
  }

  SocketManager._internal();
  late BuildContext? context;
  late Function(BuildContext) onChatSampleReset;

  void resetChatSample(BuildContext context) {
    // Gọi callback để reset trang ChatSample
    if (onChatSampleReset != null) {
      onChatSampleReset(context!);
    }
  }

  late stomp.StompClient stompClientMessages;
  late stomp.StompClient stompClientNotification;
  late ApiManager apiManager = ApiManager();
  final StreamController<String> _streamController = StreamController<String>();
  var user_id = 0;
  int count_notify = 1;
  late UserModel userChatPage = new UserModel();
  bool isConnected = false;
  bool checkNotify = false;
  bool checkScroll = false;
  int repCmtId = 0;

  Map<String, UserModel> mapUser = new Map<String, UserModel>();
  Map<int, NotifyModel> mapNotifycation = new Map<int, NotifyModel>();
  Map<String, String> mapTime = new Map<String, String>();
  Map<int, String> mapTimeNotify = new Map<int, String>();
  Map<int, String> mapMention = new Map<int, String>();
  List<MessagesModel> listMessages = [];
  ScrollController scrollController = ScrollController();
  StreamController<List<MessagesModel>> _messagesStreamController =
      StreamController<List<MessagesModel>>.broadcast();

  Stream<List<MessagesModel>> get messagesStream =>
      _messagesStreamController.stream;

  // Thêm phương thức để cập nhật dữ liệu vào stream
  void updateListMessages(List<MessagesModel> messages) {
    _messagesStreamController.add(messages);
  }

  StreamController<List<dynamic>> _commentStreamController =
      StreamController<List<dynamic>>.broadcast();

  Stream<List<dynamic>> get commentStream => _commentStreamController.stream;

  // Thêm phương thức để cập nhật dữ liệu vào stream
  void updateListComment(List<dynamic> comment) {
    _commentStreamController.add(comment);
  }

  void connectWebSocket() {
    if (isConnected) {
      return; // Already connected, no need to reconnect
    }
    final socketUrl = ApiEndPoints.baseUrl + 'chat';
    stompClientMessages = stomp.StompClient(
      config: StompConfig.sockJS(
        url: socketUrl,
        onConnect: onConnectCallback,
        onWebSocketError: (dynamic error) => print(error.toString()),
      ),
    );

    stompClientNotification = stomp.StompClient(
      config: StompConfig.sockJS(
        url: ApiEndPoints.baseUrl + 'notify',
        onConnect: onConnectCallbackNotyfication,
        onWebSocketError: (dynamic error) => print(error.toString()),
      ),
    );

    if (stompClientMessages != null) {
      // print(stompClientMessages.config.url);
      stompClientMessages.activate();
      stompClientNotification.activate();
    } else {
      print('stompClientMessages is null');
    }
  }

  void onConnectCallbackNotyfication(stomp.StompFrame frame) async {
    // SharedPreferences prefs = await SharedPreferences.getInstance();
    // user_id = await prefs.getInt('id') ?? 0;

    stompClientNotification.subscribe(
        destination: "/topic/loaddata/notification/$user_id",
        callback: (stomp.StompFrame frame) {
          String? data = frame.body;
          print('notifycation: ' + data.toString());
          List<dynamic> datajson = json.decode(data!);
          // Map<String, dynamic> datajson = json.decode(data!);
          for (var k in datajson) {
            mapNotifycation[this.count_notify] = notifymodel(k);
            this.count_notify++;
          }
          print('length notify: ' + mapNotifycation.length.toString());
        });
    stompClientNotification.subscribe(
        destination: "/topic/success-notification",
        callback: (stomp.StompFrame frame) {
          String? data = frame.body;
          apiManager.fetchComments(int.parse(data.toString()));
        });
    stompClientNotification.send(
      destination: '/app/load/notification/$user_id',
    );
  }
  // stomp.StompClient getSocket() {
  //   return stompClientMessages;
  // }

  void onConnectCallback(stomp.StompFrame frame) async {
    isConnected = true;
    SharedPreferences prefs = await SharedPreferences.getInstance();
    user_id = await prefs.getInt('id') ?? 0;
    var check = 26;

    stompClientMessages.subscribe(
      destination: '/topic/messages/$user_id',
      callback: (stomp.StompFrame frame) {
        String? data = frame.body;
        if (data != null) {
          List<dynamic> datajson = json.decode(data);
          Map<String, dynamic> map = datajson[0];
          bool type = false;
          int from_user_id = int.parse(map['user_id'].toString());
          if (this.userChatPage.user_id == from_user_id) {
            type = true;
            listMessages.add(messagesModel(map));
            updateListMessages(listMessages);
          } else {
            type = false;
          }
          int to_user_id = this.userChatPage.user_id;
          stompClientMessages.send(
            destination: '/app/reload/messages/$type/$from_user_id/$to_user_id',
          );
        }
      },
    );

    stompClientMessages.subscribe(
      destination: '/topic/status/messages/$user_id',
      callback: (stomp.StompFrame frame) {
        String? data = frame.body;
        if (data != null) {
          Map<String, dynamic> map = jsonDecode(data);
          listMessages.add(messagesModel(map));
          updateListMessages(listMessages);
          bool type = false;
          int to_user_id = this.userChatPage.user_id;
          this.scrollToBottom();
          stompClientMessages.send(
            destination: '/app/reload/messages/$type/$to_user_id/$user_id',
          );
        }
      },
    );

    // Subscribe đến một topic
    stompClientMessages.subscribe(
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
              mapTime[v['user_id'].toString()] = model.online;
            }
          }
        }

        _streamController.add(frame.body!);
      },
    );

    stompClientMessages.send(destination: '/app/fetchAllUsers');
  }

  MessagesModel messagesModel(Map<dynamic, dynamic> messages) {
    MessagesModel model = MessagesModel();
    try {
      if (messages.containsKey('id')) {
        model.id = int.tryParse(messages['id'].toString()) ?? 0;
      }
      model.content = messages['content'] ?? '';
      model.send_time = getCustomTime(messages['send_time']).toString();
      if (messages.containsKey('user_id')) {
        model.user_id = int.tryParse(messages['user_id'].toString()) ?? 0;
      }
      model.avatar = messages['avatar'];
      if (messages.containsKey('chat_parcipants_status')) {
        model.chat_parcipants_status = bool.fromEnvironment(
                messages['chat_parcipants_status'].toString()) ??
            false;
      }
      // model.day = messages['day'] ?? '';
      model.day = (messages['day'] != null)
          ? checkDate(messages['day'].toString())
          : '';
      model.type = messages['type'];
      if (messages.containsKey('recall')) {
        model.recall =
            bool.fromEnvironment(messages['recall'].toString()) ?? false;
      }
      model.images = (messages['images'] == null) ? [] : messages['images'];
      return model;
    } catch (e) {
      print("Error during conversion: " + e.toString());
    }
    return model;
  }

  NotifyModel notifymodel(dynamic notify) {
    NotifyModel model = NotifyModel();
    model.avatar = notify['avatar'].toString();
    model.fullname = notify['fullname'].toString();
    model.fromUserId = int.tryParse(notify['fromUserId'].toString()) ?? 0;
    model.content = notify['content'] ?? '';
    model.postId = int.tryParse(notify['postId'].toString()) ?? 0;
    model.time = customTime(notify['time'].toString(), 1);
    model.type = notify['type'] ?? '';
    model.following_status =
        bool.tryParse(notify['following_status'].toString()) ?? false;
    model.status = bool.tryParse(notify['status'].toString()) ?? false;
    mapTimeNotify[this.count_notify] = notify['time'].toString();
    if (model.status == false) this.checkNotify = true;
    return model;
  }

  void sendMessage(int from, String text, String img, int to,
      String typeMessage, List<String> images) {
    // Gửi tin nhắn STOMP
    stompClientMessages.send(
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

  sendNotify(String content, int post_id, int toUser, String type, int idCmt) {
    int toUserId = toUser;
    String avatar = '';
    String fullname = '';
    int fromUserId = user_id;
    stompClientNotification.send(
      destination: "/app/notify/$toUser",
      body: jsonEncode({
        'avatar': avatar,
        'fullname': fullname,
        'fromUserId': fromUserId,
        'content': content,
        'postId': post_id,
        'replyId': idCmt,
        'time': 'Vừa xong',
        'type': type,
        'mapMention': mapMention
      }),
    );

    // // cập nhật số liệu cmt và share
    // let comment = document.getElementById("cmt-" + post_id);
    // let share = document.getElementById("share-" + post_id);
    // if (type == 'COMMENT' && comment) {
    //   let count: string | undefined;
    //   count = '' + comment.textContent?.trim();
    //   let num = parseInt(count) + 1;
    //   comment!.innerText = num + ' Bình luận';
    // }
    // if (type == 'SHARE' && share) {
    //   let count: string | undefined;
    //   count = '' + share.textContent?.trim();
    //   let num = parseInt(count) + 1;
    //   share!.innerText = num + ' Chia sẻ';
    // }
  }

  void addComment(
      String content,
      int post_id,
      int toUser,
      String type,
      int idComment,
      String avatar,
      String fullname,
      int fromUserId,
      int replyId) {
    stompClientMessages.send(
        destination: '/app/notify/$toUser', body: jsonEncode({''}));
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
    print('date: ' + date);
    // print('date1: '+(date == 'null').toString());
    // print('date2: '+(date == null).toString());
    //  print('date3: '+(date == '').toString());
    if (date == 'null') {
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

  void scrollToBottom() {
    if (scrollController.hasClients) {
      scrollController.animateTo(
        scrollController.position.maxScrollExtent,
        duration: Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }
}
