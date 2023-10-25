class Users {
  final String user_id;

  final String username;
  final String fullname;
  final String email;
  final String intro;
  final DateTime birthday;
  final DateTime day_create;
  final int gender_id;
  final String user_provinces_id;
  final String user_districts_id;
  final String user_wards_id;
  final String avatar;

  final String thumb;
  final DateTime online_last_date;
  final int mark;
  final bool user_status;
  bool ban;
  final String gg_id;
  final String fb_id;
  final String sub;

  Users(
      {required this.user_id,
      required this.username,
      required this.fullname,
      required this.email,
      required this.intro,
      required this.birthday,
      required this.day_create,
      required this.gender_id,
      required this.user_provinces_id,
      required this.user_districts_id,
      required this.user_wards_id,
      required this.avatar,
      required this.thumb,
      required this.online_last_date,
      required this.mark,
      required this.user_status,
      required this.ban,
      required this.gg_id,
      required this.fb_id,
      required this.sub});

  // bool isFlollerByMe;
  factory Users.fromJson(Map<String, dynamic> json) {
    return Users(
        user_id: json["user_id"],
        username: json["username"],
        fullname: json["fullname"],
        email: json["email"],
        intro: json["intro"],
        birthday: json["birthday"],
        day_create: json["day_create"],
        gender_id: json["gender_id"],
        user_provinces_id: json["user_provinces_id"],
        user_districts_id: json["user_districts_id"],
        user_wards_id: json["user_wards_id"],
        avatar: json["avatar"],
        thumb: json["thumb"],
        online_last_date: json["online_last_date"],
        mark: json["mark"],
        user_status: json["user_status"],
        ban: json["ban"],
        gg_id: json["gg_id"],
        fb_id: json["fb_id"],
        sub: json["sub"]);
  }
  static List<Users> listFromJson(List<dynamic> jsonList) {
    return jsonList.map((item) => Users.fromJson(item)).toList();
  }
}
