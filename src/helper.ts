import { TModuSignConstructorParams } from '.';
import axios from 'axios';

type FireProp = {
  method: 'post' | 'get';
  params?: any;
};

export class APIHelper {
  private hashApiKey: string;
  private apiKey: string;
  private email: string;
  public showLog = false;
  private host = 'https://api.modusign.co.kr';

  constructor({
    apiKey = process.env.MODU_SIGN_API_KEY,
    email = process.env.MODU_SIGN_EMAIL,
    showLog,
  }: TModuSignConstructorParams = {}) {
    if (!apiKey) throw Error('you need to provide MODU_SIGN_API_KEY at env');
    if (!email) throw Error('you need to provide MODU_SIGN_EMAIL at env');
    this.showLog = !!showLog;
    this.apiKey = apiKey;
    this.email = email;
    this.hashApiKey = this.generateKey();
  }
  private log(...logmessage: any) {
    if (this.showLog) {
      console.log(...logmessage);
    }
  }

  private toBasic64(str: string) {
    return Buffer.from(str).toString('base64');
  }

  public generateKey() {
    return this.toBasic64(this.email + ':' + this.apiKey);
  }

  private getHeadOf(method: 'post' | 'get') {
    const baseHead = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.hashApiKey}`,
    };

    if (method === 'post') {
      return baseHead;
    } else {
      //@ts-ignore
      delete baseHead['Content-Type'];
      return baseHead;
    }
  }

  public async post(path: string, props: Omit<FireProp, 'method'>) {
    this.fire(path, { ...props, method: 'post' });
  }
  public async get(path: string, props?: Omit<FireProp, 'method'>) {
    this.fire(path, { ...props, method: 'get' });
  }
  private async fire(apiEndPoint: string, props: FireProp) {
    const path = this.host + apiEndPoint;
    const { method } = props;
    this.log('endPoint:', path);

    let axiosParams: any[] = [];
    const headers = this.getHeadOf(method);

    if (props.method === 'post') {
      axiosParams = [props.params, { headers }];
    } else {
      axiosParams = [{ headers, params: props.params }];
    }

    const result = await axios[method](path, ...axiosParams).catch((e) => {
      console.error('erorr', e);
      console.error('response.data', e.response.data);
    });

    if (!result) throw Error('result is not exsit');
    this.log('data::', axiosParams);
    this.log('call-result::', result);

    const resultData = result.data;
    const statusCode = result.status;
    this.log('resultData', resultData);

    return { resultData, statusCode };
  }
}
