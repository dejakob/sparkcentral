describe('DomHelper class ', () => {
    'use strict';

    it('should be defined', () => {
        expect(DomHelper).toBeDefined();
    });

    describe('attachStyle method ', () => {
        it('should be defined', () => {
            expect(DomHelper.attachStyle).toBeDefined();
        });

        it('should attach styling', () => {
            spyOn(HTMLElement.prototype, 'setAttribute').and.callFake(() => {});

            const htmlElement = document.createElement('div');
            const style = {
                color: '#ff0000',
                fontSize: '16px'
            };

            DomHelper.attachStyle(htmlElement, style);

            expect(htmlElement.setAttribute).toHaveBeenCalledWith('style', 'color:#ff0000;font-size:16px');
        });

        it('should append previous styling', () => {
            const htmlElement = document.createElement('div');
            htmlElement.setAttribute('style', 'color:#ff0000;opacity:1');

            spyOn(HTMLElement.prototype, 'setAttribute').and.callFake(() => {});

            const style = {
                color: '#556677',
                fontSize: '16px',
                backgroundColor: '#ffffff'
            };

            DomHelper.attachStyle(htmlElement, style);

            expect(htmlElement.setAttribute)
                .toHaveBeenCalledWith('style', 'color:#556677;opacity:1;font-size:16px;background-color:#ffffff');
        });
    });

    describe('createLinkButton method ', () => {
        it('should be defined', () => {
            expect(DomHelper.createLinkButton).toBeDefined();
        });

        it('should create an anchor element', () => {
            expect(DomHelper.createLinkButton().localName).toBe('a');
        });

        it('should have the description as innerHTML', () => {
            expect(DomHelper.createLinkButton(null, 'Just a description').innerHTML).toBe('Just a description');
        });

        it('should have the link in the href', () => {
            expect(DomHelper.createLinkButton('http://sparkcentral.com').getAttribute('href')).toBe('http://sparkcentral.com');
        });

        it('should have target _blank', () => {
            expect(DomHelper.createLinkButton().getAttribute('target')).toBe('_blank');
        });
    });
});