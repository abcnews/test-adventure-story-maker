const TWEEN = require('@tweenjs/tween.js');

if (!window.isTweening) {
    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }
    requestAnimationFrame(animate);

    window.isTweening = true;
}

module.exports = TWEEN;
