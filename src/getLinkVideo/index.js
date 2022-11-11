
/**
 * 
 * @param {int} id 
 * @param {string} slug 
 * @param {string} token 
 * @param {string} cookies 
 * @param {import('../http').default} http 
 * 
 */

export const getVideo = async ({
  id,
  slug,
  token,
  cookies,
  http,
}) => {
  try {
    const response = await http({
      url: `https://cursos.alura.com.br/mobile/courses/${slug}/busca-video-${id}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "alura-mobi/android-79",
        Host: "cursos.alura.com.br",
        Authorization: `Bearer ${token}`,
        Connection: "Keep-Alive",
        Cookie: cookies,
      },
    });

    const parseBody = JSON.parse(response?.body);
      
      if (parseBody?.errror) {
          return null;
      }

      const [hd] = parseBody;
      
      return hd?.link;
  } catch (error) {
      console.log(`[ERROR: GET-VIDEO]: ${error}`);
      return error;
  }
};
