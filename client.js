'use strict';

var Promise = require('es6-promise').Promise;
var request = require('superagent');

function Client(options) {
    this.options = options || {};
}

module.exports = Client;

Client.prototype.get = function (path, options) {
    return this._send({ method: 'get', path: path, options: options });
};

Client.prototype.post = function (path, data, options) {
    return this._send({ method: 'post', path: path, data: data, options: options });
};

Client.prototype.put = function (path, data, options) {
    return this._send({ method: 'put', path: path, data: data, options: options });
};

Client.prototype.delete = function (path, options) {
    return this._send({ method: 'del', path: path, options: options });
};

Client.prototype.upload = function (container, file, options) {
    var req = request.post(this._makeUrl('/containers/'+container+'/upload'));
    this._configure(req, options || {});
    req.attach('file', file, file.name);
    return this._end(req).then(function (result) {
        return result.file;
    });
};


Client.prototype._send = function (options) {
    var options = options || {};
    var req = request[options.method](this._makeUrl(options.path));
    this._configure(req, options.options);
    req.send(options.data);
    return this._end(req);
};

Client.prototype._makeUrl = function (path) {
    return this.options.apiUrl+path;
};

Client.prototype._configure = function (req, options) {
    var options = options || {};
    req.set('Accept', 'application/json');
    req.set('Accept-Language', 'fr');
    req.query(options.query);
    if (options.token) req.set('Authorization', options.token.id);
    if (options.onProgress) req.on('progress', function (e) { options.onProgress({ percent: e.percent }); });
};

Client.prototype._end = function (req) {
    return new Promise(function (resolve, reject) {
        req.end(function (err, res) {
            if (res && res.ok) resolve(res.body);
            else reject(err);
        });
    });
};
