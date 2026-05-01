import https from 'https';

const urls = [
  'https://raw.githubusercontent.com/S450R1/algeria-cities-2025/main/json/cities.json',
  'https://raw.githubusercontent.com/AbderrahmeneDZ/Wilaya-Of-Algeria/master/wilaya.json',
  'https://raw.githubusercontent.com/othmanus/algeria-cities/master/wilayas.json'
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const url of urls) {
    console.log('Trying', url);
    const data = await fetchJson(url);
    if (data) {
      console.log('Success! Items length:', Array.isArray(data) ? data.length : Object.keys(data).length);
      console.log('Sample item:', JSON.stringify(data[0] || data[Object.keys(data)[0]], null, 2).substring(0, 500));
      return;
    }
  }
}
run();
