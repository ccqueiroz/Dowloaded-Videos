import request from 'request';

export const http = (options) => {
  return new Promise((resolve) =>
    request(options, (error, response, body) =>
      resolve({ error, response, body })
    )
  );
}
