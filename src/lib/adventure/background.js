const { Tween } = require('./tweening');

const Background = function(id, backgrounds) {
    this.element = document.getElementById(id);

    this.element.style.setProperty('height', '100%');
    this.element.style.setProperty('width', '100%');
    this.element.style.setProperty('position', 'fixed');
    this.element.style.setProperty('top', 0);
    this.element.style.setProperty('left', 0);
    this.element.style.setProperty('z-index', 0);
    this.element.style.setProperty('transition', 'all 0.5s ease');

    this.backgrounds = {};
    Object.keys(backgrounds).forEach(key => {
        const b = backgrounds[key];

        const div = document.createElement('div');
        div.style.setProperty('position', 'absolute');
        div.style.setProperty('top', '0');
        div.style.setProperty('left', '0');
        div.style.setProperty('height', '100%');
        div.style.setProperty('width', '100%');

        if (b.indexOf('url') >= 0) {
            div.style.setProperty('background-image', b);
        } else {
            div.style.setProperty('background-color', b);
        }

        div.style.setProperty('background-size', 'cover');
        div.style.setProperty('opacity', 0);
        div.style.setProperty('z-index', 1);
        this.element.appendChild(div);

        this.backgrounds[key] = div;
    });

    this.activeBackground = null;
};

Background.prototype.each = function(callback) {
    Object.keys(this.backgrounds).forEach(key => {
        callback(this.backgrounds[key]);
    });
};

Background.prototype.fadeTo = function(key, seconds) {
    if (typeof seconds === 'undefined') seconds = 0.2;

    this.each(background => {
        background.style.setProperty('z-index', 1);
    });

    this.activeBackground = this.backgrounds[key];
    this.activeBackground.style.setProperty('z-index', 2);

    const opacity = { value: 0 };
    new Tween(opacity)
        .to(
            {
                value: 1
            },
            seconds * 1000
        )
        .onUpdate(() => {
            this.activeBackground.style.setProperty('opacity', opacity.value);
        })
        .onComplete(() => {
            this.each(background => {
                if (background !== this.activeBackground) {
                    background.style.setProperty('opacity', 0);
                }
            });
        })
        .start();
};

module.exports = Background;
