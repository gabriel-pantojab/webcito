import { WEBSISConfig } from '@core/interfaces/config/websis.config';

export const WEBSIS: WEBSISConfig = {
  url: 'https://websis.umss.edu.bo/serv_estudiantes.asp',
  login: {
    sis: 'idCuenta',
    password: 'idContrasena',
    day: 'idDia',
    month: 'idMes',
    year: 'idMes',
    captcha: 'idCodigo',
  },
  enrollment: {
    codeOne: 'idInput1',
    codeTwo: 'idInput2',
  },
};
