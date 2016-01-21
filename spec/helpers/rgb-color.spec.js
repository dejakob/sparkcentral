describe('RgbColor class ', () => {
    it('should be defined', () => {
        expect(RgbColor).toBeDefined();
    });

    it('should throw when the three arguments were not numbers', () => {
        expect(() => new RgbColor()).toThrowError('All colors should be defined with a number');
        expect(() => new RgbColor('test', 'oauth', 'string')).toThrowError('All colors should be defined with a number');
        expect(() => new RgbColor({}, {}, {})).toThrowError('All colors should be defined with a number');
        expect(() => new RgbColor(null, null, null)).toThrowError('All colors should be defined with a number');
    });

    it('should have red, green and blue props', () => {
        const rgbColor = new RgbColor(255, 161, 72);

        expect(rgbColor.red).toBe(255);
        expect(rgbColor.green).toBe(161);
        expect(rgbColor.blue).toBe(72);
    });

    it('should have a toString method', () => {
        const rgbColor = new RgbColor(255, 161, 72);

        expect(rgbColor.toString).toBeDefined();
        expect(rgbColor.toString()).toBe('rgb(255,161,72)');
    });
});