(function() {
    'use strict';

    angular.module('thAudioComponents')

    /**
     * @ngdoc service
     * @name drumMachineBuilder
     * @module thAudioComponents
     *
     * @requires soundBuilder
     *
     * @description
     * Builds the sampler object
     */
    .service('drumMachineBuilder', [
        'soundBuilder',
        function(
            soundBuilder
        ){
            var _this = this,
                context = new AudioContext(),
                drumMachine = [];

            /**
             * @ngdoc method
             * @name initDrumMachine
             * @module thAudioComponents
             *
             * @description
             * Builds a matrix of sound objects for the synthesizer
             */
            function initDrumMachine() {
                for(let i = 0; i < 7; i++) {
                    var type = '';

                    if(i < 2) {
                        type = i === 0 ? 'marker' : 'kick';
                    } else if(i >= 2 && i < 4) {
                        type = i === 2 ? 'snare' : 'hihat';
                    } else if(i >= 4 && i < 6) {
                        type = i === 4 ? 'openhat' : 'lowtom';
                    } else {
                        type = 'hitom';
                    }

                    for(let j = 0; j <= 15; j++) {
                        drumMachine.push({
                            type: type,
                            on: false,
                            class: 'col' + j,
                            sound: soundBuilder.getSound(context, type)
                        });
                    }
                }
            }

            /**
             * @typedef {Object} Loop
             * @property {string} name
             * @property {number} tempo
             * @property {array} kicks
             * @property {array} snares
             * @property {array} hihats
             * @property {array} openhats
             * @property {array} lowtoms
             * @property {array} hitoms
             */

            /**
             * @ngdoc method
             * @name drumMachineBuilder#setSampleLoop
             * @module thAudioComponents
             *
             * @param {Loop} sampleLoop
             *
             * @description
             * Adds selected settings to the sampler
             */
            _this.setSampleLoop = function(sampleLoop) {
                _this.bpm = sampleLoop.tempo;

                for(var i = 0; i < drumMachine.length; i++) {
                    if(drumMachine[i].type === 'kick') {
                        drumMachine[i].on = sampleLoop.kicks.indexOf(drumMachine[i].class) > -1;
                    } else if(drumMachine[i].type === 'snare') {
                        drumMachine[i].on = sampleLoop.snares.indexOf(drumMachine[i].class) > -1;
                    } else if(drumMachine[i].type === 'hihat') {
                        drumMachine[i].on = sampleLoop.hihats.indexOf(drumMachine[i].class) > -1;
                    } else if(drumMachine[i].type === 'openhat') {
                        drumMachine[i].on = sampleLoop.openhats.indexOf(drumMachine[i].class) > -1;
                    } else if(drumMachine[i].type === 'lowtom') {
                        drumMachine[i].on = sampleLoop.lowtoms.indexOf(drumMachine[i].class) > -1;
                    } else if(drumMachine[i].type === 'hitom') {
                        drumMachine[i].on = sampleLoop.hitoms.indexOf(drumMachine[i].class) > -1;
                    }
                }
            };

            /**
             * @ngdoc method
             * @name drumMachineBuilder#getSampler
             * @module thAudioComponents
             *
             * @description
             * Returns the sampler
             *
             * @return {DrumMachine}
             */
            _this.getSampler = function() {
                return drumMachine;
            };

            initDrumMachine();
        }
    ]);
})();
