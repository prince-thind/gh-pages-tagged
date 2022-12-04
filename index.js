#!/usr/bin/env node

const fse = require("fs-extra");
const path=require('path')

const srcDir = process.cwd();
const destDir = path.join(__dirname,"temp");




main();

function main() {
    // return;
  try {
    fse.copySync(srcDir, destDir, { overwrite: true });
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}


//todo
/*
//make a temp copy--->
 switch to gh-apges on copy--> 
 create  a folder based on input--> 
 copy contents into this folder--> 
 git push -f-->
 provide url to user
*/
