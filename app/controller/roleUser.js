const BaseController = require('./base');

class Controller extends BaseController {
  constructor(...agrs){
    super(...agrs);
    this.entity = 'roleUser'
  }
}

module.exports = Controller;
