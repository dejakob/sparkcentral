describe('Timeline class ', () => {
    it('should be defined', () => {
        expect(Timeline).toBeDefined();
    });

    describe('add method ', () => {
        let timeline = null;

        beforeEach(() => {
           timeline = new Timeline();
        });

        it('should be defined', () => {
            expect(timeline.add).toBeDefined();
        });
    });
});