(function() {
	'use strict';

	angular.module('thAudioComponents')

	.service('drumMachineBuilder', ['soundBuilder', function(soundBuilder){
        var _this = this,
            context = new AudioContext(),
            drumMachine = [];

        function initDrumMachine() {
            for(var i = 0; i < 7; i++) {
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

                for(var j = 0; j <= 15; j++) {
                    drumMachine.push({
                        type: type,
                        on: false,
                        class: 'col' + j,
                        sound: soundBuilder.getSound(context, type)
                    });
                }
            }
        }

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

        _this.getSampler = function() {
            return drumMachine;
        };

        initDrumMachine();
	}]);
})();
