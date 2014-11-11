var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePages = require('mongoose-pages');

var pubSchema = new Schema({
  Pub: String,
  Aldersgrense: String,
  Apningstider: String,
  Hjemmside: String,
  Type: String,
  Adresse: String,
  Tlf: String,
  Mail: String,
  Kleskode: String,
  Inngangspris: String,
  Diverse: String
}, {collection: 'pubs'});



mongoosePages.skip(pubSchema); // makes the findPaginated() method available

mongoose.model('pubs', pubSchema);
