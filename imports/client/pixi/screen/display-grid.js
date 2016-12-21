import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';
import { convertAbsoluteToRelativePlayerPosition, convertToScreenValues } from "/imports/client/pixi/screen/convert-position.js";

var state = getState();

displayColumns = function(line, x){
    var screenVector = new Vector2(x, 0);

    convertAbsoluteToRelativePlayerPosition(screenVector);
    convertToScreenValues(screenVector);

    line.clear();
    line.lineStyle(1, 0x999999, 1);

    line.moveTo(screenVector.x, 0);
    line.lineTo(screenVector.x, 1000);

}

displayRows = function(line, y){
    var screenVector = new Vector2(0, y);

    convertAbsoluteToRelativePlayerPosition(screenVector);
    convertToScreenValues(screenVector);

    line.clear();
    line.lineStyle(1, 0x999999, 1);

    line.moveTo(0, screenVector.y);
    line.lineTo(1000, screenVector.y);

}


export const displayGrid = function(){
    if (state.player != null){
        var playerPosition = state.player.position;
        var lineDistance = getScreenParameters().gridLineEveryDistance;

        var currentX = playerPosition.x;

        var xModulo = currentX % lineDistance;

        var firstLeft = currentX - xModulo;
        var firstRight = firstLeft + lineDistance;

        for (var i = 0; state.grid.rightColumns.length != i; ++i){
            var x = firstRight + i * lineDistance;
            var line = state.grid.rightColumns[i];
            displayColumns(line, x);
        }
        for (var i = 0; state.grid.leftColumns.length != i; ++i){
            var x = firstLeft - i * lineDistance;
            var line = state.grid.leftColumns[i];
            displayColumns(line, x);
        }

        var currentY = playerPosition.y;

        var yModulo = currentY % lineDistance;

        var firstBottom = currentY - yModulo;
        var firstTop = firstBottom + lineDistance;

        for (var i = 0; state.grid.topRows.length != i; ++i){
            var y = firstTop + i * lineDistance;
            var line = state.grid.topRows[i];
            displayRows(line, y);
        }
        for (var i = 0; state.grid.bottomRows.length != i; ++i){
            var y = firstBottom - i * lineDistance;
            var line = state.grid.bottomRows[i];
            displayRows(line, y);
        }

    }
};

export const setupGrid = function(){
    state.grid = {
        rightColumns: [],
        leftColumns: [],
        topRows: [],
        bottomRows: []
    };

    for (var i = 0; i != 5; ++i){
        var line = new PIXI.Graphics();

        state.gameMap.addChild(line);        
        state.grid.rightColumns.push(line);
    }
    for (var i = 0; i != 5; ++i){
        var line = new PIXI.Graphics();

        state.gameMap.addChild(line);
        state.grid.leftColumns.push(line);
    }
    for (var i = 0; i != 4; ++i){
        var line = new PIXI.Graphics();

        state.gameMap.addChild(line);
        state.grid.topRows.push(line);
    }
    for (var i = 0; i != 5; ++i){
        var line = new PIXI.Graphics();

        state.gameMap.addChild(line);
        state.grid.bottomRows.push(line);
    }
}