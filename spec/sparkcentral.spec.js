describe('SparkCentral class ', () => {
    let sparkCentral = null;

    beforeEach(() => {
        document.body.innerHTML = DOM_MOCK;
        sparkCentral = new SparkCentral();
    });

    it('should exist', () => {
        expect(sparkCentral).toBeDefined();
    });

    describe('hunt method ', () => {
        beforeEach(() => {
            spyOn(window, 'setTimeout').and.callFake(() => {});
        });

        it('should be defined', () => {
            expect(sparkCentral).toBeDefined();
        });

        it('should create a game intance', () => {
            sparkCentral.hunt();
            expect(sparkCentral.game instanceof Game).toBeTruthy();
        });

        it('should start the game after initing the view', () => {
            sparkCentral.hunt();

            spyOn(sparkCentral.game, 'start').and.callFake(() => {});

            expect(window.setTimeout).toHaveBeenCalled();
            expect(window.setTimeout.calls.mostRecent().args[0]() instanceof Game).toBeTruthy();
            expect(window.setTimeout.calls.mostRecent().args[1]).toBe(1000);
        });
    });

    describe('onWin method ', () => {
        beforeEach(() => {
            spyOn(window, 'setTimeout').and.callFake(() => {});
            sparkCentral.hunt();
        });

        it('should be defined', () => {
            expect(sparkCentral.game._options.onWin);
        });

        it('should destroy the game', () => {
            spyOn(sparkCentral.game, 'destroy').and.callFake(() => {});
            sparkCentral.game._options.onWin();
            expect(sparkCentral.game).not.toBeDefined();
        });

        it('should create three link buttons', () => {
            spyOn(DomHelper, 'createLinkButton').and.callThrough();
            sparkCentral.game._options.onWin();

            expect(DomHelper.createLinkButton)
                .toHaveBeenCalledWith('http://dejakob.com/?sparkcentral', 'Web');
            expect(DomHelper.createLinkButton)
                .toHaveBeenCalledWith('http://linkedin.com/in/jakob-kerkhove-4a987281', 'LinkedIN');
            expect(DomHelper.createLinkButton)
                .toHaveBeenCalledWith('http://github.com/dejakob', 'GitHub');
        });

        it('should make the home container visible', () => {
            spyOn(DomHelper, 'attachStyle').and.callFake(() => {});
            sparkCentral.game._options.onWin();

            expect(DomHelper.attachStyle).toHaveBeenCalled();
            expect(DomHelper.attachStyle.calls.mostRecent().args[0])
                .toBe(sparkCentral.elements.homeContainer);
            expect(DomHelper.attachStyle.calls.mostRecent().args[1])
                .toEqual({ visibility: 'visible' });
        });
    });

    describe('onFail method ', () => {
        beforeEach(() => {
            spyOn(window, 'setTimeout').and.callFake(() => {});
            sparkCentral.hunt();
        });

        it('should be defined', () => {
            expect(sparkCentral.game._options.onFail);
        });

        it('should destroy the game', () => {
            spyOn(sparkCentral.game, 'destroy').and.callFake(() => {});
            sparkCentral.game._options.onFail();
            expect(sparkCentral.game).not.toBeDefined();
        });

        it('should create a button to restart the game', () => {
            const spoofElement = document.createElement('a');

            spyOn(Document.prototype, 'createElement').and.returnValue(spoofElement);
            spyOn(sparkCentral, 'hunt').and.callFake(() => {});

            sparkCentral.game._options.onFail();
            expect(Document.prototype.createElement).toHaveBeenCalled();

            spoofElement.onclick();
            expect(sparkCentral.hunt).toHaveBeenCalled();
        });

        it('should make the home container visible', () => {
            spyOn(DomHelper, 'attachStyle').and.callFake(() => {});
            sparkCentral.game._options.onWin();

            expect(DomHelper.attachStyle).toHaveBeenCalled();
            expect(DomHelper.attachStyle.calls.mostRecent().args[0])
                .toBe(sparkCentral.elements.homeContainer);
            expect(DomHelper.attachStyle.calls.mostRecent().args[1])
                .toEqual({ visibility: 'visible' });
        });
    });
});
