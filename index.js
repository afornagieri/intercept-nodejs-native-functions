const CryptoHelper = require('./src/cryptoHelper');

const app = require('./src/app');
const CustomFSPromises  = require('./src/customFSPromises');
const Decorator = require('./src/decorator');

;(async () => {
  const config = {
    // aes-192
    // 24 characters * 8
    criptoKey: 'my-super-secure-key-1234'
  }

  const cryptoHelper = await CryptoHelper.setup(config.criptoKey);

  const customFSPromises = new CustomFSPromises(cryptoHelper).configure();

  Decorator.decorateModule(customFSPromises, require('fs').promises);

  await app.run(); 
})();