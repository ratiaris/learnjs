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

		problemData,

		routes = new Map(),

		checkAnswer = () => {
			let functionContent = problemData.code.replace('__', answerTextArea.value);
			let test = `(${functionContent})();`;
			// console.log(test);
			try {
				return eval(test);
			} catch (error) {
				console.log(error);
				return false;
			}
		},

		fadeInCallback = () => {
			switch (resultFlashStyle.opacity) {
				case '0': {
					// console.log('Fade out transition complete!');
					if (checkAnswer()) {
						resultFlash.textContent = 'Correct!';
					} else {
						resultFlash.textContent = 'Incorrect!';
					}
					resultFlashStyle.opacity = 1;
					break;					
				}

				case '1': {
					// console.log('Fade in transition complete!');
					break;					
				}
			}
		},

		checkAnswerCallback = () => {
			// console.log('checkAnswerCallback');
			resultFlashStyle.opacity = 0;
			return false;
		},

		templates,

		theProblemView,

		title,

		resultFlash,

		resultFlashStyle,

		answerTextArea,

		getTemplates = () => {
			if (templates === undefined || templates === null ) {
				templates = document.querySelector('.templates');
				theProblemView = templates.querySelector('.problem-view'),
				title = theProblemView.querySelector('.title'),
				resultFlash = theProblemView.querySelector('.result'),
				resultFlashStyle = resultFlash.style,
				answerTextArea = theProblemView.querySelector('.answer');

				resultFlashStyle.transition = 'opacity .2s';
				resultFlash.addEventListener('transitionend', fadeInCallback);
			}
			return templates;
		};

	return {

		simulateFadeInCallbackForTestingPurpose() {
			fadeInCallback();
		},

		problemView(id) {	
			// console.log(`problemView ${id}`);
			// console.log(this);
			let problemNumber = parseInt(id, 10);
			// let templates = document.querySelector('.templates');
			getTemplates().style.visibility = 'visible';
			// let theProblemView = templates.querySelector('.problem-view');
			// console.log(theProblemView);
			title.textContent = `Problem #${problemNumber}`;
			problemData = problems[problemNumber - 1];
			resultFlash.textContent = '';
			answerTextArea.value = '';
			theProblemView.querySelector('.check-button').onclick = checkAnswerCallback; 
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
				 	   viewContainer.removeChild(viewContainer.firstChild);
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