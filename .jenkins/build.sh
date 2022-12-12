#!/bin/bash
sudo systemctl stop oforms

datestamp=$(date +"%Y%m%d_%H%M%S")

rm -rf /app/backup_oforms.onlyoffice.com*
mv /app/oforms.onlyoffice.com /app/backup_oforms.onlyoffice.com_$datestamp
mkdir -p /app/oforms.onlyoffice.com
tar -xzf /home/ubuntu/deploy/.jenkins/oforms.tar.gz -C /app/oforms.onlyoffice.com/
find /app/oforms.onlyoffice.com/ -type d -exec chmod 755 {} \;
find /app/oforms.onlyoffice.com/ -type f -exec chmod 644 {} \;
cd /app/oforms.onlyoffice.com/

yarn
yarn build

sudo systemctl start oforms
sudo sleep 10
