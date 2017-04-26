/**
  * Get user's data from TeamTreehouse
  * Immediately invoked 
  * @param - None
**/
(function getBadges() {
	return new Promise(function(resolve, reject){
		$.ajax({
			url: `https://teamtreehouse.com/abbymoore.json`
		}).done(function(badges){
			stats(badges);
			courses(badges.points);
			resolve(badges); 
		});
	});
})();


/**
  * Determines which courses have more than 100 points
  * Sort the points greatest to least
  * @param {Object} - obj from getBadges
**/
function courses(points){
	let study = [];

	// gather courses 
	for (key in points) {
		if (points[key] > 100 && key != 'total') {
			let course = {
				name: key,
				points: points[key]
			};
			study.push(course);
		};	
	};

	// Sort by greatest to least number of points
	study.sort(function(a, b){
		return a.points < b.points
	});

	// display
	outputCoursesToDom(study)
};


/**
  * Output to DOM
  * @param {Object} - badges from getBadges
**/
function stats(badges){
	let dom  = document.getElementById("treehouse-stats");

	let badgeTotal = badges.badges.length;
	let pointTotal = badges.points.total;

	dom.innerHTML = 
		`<ul><li>Badges: ${badgeTotal}</li><li>Points: ${pointTotal}</li></ul>`

};


/**
  * Output to DOM
  * @param {Object} - obj from courses
**/
function outputCoursesToDom(study){
	let dom = document.getElementById("treehouse-courses");
	let list = document.createElement('ul');
	
	for (let i = 0; i < 5; i++){
		let item = document.createElement('li');
		item.appendChild(document.createTextNode(study[i].name));
		list.appendChild(item);
	}

	dom.appendChild(list);

};


