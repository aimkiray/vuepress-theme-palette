#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo "deploy note..."
# 生成静态文件
npm run production

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'docs: deploy'
git push -f git@github.com:aimkiray/note-deploy.git master

cd -

echo "update note..."
cd docs/.vuepress/note

git add -A
git commit -m 'docs: auto push'
git push

cd -

echo "it works!"