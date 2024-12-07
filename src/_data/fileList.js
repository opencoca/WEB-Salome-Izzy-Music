// _data/fileList.js
const fs = require("fs");
const path = require("path");

// Define allowed audio file extensions
const audioExtensions = new Set(['.mp3', '.wav', '.ogg', '.aac', '.flac', '.webm', '.opus']);

function isAudioFile(file) {
  return audioExtensions.has(path.extname(file).toLowerCase());
}

function extractTrackInfo(file, parentPath) {
  const parts = path.relative(parentPath, file).split(path.sep);
  const artist = parts.length > 1 ? parts[0].replace(/_/g, " ") : "Anonymous";
  const title = parts[parts.length - 1]
    .replace(/\.[^/.]+$/, "")
    .replace(/_/g, " ");

  return { artist, title };
}

module.exports = () => {
  const directoryPath = path.join(__dirname, "../files");
  let fileList = [];

  fs.readdirSync(directoryPath, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      const subFiles = fs.readdirSync(fullPath);
      subFiles.forEach(subFile => {
        if (isAudioFile(subFile)) {
          const subFilePath = path.join(fullPath, subFile);
          const { artist, title } = extractTrackInfo(subFilePath, directoryPath);

          fileList.push({
            name: subFile,
            path: `/files/${entry.name}/${subFile}`,
            artist,
            title
          });
        }
      });
    } else if (isAudioFile(entry.name)) {
      fileList.push({
        name: entry.name,
        path: `/files/${entry.name}`,
        artist: "Anonymous",
        title: entry.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ")
      });
    }
  });

  return fileList;
};
