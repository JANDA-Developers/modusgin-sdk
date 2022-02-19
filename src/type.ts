export enum ModuSign_SendMethod {
  'KAKAO' = 'KAKAO',
  'EMAIL' = 'EMAIL',
}

export declare module MODUSIGN {
  type TParticipantVerification = {
    password: any;
    mobileIdentification: any;
    dCert: any;
  };

  type TEmail = string;

  type ModuSignApiResult = {
    resultData: any;
    statusCode: number;
  };

  type requesterInput = {
    dataLabel: string;
    value: string;
  };

  type TParticipant = {
    role: string; //  템플릿에서 설정한 role
    excluded: boolean; // 템플릿에 적용해 둔 참여자를 제외시킬지 여부
    signingMethod: { type: ModuSign_SendMethod; value: TEmail };
    requesterMessage?: string;
    signingDuration?: number; //참여자의 서명 유효 기간 (분) //미정시 14일
    name: string;
    verification?: TParticipantVerification;
  };

  type ModuSignHookInterface = {
    name: string;
  };
}

export declare module MODUSIGN_PARMAS {
  type TempalteSendDocument = {
    requesterInputMappings: MODUSIGN.requesterInput[];
    participantMappings: MODUSIGN.TParticipant[];
    title: string;
    fileOpenPassword?: string;
  };

  type DocumentsListLookUpParams = {
    offset: number;
    limit: number;
    metadatas: string;
    filter?: string;
  };
}
