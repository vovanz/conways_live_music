#!/usr/bin/env bash
cd ${0%/*}
git checkout gh-pages
git merge master
git commit -m 'merge'
npm run build
git add ./dist/*
git commit -m 'build'
git push
git checkout master