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
            let _this = this,
                properties = {
                    tempo: 120,
                    pause: true,
                    currentBeat: 0,
                    refreshInterval: 0,
                    looping: false,
                };

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
                properties.tempo = properties.tempo + inc;
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
                return properties;
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
                properties.pause = !properties.pause;
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
                properties.looping = !properties.looping;
            };

            /**
             * @ngdoc method
             * @name timing#onPropertyUpdate
             * @module thAudioComponents
             *
             * @description
             *
             */
             _this.onPropertyUpdate = function (thisArg, callback) {

             };
        }
    ]);
})();
