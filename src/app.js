const { promises } = require('fs');

async function run() {
  const fileTarget = 'super-ultra-secure-file.text.enc';

  console.log('Writing file to: ', fileTarget);

  const text = `É agora ${new Date().toISOString()}`;

  await promises.writeFile(fileTarget, text);

  console.log('Decrypted content: ', (await promises.readFile(fileTarget)).toString());
  console.log('Finished !');
}

module.exports = {
  run
}