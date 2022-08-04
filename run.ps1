Clear-Host
git commit -am "run"
node ./scripts/readme2json.js
node ./scripts/delete.js
node ./scripts/run.js