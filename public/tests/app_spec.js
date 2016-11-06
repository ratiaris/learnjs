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
		it('has some text content that includes the problem number', () => {
			let id = '33';
			let view = learnJS.problemView(id);
			let title = view.querySelector('.problem-view .title');
			expect(title.textContent).toEqual(`Problem #${id}`);
		});
	});
});