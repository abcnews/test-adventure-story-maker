const Adventure = require('./lib/adventure');

const background = new Adventure.Background('background', {
    white: 'white',
    red: 'red',
    image1:
        'url(https://lh3.googleusercontent.com/K3UdS0t311DpKIiq614Ix6cRanFYxueEFaLF3T0bPQLGcJtqzw5ps3ClI85nK7jB4ElbKBs8xg=s640-h400-e365)',
    image2:
        'url(https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5Mi82NjUvb3JpZ2luYWwvZGFyay1lbmVyZ3ktbmVidWxhZS1zdGFycy5qcGc=)'
});

// Sprites take an image url, x, y, width (all percentages)
const satellite = new Adventure.Sprite(
    'https://cdn2.iconfinder.com/data/icons/iconslandgps/PNG/256x256/Misc/Satellite.png',
    '-100%',
    '50%',
    '10%'
);

const adventure = new Adventure({
    locations: {
        first: {
            onEnter(previousLocation, direction) {
                background.fadeTo('white');
            }
        },
        second: {
            onEnter(previousLocation, direction) {
                background.fadeTo('image1');
                satellite.moveTo('40%', '40%');
            },
            onExit(previousLocation, direction) {
                if (direction === 'up') {
                    satellite.moveTo('-100%', '50%');
                }
            }
        },
        third: {
            onEnter(previousLocation, direction) {
                background.fadeTo('image2');
                satellite.moveTo('80%', '10%');
            }
        }
    }
});
