// grab the mongoose module
var mongoose = require('mongoose');

// define model
// module.exports pass other files
module.exports = mongoose.model('User', {
	name : {type : String, default: ''}
});
