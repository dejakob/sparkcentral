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


    });
});