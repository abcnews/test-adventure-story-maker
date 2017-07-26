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
    if (typeof seconds === 'undefined') seconds = 0.4;

    this.each(background => {
        background.style.setProperty('z-index', 1);
    });

    if (this.activeBackground) {
        this.activeBackground.style.setProperty('opacity', 1);
    }

    const nextBackground = this.backgrounds[key];
    nextBackground.style.setProperty('z-index', 2);
    nextBackground.style.setProperty('opacity', 0);

    const opacity = {
        value: parseInt(nextBackground.style.opacity, 10)
    };
    new Tween(opacity)
        .to(
            {
                value: 1
            },
            seconds * 1000
        )
        .onUpdate(() => {
            nextBackground.style.setProperty('opacity', opacity.value);
        })
        .onComplete(() => {
            this.each(background => {
                if (background !== nextBackground) {
                    background.style.setProperty('opacity', 0);
                }
            });
            this.activeBackground = nextBackground;
        })
        .start();
};

Background.prototype.slideTo = function(key, seconds) {
    if (typeof seconds === 'undefined') seconds = 0.4;

    this.each(background => {
        background.style.setProperty('z-index', 1);
    });

    // Outgoing background
    const currentBackground = this.activeBackground;
    if (currentBackground) {
        let currentBackgroundLeft = {
            value: 0
        };

        new Tween(currentBackgroundLeft)
            .to(
                {
                    value: -100
                },
                seconds * 1000
            )
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                currentBackground.style.setProperty(
                    'left',
                    currentBackgroundLeft.value + '%'
                );
            })
            .onComplete(() => {
                currentBackground.style.setProperty('left', 0);
            })
            .start();
    }

    // Incoming background
    const nextBackground = this.backgrounds[key];
    nextBackground.style.setProperty('z-index', 2);
    nextBackground.style.setProperty('left', '100%');
    nextBackground.style.setProperty('opacity', 1);

    let nextBackgroundLeft = {
        value: 100
    };

    new Tween(nextBackgroundLeft)
        .to(
            {
                value: 0
            },
            seconds * 1000
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            nextBackground.style.setProperty(
                'left',
                nextBackgroundLeft.value + '%'
            );
            nextBackground.style.setProperty('opacity', 1);
        })
        .onComplete(() => {
            this.activeBackground.style.setProperty('opacity', 0);
            this.activeBackground = nextBackground;
        })
        .start();
};

module.exports = Background;
