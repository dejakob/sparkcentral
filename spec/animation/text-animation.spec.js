describe('TextAnimation class ', () => {
    it('should be defined', () => {
        expect(TextAnimation).toBeDefined();
    });

    it('should throw when creating without from and to being strings', () => {
        expect(() => new TextAnimation())
            .toThrowError('from and to option should be strings to create a text animation.');
        expect(() => new TextAnimation(3545, 45345))
            .toThrowError('from and to option should be strings to create a text animation.');
    });

    it('should set its type to text animation', () => {
        const from = 'You Only Load Once';
        const to = '';
        const textAnimation = new TextAnimation({ from, to });

        expect(textAnimation.type).toBe(ANIMATION_TYPE.TEXT);
    });

    describe('onTick method ', () => {
        const options = {
            from: 'Hello',
            to: 'Hello world',
            onChange: () => {}
        };
        let textAnimation = null;

        beforeEach(() => {
            textAnimation = new TextAnimation(options);
        });

        it('should be defined', () => {
            expect(TextAnimation.prototype.onTick).toBeDefined();
        });

        it('should call animation.onTick', () => {
            spyOn(Animation.prototype, 'onTick').and.callFake(() => {});
            textAnimation.onTick(0.5);
            expect(Animation.prototype.onTick).toHaveBeenCalled();
        });

        it('should set currentValue to a size based on the percentage when adding text', () => {
            textAnimation.onTick(0.1);
            expect(textAnimation.currentValue).toBe('Hello ');
            textAnimation.onTick(0.2);
            expect(textAnimation.currentValue).toBe('Hello ');
            textAnimation.onTick(0.26);
            expect(textAnimation.currentValue).toBe('Hello w');
            textAnimation.onTick(0.5);
            expect(textAnimation.currentValue).toBe('Hello wo');
            textAnimation.onTick(0.75);
            expect(textAnimation.currentValue).toBe('Hello worl');
            textAnimation.onTick(0);
            expect(textAnimation.currentValue).toBe('Hello');
            textAnimation.onTick(1);
            expect(textAnimation.currentValue).toBe('Hello world');
        });

        it('should set currentValue to a size based on the percentage when removing text', () => {
            textAnimation.to = '';

            textAnimation.onTick(0.1);
            expect(textAnimation.currentValue).toBe('Hello');
            textAnimation.onTick(0.2);
            expect(textAnimation.currentValue).toBe('Hell');
            textAnimation.onTick(0.26);
            expect(textAnimation.currentValue).toBe('Hell');
            textAnimation.onTick(0.5);
            expect(textAnimation.currentValue).toBe('Hel');
            textAnimation.onTick(0.75);
            expect(textAnimation.currentValue).toBe('H');
            textAnimation.onTick(0);
            expect(textAnimation.currentValue).toBe('Hello');
            textAnimation.onTick(1);
            expect(textAnimation.currentValue).toBe('&nbsp;');
        });
    });
});