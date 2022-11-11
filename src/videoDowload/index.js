import { logger } from "../logger/index.js";

/**
 * 
 * @param {string} path 
 * @param {string} url 
 * @param {string} title 
 * @param {import('fs').default} fs 
 * @param {import('axios').default} axios 
 * 
 */

export const videoDowload = async ({ path, url, title, fs, axios }) => {
  let writer = fs.createWriteStream(path, { flags: 'w' });
  await axios({
    method: "GET",
    url,
    responseType: "stream",
  }).then(async response => {
    return await new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          logger({ type: 9, infos: { title } });
          resolve(true);
        }
      })
    })
  });
};
