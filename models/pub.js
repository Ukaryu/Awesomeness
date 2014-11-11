var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pubSchema = new Schema({
  name: String
}, {collection: 'pub'});

mongoose.model('pub', pubSchema);
