(function() {
	'use strict';

	angular.module('drummerJS')

	.service('sampler', function($http){
        var _this = this;

        _this.sampler = [];



        _this.initSampler = function() {
            for(var i = 0; i < 7; i++) {
                var type = '';

                if(i < 2)
                    type = i === 0 ? 'marker' : 'kick';
                else if(i >= 2 && i < 4)
                    type = i === 2 ? 'snare' : 'hihat';
                else if(i >= 4 && i < 6)
                    type = i === 4 ? 'openhat' : 'lowtom';
                else
                    type = 'hitom';

                for(var j = 0; j <= 15; j++) {
                    _this.sampler.push({
                        type: type,
                        on: false,
                        class: 'col' + j
                    });
                }
            }
        };

        _this.getSampler = function() {
            return _this.sampler;
        };

        _this.clearPads = function() {
            for(var i = 0; i < _this.sampler.length; i++)
                _this.sampler[i].on = false;
        };

        _this.setSampleLoop = function(sampleLoop) {
			_this.bpm = sampleLoop.tempo;

			for(var i = 0; i < _this.sampler.length; i++) {
				if(_this.sampler[i].type == 'kick')
					_this.sampler[i].on = _this.arrayCheck(_this.sampler[i].class, sampleLoop.kicks) ? true : false;
				else if(_this.sampler[i].type == 'snare')
					_this.sampler[i].on = _this.arrayCheck(_this.sampler[i].class, sampleLoop.snares) ? true : false;
				else if(_this.sampler[i].type == 'hihat')
					_this.sampler[i].on = _this.arrayCheck(_this.sampler[i].class, sampleLoop.hihats) ? true : false;
				else if(_this.sampler[i].type == 'openhat')
					_this.sampler[i].on = _this.arrayCheck(_this.sampler[i].class, sampleLoop.openhats) ? true : false;
				else if(_this.sampler[i].type == 'lowtom')
					_this.sampler[i].on = _this.arrayCheck(_this.sampler[i].class, sampleLoop.lowtoms) ? true : false;
				else if(_this.sampler[i].type == 'hitom')
					_this.sampler[i].on = _this.arrayCheck(_this.sampler[i].class, sampleLoop.hitoms) ? true : false;
			}
		};

        _this.getClass = function(ele) {
            return ele.class;
        };

        _this.arrayCheck = function(value, array) {
            return array.indexOf(value) > -1;
        };

        _this.initSampler();

	});
})();
