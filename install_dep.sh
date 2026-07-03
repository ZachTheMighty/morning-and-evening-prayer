#!/bin/bash
npm install --save-dev webpack webpack-cli webpack-dev-server@latest --legacy-peer-deps webpack-merge html-webpack-plugin css-loader style-loader
npm install --save-dev --save-exact prettier
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
npm init @eslint/config@latest
