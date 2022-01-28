import axios from 'axios';
import { TModuSignConstructorParams, TParams } from '.';
import { ModuSignPaths } from './path';

interface IAPIHelper {
  get: (pathey: ModuSignPaths.apiPaths, params: TParams) => any;
  post: (pathey: ModuSignPaths.apiPaths, params: TParams) => any;
  // put: (pathey: ModuSignPaths.apiPaths, params: TParams) => any;
  // delete: (pathey: ModuSignPaths.apiPaths, params: TParams) => any;
}

type TConfig = {
  params?: any;
  additionalPath?: string;
};

export class APIHelper implements IAPIHelper {
  private hashApiKey: string;
  private apiKey: string;
  private email: string;
  public showLog = false;

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

  public async post(pathKey: ModuSignPaths.apiPaths, config: TConfig) {
    const { params, additionalPath = '' } = config;
    this.log('endPoint:', ModuSignPaths.get(pathKey) + additionalPath);
    const result = await axios
      .post(ModuSignPaths.get(pathKey) + additionalPath, params, {
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
    const statusCode = result.status;
    this.log('resultData', resultData);
    return { resultData, statusCode };
  }

  public async get(pathKey: ModuSignPaths.apiPaths, config: TConfig) {
    const { params = {}, additionalPath = '' } = config;
    this.log('endPoint:', ModuSignPaths.get(pathKey) + additionalPath);
    const result = await axios
      .get(ModuSignPaths.get(pathKey) + additionalPath, {
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${this.hashApiKey}`,
        },
        params,
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
    const statusCode = result.status;
    this.log('resultData', resultData);
    return { resultData, statusCode };
  }
}
