import { Vector2 } from '/imports/helpers/vector2.js';
import { Random } from 'meteor/random';

export function generateRandomPosition(xMax, yMax){
    return new Vector2(Random.fraction()*xMax - 3, Random.fraction()*yMax - 3);
}