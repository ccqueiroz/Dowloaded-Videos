import { logger } from "../logger/index.js";
import { signIn } from "../signIn/index.js";
import { http } from '../http/index.js';
import { getCourse } from "../getCourse/index.js";
import { titleTreatment } from "../titleTreatment/index.js";
import { createFolder } from "../createFolder/index.js";
import { getVideo } from "../getLinkVideo/index.js";
import { videoDowload } from "../videoDowload/index.js";

/**
 * 
 * @param {object} data
 * @param {fs} fs
 * @param {axios} axios 
 * 
 */

export const main = async ({ data, fs, axios }) => {
    const { email, password, courses } = data;

    logger({ type: 10, infos: { email, password } });
    
    for (let i = courses.length - 1; i >= 0; i--) {
        courses[i] = courses[i].split('course/');
    }

    logger({ type: 1, infos: { email, password } });

    const { access_token, cookies } = await signIn({ email, password, http });
    
    if (!access_token) {
        logger({ type: 1, infos: { email, password } });
        return;
    }

    logger({ type: 6, infos: { email, password } });
    logger({ type: 7, infos: { email, password } });

    for (let i = 0; i < courses.length; i++) {
        let parse = await getCourse({ access_token, cookies, course: courses[i][1], http });
        logger({ type: 8, infos: { email, password } });
        let infos = JSON.parse(parse);
        const { id, slug, name, totalVideoTime } = infos;
        logger({ type: 3, infos: { id, slug, name, totalVideoTime } });
        let folderName = titleTreatment(name);
        createFolder({
            fs,
            dir: folderName,
        });

        for (const title of infos.sections) {
            const titleFormated = titleTreatment(title.titulo);
            logger({ type: 4, infos: { title: titleFormated } });
            createFolder({
                fs,
                dir: `${folderName}/${title.position} - ${titleFormated}`,
            });
            title?.videos?.forEach(async (lesson) => {
                let folderLesson = titleTreatment(lesson?.nome);
                let url = await getVideo({
                    id: lesson.id,
                    slug: infos.slug,
                    token: access_token,
                    cookies,
                    http,
                });
                logger({ type: 5, infos: { lesson: lesson.nome, id: lesson.id } });
                await videoDowload({
                    path: `${folderName}/${title.position} - ${titleFormated}/${lesson.position} - ${folderLesson}.mp4`,
                    url,
                    title: folderLesson,
                    fs,
                    axios,
                })
            });

        }
    }   

}