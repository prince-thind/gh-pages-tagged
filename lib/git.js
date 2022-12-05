const simpleGit = require("simple-git");

const git = simpleGit();

let versionName = null;

exports.initializeGit = async function (repoPath, vName) {
  await git.cwd(repoPath);
  versionName = vName;
};

exports.switchToGhPages = async function () {
  const branches = (await git.branch()).all;

  if (!branches.some(b=>b.includes("gh-pages"))) {
    //creates a branch if it does not exist
    await git.checkout({ "--orphan": "gh-pages" });
    await git.reset("hard");
    await git.clean("fdx");
    await git.commit("inital commit",{"--allow-empty":true});
  }

  await git.clean("fdx");
  await git.checkout("gh-pages", { "--force": true });
};

exports.gitPush = async function () {
  await git.add("./*");
  await git.commit("updates");
  await git.push("origin", "gh-pages",{"--force":true});
};

exports.printUrl = async function () {
  const { username, repoName } = await getUsernameAndRepoName();

  console.log(
    `Page will be Published at: https://${username}.github.io/${repoName}/${versionName}`
  );
};

exports.getUsernameAndRepoName = getUsernameAndRepoName;

async function getUsernameAndRepoName() {
  const remoteURL = (await git.getConfig("remote.origin.url")).value;
  const regex = /git@github.com:(.*)\/(.*).git/;
  const result = regex.exec(remoteURL);

  const username = result[1];
  const repoName = result[2];

  return { username, repoName };
}
