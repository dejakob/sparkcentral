describe('StringHelper class ', () => {
    'use strict';

    it('should exist', () => {
        expect(StringHelper).toBeDefined();
    });

    describe('camelToDash method ', () => {
        it('should exist', () => {
            expect(StringHelper.camelToDash).toBeDefined();
        });

        it('should throw when value is not a string', () => {
            expect(() => StringHelper.camelToDash(8)).toThrowError('8 should be a string.');
            expect(() => StringHelper.camelToDash(() => {})).toThrowError('function () {} should be a string.');
            expect(() => StringHelper.camelToDash({})).toThrowError('[object Object] should be a string.');
        });

        it('should throw when value has no text', () => {
            expect(() => StringHelper.camelToDash('845346556')).toThrowError('845346556 is not a valid string in camelCase.');
            expect(() => StringHelper.camelToDash('$€§( 690')).toThrowError('$€§( 690 is not a valid string in camelCase.');
        });
    });
});