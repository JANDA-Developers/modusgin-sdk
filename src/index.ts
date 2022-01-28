import { APIHelper } from './helper';
import { MODUSIGN_PARMAS } from './type';

export type TParams = any;

export type TModuSignConstructorParams = {
  apiKey?: string;
  email?: string;
  showLog?: boolean;
};

export class ModuSign {
  private apiHelper: APIHelper;

  constructor({
    apiKey = process.env.MODU_SIGN_API_KEY,
    email = process.env.MODU_SIGN_EMAIL,
    showLog,
  }: TModuSignConstructorParams = {}) {
    if (!apiKey) throw Error('you need to provide MODU_SIGN_API_KEY at env');
    if (!email) throw Error('you need to provide MODU_SIGN_EMAIL at env');
    this.apiHelper = new APIHelper({
      apiKey,
      email,
      showLog,
    });
  }

  public async sendTemplate(
    templateId: string,
    TempalteSendParam: MODUSIGN_PARMAS.TempalteSendDocument
  ) {
    return await this.apiHelper.post('request-with-template', {
      params: {
        templateId,
        document: TempalteSendParam,
      },
    });
  }

  public async getDocuments(
    documentsListLookUpParams: MODUSIGN_PARMAS.DocumentsListLookUpParams
  ) {
    return await this.apiHelper.get('documents', {
      params: { ...documentsListLookUpParams },
    });
  }

  public async lookUpUsage(from: string, to: string) {
    return await this.apiHelper.get('usages', {
      params: {
        from,
        to,
      },
    });
  }

  public async lookUpTemplates(
    offset: number,
    limit: number,
    metadatas?: string,
    filter?: string
  ) {
    return await this.apiHelper.get('templates', {
      params: {
        offset,
        limit,
        metadatas,
        filter,
      },
    });
  }

  // @Jihoon
  // 실제 documentId가 없이는 statusCode 테스트가 안됨
  public async remindSignIng(documentId: number | string) {
    return await this.apiHelper.get(`documents`, {
      additionalPath: `/${documentId}/remind-signing`,
    });
  }

  // @Jihoon
  // 실제 documentId가 없이는 statusCode 테스트가 안됨
  public async lookUpParticipantFields(documentId: number | string) {
    return await this.apiHelper.get('documents', {
      additionalPath: `/${documentId}/participant-fields`,
    });
  }
}
