const { eventOrder } = require('./constants');

class CustomFSPromises {
  constructor(cryptoHelper) {
    this.cryptoHelper = cryptoHelper;
  }

  async writeFile(filename, data, encoding = '') {

    const encryptedText = await this.cryptoHelper.encrypt(data);

    return Object.values({
      filename,
      encryptedText,
      encoding
    });

  }

  async readFile(data) {
    const decryptedText = await this.cryptoHelper.decrypt(data);
    return decryptedText;
  }

  configure() {
    const configuration = new Map();

    
    const writeFileOptions = {
      when: eventOrder.beforeOriginalCall,
      fn: this.writeFile.bind(this)
    }
    
    configuration.set(this.writeFile.name, writeFileOptions);
    
    const readFileOptions = {
      when: eventOrder.afterOriginalCall,
      fn: this.readFile.bind(this)
    }

    configuration.set(this.readFile.name,readFileOptions);

    return configuration;
  }

}

module.exports = CustomFSPromises;