
/**
 * 
 * @param {string} acess_token 
 * @param {string} cookies 
 * @param {string} course 
 * @param {import('../http').default} http 
 * 
 */

export const getCourse = async ({
  access_token,
  cookies,
  course,
  http,
}) => {
  try {
    const response = await http({
      url: `https://cursos.alura.com.br/mobile/v2/course/${course}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "alura-mobi/android-79",
        Host: "cursos.alura.com.br",
        Authorization: `Bearer ${access_token}`,
        Connection: "Keep-Alive",
        Cookie: cookies,
      },
    });

    return response?.body;
  } catch (error) {
    console.log(`[ERROR: GET-COURSE]: ${error}`);
    return error;
  }
};
