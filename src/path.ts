export const ModuSignPath = {
  'request-with-template': '/documents/request-with-template',
  documents: '/documents',
  usages: `/usages`,
  templates: '/templates',
  remindSigning(documentId: string | number) {
    return `/${documentId}/remind-signing`;
  },
  'participant-fields'(documentId: string | number) {
    return `/${documentId}/participant-fields`;
  },
};
