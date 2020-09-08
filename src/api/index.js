const PORT = 3001;
export const ENDPOINT_ORIGIN = `${window.location.protocol}//${window.location.hostname}:${PORT}`;

export default {
  getComments: `${ENDPOINT_ORIGIN}/comments`,
  addComment: `${ENDPOINT_ORIGIN}/comments`,
};
