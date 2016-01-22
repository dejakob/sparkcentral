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

        it('should throw when to or from options are no numbers', () => {
            expect(() => timeline.add()).toThrowError('undefined is not a valid start time.');
            expect(() => timeline.add('test')).toThrowError('test is not a valid start time.');
            expect(() => timeline.add(10, 'test')).toThrowError('test is not a valid end time.');
        });

        it('should throw when no valid animation was given', () => {
            expect(() => timeline.add(10, 80)).toThrowError('undefined is not a valid animation.');
            expect(() => timeline.add(10, 80, 'test')).toThrowError('test is not a valid animation.');
            expect(() => timeline.add(10, 80, () => {})).toThrowError('function () {} is not a valid animation.');
        });

        it('should proxy to insert method', () => {
            const animation = new ColorAnimation({ from: RgbColor.fromHex('#000'), to: RgbColor.fromHex('#fff') });

            spyOn(timeline, 'insert').and.callFake(() => {});
            timeline.add(10, 80, animation);

            expect(timeline.insert).toHaveBeenCalled();
            expect(timeline.insert.calls.mostRecent().args[0]).toEqual([ [ 10, 80, animation ] ]);
        });
    });
});