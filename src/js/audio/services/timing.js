(function() {
    'use strict';

    angular.module('thAudioComponents')

    /**
     * @ngdoc service
     * @name timing
     * @module thAudioComponents
     *
     * @description
     * Service that controls timing of the loop, and pause/play of the sample
     */
    .service('timing', [
        function(){
            var _this = this;

            _this.properties = {
                tempo: 120,
                pause: true,
                currentBeat: 0,
                refreshInterval: 0,
                looping: false,
            };

            _this.callbackListeners = {};

            /**
             * @ngdoc method
             * @name timing#adjustTempo
             * @module thAudioComponents
             *
             * @param {number} inc
             *
             * @description
             * Adds the inc param to the current tempo
             */
            _this.adjustTempo = function(inc) {
                _this.properties.tempo = _this.properties.tempo + inc;
            };

            /**
             * @ngdoc method
             * @name timing#getProperties
             * @module thAudioComponents
             *
             * @description
             * Returns the properties
             */
            _this.getProperties = function() {
                return _this.properties;
            };

            /**
             * @ngdoc method
             * @name timing#togglePause
             * @module thAudioComponents
             *
             * @description
             * Toggles the pause attribute of properties
             */
            _this.togglePause = function() {
                _this.properties.pause = !_this.properties.pause;
            };

            /**
             * @ngdoc method
             * @name timing#toggleLooping
             * @module thAudioComponents
             *
             * @description
             * Toggles the looping attribute of properties
             */
            _this.toggleLooping = function() {
                _this.properties.looping = !_this.properties.looping;
            };

            /**
             * @ngdoc method
             * @name timing#onPropertyUpdate
             * @module thAudioComponents
             *
             * @description
             *
             */
            _this.onPropertyUpdate = function() {

            };
        }
    ]);
})();
