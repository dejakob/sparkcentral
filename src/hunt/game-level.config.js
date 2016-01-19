const GAME_FPS = 30;

const GAME_DIRECTION = {
    LTR: 'left to right',
    RTL: 'right to left'
};

const GAME_DEFAULT_SPEED = 5;
const GAME_FAST_SPEED = 10;
const GAME_FASTER_SPEED = 20;
const GAME_FASTEST_SPEED = 35;

const GAME_LEVEL = {
    2: new GameProfile(GAME_DIRECTION.LTR),
    8: new GameProfile(GAME_DIRECTION.RTL),
    52: new GameProfile(GAME_DIRECTION.RTL),
    90: new GameProfile(GAME_DIRECTION.RTL),
    135: new GameProfile(GAME_DIRECTION.RTL)
};