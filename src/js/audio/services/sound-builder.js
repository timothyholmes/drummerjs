(function() {
    'use strict';

    angular.module('thAudioComponents')

    /**
     * @ngdoc service
     * @name soundBuilder
     * @module thAudioComponents
     *
     * @description
     * Service for creating the sounds used in the drum machine
     */
    .service('soundBuilder', function(){
        var _this = this;

        /**
         * @ngdoc constructor
         * @name soundBuilder#sound
         * @module thAudioComponents
         *
         * @param {AudioContext} context
         * @param {string} type
         *
         * @description
         * Constructor for the sound objects
         *
         * @return {Sound}
         */
        function Sound(context, type) {
            var self = this;

            self.context = context;

            if(type === 'kick') {
                return {
                    setup: function() {
                        var _this = this;

                        _this.osc = self.context.createOscillator();
                        _this.gain = self.context.createGain();
                        _this.osc.connect(_this.gain);
                        _this.gain.connect(self.context.destination);
                    },
                    trigger: function(time) {
                        var _this = this;

                        _this.setup();

                        _this.osc.frequency.setValueAtTime(150, time);
                        _this.gain.gain.setValueAtTime(1.5, time);

                        _this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 1);
                        _this.gain.gain.exponentialRampToValueAtTime(0.01, time + 1);

                        _this.osc.start(time);

                        _this.osc.stop(time + 1);
                    },
                    play: function () {
                        var _this = this;

                        _this.trigger(self.context.currentTime);
                    }
                };
            } else if(type === 'snare') {
                return {
                    noiseBuffer: function() {
                        var _this = this;

                        var bufferSize = self.context.sampleRate;
                        var buffer = self.context.createBuffer(1, bufferSize, self.context.sampleRate);
                        var output = buffer.getChannelData(0);

                        for (var i = 0; i < bufferSize; i++) {
                            output[i] = Math.random() * 2 - 1;
                        }

                        return buffer;
                    },
                    setup: function() {
                        var _this = this;

                        _this.noise = self.context.createBufferSource();
                        _this.noise.buffer = _this.noiseBuffer();

                        var noiseFilter = self.context.createBiquadFilter();

                        noiseFilter.type = 'peaking';
                        noiseFilter.frequency.value = 15000;
                        _this.noise.connect(noiseFilter);

                        _this.noiseEnvelope = self.context.createGain();
                        noiseFilter.connect(_this.noiseEnvelope);

                        _this.noiseEnvelope.connect(self.context.destination);

                        _this.osc = self.context.createOscillator();
                        _this.osc.type = 'triangle';

                        _this.oscEnvelope = self.context.createGain();
                        _this.osc.connect(_this.oscEnvelope);
                        _this.oscEnvelope.connect(self.context.destination);
                    },
                    trigger: function(time) {
                        var _this = this;

                        _this.setup();

                        _this.noiseEnvelope.gain.setValueAtTime(1, time);
                        _this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
                        _this.noise.start(time);

                        _this.osc.frequency.setValueAtTime(100, time);
                        _this.oscEnvelope.gain.setValueAtTime(0.7, time);
                        _this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
                        _this.osc.start(time);

                        _this.osc.stop(time + 0.2);
                        _this.noise.stop(time + 0.2);
                    },
                    play: function () {
                        var _this = this;

                        _this.trigger(self.context.currentTime);
                    }
                };
            } else if (type === 'hihat') {
                return {
                    noiseBuffer: function() {
                        var _this = this;

                        var bufferSize = self.context.sampleRate;
                        var buffer = self.context.createBuffer(1, bufferSize, self.context.sampleRate);
                        var output = buffer.getChannelData(0);

                        for (var i = 0; i < bufferSize; i++) {
                            output[i] = Math.random() * 7 - 1;
                        }

                        return buffer;
                    },
                    setup: function() {
                        var _this = this;

                        _this.noise = self.context.createBufferSource();
                        _this.noise.buffer = _this.noiseBuffer();

                        var noiseFilter = self.context.createBiquadFilter();

                        noiseFilter.type = 'highpass';
                        noiseFilter.frequency.value = 15000;
                        _this.noise.connect(noiseFilter);

                        _this.noiseEnvelope = self.context.createGain();
                        noiseFilter.connect(_this.noiseEnvelope);

                        _this.noiseEnvelope.connect(self.context.destination);

                        _this.osc = self.context.createOscillator();
                        _this.osc.type = 'sine';

                        _this.oscEnvelope = self.context.createGain();
                        _this.osc.connect(_this.oscEnvelope);
                        _this.oscEnvelope.connect(self.context.destination);
                    },
                    trigger: function(time) {
                        var _this = this;

                        _this.setup();

                        _this.noiseEnvelope.gain.setValueAtTime(1, time);
                        _this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
                        _this.noise.start(time);

                        _this.osc.frequency.setValueAtTime(0, time);
                        _this.oscEnvelope.gain.setValueAtTime(0.7, time);
                        _this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
                        _this.osc.start(time);

                        _this.osc.stop(time + 0.2);
                        _this.noise.stop(time + 0.2);
                    },
                    play: function () {
                        var _this = this;

                        _this.trigger(self.context.currentTime);
                    }
                };
            } else if (type === 'openhat') {
                return {
                    noiseBuffer: function() {
                        var _this = this;

                        var bufferSize = self.context.sampleRate;
                        var buffer = self.context.createBuffer(1, bufferSize, self.context.sampleRate);
                        var output = buffer.getChannelData(0);

                        for (var i = 0; i < bufferSize; i++) {
                            output[i] = Math.random() * 7 - 1;
                        }

                        return buffer;
                    },
                    setup: function() {
                        var _this = this;

                        _this.noise = self.context.createBufferSource();
                        _this.noise.buffer = _this.noiseBuffer();

                        var noiseFilter = self.context.createBiquadFilter();

                        noiseFilter.type = 'highpass';
                        noiseFilter.frequency.value = 15000;
                        _this.noise.connect(noiseFilter);

                        _this.noiseEnvelope = self.context.createGain();
                        noiseFilter.connect(_this.noiseEnvelope);

                        _this.noiseEnvelope.connect(self.context.destination);

                        _this.osc = self.context.createOscillator();
                        _this.osc.type = 'triangle';

                        _this.oscEnvelope = self.context.createGain();
                        _this.osc.connect(_this.oscEnvelope);
                        _this.oscEnvelope.connect(self.context.destination);
                    },
                    trigger: function(time) {
                        var _this = this;

                        _this.setup();

                        _this.noiseEnvelope.gain.setValueAtTime(1, time);
                        _this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
                        _this.noise.start(time);

                        _this.osc.frequency.setValueAtTime(0, time);
                        _this.oscEnvelope.gain.setValueAtTime(0.01, time);
                        _this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
                        _this.osc.start(time);

                        _this.noise.stop(time + 0.5);
                        _this.osc.stop(time + 0.4);
                    },
                    play: function () {
                        var _this = this;

                        _this.trigger(self.context.currentTime);
                    }
                };
            } else if (type === 'lowtom') {
                return {
                    setup: function() {
                        var _this = this;

                        _this.osc = self.context.createOscillator();
                        _this.gain = self.context.createGain();
                        _this.osc.connect(_this.gain);
                        _this.gain.connect(self.context.destination);
                    },
                    trigger: function(time) {
                        var _this = this;

                        _this.setup();

                        _this.osc.frequency.setValueAtTime(250, time);
                        _this.gain.gain.setValueAtTime(1.5, time);

                        _this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 1);
                        _this.gain.gain.exponentialRampToValueAtTime(0.01, time + 1);

                        _this.osc.start(time);

                        _this.osc.stop(time + 1);
                    },
                    play: function () {
                        var _this = this;

                        _this.trigger(self.context.currentTime);
                    }
                };
            } else if (type === 'hitom') {
                return {
                    setup: function() {
                        var _this = this;

                        _this.osc = self.context.createOscillator();
                        _this.gain = self.context.createGain();
                        _this.osc.connect(_this.gain);
                        _this.gain.connect(self.context.destination);
                    },
                    trigger: function(time) {
                        var _this = this;

                        _this.setup();

                        _this.osc.frequency.setValueAtTime(400, time);
                        _this.gain.gain.setValueAtTime(1.5, time);

                        _this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 1);
                        _this.gain.gain.exponentialRampToValueAtTime(0.01, time + 1);

                        _this.osc.start(time);

                        _this.osc.stop(time + 1);
                    },
                    play: function () {
                        var _this = this;

                        _this.trigger(self.context.currentTime);
                    }
                };
            } else {
                return 'no matching type';
            }
        }

        /**
         * @ngdoc method
         * @name getSound
         * @module thAudioComponents
         *
         * @param {AudioContext} context
         * @param {string} type
         *
         * @return {Sound}
         */
        _this.getSound = function(context, type) {
            return new Sound(context, type);
        };
    });
})();
