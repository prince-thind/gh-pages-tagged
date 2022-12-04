#!/usr/bin/env node

const path = require("path");

const argv = require("minimist")(process.argv.slice(2));

const { makeRepoCopy, createVersionFolder, initializeFse, copyPublishDirContents, performCleanup } = require("./lib/fse");
const { switchToGhPages, initializeGit, gitPush, printUrl } = require("./lib/git");

const srcDir = process.cwd(); //repo path where it the cli is used
const destDir = path.join(__dirname, "temp"); // copy of the repo we want to work with (inside this repo)

const versionName = argv.version;
const publishDir = argv.dir;

main();

async function main() {
  const valid = validateArguements();
  if (!valid) return;

  console.log('working on it...')

  initializeFse(srcDir,destDir,versionName,publishDir);
  
  await makeRepoCopy();
  await initializeGit(destDir,versionName);
  await switchToGhPages();

  await createVersionFolder()
  await copyPublishDirContents();

  await gitPush();

  await printUrl();
  performCleanup();
}

function validateArguements() {
  if (!versionName || !publishDir) {
    console.error(
      "version name or dir name unspecified, please pass arguments as defined in the readme"
    );
    return false;
  }

  return true;
}

