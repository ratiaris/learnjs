'use strict'
let learnJS = {
	showView(hash) {
		let problemView = document.createElement('div');
		problemView.textContent = 'Coming soon!';
		problemView.className = 'problem-view';
		let viewContainer = document.querySelector('.view-container');
		while(viewContainer.firstChild) {
	 	   viewContainer.removeChild( viewContainer.firstChild);
		}
		viewContainer.appendChild(problemView);
		console.log(viewContainer);
	}
}; 