module.exports = {
    src: [
        './src/description.js',
        './src/sequence.config.js',
        './src/animation/animation.js',
        './src/animation/*.js',
        './src/hunt/game-profile.js',
        './src/hunt/*.js',
        './src/rgbcolor.js',
        './src/timeline.js',
        './src/dom-helper.js',
        './src/sparkcentral.js'
    ],
    get test () {
        const test = this.src;
        test.push('./example/**/*.html');
        return test;
    }
};