const GAME_FPS = 30;
const GAME_SCORE_NEEDED_TO_WIN = 1000;

const GAME_DIRECTION = {
    LTR: 'left to right',
    RTL: 'right to left'
};

const GAME_LAYOUT = {
    SCORE_BOARD: {
        position: 'absolute',
        color: '#ffffff',
        textAlign: 'right',
        fontSize: '22px'
    }
};

const GAME_STOP_REASON = {
    WIN: true,
    LOOSE: false
};

const GAME_DEFAULT_SPEED = 5;
const GAME_FAST_SPEED = 10;
const GAME_FASTER_SPEED = 20;
const GAME_FASTEST_SPEED = 35;

const GAME_LEVEL = {
    2: new GameProfile(GAME_DIRECTION.LTR),
    8: new GameProfile(GAME_DIRECTION.RTL),
    52: new GameProfile(GAME_DIRECTION.RTL),
    90: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    135: new GameProfile(GAME_DIRECTION.RTL),
    235: new GameProfile(GAME_DIRECTION.LTR),
    255: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    275: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    300: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    315: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    355: new GameProfile(GAME_DIRECTION.LTR),
    360: new GameProfile(GAME_DIRECTION.RTL),
    370: new GameProfile(GAME_DIRECTION.LTR),
    375: new GameProfile(GAME_DIRECTION.RTL),
    395: new GameProfile(GAME_DIRECTION.RTL),
    400: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    405: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    410: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    425: new GameProfile(GAME_DIRECTION.LTR, GAME_FASTER_SPEED),
    440: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    455: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    460: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    475: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    495: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    585: new GameProfile(GAME_DIRECTION.LTR, GAME_FASTER_SPEED),
    600: new GameProfile(GAME_DIRECTION.LTR, GAME_FASTER_SPEED),
    610: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    625: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTEST_SPEED),
    635: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTEST_SPEED),
    650: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    665: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTEST_SPEED),
    685: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    695: new GameProfile(GAME_DIRECTION.LTR),
    730: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED * 2),
    760: new GameProfile(GAME_DIRECTION.LTR),
    780: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    790: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    800: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    815: new GameProfile(GAME_DIRECTION.LTR, GAME_FASTEST_SPEED)
};
