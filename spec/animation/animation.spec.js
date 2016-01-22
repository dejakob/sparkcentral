describe('Animation class ', () => {
    it('should be defined', () => {
        expect(Animation).toBeDefined();
    });

    it('should set to, from and type', () => {
        const from = 4000;
        const to = 5000;
        const type = ANIMATION_TYPE.COLOR;
        const animation = new Animation({ from, to, type });

        expect(animation.from).toBe(from);
        expect(animation.to).toBe(to);
        expect(animation.type).toBe(type);
    });

    describe('onTick method ', () => {
        const options = { from: 1000, to: 3000, onChange: () => {} };
        let animation = null;

        beforeEach(() => {
            spyOn(options, 'onChange').and.callThrough();
            animation = new Animation(options);
        });

        it('should be defined', () => {
            expect(animation.onTick).toBeDefined();
        });

        it('should call the onChange property with the current value', () => {
            animation.onTick(0.65);
            expect(options.onChange).toHaveBeenCalledWith(2300);
        });
    });

    describe('onComplete method ', () => {
        const options = { from: 2000, to: 4000, onComplete: () => {} };
        let animation = null;

        beforeEach(() => {
            spyOn(options, 'onComplete').and.callThrough();
            animation = new Animation(options);
        });

        it('should be defined', () => {
            expect(animation.onComplete).toBeDefined();
        });

        it('should call the onComplete property', () => {
            animation.onComplete();
            expect(options.onComplete).toHaveBeenCalled();
        });
    });
});