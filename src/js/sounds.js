/* Kick */

function Kick(context) {
	var _this = this;

	_this.context = context;
};

Kick.prototype.setup = function() {
	var _this = this;

	_this.osc = _this.context.createOscillator();
	_this.gain = _this.context.createGain();
	_this.osc.connect(_this.gain);
	_this.gain.connect(_this.context.destination)
};

Kick.prototype.trigger = function(time) {
	var _this = this;

	_this.setup();

	_this.osc.frequency.setValueAtTime(200, time);
	_this.gain.gain.setValueAtTime(2, time);

	_this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
	_this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

	_this.osc.start(time);

	_this.osc.stop(time + 0.5);
};

/* Snare */

function Snare(context) {
	var _this = this;

	_this.context = context;
};

Snare.prototype.noiseBuffer = function() {
	var _this = this;

	var bufferSize = _this.context.sampleRate;
	var buffer = _this.context.createBuffer(1, bufferSize, _this.context.sampleRate);
	var output = buffer.getChannelData(0);

	for (var i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	return buffer;
};

Snare.prototype.setup = function() {
	var _this = this;

	_this.noise = _this.context.createBufferSource();
	_this.noise.buffer = _this.noiseBuffer();

	var noiseFilter = _this.context.createBiquadFilter();

	noiseFilter.type = 'highpass';
	noiseFilter.frequency.value = 1000;
	_this.noise.connect(noiseFilter);

	_this.noiseEnvelope = _this.context.createGain();
	noiseFilter.connect(_this.noiseEnvelope);

	_this.noiseEnvelope.connect(_this.context.destination);

	_this.osc = _this.context.createOscillator();
	_this.osc.type = 'triangle';

	_this.oscEnvelope = _this.context.createGain();
	_this.osc.connect(_this.oscEnvelope);
	_this.oscEnvelope.connect(_this.context.destination);
};

Snare.prototype.trigger = function(time) {
	var _this = this;

	_this.setup();

	_this.noiseEnvelope.gain.setValueAtTime(1, time);
	_this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
	_this.noise.start(time)

	_this.osc.frequency.setValueAtTime(100, time);
	_this.oscEnvelope.gain.setValueAtTime(0.7, time);
	_this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
	_this.osc.start(time)

	_this.osc.stop(time + 0.2);
	_this.noise.stop(time + 0.2);
};

/* Closed HiHat */

function HiHat(context) {
	var _this = this;

	_this.context = context;
};

HiHat.prototype.noiseBuffer = function() {
	var _this = this;

	var bufferSize = _this.context.sampleRate;
	var buffer = _this.context.createBuffer(1, bufferSize, _this.context.sampleRate);
	var output = buffer.getChannelData(0);

	for (var i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 7 - 1;
	}

	return buffer;
};

HiHat.prototype.setup = function() {
	var _this = this;

	_this.noise = _this.context.createBufferSource();
	_this.noise.buffer = _this.noiseBuffer();

	var noiseFilter = _this.context.createBiquadFilter();

	noiseFilter.type = 'highpass';
	noiseFilter.frequency.value = 15000;
	_this.noise.connect(noiseFilter);

	_this.noiseEnvelope = _this.context.createGain();
	noiseFilter.connect(_this.noiseEnvelope);

	_this.noiseEnvelope.connect(_this.context.destination);

	_this.osc = _this.context.createOscillator();
	_this.osc.type = 'sine';

	_this.oscEnvelope = _this.context.createGain();
	_this.osc.connect(_this.oscEnvelope);
	_this.oscEnvelope.connect(_this.context.destination);
};

HiHat.prototype.trigger = function(time) {
	var _this = this;

	_this.setup();

	_this.noiseEnvelope.gain.setValueAtTime(1, time);
	_this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
	_this.noise.start(time)

	_this.osc.frequency.setValueAtTime(500, time);
	_this.oscEnvelope.gain.setValueAtTime(0.7, time);
	_this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
	_this.osc.start(time)

	_this.osc.stop(time + 0.2);
	_this.noise.stop(time + 0.2);
};

/* Open HiHat */

function OpenHat(context) {
	var _this = this;

	_this.context = context;
};

OpenHat.prototype.noiseBuffer = function() {
	var _this = this;

	var bufferSize = _this.context.sampleRate;
	var buffer = _this.context.createBuffer(1, bufferSize, _this.context.sampleRate);
	var output = buffer.getChannelData(0);

	for (var i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 7 - 1;
	}

	return buffer;
};

OpenHat.prototype.setup = function() {
	var _this = this;

	_this.noise = _this.context.createBufferSource();
	_this.noise.buffer = _this.noiseBuffer();

	var noiseFilter = _this.context.createBiquadFilter();

	noiseFilter.type = 'highpass';
	noiseFilter.frequency.value = 15000;
	_this.noise.connect(noiseFilter);

	_this.noiseEnvelope = _this.context.createGain();
	noiseFilter.connect(_this.noiseEnvelope);

	_this.noiseEnvelope.connect(_this.context.destination);

	_this.osc = _this.context.createOscillator();
	_this.osc.type = 'sine';

	_this.oscEnvelope = _this.context.createGain();
	_this.osc.connect(_this.oscEnvelope);
	_this.oscEnvelope.connect(_this.context.destination);
};

OpenHat.prototype.trigger = function(time) {
	var _this = this;

	_this.setup();

	_this.noiseEnvelope.gain.setValueAtTime(1, time);
	_this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
	_this.noise.start(time)

	_this.osc.frequency.setValueAtTime(500, time);
	_this.oscEnvelope.gain.setValueAtTime(0.7, time);
	_this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
	_this.osc.start(time)

	_this.osc.stop(time + 0.2);
	_this.noise.stop(time + 0.2);
};