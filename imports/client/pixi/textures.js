var textures = {
    mainPlayer: PIXI.Texture.fromImage("images/character_color1.png"),
    otherPlayer: PIXI.Texture.fromImage("images/character_black.png")
};

export const getTextures = function(){
    return textures;
}