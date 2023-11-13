// import 'package:socket_io_client/socket_io_client.dart' as io;

// class SocketManager {
//   static final SocketManager _singleton = SocketManager._internal();

//   factory SocketManager() {
//     return _singleton;
//   }

//   SocketManager._internal();

//   io.Socket? socket;

//   void connectSocket(String token) {
//     // Kết nối socket sau khi đăng nhập thành công
//     socket = io.io(
//       'http://192.168.137.1:8000/',
//       <String, dynamic>{
//         'transports': ['websocket'],
//         'autoConnect': false,
//         'query': {'token': token}, // Truyền token vào query params
//       },
//     );

//     // Lắng nghe sự kiện khi kết nối thành công
//     socket!.on('connect', (_) {
//       print('Connected to socket server');
//     });

//     // Lắng nghe sự kiện khi nhận dữ liệu từ server
//     socket!.on('message', (data) {
//       print('Received data: $data');
//     });

//     // Kết nối socket
//     socket!.connect();
//   }

//   void disconnectSocket() {
//     // Ngắt kết nối socket
//     socket?.disconnect();
//   }
// }
