export function Vector2(x, y) {
    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : y;
}

Vector2.prototype = {
    set: function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    },

    clone: function() {
        return new Vector2(this.x, this.y)
    },

    add: function(vector) {
        this.x += vector.x;
        this.y += vector.y;

        return this;
    },

    subtract: function(vector) {
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
    },

    scale: function(scalar) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    },

    dot: function(vector) {
        return (this.x * vector.x + this.y + vector.y);
    },

    moveTowards: function(vector, t) {
        // Linearly interpolates between vectors A and B by t.
        // t = 0 returns A, t = 1 returns B
        t = Math.min(t, 1); // still allow negative t
        var diff = vector.clone().subtract(this);
        return this.add(diff.scale(t));
    },

    magnitude: function() {
        return Math.sqrt(this.magnitudeSqr());
    },

    magnitudeSqr: function() {
        return (this.x * this.x + this.y * this.y);
    },

    distance: function (vector) {
        return Math.sqrt(this.distanceSqr(vector));
    },

    distanceSqr: function (vector) {
        var deltaX = this.x - vector.x;
        var deltaY = this.y - vector.y;
        return (deltaX * deltaX + deltaY * deltaY);
    },

    normalize: function() {
        var mag = this.magnitude();
        if(Math.abs(mag) < 1e-9) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x /= mag;
            this.y /= mag;
        }
        return this;
    },

    angle: function() {
        return Math.atan2(this.y, this.x);
    },

    rotate: function(alpha) {
        var cos = Math.cos(alpha);
        var sin = Math.sin(alpha);
        this.x = this.x * cos - this.y * sin;
        this.y = this.x * sin + this.y * cos;

        return this;
    },

    toPrecision: function(precision) {
        this.x = this.x.toFixed(precision);
        this.y = this.y.toFixed(precision);

        return this;
    },

    toString: function () {
        var vector = this.toPrecision(1);
        return ("[" + vector.x + "; " + vector.y + "]");
    }
};

if (Meteor.isClient){
    window.Vector2 = Vector2;    
}
