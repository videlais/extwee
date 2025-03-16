import Axios from 'axios';
import fs from 'fs';

const official_URL = 'https://videlais.github.io/story-formats-archive/official/index.json';
const base_URL = 'https://raw.githubusercontent.com/videlais/story-formats-archive/refs/heads/main/official/twine2/';

// Show a message if the user is using the CLI.
console.log('Fetching latest JSON database...');

/**
 * @function getDatabase
 * @description Fetch a JSON database from a URL.
 * @param {String} path 
 * @returns 
 */
async function getDatabase(path) {
    try {
        const response = await Axios.get(path);
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching database:', error);
        throw error;
    }
}

// Fetch the official database.
const officialPromise = await getDatabase(official_URL);

// Get the 'twine1' array from the official database.
const twine1 = officialPromise.twine1;

// Get the 'twine2' array from the official database.
const twine2 = officialPromise.twine2;

  // Create an object with properties based on the 'name' property of each object in the 'twine2' array.
  const twine2DB = {};
  // Loop through the twine2 array and add each item to the twine2Object.
  twine2.forEach((item) => {
      twine2DB[item.name] = item;
  });

  let filteredDB = {};

  // For each key, filter an array of objects based on the 'name' property.
  Object.keys(twine2DB).forEach((key) => {
      const item = twine2DB[key];
      const filteredArray = twine2.filter((obj) => obj.name === item.name);
      //console.log(filteredArray);
      filteredDB[key] = filteredArray;
  });

   // Create a directory name 'story-formats' if it doesn't exist.
   const dir = './story-formats';
   if (!fs.existsSync(dir)){
       fs.mkdirSync(dir);
   }

/**
 * @function getLatest
 * @description Get the latest version of each story format and download the files.
 */
async function getLatest() {
    // Get the latest version of each story format.
    const latestVersions = Object.keys(filteredDB).reduce((acc, key) => {
        const versions = filteredDB[key];
        const latestVersion = versions.reduce((latest, current) => {
            return current.version > latest.version ? current : latest;
        });
        acc[key] = latestVersion;
        return acc;
    }, {});

    // For each key, create a directory with the name of the story format.
    for (const key in latestVersions) {
        const dirName = `${dir}/${key}`;
        if (!fs.existsSync(dirName)){
            fs.mkdirSync(dirName);
        }
    }

    // For each key in latestVersion, download every file listed in the 'files' array.
    for (const key in latestVersions) {
        const version = latestVersions[key];
        const files = version.files;

        // For every version, create a directory based on it.
        const versionDir = `${dir}/${key}/${version.version}`;
        if (!fs.existsSync(versionDir)){
            fs.mkdirSync(versionDir);
        }

        for (const file of files) {
            const filePath = `./story-formats/${key}/${version.version}/${file}`;
            const fileURL = `${base_URL}/${key}/${version.version}/${file}`;
            const fileResponse = await Axios.get(fileURL, { responseType: 'arraybuffer' });
            fs.writeFileSync(filePath, fileResponse.data);
            console.log(`Downloaded ${file} to ${filePath}`);
        }
    }
}

async function getSpecificVersion(name, version) {

    // Does 'name' exist in the database?
    if (!filteredDB[name]) {
        console.error(`❌ Story format ${name} not found.`);
        return;
    }

    // Does 'version' exist for the specific 'name'?
    if (!filteredDB[name].some(item => item.version === version)) {
        console.error(`❌ Version ${version} for ${name} not found.`);
        return;
    }

    const dir = './story-formats';

    const dirName = `${dir}/${name}`;
    if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }

    // Create a directory for the specific version.
    const versionDir = `${dirName}/${version}`;
    if (!fs.existsSync(versionDir)){
        fs.mkdirSync(versionDir);
    }

    // Get the files for the specific version.
    const files = filteredDB[name].find(item => item.version === version).files;

    // For each file, download it.
    for (const file of files) {
        const filePath = `${dirName}/${version}/${file}`;
        const fileURL = `${base_URL}/${name}/${version}/${file}`;
        const fileResponse = await Axios.get(fileURL, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, fileResponse.data);
        console.log(`Downloaded ${file} to ${filePath}`);
    }
}

// Get the latest version of each story format.
await getSpecificVersion('chapbook', '2.3.0');