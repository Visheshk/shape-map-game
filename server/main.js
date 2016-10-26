import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	fillVertices = function () {
		for (i = 1; i < 9; i++){
			vertices.insert({
				number: i,
				timestamp: 0,
				state: false
			});
		}
	}

	fillVertices();
	
	Meteor.methods({
		logButtonPress(buttNo) {
			buttNo = parseInt(buttNo);
			thisvert = vertices.findOne({number: buttNo});
			vertices.update({_id: thisvert._id}, {
				number: buttNo,
				timestamp: (new Date()).getTime(),
				state: !thisvert.state
			});
  		}
	});
});
