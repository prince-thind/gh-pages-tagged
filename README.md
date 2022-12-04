# gh-pages-tagged

A minimalistic but handy cli tool to publish multiple versions of a repo on github pages. 
# API

Currently, this package supports only two command line options, both are required to be provided at the time of execution, resulting in an error otherwise:

1. `--dir` : `name of the directory you want to publish`
2. `--version` : `name of the version that you want it to have on github pages`

Example:

`npx gh-pages-tagged --dir=dist --version=v2.0.0`  
will publish your page at `https://username.github.io/repoName/v2.0.0`.

# How it works

Normally, this is what gh-pages does:

- creates a branch named gh-pages
- puts all the content of the folder that you specify in this branch, everything else is deleted
- tells github to set gh-pages as the github pages branch

this is really great for bundlings tool and things like CRA, but does not help with versioned or tagged github pages.

gh-pages-tagged aims to provide users with tagged gh-pages. So basically this is what gh-pages-tagged does:

- creates a folder(--version option) inside the gh-pages branch.
- copies the specified content(--dir option) into the above folder
- creates a commit
- pushes this commit to github

The published tagged version can then be accessed by \<url>/tagName, the original url is not affected by the operations of gh-pages-tagged.


