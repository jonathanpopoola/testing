#!/bin/bash

if [ -f node.log ]; then
	rm node.log
fi

nohup node ../src/webapp/app.js > node.log 2>&1 &
echo $! > node.pid
echo "Node process started."
