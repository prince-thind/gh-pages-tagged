#!/usr/bin/env node

const fse = require("fs-extra");
const fs = require("fs");
const simpleGit = require("simple-git");
const path = require("path");

const git = simpleGit();

const srcDir = process.cwd();
const destDir = path.join(__dirname, "temp");

const versionName = process.argv[2];

main();

async function main() {
  copyFolder();
  await switchToGhPages();
  createFolder();
  copyVersionContent();
  await gitPush();
  await getURL();
  removeFolder();

}



function copyFolder() {
  try {
    fse.copySync(srcDir, destDir, { overwrite: true });
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}

async function switchToGhPages() {
  await git.cwd(destDir);
  await git.checkout("gh-pages");
  await git.clean("fdx");
}

function createFolder() {
  const versionName = process.argv[2];
  fs.mkdirSync(path.join(destDir, versionName));
}

function copyVersionContent() {
  const versionName = process.argv[2];
  const folderName = process.argv[3];

  try {
    fse.copySync(
      path.join(srcDir, folderName),
      path.join(destDir, versionName),
      { overwrite: false }
    );
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}

async function gitPush() {
  await git.add("./*");
  await git.commit("updates");
  await git.push("origin", "gh-pages", { "--force": true });
}

async function getURL() {
  const remoteURL = (await git.getConfig("remote.origin.url")).value;
  const regex = /git@github.com:(.*)\/(.*).git/;
  const result = regex.exec(remoteURL);

  const username = result[1];
  const repoName = result[2];
  console.log(
    `Published at: https://${username}.github.io/${repoName}/${versionName}`
  );
}

function removeFolder() {
  fse.removeSync(destDir)
}
