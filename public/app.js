'use strict'
let learnJS = {

	problemView() {
		let newView = document.createElement('div');
		newView.textContent = 'Coming soon!';
		newView.className = 'problem-view';
		return newView;
	},

	showView(hash) {
		let routes = {
			'#problem-1': this.problemView
		};
		let viewFunction = routes[hash];
		if (viewFunction) {
			let viewContainer = document.querySelector('.view-container');
			while(viewContainer.firstChild) {
		 	   viewContainer.removeChild( viewContainer.firstChild);
			}
			viewContainer.appendChild(viewFunction());
			console.log(viewContainer);
		}
	}
}; 