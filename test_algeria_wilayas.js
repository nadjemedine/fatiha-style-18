const { getWilayas, getCommunes } = require('algeria-wilayas');

const wilayas = getWilayas();
console.log('first wilaya:', wilayas[0]);

const data = wilayas.map(w => {
  const communes = getCommunes(w.id);
  return {
    id: w.id.toString(),
    name: w.name,
    ar_name: w.ar_name,
    communes: communes.map(c => ({ name: c.name, ar_name: c.ar_name }))
  };
});

console.log('first commune for Adrar:', data[0].communes[0]);

const fs = require('fs');
fs.writeFileSync('algeria_arabic.json', JSON.stringify(data, null, 2));
