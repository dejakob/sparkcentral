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

    describe('insert method ', () => {
        let timeline = null;

        beforeEach(() => {
            timeline = new Timeline();
        });

        it('should be defined', () => {
            expect(timeline.insert).toBeDefined();
        });

        it('should throw when from is not a number', () => {
            const data = [
                [ null, 3000, new Animation() ]
            ];

            expect(() => timeline.insert(data)).toThrowError('start time should be a valid number');
        });

        it('should throw when to is not a number', () => {
            const data = [
                [ 1000, null, new Animation() ]
            ];

            expect(() => timeline.insert(data)).toThrowError('end time should be a valid number');
        });

        it('should prepare the timeline mapping', () => {
            const data = [
                [ 1000, 1005, new Animation() ],
                [ 1003, 1004, new Animation() ]
            ];
            let expectedMapping = {
                1000: [ 0 ],
                1001: [ 0 ],
                1002: [ 0 ],
                1003: [ 0, 1 ],
                1004: [ 0, 1 ],
                1005: [ 0 ]
            };

            timeline.tick = 1;
            timeline.insert(data);
            expect(timeline._timelineMapping).toEqual(expectedMapping);

            expectedMapping = {
                1000: [ 0 ],
                1002: [ 0, 1 ],
                1004: [ 0, 1 ]
            };

            timeline = new Timeline();
            timeline.tick = 2;
            timeline.insert(data);
            expect(timeline._timelineMapping).toEqual(expectedMapping);
        });
    });

    describe('start method ', () => {
        let timeline = null;

        beforeEach(() => {
            timeline = new Timeline();
        });

        it('should be defined', () => {
            expect(timeline.start).toBeDefined();
        });

        describe('on each tick ', () => {
            let animation1 = null;
            let animation2 = null;

            beforeEach(() => {
                animation1 = new Animation();
                animation2 = new Animation();

                spyOn(animation1, 'onTick').and.callFake(() => {});
                spyOn(animation2, 'onTick').and.callFake(() => {});

                spyOn(animation1, 'onComplete').and.callFake(() => {});
                spyOn(animation2, 'onComplete').and.callFake(() => {});

                spyOn(window, 'clearInterval').and.callThrough();

                const data = [
                    [ 1, 5, animation1 ],
                    [ 2, 3, null ],
                    [ 3, 4, animation2 ],
                ];

                timeline.tick = 1;
                timeline.insert(data);

                timeline.start();
                timeline._interval.clear();
            });

            it('should call all animations at this time', () => {
                // Initial trigger / Frame 0
                timeline._interval.trigger();

                // Frame 1
                timeline._interval.trigger();
                expect(animation1.onTick).toHaveBeenCalledWith(0);

                // Frame 2
                timeline._interval.trigger();
                expect(animation1.onTick).toHaveBeenCalledWith(0.25);

                // Frame 3
                timeline._interval.trigger();
                expect(animation1.onTick).toHaveBeenCalledWith(0.5);
                expect(animation2.onTick).toHaveBeenCalledWith(0);

                // Frame 4
                timeline._interval.trigger();
                expect(animation1.onTick).toHaveBeenCalledWith(0.75);
                expect(animation2.onTick).toHaveBeenCalledWith(1);
                expect(animation2.onComplete).toHaveBeenCalled();

                // Frame 5
                timeline._interval.trigger();
                expect(animation1.onTick).toHaveBeenCalledWith(1);
                expect(animation1.onComplete).toHaveBeenCalled();
            });

            it('should clear the timeline', () => {
                for (let i = 0; i < 6; i++) {
                    timeline._interval.trigger();
                }

                expect(window.clearInterval).toHaveBeenCalledWith(timeline._interval);
                expect(timeline._timelineMapping).toEqual({});
                expect(timeline.items).toEqual({});
            });
        });
    });

    describe('stop method ', () => {
        let timeline = null;

        beforeEach(() => {
            timeline = new Timeline();
        });

        it('should be defined', () => {
            expect(timeline.stop).toBeDefined();
        });

        it('should clear the interval', () => {
            spyOn(window, 'clearInterval').and.callThrough();
            timeline.stop();
            expect(window.clearInterval).toHaveBeenCalledWith(timeline._interval);
        });
    });
});