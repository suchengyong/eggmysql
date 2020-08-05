
const BaseServic = require('./base');

class Service extends BaseServic {
  constructor(...agrs){
    super(...agrs);
    this.entity = 'role_resource'
  }
}

module.exports = Service;