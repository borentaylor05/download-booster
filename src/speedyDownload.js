const fs = require('fs');
const axios = require('axios');
const StreamConcat = require('stream-concat');

const log = require('./log');

// make a call for zero bytes just to read the total size of the file
// could download the first chunk here but this seemed cleaner even though it's slower
function getFileSize(fileUrl) {
    log.info(`\nFetching ${fileUrl}...`);
    return axios.get(fileUrl, {
        headers: {
            Range: 'bytes=0-0'
        }
    }).then((response) => {
        if (!response.headers['content-range']) {
            throw new Error('No content-range header found');
        }

        const contentRange = response.headers['content-range'].split('/');

        // range should be in format 'bytes 0-1/22849'
        if (contentRange.length !== 2) {
            throw new Error(`content-range header "${response.headers['content-range']}" is not correctly formatted`);
        }

        const totalSize = Number(contentRange[1]);
        log.info(`File retrieved. Total size is ${totalSize} bytes`);

        return totalSize;
    }).catch((err) => {
        throw new Error(`Error fetching file: ${err.response.status}`);
    });
}

// create an array of promises so chunks can be retrieved in parallel
function makePromises(fileUrl, fileSize, chunkSize, maxChunks = 0) {
    const totalChunks = Math.ceil(fileSize / chunkSize);
    // only use max chunks if it is passed as option and it is less than total chunks
    const chunks = maxChunks && maxChunks < totalChunks ? maxChunks : totalChunks;

    log.info(`Creating chunk requests...${chunks} total chunks with chunk size of ${chunkSize} bytes`);

    const promises = [];

    for (let i = 0; i < chunks; i++) {
        const firstByte = chunkSize * i;
        const lastBye = (chunkSize * i) + (chunkSize - 1);
        const requestOptions = {
            responseType: 'stream',
            headers: {
                Range: `bytes=${firstByte}-${lastBye}`
            }
        };

        promises.push(axios.get(fileUrl, requestOptions));
    }

    return Promise.all(promises);
}

// pipe stream to the specified output file
function saveFile(responses, outputFilename) {
    log.info('Saving file...');
    const writeStream = fs.createWriteStream(outputFilename);
    const streams = responses.map(resp => resp.data);
    const combinedStream = new StreamConcat(streams);

    combinedStream.pipe(writeStream);

    return outputFilename;
}

function speedyDownload(fileUrl, { chunkSize = 1024 * 1024, maxChunks = 0, outputFilename = 'output.pdf' }) {
    return getFileSize(fileUrl)
        .then(fileSize => makePromises(fileUrl, fileSize, chunkSize, maxChunks))
        .then(responses => saveFile(responses, outputFilename));
}

module.exports = speedyDownload;
