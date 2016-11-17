var globalData = {
    mainGame: {
        players: {},
        player_keys: []
    }
};

export const getGlobalData = () => {
    return globalData;
};

export const resetGlobalData = () => {
    globalData = {};
};

export const getMainGameData = () => {
    return globalData.mainGame;
};

export const resetMainGameData = () => {
    globalData.mainGame = {
        players: {},
        player_keys: []
    };
};

