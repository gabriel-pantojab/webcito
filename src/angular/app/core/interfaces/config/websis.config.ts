export interface WEBSISConfig {
  url: string;
  login: WEBSISLoginConfig;
  enrollment: WEBSISEnrollmentConfig;
}

export interface WEBSISLoginConfig {
  sis: string;
  password: string;
  day: string;
  month: string;
  year: string;
  captcha: string;
}

export interface WEBSISEnrollmentConfig {
  codeOne: string;
  codeTwo: string;
}
