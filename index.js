#!/usr/bin/env node

const fse = require("fs-extra");
const simpleGit = require("simple-git");
const path = require("path");

const srcDir = process.cwd();
const destDir = path.join(__dirname, "temp");

main();

async function main() {
  copyFolder();
  await switchToGhPages();
  // deleteFolder();
}

//todo
/*
//make a temp copy--->
 //switch to gh-apges on copy--> 
 create  a folder based on input--> 
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
  const git = simpleGit();
  await git.cwd(destDir);
  await git.checkout("gh-pages");
}
