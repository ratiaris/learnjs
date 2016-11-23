'use strict'
let learnJS = {

	problems: [
		{
			description:'What is truth?',
			code: '() => { return __; }'
		},
		{
			description:'Simple Maths',
			code: '() => { return 42 === 6 * __;}'
		}
	],

	applyObject(object, element) {
		for (let key in object) {
			element.querySelector(`[data-name='${key}']`).textContent = object[key]; 
		}
	},

	_ROUTES : new Map(),

	problemView(id) {
		console.log(`problemView ${id}`);
		let problemNumber = parseInt(id, 10);
		let templates = document.querySelector('.templates');
		templates.style.visibility = 'visible';
		let problemView = templates.querySelector('.templates .problem-view');
		console.log(problemView);
		let title = problemView.querySelector('.title');
		title.textContent = `Problem #${problemNumber}`;
		learnJS.applyObject(learnJS.problems[problemNumber - 1], problemView);
		// console.log(newView);
		return templates;
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
				// viewFunction(viewParameter) does not work for Jasmine tests that
				// spy on learnJS.problemView(id) when invoking learnJS.showView(hash)
				let child = this[viewFunction.name](viewParameter);
				while(viewContainer.firstChild) {
			 	   viewContainer.removeChild( viewContainer.firstChild);
				}
				viewContainer.appendChild(child);
			}
		} else {
			let templates = document.querySelector('.templates');
			templates.visibility = 'hidden';
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