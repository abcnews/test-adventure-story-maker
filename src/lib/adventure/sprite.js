const { Tween } = require('./tweening');

const Sprite = function(url, x, y, width, height) {
    this.image = document.createElement('img');
    this.image.setAttribute('src', url);

    if (typeof width !== 'undefined')
        this.image.style.setProperty('width', width);
    if (typeof height !== 'undefined')
        this.image.style.setProperty('height', height);

    this.image.style.setProperty('position', 'fixed');
    this.image.style.setProperty('z-index', 2);
    this.image.style.setProperty('top', y);
    this.image.style.setProperty('left', x);

    document.body.appendChild(this.image);
};

Sprite.prototype.moveTo = function(left, top, seconds) {
    if (typeof seconds === 'undefined') seconds = 0.4;

    let coordinates = {
        left: parseInt(this.image.style.left),
        top: parseInt(this.image.style.top)
    };

    new Tween(coordinates)
        .to(
            {
                left: parseInt(left, 10),
                top: parseInt(top, 10)
            },
            seconds * 1000
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            this.image.style.setProperty('left', coordinates.left + '%');
            this.image.style.setProperty('top', coordinates.top + '%');
        })
        .start();
};

module.exports = Sprite;
