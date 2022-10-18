#!/usr/bin/env sh
export https_proxy=http://127.0.0.1:7890

# 确保脚本抛出遇到的错误
set -e

echo "deploy note..."
# 生成静态文件
yarn production

nowtime=$(date +%Y%m%d%H%M%S)

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'docs: deploy at '$nowtime
git push -f https://github.com/aimkiray/note-deploy.git master

cd -

echo "update note..."
cd docs/note

git add *
git commit -m 'docs: auto push at '$nowtime
git push -f

cd -

echo "it works!"
