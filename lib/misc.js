const simpleGit = require("simple-git");
const fse = require("fs-extra");
const path = require("path");
const { getUsernameAndRepoName } = require("./git");

const git = simpleGit();

exports.fetchGhpagesToOriginalRepo = async function (originalRepoUrl) {
  await git.cwd(originalRepoUrl);
  await git.fetch();
};

exports.linkGhPagesToLatest = async function (dest) {
  const { username, repoName } = await getUsernameAndRepoName();
  const fileContents = getHtml(username, repoName);

  await fse.writeFile(path.join(dest,"index.html"),fileContents)
};

function getHtml(username, repoName) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Click <a href="https://${username}.github.io/${repoName}/latest">Here </a> if browser redirect doesn't work
  <script>
  window.location.href='https://${username}.github.io/${repoName}/latest'
  </script>
</body>
</html>
    `;
}
