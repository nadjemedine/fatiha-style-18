const fs = require('fs');
const m = require('algeria-wilayas').default;

const wilayasData = m.wilayas.map(w => {
  const wCode = w.code;
  const wId = parseInt(wCode, 10).toString();
  const wCommunes = m.communes.filter(c => c.wilaya_code === wCode);
  return {
    id: wId,
    name: w.name.ascii,
    ar_name: w.name.arabic,
    communes: wCommunes.map(c => ({
      name: c.commune_name_ascii,
      ar_name: c.commune_name
    }))
  };
});

let output = `export const wilayas = ${JSON.stringify(wilayasData, null, 2)};\n\n`;

output += `// Yalidine delivery prices by wilaya (in DZD)
export const yalidinePrices: Record<string, { home: number; office: number }> = {
  "1": { home: 900, office: 700 },   // Adrar
  "2": { home: 600, office: 450 },   // Chlef
  "3": { home: 700, office: 550 },   // Laghouat
  "4": { home: 650, office: 500 },   // Oum El Bouaghi
  "5": { home: 600, office: 450 },   // Batna
  "6": { home: 650, office: 500 },   // Béjaïa
  "7": { home: 650, office: 500 },   // Biskra
  "8": { home: 850, office: 650 },   // Béchar
  "9": { home: 500, office: 400 },   // Blida
  "10": { home: 600, office: 450 },  // Bouira
  "11": { home: 1100, office: 900 }, // Tamanrasset
  "12": { home: 650, office: 500 },  // Tébessa
  "13": { home: 650, office: 500 },  // Tlemcen
  "14": { home: 600, office: 450 },  // Tiaret
  "15": { home: 650, office: 500 },  // Tizi Ouzou
  "16": { home: 450, office: 350 },  // Alger
  "17": { home: 650, office: 500 },  // Djelfa
  "18": { home: 700, office: 550 },  // Jijel
  "19": { home: 600, office: 450 },  // Sétif
  "20": { home: 650, office: 500 },  // Saïda
  "21": { home: 650, office: 500 },  // Skikda
  "22": { home: 650, office: 500 },  // Sidi Bel Abbès
  "23": { home: 650, office: 500 },  // Annaba
  "24": { home: 650, office: 500 },  // Guelma
  "25": { home: 600, office: 450 },  // Constantine
  "26": { home: 550, office: 400 },  // Médéa
  "27": { home: 650, office: 500 },  // Mostaganem
  "28": { home: 650, office: 500 },  // M'Sila
  "29": { home: 650, office: 500 },  // Mascara
  "30": { home: 800, office: 600 },  // Ouargla
  "31": { home: 600, office: 450 },  // Oran
  "32": { home: 750, office: 600 },  // El Bayadh
  "33": { home: 1100, office: 900 }, // Illizi
  "34": { home: 600, office: 450 },  // Bordj Bou Arréridj
  "35": { home: 500, office: 400 },  // Boumerdès
  "36": { home: 700, office: 550 },  // El Tarf
  "37": { home: 950, office: 750 },  // Tindouf
  "38": { home: 650, office: 500 },  // Tissemsilt
  "39": { home: 750, office: 600 },  // El Oued
  "40": { home: 650, office: 500 },  // Khenchela
  "41": { home: 650, office: 500 },  // Souk Ahras
  "42": { home: 500, office: 400 },  // Tipaza
  "43": { home: 650, office: 500 },  // Mila
  "44": { home: 550, office: 400 },  // Aïn Defla
  "45": { home: 750, office: 600 },  // Naâma
  "46": { home: 650, office: 500 },  // Aïn Témouchent
  "47": { home: 750, office: 600 },  // Ghardaïa
  "48": { home: 650, office: 500 },  // Relizane
  "49": { home: 800, office: 600 },  // El M'Ghair
  "50": { home: 850, office: 650 },  // El Menia
  "51": { home: 700, office: 550 },  // Ouled Djellal
  "52": { home: 1200, office: 1000 },// Bordj Baji Mokhtar
  "53": { home: 950, office: 750 },  // Béni Abbès
  "54": { home: 900, office: 700 },  // Timimoun
  "55": { home: 800, office: 600 },  // Touggourt
  "56": { home: 1100, office: 900 }, // Djanet
  "57": { home: 950, office: 750 },  // In Salah
  "58": { home: 1200, office: 1000 },// In Guezzam
};
`;

fs.writeFileSync('lib/algeria-data.ts', output);
console.log('File successfully generated!');
