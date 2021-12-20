import fetch from 'node-fetch';

export class ModuSign {
  public endPoint = {
    requestWithTemplate:
      'https://api.modusign.co.kr/documents/request-with-template',
  };

  constructor(private apiKey: string = process.env.MODU_SIGN_KEY || '') {
    if (!apiKey) throw Error('you need to provide MODU_SIGN_KEY at env');
  }

  public sendTemplate(
    templateId: string,
    TempalteSendParam: TempalteSendDocument
  ) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.apiKey}`,
      },
      body: JSON.stringify({
        document: TempalteSendParam,
        templateId,
      }),
    };

    fetch(this.endPoint.requestWithTemplate, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
  }
}

export enum ModuSign_SendMethod {
  'KAKAO' = 'KAKAO',
  'EMAIL' = 'EMAIL',
}

type TEmail = string;

export type TempalteSendDocument = {
  participantMappings: {
    excluded: boolean;
    signingMethod: { type: ModuSign_SendMethod; value: TEmail };
    requesterMessage: string;
    signingDuration: number;
    name: string;
  }[];
  title: string;
  excluded: boolean;
  signingMethod: {
    type: string;
    value: string;
  };
  name: string;
};
