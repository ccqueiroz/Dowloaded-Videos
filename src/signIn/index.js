/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {import('../http').default} http 
 * 
 */

export const signIn = async ({ email, password, http }) => {
  const response = await http({
    url: "https://cursos.alura.com.br/mobile/token",
    method: "POST",
    body: `password=${password}&client_secret=3de44ac5f5bccbcfba14a77181fbdbb9&client_id=br.com.alura.mobi&username=${email}&grant_type=password`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "alura-mobi/android-79",
      Host: "cursos.alura.com.br",
      Connection: "Keep-Alive",
    },
  });

  if (response?.body?.includes("access_token")) {
    const access_token = JSON.parse(response.body).access_token;

    const cookies = (response.response?.headers["set-cookie"] || []).join(";");

    return {
      access_token,
      cookies,
    };
  }

  return false;
};
