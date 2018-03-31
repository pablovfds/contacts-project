export class ServerConstants {
  public static get API_URL(): string { return 'http://localhost:1337' }
  public static get LOGIN_URL(): string { return ServerConstants.API_URL + '/login' }
  public static get LOGOUT_URL(): string { return ServerConstants.API_URL + '/logout' }
  public static get SIGN_UP_URL(): string { return ServerConstants.API_URL + '/sign-up' }
  public static get USER_URL(): string { return ServerConstants.API_URL + '/user' }
}
