
const BaseController = require('./base');

class Controller extends BaseController {
  constructor(...agrs){
      super(...agrs);
      this.entity = 'roleResource'
  }
}

module.exports = Controller;
