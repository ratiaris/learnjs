describe('Serverless Single Page App', () => {
	it('can show a problem view', () => {
		learnJS.showView('#problem-1');
		expect($('.view-container .problem-view').length).toEqual(1);
	});
});