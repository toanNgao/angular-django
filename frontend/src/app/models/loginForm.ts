export class LoginForm {
  private username: string;
  private password: string;
  private client_id: string;
  private client_secret: string;
  private grant_type: string;

  constructor(username: string, password: string,
              client_id: string, client_secret: string, grant_type: string) {
    this.username = username;
    this.password = password;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.grant_type = grant_type;
  }
}
