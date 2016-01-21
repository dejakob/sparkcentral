describe('Game class ', () => {
    it('should be defined', () => {
        expect(Game).toBeDefined();
    });

    describe('init method ', () => {
        let game = null;

        beforeEach(() => {
            game = new Game(500, 500);
        });

        it('should be defined', () => {
            expect(game.init).toBeDefined();
        });

        it('should throw when no root element was given', () => {
            expect(() => game.init()).toThrowError('a root element needs to be defined to initialize the game');
        });

        it('should create a canvas element', () => {
            const testElement = document.createElement('div');
            spyOn(Document.prototype, 'createElement').and.callThrough();

            game.init(testElement);

            expect(Document.prototype.createElement).toHaveBeenCalledWith('canvas');
        });
    });

    describe('repaint method ', () => {
        let game = null;

        beforeEach(() => {
            game = new Game(500, 500);
        });

        it('should be defined', () => {
            expect(game.repaint).toBeDefined();
        });
    });

    describe('start method ', () => {
        let game = null;

        beforeEach(() => {
            game = new Game(500, 500);
        });

        it('should be defined', () => {
            expect(game.start).toBeDefined();
        });
    });

    describe('stop method ', () => {
        let game = null;

        beforeEach(() => {
            game = new Game(500, 500);
        });

        it('should be defined', () => {
            expect(game.stop).toBeDefined();
        });
    });

    describe('destroy method ', () => {
        let game = null;

        beforeEach(() => {
            game = new Game(500, 500);
        });

        it('should be defined', () => {
            expect(game.destroy).toBeDefined();
        });
    });
});