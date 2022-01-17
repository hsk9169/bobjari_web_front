import imageCompression from 'browser-image-compression';

export const blobToFile = (blobFile, fileName) => {
    blobFile.lastModifiedDate = new Date();
    blobFile.name = fileName;
    blobFile.webkitRelativePath = "";
    let resultFile = new File([blobFile], fileName, {
        type: blobFile.type
    })
    return resultFile;
}

export const compressImgFile = async (file) => {
    const options = {
        maxSizeMB: 0.01,
        maxWidthOrHeight: 130,
        useWebWorker: true,
    };
    let result;
    await imageCompression(file, options)
        .then(blob => {
            result = blob;
        })
        .catch(err => {
            console.log(err.message);
        });
    return result;
}