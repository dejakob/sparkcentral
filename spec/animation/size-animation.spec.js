describe('SizeAnimation class ', () => {
    it('should be defined', () => {
        expect(SizeAnimation).toBeDefined();
    });

    it('should throw when creating without from and to being numbers or strings', () => {
        expect(() => new SizeAnimation())
            .toThrowError('from and to option should be defined to create a resize animation.');
    });

    it('should set its type to size animation', () => {
        const from = 10;
        const to = 100;
        const sizeAnimation = new SizeAnimation({ from, to });

        expect(sizeAnimation.type).toBe(ANIMATION_TYPE.SIZE);
    });

    describe('onTick method ', () => {
        const options = {
            from: '20px',
            to: '80px',
            onChange: () => {}
        };
        let sizeAnimation = null;

        beforeEach(() => {
            sizeAnimation = new SizeAnimation(options);
        });

        it('should be defined', () => {
            expect(SizeAnimation.prototype.onTick).toBeDefined();
        });

        it('should call animation.onTick', () => {
            spyOn(Animation.prototype, 'onTick').and.callFake(() => {});
            sizeAnimation.onTick(0.5);
            expect(Animation.prototype.onTick).toHaveBeenCalled();
        });

        it('should set currentValue to a size based on the percentage', () => {
            sizeAnimation.onTick(0.1);
            expect(sizeAnimation.currentValue).toBe('26px');
            sizeAnimation.onTick(0.2);
            expect(sizeAnimation.currentValue).toBe('32px');
            sizeAnimation.onTick(0.26);
            expect(sizeAnimation.currentValue).toBe('35px');
            sizeAnimation.onTick(0.5);
            expect(sizeAnimation.currentValue).toBe('50px');
            sizeAnimation.onTick(0.75);
            expect(sizeAnimation.currentValue).toBe('65px');
            sizeAnimation.onTick(0);
            expect(sizeAnimation.currentValue).toBe('20px');
            sizeAnimation.onTick(1);
            expect(sizeAnimation.currentValue).toBe('80px');
        });
    });
});