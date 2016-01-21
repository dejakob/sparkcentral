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

        it('should add a canvas element to the root element', () => {
            const testElement = document.createElement('div');
            spyOn(Node.prototype, 'appendChild').and.callThrough();

            game.init(testElement);

            expect(testElement.appendChild).toHaveBeenCalled();
            expect(testElement.appendChild.calls.first().args[0].localName).toBe('canvas');
        });

        it('should attach specific styling to the canvas', () => {
            const testElement = document.createElement('div');
            spyOn(DomHelper, 'attachStyle').and.callThrough();

            game.init(testElement);

            expect(DomHelper.attachStyle).toHaveBeenCalled();
            expect(DomHelper.attachStyle.calls.first().args[0].localName).toBe('canvas');
            expect(DomHelper.attachStyle.calls.first().args[1]).toBe(game._style);
        });

        it('should attach a div as scoreboard', () => {
            const testElement = document.createElement('div');
            spyOn(Node.prototype, 'appendChild').and.callThrough();

            game.init(testElement);
            expect(testElement.appendChild.calls.mostRecent().args[0].localName).toBe('div');
        });
    });

    describe('repaint method ', () => {
        let game = null;

        beforeEach(() => {
            const div = document.createElement('div');

            game = new Game(500, 500);
            game.init(div);
        });

        it('should be defined', () => {
            expect(game.repaint).toBeDefined();
        });

        it('should clear the canvas', () => {
            spyOn(CanvasRenderingContext2D.prototype, 'clearRect').and.callThrough();

            game.repaint();
            expect(CanvasRenderingContext2D.prototype.clearRect).toHaveBeenCalled();
        });

        it('should clear the canvas', () => {
            const profile1 = new GameProfile();
            const profile2 = new GameProfile();

            spyOn(profile1, 'paint').and.callFake(() => {});
            spyOn(profile2, 'paint').and.callFake(() => {});

            game._profiles = [ profile1, profile2 ];
            game.repaint();

            expect(profile1.paint).toHaveBeenCalled();
            expect(profile2.paint).toHaveBeenCalled();
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