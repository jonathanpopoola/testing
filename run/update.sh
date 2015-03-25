#!/bin/bash

echo "Update: Stopping Node"
./stopNode.sh
echo "Update: Changing dir"
cd ../
echo "Update: Running npm install"
npm install
echo "Update: Running bundle install"
bundle install
echo "Update: running gulp"
gulp
echo "Update: changing dir to run"
cd run/
echo "Update: starting Node"
./startNode.sh
