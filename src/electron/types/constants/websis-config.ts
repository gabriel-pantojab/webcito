import { WEBSISConfig } from '../config/websis.config';

export const WEBSIS: WEBSISConfig = {
  url: 'https://websis.umss.edu.bo/serv_estudiantes.asp',
  login: {
    sisSelector: '#idCuenta',
    passwordSelector: '#idContrasena',
    daySelector: '#idDia',
    monthSelector: '#idMes',
    yearSelector: '#idAnio',
    captchaSelector: '#idCodigo',
    submitSelector: '#idBtnSubmit',
  },
  enrollment: {
    codeOneSelector: '#idInput1',
    codeTwoSelector: '#idInput2',
  },
};
