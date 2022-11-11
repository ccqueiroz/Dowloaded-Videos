/**
 * 
 * @param {string} title 
 * 
 */
export const titleTreatment = (title) => {
    const textWithoutAcent = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    let textFormated = textWithoutAcent.replace(/[^\w\s]/gi, '');
    return textFormated;
}