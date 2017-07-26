// TODO: animation interpolation isn't great at the moment

const Sprite = function(url, x, y, width, height) {
    this.image = document.createElement('img');
    this.image.src = url;

    if (typeof width !== 'undefined') this.image.style.width = width;
    if (typeof height !== 'undefined') this.image.style.height = height;

    this.image.style.position = 'fixed';
    this.image.style.zIndex = 2;
    this.image.style.top = y;
    this.image.style.left = x;

    document.body.appendChild(this.image);

    this.animating = setInterval(() => {
        if (this.isMovingTop) {
            const actualTop = parseInt(this.image.style.top, 10);

            if (actualTop > this.toTop) {
                this.image.style.top =
                    actualTop - Math.ceil((actualTop - this.toTop) * 0.5) + '%';
            } else if (actualTop < this.toTop) {
                this.image.style.top =
                    actualTop + Math.ceil((this.toTop - actualTop) * 0.5) + '%';
            } else {
                this.isMovingTop = false;
            }
        }
        if (this.isMovingLeft) {
            const actualLeft = parseInt(this.image.style.left, 10);

            if (actualLeft > this.toLeft) {
                this.image.style.left =
                    actualLeft -
                    Math.ceil((actualLeft - this.toLeft) * 0.5) +
                    '%';
            } else if (actualLeft < this.toLeft) {
                this.image.style.left =
                    actualLeft +
                    Math.ceil((this.toLeft - actualLeft) * 0.5) +
                    '%';
            } else {
                this.isMovingLeft = false;
            }
        }
    }, 1000 / 30); // 30fps
};

Sprite.prototype.moveTo = function(left, top, seconds) {
    this.isMovingTop = true;
    this.isMovingLeft = true;
    this.toTop = parseInt(top, 10);
    this.toLeft = parseInt(left, 10);
};

module.exports = Sprite;
