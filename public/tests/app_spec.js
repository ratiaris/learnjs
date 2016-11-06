describe('Serverless Single Page App', () => {

	it('can show a problem view', () => {
		learnJS.showView('#problem-1');
		expect($('.view-container .problem-view').length).toEqual(1);
	});

	it('shows the landing page when there is no hash', () => {
		learnJS.showView('');
		expect($('.view-container .landing-view').length).toEqual(1);
	});

	it('passes the hash view parameter to the view function', () => {
		spyOn(learnJS, 'problemView').and.callThrough();
		learnJS.showView('#problem-42');
		expect(learnJS.problemView).toHaveBeenCalledWith('42');
	});

	it ('invokes the router when loaded', () => {
		spyOn(learnJS, 'showView');
		learnJS.domContentLoaded();
		expect(learnJS.showView).toHaveBeenCalledWith(window.location.hash);
	});

	describe('problem view', () => {
		it('has some text content that includes the problem number', () => {
			let id = '33';
			let view = learnJS.problemView(id);
			expect(view.textContent).toEqual(`Problem #${id} coming soon!`);
		});
	});
});