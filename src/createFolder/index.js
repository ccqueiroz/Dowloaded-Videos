/**
 * 
 * @param {fs} fs
 * @param {string} dir 
 * 
 */

export const createFolder = ({ fs, dir }) => {
    if (!fs.existsSync(process.cwd() + '/' + dir)) {
 		fs.mkdirSync(process.cwd() + '/' + dir);
 	}
}