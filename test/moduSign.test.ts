import { ModuSign } from '../src/index';
import dotenv from 'dotenv';
import path from 'path';
import { ModuSign_SendMethod } from '../src/type';

const TEST_TEAMPLTES_IDS = {
  DUMMY: 'fd6f38e0-6152-11ec-ab01-bb92e7aeb67e',
};

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const BIZ = new ModuSign({ showLog: true });

describe('hashKeyTest', () => {
  it('works', async () => {
    await BIZ.generateKey();
  });
});

describe('Email Send Test', () => {
  it('works', async () => {
    await BIZ.sendTemplate(TEST_TEAMPLTES_IDS.DUMMY, {
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
  });
});
