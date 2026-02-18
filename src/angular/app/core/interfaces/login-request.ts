export interface LoginRequest {
  sis: string;
  password: string;
  birthday: Birthday;
  captcha: string;
}

export interface Birthday {
  day: string;
  month: string;
  year: string;
}
