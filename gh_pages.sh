#!/usr/bin/env bash
cd ${0%/*}
git checkout gh-pages
git merge master
npm run build
git add ./dist/*
git commit -m 'build'
git push --all -u
git checkout master