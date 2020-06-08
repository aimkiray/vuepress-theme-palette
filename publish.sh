#!/usr/bin/env sh

set -e

cd /var/www/meowwoo.com/html

rm -rf * .[^.]*
git clone --depth=1 https://github.com/aimkiray/note-deploy.git .

cd -
