const Adventure = function(config) {
    this.locations = config.locations || {};

    Object.keys(this.locations).forEach(key => {
        const location = this.locations[key];

        // So we can match keys to objects if it gets converted to an array
        location.key = key;

        if (typeof location.onEnter === 'function') {
            location.onEnter = location.onEnter.bind(location);
        } else {
            location.onEnter = function() {};
        }

        if (typeof location.onExit === 'function') {
            location.onExit = location.onExit.bind(location);
        } else {
            location.onExit = function() {};
        }

        location.element = document.getElementById(location.key);
    });
    this.currentActiveLocation = this.getFirstLocation();
    this.currentActiveLocation.onEnter(null, 'down');

    window.addEventListener('scroll', this.onScroll.bind(this));
    this.onScroll();
};

Adventure.prototype.getFirstLocation = function() {
    return this.locations[Object.keys(this.locations)[0]];
};

Adventure.prototype.getLastLocation = function() {
    const locationKeys = Object.keys(this.locations);
    return this.locations[locationKeys[locationKeys.length - 1]];
};

Adventure.prototype.getActiveLocation = function() {
    const locationKeys = Object.keys(this.locations);
    const nextVisibleKey = locationKeys.find(key => {
        return (
            this.locations[key].element.offsetTop >
            document.body.scrollTop + window.innerHeight * 0.5 // 50% in
        );
    });

    if (!nextVisibleKey) return this.getLastLocation();

    const activeLocationKey =
        locationKeys[locationKeys.indexOf(nextVisibleKey) - 1];

    if (!activeLocationKey) return this.currentActiveLocation;

    const activeLocation = this.locations[activeLocationKey];

    if (!activeLocation) return this.currentActiveLocation;

    return activeLocation;
};

Adventure.prototype.onScroll = function(event) {
    const location = this.getActiveLocation();

    if (location.key !== this.currentActiveLocation.key) {
        const currentIndex = Object.keys(this.locations).indexOf(
            this.currentActiveLocation.key
        );
        const nextIndex = Object.keys(this.locations).indexOf(location.key);

        const direction = nextIndex > currentIndex ? 'down' : 'up';

        this.currentActiveLocation.onExit(location, direction);
        location.onEnter(this.currentActiveLocation, direction);
        this.currentActiveLocation = location;
    }
};

module.exports = Adventure;
