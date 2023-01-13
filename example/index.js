const PasswordGenerator = require('../build/index.cjs');

const rpg = new PasswordGenerator();

rpg.config.length = 17;
rpg.config.first = 'upper';
console.log(rpg.generate());
rpg.config.first = 'symbol';
rpg.config.length = 5;
rpg.config.numeric = false;
console.log(rpg.generate());
