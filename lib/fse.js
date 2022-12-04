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

exports.makeRepoCopy = async function () {
  await fse.copy(config.src, config.dest, { overwrite: true });
};

exports.createVersionFolder = async function () {
  await fse.mkdir(path.join(config.dest, config.version));
};

exports.copyPublishDirContents = async function () {
  await fse.copy(
    path.join(config.src, config.publishDir),
    path.join(config.dest, config.version),
    { overwrite: true }
  );
};

exports.performCleanup = function () {
  fse.removeSync(config.dest);
};
