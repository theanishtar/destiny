class ApiEndPoints {
  static final String baseUrl = "http://192.168.1.165:8080/";
  static _AuthEndPoints _authEndPoints = _AuthEndPoints();
}

class _AuthEndPoints {
  final String register = "v1/oauth/register";
  final String login = "v1/oauth/login";
}
