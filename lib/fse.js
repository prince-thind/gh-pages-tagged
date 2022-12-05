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

exports.cleanupGhPages=async function(){

  //TODO, not needed as of now
  // const contents=await fse.readdir(config.dest);

  // for(const entity of contents){
  //   if(isNameSafe(entity)){
  //     continue;
  //   }

    // await fse.remove(path.join(config.dest,entity))
  // }

  // function isNameSafe(name){
  //   console.log(name,name.match(/(^[0-9]*.)|(^v[0-9]*.)|(^index.html)|(^.git)/ig))
  //   return name.match(/(^[0-9]*.)|(^v[0-9]*.)|(^index.html)|(^.git)/ig)
  // }
}

exports.makeRepoCopy = async function () {
  await fse.copy(config.src, config.dest, { overwrite: true });
};

exports.createVersionFolder = async function () {
  const contents=await fse.readdir(config.dest);
  const pathOfVersionFolder=path.join(config.dest,config.version)

  if(contents.includes(config.version)){
    await fse.remove(pathOfVersionFolder)
  }

  await fse.mkdir(pathOfVersionFolder);
};

exports.copyPublishDirContents = async function () {
  await fse.copy(
    path.join(config.src, config.publishDir),
    path.join(config.dest, config.version),
    { overwrite: true }
  );
};


exports.performCleanup = async function () {
  await fse.remove(config.dest);
};


