import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.set("buttonNumber", 0);

verts = [[100, 150], [100, 300], [206, 406], [356, 406], [462, 300], [462, 150], [356, 44], [206, 44]];

Template.hello.onRendered(function helloOnRendered() {
  // counter starts at 0
  // this.counter = new ReactiveVar(0);
  var a_canvas = document.querySelector("#acanv");
  // console.log(a_canvas);
  var context = a_canvas.getContext("2d");
  
  drawCanvas = function () {
  	for (i in verts){
  		context.fillStyle = "blue";
  		context.beginPath();
  		context.arc(verts[i][0],verts[i][1], 12, 0, 2*Math.PI);
  		context.closePath();
  		context.fill();
  		context.lineWidth = 2;
  		context.stroke();
  		// context.fillStyle = "blue";
  	}
  }
  drawCanvas();

  drawLines = function (points) {

    if (points.length > 1){
      p0 = verts[points[0].number];
      for (v = 0; v < (points.length - 1); v++){
        p1 = verts[points[v].number];
        p2 = verts[points[v + 1].number];
        context.beginPath();
        context.moveTo(p1[0], p1[1]);
        context.lineTo(p2[0], p2[1]);
        context.lineWidth = 7;
        context.stroke();
        context.closePath();
      }

      context.beginPath();
      console.log(p2);
      console.log(p0);
      context.moveTo(p2[0], p2[1]);
      context.lineTo(p0[0], p0[1]);
      context.lineWidth = 7;
      context.stroke();
      context.closePath();

    }
  }

  Tracker.autorun(function () {
  	corners = vertices.find({$and: [{state: true}]}, {sort: {timestamp: -1}}).fetch();
    context.clearRect(0, 0, a_canvas.width, a_canvas.height);
    drawCanvas();
    drawLines(corners);
  });

});

Template.hello.helpers({
  counter() {
    // return Template.instance().counter.get();
  },


});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.nodePress.events({
	'click button' (event, instance) {
		Meteor.call("logButtonPress", Session.get("buttonNumber"));
	}
})
