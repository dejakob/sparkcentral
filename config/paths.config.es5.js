module.exports = {
    src: [
        './src/description.js',
        './src/timeline/sequence.config.js',
        './src/animation/animation.js',
        './src/animation/*.js',
        './src/helpers/*.js',
        './src/hunt/game-profile.js',
        './src/hunt/*.js',
        './src/timeline/timeline.js',
        './src/sparkcentral.js'
    ],
    mocks: [
        './spec/**/*.mock.js'
    ],
    tests: [
        './spec/**/*.spec.js'
    ],
    exec: [
        './src/main.js'
    ]
};