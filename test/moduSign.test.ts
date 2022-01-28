import dotenv from 'dotenv';
import path from 'path';
import { ModuSign } from '../src/index';
import { APIHelper } from '../src/helper';
import { ModuSign_SendMethod } from '../src/type';

const TEST_TEAMPLTES_IDS = {
  DUMMY: 'fd6f38e0-6152-11ec-ab01-bb92e7aeb67e',
};

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const BIZ = new ModuSign({ showLog: true });
const helper = new APIHelper({ showLog: true });

describe('hashKeyTest', () => {
  it('works', async () => {
    const key = helper.generateKey();
    expect(key).toBe(
      Buffer.from(
        `${process.env.MODU_SIGN_EMAIL}:${process.env.MODU_SIGN_API_KEY}`
      ).toString('base64')
    );
  });
});

describe('Email Send Test', () => {
  it('works', async () => {
    const ret = await BIZ.sendTemplate(TEST_TEAMPLTES_IDS.DUMMY, {
      title: 'Hello ModuSign',
      participantMappings: [
        {
          role: '참여자',
          name: '김민재',
          excluded: false,
          signingMethod: {
            type: ModuSign_SendMethod.EMAIL,
            value: 'support@stayjanda.com',
          },

          requesterMessage: '핑크로드 회원가입 사인',
        },
      ],
    });
    const { statusCode } = ret;

    console.log();

    expect(statusCode).toBe(201);
  });
});

describe('Document Read Test', () => {
  it('documents', async () => {
    const meta = JSON.stringify({
      담당자: '김모두',
    });

    const params = {
      offset: 0,
      limit: 10,
      metadatas: meta,
      filter: "detailStatus eq 'COMPLETED'",
    };

    const ret = await BIZ.getDocuments(params);

    const { statusCode } = ret;
    expect(statusCode).toBe(200);
  });
});

describe('lookup usage test', () => {
  it('usages', async () => {
    const from = '2021-09-01T00:00:00.000%2B0900';
    const to = '2021-09-30T23:59:59.999%2B0900';
    const result = await BIZ.lookUpUsage(from, to);
    const { statusCode } = result;
    expect(statusCode).toBe(200);
  });
});

describe('lookUp templates', () => {
  it('lookup template', async () => {
    const offset = 0;
    const limit = 10;
    const result = await BIZ.lookUpTemplates(offset, limit);
    const { statusCode } = result;
    expect(statusCode).toBe(200);
  });
});

describe('remind signing', () => {
  it(' remind-signing', async () => {
    const documentId = 1;
    const result = await BIZ.remindSignIng(documentId);
    const { statusCode } = result;
    expect(statusCode).toBe(200);
  });
});

describe('lookUpParticipantFields', () => {
  it('/documents/documentId/participant-fields', async () => {
    const documentId = 1;
    const result = await BIZ.lookUpParticipantFields(documentId);
    const { statusCode } = result;
    expect(statusCode).toBe(200);
  });
});
