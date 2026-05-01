const loc = require('algeria-locations');
const wilayas = loc.getWilayas();
console.log('Wilayas:', wilayas.length);
console.log(wilayas[0]);

const setif = wilayas.find(w => w.wilaya_code === '19');
const setifCommunes = loc.getCommunesByWilaya(setif.wilaya_code);
console.log(setifCommunes[0]);
