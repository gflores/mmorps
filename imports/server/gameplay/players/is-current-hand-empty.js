export const isCurrentHandEmpty = (player) => {
    if (player.currentCards[0] == null && player.currentCards[1] == null && player.currentCards[2] == null) {
        return true;
    } else {
        return false;
    }
};