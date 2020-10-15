export const getCommentsResponse = {
  status: 'OK',
  statusText: 200,
  data: {
    page: 1,
    pages: 1,
    docs: [
      {
        _id: 1,
        name: 'Dung',
        message: 'Hello World',
      },
      {
        _id: 2,
        name: 'Oanh',
        message: 'How are you?',
      },
    ],
  },
};

export const addCommentResponse = {
  status: 'OK',
  statusText: 200,
  data: {},
};
