(function() {
    'use strict';

    angular.module('thAudioComponents')

    .service('drumKit', function(){
        var _this = this;

        _this.buildKit = function() {
            var drumKit = {
                kick:  'test', //new Kick(context),
                snare:  'test', //new Snare(context),
                hihat:  'test', //new HiHat(context),
                openhat:  'test', //new OpenHat(context),
                lowtom:  'test', //new LowTom(context),
                hitom: 'test' // new HiTom(context)
            };

            return drumKit;
        };
    });
})();
