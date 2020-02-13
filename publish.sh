#!/usr/bin/env sh

set -e

cd /usr/share/nginx/html

rm -rf * .[^.]*
git clone --depth=1 https://github.com/aimkiray/note-deploy.git .

cd -