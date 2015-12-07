/* global document, THREE */

var RenderUtil = {};

/* magic numbers up in here for scaling. maybe figue out what is going on later */
RenderUtil.makeTextSprite = function(message , parameters) {
    if ( parameters === undefined ) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ? parameters.fontface : "Arial";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters.fontsize : 8;

    var canvas = document.createElement('canvas');
    canvas.width = 2000;
    var context = canvas.getContext('2d');
    context.font = fontsize + "px " + fontface;

    // get size data (height depends only on font size)
    var metrics = context.measureText( message );
    var textWidth = metrics.width;
    
    // text color
    context.fillStyle = "rgba(255, 255, 255, 1.0)";
    context.textAlign = "center";
    context.fillText(message, canvas.width / 2, fontsize);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( { map: texture} );
    var sprite = new THREE.Sprite(spriteMaterial);
    //sprite.scale.set(textWidth / fontsize, 1, 1);
    sprite.scale.set(10, 1, 1);
    return sprite;
};

// function for drawing rounded rectangles
RenderUtil.roundRect = function(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
};