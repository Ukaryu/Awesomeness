var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pubSchema = new Schema({
  name: String
}, {collection: 'ror'});

mongoose.model('ror', pubSchema);
