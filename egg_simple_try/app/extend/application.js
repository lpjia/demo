const _ = require('lodash');
const LODHASH = Symbol('Application#_');

module.exports = {
  get _() {
    if (!this[LODHASH]) {
      this[LODHASH] = _;
    }
    return this[LODHASH];
  },
};
