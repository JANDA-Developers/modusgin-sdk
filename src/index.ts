import axios from 'axios';
import { ModuSignPaths } from './path';
import { MODUSIGN_PARMAS } from './type';

type TParams = any;

type TModuSignConstructorParams = {
  apiKey?: string;
  email?: string;
  showLog?: boolean;
};

export class ModuSign {
  private hashApiKey: string;
  public showLog = false;
  private apiKey: string;
  private email: string;

  constructor({
    apiKey = process.env.MODU_SIGN_API_KEY,
    email = process.env.MODU_SIGN_EMAIL,
    showLog,
  }: TModuSignConstructorParams = {}) {
    if (!apiKey) throw Error('you need to provide MODU_SIGN_API_KEY at env');
    if (!email) throw Error('you need to provide MODU_SIGN_EMAIL at env');
    this.apiKey = apiKey;
    this.email = email;
    this.showLog = !!showLog;
    this.hashApiKey = this.generateKey();
  }

  private log(...logmessage: any) {
    if (this.showLog) {
      console.log(...logmessage);
    }
  }

  public toBasic64(str: string) {
    return Buffer.from(str).toString('base64');
  }

  public generateKey() {
    return this.toBasic64(this.email + ':' + this.apiKey);
  }

  public async call(pathKey: ModuSignPaths.apiPaths, params: TParams) {
    this.log('endPoint:', ModuSignPaths.get(pathKey));
    const result = await axios
      .post(ModuSignPaths.get(pathKey), params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${this.hashApiKey}`,
        },
      })
      .catch(e => {
        console.error('erorr', e);
        console.error('response.data', e.response.data);
      })
      .then(r => r);

    if (!result) throw Error('result is not exsit');

    this.log('data::', params);
    this.log('call-result::', result);

    const resultData = result.data;
    this.log('resultData', resultData);
    return resultData;
  }

  public async sendTemplate(
    templateId: string,
    TempalteSendParam: MODUSIGN_PARMAS.TempalteSendDocument
  ) {
    return await this.call('request-with-template', {
      templateId,
      document: TempalteSendParam,
    });
  }

  public async getDocuments() {
    // return await this.call()
  }
}
