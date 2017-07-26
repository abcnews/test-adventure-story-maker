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

const planet = new Adventure.Sprite(
    'http://3.bp.blogspot.com/-LQ3_8-Z8HlM/UWsGj4F0swI/AAAAAAAAAfA/MYa_sRe9AaQ/s1600/Fire_Planet_3_by_DennisH2010.png',
    '500%',
    '90%',
    '5%'
);

const adventure = new Adventure({
    locations: {
        first: {
            onEnter(previousLocation, direction) {
                background.fadeTo('white');
                satellite.moveTo('-100%', '50%');
                planet.resizeTo('0%');
            }
        },
        second: {
            onEnter(previousLocation, direction) {
                background.slideTo('image1');
                satellite.moveTo('40%', '40%');
                planet.moveTo('90%', '80%');
                planet.resizeTo('5%');
            }
        },
        third: {
            onEnter(previousLocation, direction) {
                background.fadeTo('image2');
                satellite.moveTo('80%', '10%');
                planet.resizeTo('50%');
                planet.moveTo('50%', '50%');
            }
        },
        fourth: {
            onEnter() {
                background.slideTo('image1');
                planet.resizeTo('50%');
                planet.moveTo('50%', '50%');
            }
        }
    }
});
