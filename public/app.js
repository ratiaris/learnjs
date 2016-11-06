'use strict'
let learnJS = {

	_ROUTES : new Map(),

	problemView(id) {
		console.log(`problemView ${id}`);
		let newView = document.createElement('div');
		newView.textContent = `Problem #${id} coming soon!`;
		newView.className = 'problem-view';
		// console.log(newView);
		return newView;
	},

	_initializeRoutes(routes) {
		routes.set('#problem', this.problemView);
	},

	_getRoute(name) {
		let routes = this._ROUTES;
		if (routes.size === 0) {
			this._initializeRoutes(routes);
		}
		return routes.get(name);
	},

	showView(hash) {
		console.log(`showView ${hash}`);
		console.log(this);
		let hashParts = hash.split('-');
		let viewName = hashParts[0];
		let viewParameter = hashParts[1];
		// console.log(viewName);
		// console.log(viewParameter);
		let viewFunction = this._getRoute(viewName);
		// let viewFunction = learnJS.problemView;
		if (viewFunction && viewParameter) {
			let viewContainer = document.querySelector('.view-container');
			// console.log(viewContainer);
			if (viewContainer !== null) {
				while(viewContainer.firstChild) {
			 	   viewContainer.removeChild( viewContainer.firstChild);
				}
				// viewFunction(viewParameter) does not work for Jasmine tests that
				// spy on learnJS.problemView(id) when invoking learnJS.showView(hash)
				let child = this[viewFunction.name](viewParameter);
				viewContainer.appendChild(child);
			}
		}
	},

	domContentLoaded() {
		window.onhashchange = (event) => {
			// console.log('onhashchange');
			// console.log(event);
			learnJS.showView(window.location.hash);
		};
		learnJS.showView(window.location.hash);
	}
}; 

window.addEventListener('DOMContentLoaded', learnJS.domContentLoaded);