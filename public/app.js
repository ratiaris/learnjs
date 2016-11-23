'use strict'
let learnJS = (() => {

	let problems = [
			{
				description:'What is truth?',
				code: '() => { return __; }'
			},
			{
				description:'Simple Maths',
				code: '() => { return 42 === 6 * __;}'
			}
		],

		applyObject = (object, element) =>{
			for (let key in object) {
				element.querySelector(`[data-name='${key}']`).textContent = object[key]; 
			}
		},

		routes = new Map(),

		checkAnswer = (problemData, theProblemView) => {
			let answer = theProblemView.querySelector('.answer').value;
			let functionContent = problemData.code.replace('__', answer);
			let test = `(${functionContent})();`;
			return eval(test);
		},

		checkAnswerCallback = (problemData, theProblemView) => {
			return () => {
				let resultFlash = theProblemView.querySelector('.result');
				if (checkAnswer(problemData, theProblemView)) {
					resultFlash.textContent = 'Correct!';
				} else {
					resultFlash.textContent = 'Incorrect!';
				}
				return false;
			};
		};

	return {

		problemView(id) {
			// console.log(`problemView ${id}`);
			// console.log(this);
			let problemNumber = parseInt(id, 10);
			let templates = document.querySelector('.templates');
			templates.style.visibility = 'visible';
			let theProblemView = templates.querySelector('.problem-view');
			// console.log(theProblemView);
			let title = theProblemView.querySelector('.title');
			title.textContent = `Problem #${problemNumber}`;
			let problemData = problems[problemNumber - 1];
			theProblemView.querySelector('.check-button').onclick = checkAnswerCallback(problemData, theProblemView); 
			applyObject(problemData, theProblemView);
			// console.log(newView);
			return templates;
		},

		showView(hash) {
			// console.log(`showView ${hash}`);
			// console.log(this);
			let hashParts = hash.split('-');
			let viewName = hashParts[0];
			let viewParameter = hashParts[1];
			// console.log(viewName);
			// console.log(viewParameter);
			if (routes.size === 0) {
				routes.set('#problem', this.problemView);
			}
			let viewFunction = routes.get(viewName);
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
			}
		},

		domContentLoaded() {
			// console.log('domContentLoaded');
			// console.log(this);
			window.onhashchange = (event) => {
				// console.log('onhashchange');
				// console.log(this);
				this.showView(window.location.hash);
			};
			this.showView(window.location.hash);
		}
	};
})(); 

window.addEventListener('DOMContentLoaded', learnJS.domContentLoaded());