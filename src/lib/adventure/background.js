// TODO: fade timer should be moved to be a constant timer like how Sprite works

const Background = function(id, backgrounds) {
    this.element = document.getElementById(id);

    this.element.style.height = '100%';
    this.element.style.width = '100%';
    this.element.style.position = 'fixed';
    this.element.style.top = 0;
    this.element.style.left = 0;
    this.element.style.zIndex = 0;
    this.element.transition = 'all 0.5s ease';

    this.backgrounds = {};
    Object.keys(backgrounds).forEach(key => {
        const b = backgrounds[key];

        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '0';
        div.style.height = '100%';
        div.style.width = '100%';

        if (b.indexOf('url') >= 0) {
            div.style.backgroundImage = b;
        } else {
            div.style.backgroundColor = b;
        }

        div.style.backgroundSize = 'cover';
        div.style.opacity = 0;
        div.style.zIndex = 1;
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
        background.style.zIndex = 1;
    });

    this.activeBackground = this.backgrounds[key];
    this.activeBackground.style.zIndex = 2;

    let opacity = 0;
    const opacityChange = 1 / (seconds * 30); // 30 frames = 1 second

    clearInterval(this.fadeIn);
    this.fadeIn = setInterval(() => {
        if (this.activeBackground.style.opacity >= 1) {
            // Reset the opacity of things that aren't visible
            this.each(background => {
                if (background !== this.activeBackground) {
                    background.style.opacity = 0;
                }
            });
            clearInterval(this.fadeIn);
        } else {
            opacity += opacityChange;
            this.activeBackground.style.opacity = opacity;
        }
    }, 1000 / 30); // 30fps
};

module.exports = Background;
