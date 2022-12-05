#!/usr/bin/env node

const path = require("path");

const argv = require("minimist")(process.argv.slice(2));

const { makeRepoCopy, createVersionFolder, initializeFse, copyPublishDirContents, performCleanup, cleanupGhPages } = require("./lib/fse");
const { switchToGhPages, initializeGit, gitPush, printUrl,fetchGhPagesBranchLocally } = require("./lib/git");

const srcDir = process.cwd(); //repo path where it the cli is used
const destDir = path.join(__dirname, "temp"); // copy of the repo we want to work with (inside this repo)

const versionName = argv.version??'latest';
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

  await cleanupGhPages();

  await createVersionFolder()
  await copyPublishDirContents();
  // await linkGhPagesToLatest();

  await gitPush();

  await printUrl();
  await performCleanup();
  await fetchGhPagesBranchLocally()
}

function validateArguements() {
  if (!publishDir) {
    console.error(
      "dir name unspecified, please pass a name as --dir=name"
    );
    return false;
  }

  return true;
}

