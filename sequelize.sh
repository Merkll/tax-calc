#!/usr/bin/env bash

shopt -s globstar

# Read arguments passed to the script.
buildDir=./sequelize-build

echo ""
echo "Starting command $*"
echo ""

echo " -> Step 1/4: Compiling migration scripts."
echo ""
npx tsc ./db/postgresql/**/*.ts  --outDir $buildDir
echo ""
echo " -> Compilation completed."
echo ""

echo ""
echo " -> Step 2/4: Compiling and Copying resources required for migration."
npx tsc ./src/config/sequelize.ts  --outDir $buildDir
npx tsc ./src/models/**/*.ts  --outDir $buildDir
initialContent=$(<.sequelizerc)
cat <<EOF > .sequelizerc
module.exports = {
  'config': '$buildDir/sequelize.js',
  'models-path': '$buildDir/models',
  'seeders-path': '$buildDir/seeders',
  'migrations-path': '$buildDir/migrations'
}
EOF
echo " -> Copying resources completed."
echo ""

echo ""
echo " -> Step 3/4: Starting $*."
echo ""
./node_modules/.bin/sequelize $*
echo ""
echo " -> Migration completed."
echo ""

echo ""
echo " -> Step 4/4: Deleting generated files."
echo ""
rm -rf ./sequelize-build
echo "$initialContent" > .sequelizerc
echo ""
echo " -> command $1 completed."
