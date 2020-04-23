var mongoose = require('mongoose');
var mongoosePaginator = require('mongoose-paginate');
var spotifySchema = require('../schemas/spotify');

//Add paginator
spotifySchema.plugin(mongoosePaginator);

module.exports = mongoose.model('spotify', spotifySchema);