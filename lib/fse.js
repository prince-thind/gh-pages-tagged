const fse = require("fs-extra");
const path = require("path");

const config = {
  src: null,
  dest: null,
  version: null,
};

exports.initializeFse = function (src, dest, version, target) {
  config.src = src;
  config.dest = dest;
  config.version = version;
  config.publishDir = target;
};

exports.cleanupGhPages = async function () {
  const contents = await fse.readdir(config.dest);

  for (const entity of contents) {
    if (isNameSafe(entity)) {
      continue;
    }

    await fse.remove(path.join(config.dest, entity));
  }

  function isNameSafe(name) {
    return (
      name.search(/(^[0-9])|(^v[0-9])|(^index.html)|(^.git)|(^latest)/i) !== -1
    );
  }
};

exports.makeRepoCopy = async function () {
  await fse.copy(config.src, config.dest, { overwrite: true });
};

exports.createVersionFolder = async function () {
  const contents = await fse.readdir(config.dest);
  const pathOfVersionFolder = path.join(config.dest, config.version);

  if (contents.includes(config.version)) {
    await fse.remove(pathOfVersionFolder);
  }

  await fse.mkdir(pathOfVersionFolder);
};

exports.copyPublishDirContents = async function () {
  const destination = path.join(config.dest, config.version);
  await fse.copy(path.join(config.src, config.publishDir), destination, {
    overwrite: true,
  });
  
  //remove .git if present
  await fse.remove(path.join(destination, ".git"));
};

exports.performCleanup = async function () {
  await fse.remove(config.dest);
};
