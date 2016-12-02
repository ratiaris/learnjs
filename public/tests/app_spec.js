describe('Serverless Single Page App', () => {

	it('can show a problem view', () => {
		learnJS.showView('#problem-1');
		let problemView = document.querySelector('.view-container .problem-view');
		expect(problemView).not.toBe(null);
	});

	it('shows the landing page when there is no hash', () => {
		learnJS.showView('');
		let landingView = document.querySelector('.view-container .landing-view');
		expect(landingView).not.toBe(null);
	});

	it('passes the hash view parameter to the view function', () => {
		spyOn(learnJS, 'problemView').and.callThrough();
		learnJS.showView('#problem-42');
		expect(learnJS.problemView).toHaveBeenCalledWith('42');
	});

	it('invokes the router when loaded', () => {
		spyOn(learnJS, 'showView');
		learnJS.domContentLoaded();
		expect(learnJS.showView).toHaveBeenCalledWith(window.location.hash);
	});

	it('subscribes to the hash change event', () => {
		spyOn(learnJS, 'showView');
		let hashChangeEvent = new Event('hashchange');
		window.dispatchEvent(hashChangeEvent);
		expect(learnJS.showView).toHaveBeenCalledWith(window.location.hash);
	});

	describe('landing page', () => {
		beforeEach((done) => {
			// Override existing window.onhashchange callback because async
			// events must be handled before spec expectations are checked
			let previousCallback = window.onhashchange
			window.onhashchange = (event) => {
				previousCallback(event);
				done();
			};
			spyOn(learnJS, 'problemView').and.callThrough();
			spyOn(learnJS, 'showView').and.callThrough();
			let startNowButton = document.querySelector('#button');
			startNowButton.click();
		});

		it('displays problem-1 view when clicking on button', (done) => {
			expect(learnJS.showView).toHaveBeenCalledWith(window.location.hash);
			expect(learnJS.problemView).toHaveBeenCalledWith('1');
			done();
		});
	});

	describe('problem view', () => {

		let problemView; 

		beforeEach(() => {
			learnJS.showView('#problem-1');
			problemView = document.querySelector('.view-container .problem-view');
		});

		it('has some text content that includes the problem number', () => {
			let title = problemView.querySelector('.problem-view .title');
			expect(title.textContent).toEqual(`Problem #1`);
		});

	    it('shows the problem description', function() {
	    	console.log(problemView.querySelector('[data-name="description"]'));
	     	expect(problemView.querySelector('[data-name="description"]').textContent).toEqual('What is truth?');
	    });

	    it('shows the problem code', function() {
	      expect(problemView.querySelector('[data-name="code"]').textContent).toEqual('() => { return __; }');
	    });

	    it('has an empty answer text area', function() {
	      expect(problemView.querySelector('.answer').value).toEqual('');
	    });

	    it('has no feedback for answer', function() {
	      expect(problemView.querySelector('.result').textContent).toEqual('');
	    });

		// describe("long asynchronous specs", function() {
		//     var originalTimeout;
		//     beforeEach(function() {
		//     	originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		//       	jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		//     });

		//     it("takes a long time", function(done) {
		//      	setTimeout(function() {
		//         	done();
		//       	}, 9000);
		//     });

		//     afterEach(function() {
		//       	jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		//     });
		// });

		describe('answer section', () => {

			let answer;
			let checkButton;
			let result;

			beforeEach(() => {
				answer = problemView.querySelector('.answer');
				checkButton = problemView.querySelector('.check-button');
				result = problemView.querySelector('.result');
			});

			it('can check a correct answer by hitting a button', () => {
				answer.value = 'true';
				checkButton.click();
				// UNFORTUNATELY SEEMS LIKE TRANSITIONEND CALLBACK ARE NOT TRIGGERED BY JASMINE
				learnJS.simulateFadeInCallbackForTestingPurpose();
				expect(result.textContent).toEqual('Correct!');
			});

			it('rejects an incorrect answer', () => {
				answer.value = 'false';
				checkButton.click();
				// UNFORTUNATELY SEEMS LIKE TRANSITIONEND CALLBACK ARE NOT TRIGGERED BY JASMINE
				learnJS.simulateFadeInCallbackForTestingPurpose();
				expect(result.textContent).toEqual('Incorrect!');
			});

			it('is reset when switching to another problem view', () => {
				learnJS.showView('#problem-2');
				expect(answer.value).toEqual('');
				expect(result.textContent).toEqual('');
			});
		});
	});
});