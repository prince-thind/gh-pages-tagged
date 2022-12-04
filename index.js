#!/usr/bin/env node

const fse = require("fs-extra");
const fs = require("fs");
const simpleGit = require("simple-git");
const path = require("path");

const git = simpleGit();

const srcDir = process.cwd();
const destDir = path.join(__dirname, "temp");

main();

async function main() {
  copyFolder();
  await switchToGhPages();
  createFolder();
  copyVersionContent();
  await gitPush();
  getURL();
  removeFolder();

  // deleteFolder();
}

//todo
/*
//make a temp copy--->
 //switch to gh-apges on copy--> 
 //create  a folder based on input--> 
 copy contents into this folder--> 
 git push -f-->
 provide url to user
*/

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
  await git.add('./*')
  await git.commit("updates");
  await git.push("origin", "gh-pages");
}

function getURL() {
  console.log('published')

}


function removeFolder() {}
