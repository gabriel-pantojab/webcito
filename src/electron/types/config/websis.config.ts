export interface WEBSISConfig {
  url: string;
  login: WEBSISLoginConfig;
  enrollment: WEBSISEnrollmentConfig;
}

export interface WEBSISLoginConfig {
  sisSelector: string;
  passwordSelector: string;
  daySelector: string;
  monthSelector: string;
  yearSelector: string;
  captchaSelector: string;
  submitSelector: string;
}

export interface WEBSISEnrollmentConfig {
  codeOneSelector: string;
  codeTwoSelector: string;
}
