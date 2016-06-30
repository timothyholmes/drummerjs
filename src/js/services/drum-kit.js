(function() {
    'use strict';

    angular.module('drummerJS')

    .service('drumKit', function($http){
        var _this = this;

        _this.buildKit = function() {
            var drumKit = {
                kick: new Kick(context),
                snare: new Snare(context),
                hihat: new HiHat(context),
                openhat: new OpenHat(context),
                lowtom: new LowTom(context),
                hitom: new HiTom(context)
            };

            return drumKit;
        };
    });
})();
