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

        it('should start a timer', () => {
            const RESULT = 'result';
            spyOn(window, 'setInterval').and.callFake(() => RESULT);

            game.start();

            expect(game._interval).toBe(RESULT);
            expect(window.setInterval).toHaveBeenCalled();
            expect(window.setInterval.calls.mostRecent().args[0].toString()).toBe(game._onTick.bind(game).toString());
            expect(window.setInterval.calls.mostRecent().args[1]).toBe(Math.round(1000 / GAME_FPS));
        });
    });

    describe('stop method ', () => {
        let game = null;

        beforeEach(() => {
            game = new Game(500, 500);
            game._canvas = { removeEventListener: () => {} };
        });

        it('should be defined', () => {
            expect(game.stop).toBeDefined();
        });

        it('should clear the interval', () => {
            const RESULT = 'result';

            spyOn(window, 'clearInterval').and.callFake(() => RESULT);
            game.stop();
            expect(window.clearInterval).toHaveBeenCalledWith(game._interval);
        });

        it('should trigger the onWin callback in case of winning', () => {
            game._options.onWin = () => {};
            spyOn(game._options, 'onWin').and.callThrough();
            game.stop(GAME_STOP_REASON.WIN);
            expect(game._options.onWin).toHaveBeenCalled();
        });

        it('should trigger the onFail callback in case of game over', () => {
            game._options.onFail = () => {};
            spyOn(game._options, 'onFail').and.callThrough();
            game.stop(GAME_STOP_REASON.LOOSE);
            expect(game._options.onFail).toHaveBeenCalled();
        });
    });

    describe('destroy method ', () => {
        let game = null;

        beforeEach(() => {
            const div = document.createElement('div');
            game = new Game(500, 500);
            game.init(div);
        });

        it('should be defined', () => {
            expect(game.destroy).toBeDefined();
        });

        it('should remove the 2d context', () => {
            game.destroy();
            expect(game._context).not.toBeDefined();
        });

        it('should remove the content of the canvas element', () => {
            game.destroy();
            expect(game._canvas).not.toBeDefined();
        });

        it('should remove the content of the scoreBoard element', () => {
            game.destroy();
            expect(game._scoreBoard).not.toBeDefined();
        });
    });

    describe('onTick event', () => {
        let game = null;

        beforeEach(() => {
            const div = document.createElement('div');
            game = new Game(500, 500);
            game.init(div);
        });

        it('should be defined', () => {
            expect(game._onTick).toBeDefined();
        });

        it('should move the profiles', () => {
            game._profiles = [
                new GameProfile(GAME_DIRECTION.LTR, GAME_DEFAULT_SPEED),
                new GameProfile(GAME_DIRECTION.RTL, GAME_DEFAULT_SPEED),
                new GameProfile(GAME_DIRECTION.LTR, GAME_FASTER_SPEED)
            ];

            game._onTick();
            expect(game._profiles[0].x).toBe(GAME_DEFAULT_SPEED);
            expect(game._profiles[1].x).toBe(- GAME_DEFAULT_SPEED);
            expect(game._profiles[2].x).toBe(GAME_FASTER_SPEED);

            game._onTick();
            expect(game._profiles[0].x).toBe(GAME_DEFAULT_SPEED * 2);
            expect(game._profiles[1].x).toBe(- GAME_DEFAULT_SPEED * 2);
            expect(game._profiles[2].x).toBe(GAME_FASTER_SPEED * 2);
        });

        it('should remove profiles that are out of the screen', () => {
            const profile1 = new GameProfile(GAME_DIRECTION.LTR);
            const profile2 = new GameProfile(GAME_DIRECTION.RTL);

            profile1.x = profile1.width + game._width;
            profile2.x = - profile2.width;

            game._profiles = [ profile1, profile2 ];
            game._onTick();

            expect(game._profiles).toEqual([]);
        });
    });

    describe('onClick event', () => {
        let game = null;

        beforeEach(() => {
            const div = document.createElement('div');
            game = new Game(500, 500);
            game.init(div);
        });

        it('should be defined', () => {
            expect(game._onClick).toBeDefined();
        });

        it('should increase the score on hit', () => {
            const profile1 = new GameProfile(GAME_DIRECTION.LTR);
            const profile2 = new GameProfile(GAME_DIRECTION.RTL);

            profile1.x = 20;
            profile1.y = 5;
            profile2.x = 200;
            profile2.y = 200;

            const eventData = { clientX: 25, clientY: 10 };

            game._profiles = [ profile1, profile2 ];
            game._onClick(eventData);

            expect(game._profiles).not.toContain(profile1);
            expect(game._profiles).toContain(profile2);
        });

        it('should stop the game with a win state', () => {

            const profile1 = new GameProfile(GAME_DIRECTION.LTR);
            const profile2 = new GameProfile(GAME_DIRECTION.RTL);

            spyOn(game, 'stop').and.callThrough();
            game._score = GAME_SCORE_NEEDED_TO_WIN;
            game._profiles = [ profile1 ];
            game._onClick({ clientX: 25, clientY: 10 });

            expect(game.stop).toHaveBeenCalledWith(GAME_STOP_REASON.WIN);
        });
    });
});