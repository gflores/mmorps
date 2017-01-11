var textures = {
    mainPlayer: PIXI.Texture.fromImage("images/character_color1.png"),
    otherPlayer: PIXI.Texture.fromImage("images/character_black.png"),
    paperCard: PIXI.Texture.fromImage("images/card_paper.png"),
    rockCard: PIXI.Texture.fromImage("images/card_rock.png"),
    scissorCard: PIXI.Texture.fromImage("images/card_scissor.png"),
    shield: PIXI.Texture.fromImage("images/mirror_shield.png"),
    emptyCard: PIXI.Texture.fromImage("")
};

export const getTextures = function(){
    return textures;
}