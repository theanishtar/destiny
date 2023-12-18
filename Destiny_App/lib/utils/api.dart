class ApiEndPoints {
  // static final String baseUrl = "https://testchat.hop.sh/";
  // static final String baseUrl = "http://192.168.137.1:8080/";
  static final String baseUrl = "https://davisybe.hop.sh/";
  static _AuthEndPoints _authEndPoints = _AuthEndPoints();
}

class _AuthEndPoints {
  final String register = "v1/oauth/register";
  final String login = "v1/oauth/login";
}
