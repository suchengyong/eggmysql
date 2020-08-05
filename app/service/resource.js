
const BaseServic = require('./base');

class Service extends BaseServic {
  constructor(...agrs){
    super(...agrs);
    this.entity = 'resource'
  }
}

module.exports = Service;