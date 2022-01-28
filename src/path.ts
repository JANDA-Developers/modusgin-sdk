const paths = {
  host: 'https://api.modusign.co.kr',
  api: {
    'request-with-template': '/documents/request-with-template',
    documents: '/documents',
    usages: `/usages`,
    templates: '/templates',
  },
};

export declare module ModuSignPaths {
  export type apiPaths = keyof typeof paths.api;
}

export const ModuSignPaths = {
  get(key: ModuSignPaths.apiPaths) {
    return paths.host + paths.api[key];
  },
};
