describe('ANIMATION_SEQUENCE config ', () => {
    let sparkCentral = null;

    beforeEach(() => {
        sparkCentral = new SparkCentral();
    });

    it('should be defined', () => {
        expect(ANIMATION_SEQUENCE).toBeDefined();
    });

    // Validate the sequence
    it('should be valid', () => {
        const sequence = ANIMATION_SEQUENCE(sparkCentral.design, sparkCentral.elements);

        sequence.forEach(sequenceItem => {
            expect(typeof sequenceItem[0]).toBe('number');
            expect(typeof sequenceItem[1]).toBe('number');
            expect(sequenceItem[2] instanceof Animation).toBeTruthy();

            if (typeof sequenceItem[2]._onChange === 'function') {
                expect(sequenceItem[2]._onChange).not.toThrowError();
            }

            if (typeof sequenceItem[2]._onComplete === 'function') {
                expect(sequenceItem[2]._onComplete).not.toThrowError();
            }
        });
    });
});