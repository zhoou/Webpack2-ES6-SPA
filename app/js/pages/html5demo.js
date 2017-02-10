let html5DemoModel = {
    totalDistance: 0.0,
    lastLat: 0,
    lastLong: 0,

    toRadians: function (degree) {
        return degree * Math.PI / 180;
    },

    distance: function (latitude, longitude, latitude2, longitude2) {
        let R = 6371; //地球半径，单位km
        let deltaLatitude = html5DemoModel.toRadians(latitude2 - latitude);
        let deltaLongitude = html5DemoModel.toRadians(longitude2 - longitude);
        latitude = html5DemoModel.toRadians(latitude);
        latitude2 = html5DemoModel.toRadians(latitude2);

        let a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) + Math.cos(latitude) * Math.cos(latitude2) * Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let d = R * c;
        return d;
    },

    updateStatus: function (message) {
        document.querySelector('#status').innerHTML = message;
    },

    loadDemo: function () {
        if (navigator.geolocation) {
            html5DemoModel.updateStatus('Html5 Geolocation is supported in your browser.');
            navigator.geolocation.watchPosition(html5DemoModel.updateLocation(), html5DemoModel.handleLocationError(), { maximumAge: 20000 });
        }
    },

    // 错误处理代码
    handleLocationError: function (error) {
        switch (error.code) {
            case 0: updateStatus('There was an error while retrieving your location: ' + error.message); break;
            case 1: updateStatus('The user prevented this page from retrieving a location'); break;
            case 2: updateStatus('The browser was unable to determine your location: ' + error.message); break;
            case 3: updateStatus('The browser timed out before retrieving the location.'); break;
            default: break;
        }
    },

    updateLocation: function (position) {
        console.log('updateLocation')
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let accuracy = position.coords.accuracy;
        let timestamp = position.timestamp;

        document.querySelector('#latitude').innerHTML = latitude;
        document.querySelector('#longitude').innerHTML = longitude;
        document.querySelector('#accuracy').innerHTML = accuracy;
        document.querySelector('#timestamp').innerHTML = timestamp;

        // 合理性检测。如果accuracy值太大，就不要计算距离
        if (accuracy >= 500) {
            html5DemoModel.updateStatus('Needs more accurate values to calculate distance.');
            return;
        }

        // 计算距离
        if ((lastLat !== null) && (lastLong !== null)) {
            let currentDistance = html5DemoModel.distance(latitude, longitude, lastLat, lastLong);
            document.querySelector('#currDist').innerHTML = 'Current Distance traveled: ' + currentDistance.toFixed(4) + 'km';

            totalDistance += currentDistance;
            document.querySelector('#totalDist').innerHTML = 'Total Distance traveled: ' + totalDistance.toFixed(4) + 'km';
        }

        lastLat = latitude;
        lastLong = longitude;

        html5DemoModel.updateStatus('Location successfully updated.');
    },

    init: function () {
        console.log('init');
        window.addEventListener('load', html5DemoModel.loadDemo(), true);
    }
};

module.exports = html5DemoModel;

