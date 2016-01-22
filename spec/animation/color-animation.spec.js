describe('ColorAnimation class ', () => {
    it('should be defined', () => {
        expect(ColorAnimation).toBeDefined();
    });

    it('should throw an error when created without RgbColors', () => {
        expect(() => new ColorAnimation())
            .toThrowError('from and to option should be defined to create a color animation.');
    });

    it('should set its type to color animation', () => {
        const from = new RgbColor(255, 0, 0);
        const to = new RgbColor(0, 255, 0);
        const colorAnimation = new ColorAnimation({ from, to });

        expect(colorAnimation.type).toBe(ANIMATION_TYPE.COLOR);
    });

    describe('onTick method ', () => {
        const options = {
            from: new RgbColor(0, 30, 60),
            to: new RgbColor(90, 60, 125),
            onChange: () => {}
        };
        let colorAnimation = null;

        beforeEach(() => {
            colorAnimation = new ColorAnimation(options);
        });

        it('should be defined', () => {
            expect(ColorAnimation.prototype.onTick).toBeDefined();
        });

        it('should call animation.onTick', () => {
            spyOn(Animation.prototype, 'onTick').and.callFake(() => {});
            colorAnimation.onTick(0.5);
            expect(Animation.prototype.onTick).toHaveBeenCalled();
        });

        it('should set the current value to a color value based on percentage', () => {
            colorAnimation.onTick(0.5);
            expect(colorAnimation.currentValue).toBe('rgb(45,45,92)');
            colorAnimation.onTick(0.2);
            expect(colorAnimation.currentValue).toBe('rgb(18,36,73)');
            colorAnimation.onTick(0.75);
            expect(colorAnimation.currentValue).toBe('rgb(67,52,108)');
            colorAnimation.onTick(0);
            expect(colorAnimation.currentValue).toBe('rgb(0,30,60)');
            colorAnimation.onTick(1);
            expect(colorAnimation.currentValue).toBe('rgb(90,60,125)');

            colorAnimation.from = RgbColor.fromArray([ 0, 0, 0 ]);
            colorAnimation.to = RgbColor.fromArray([ 255, 0, 0 ]);

            colorAnimation.onTick(0);
            expect(colorAnimation.currentValue).toBe('rgb(0,0,0)');
            colorAnimation.onTick(0.5);
            expect(colorAnimation.currentValue).toBe('rgb(127,0,0)');
            colorAnimation.onTick(1);
            expect(colorAnimation.currentValue).toBe('rgb(255,0,0)');
        });
    });
});