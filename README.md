# gh-pages-tagged

A minimalistic but handy cli tool to publish multiple versions of a repo on github pages. This project is independent of the original `gh-pages` package and you are not recommended to use both as using '`gh-pages` will essentially destroy all your previous tagged version.

# API

Currently, this package supports only two command line options,

1. `--dir` : `name of the directory you want to publish`, (required)
2. `--version` : `name of the version that you want it to have on github pages` (optional, defaults to 'latest')

Example:

1. `npx gh-pages-tagged --dir=dist --version=v2.0.0`  
will publish your page at `https://username.github.io/repoName/v2.0.0`.

2. `npx gh-pages-tagged --dir=build 
will publish your page at `https://username.github.io/repoName/latest`.

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

The published tagged version can then be accessed by \<url>/tagName, the original url always points to url/latest


# Contribution
Please feel free to raise issues, queries or Pull requests. This is really my first npm package to have been published on npm, I am open to conversations about this or really any other projects of mine. 


# Wow There is already X package that does this
Sure, you are perfectly entitled to make your own decisions in life. I have no intention to challange your right to freedom. This package is built not only as a minimalistic utlity but also a good learning project for me. The goal of this package is not to be perfect but to be learning experience for me whilst also contributing `something` to npm.
