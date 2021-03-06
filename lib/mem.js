// Generated by IcedCoffeeScript 1.7.1-f
(function() {
  var Base, MemTree, createHash,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Base = require('./tree').Base;

  createHash = require('crypto').createHash;

  exports.MemTree = MemTree = (function(_super) {
    __extends(MemTree, _super);

    function MemTree() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      MemTree.__super__.constructor.apply(this, args);
      this._root = null;
      this._nodes = {};
    }

    MemTree.prototype.hash_fn = function(s) {
      var h, ret;
      h = createHash('SHA512');
      h.update(s);
      ret = h.digest().toString('hex');
      return ret;
    };

    MemTree.prototype.store_node = function(_arg, cb) {
      var key, obj, obj_s;
      key = _arg.key, obj = _arg.obj, obj_s = _arg.obj_s;
      this._nodes[key] = {
        obj: JSON.parse(obj_s),
        obj_s: obj_s
      };
      return cb(null);
    };

    MemTree.prototype.lookup_node = function(_arg, cb) {
      var err, key, ret, val;
      key = _arg.key;
      val = this._nodes[key];
      ret = val != null ? val.obj : void 0;
      err = ret != null ? null : new Error('not found');
      return cb(err, ret);
    };

    MemTree.prototype.lookup_root = function(cb) {
      return cb(null, this._root);
    };

    MemTree.prototype.commit_root = function(_arg, cb) {
      var key;
      key = _arg.key;
      this._root = key;
      return cb(null);
    };

    MemTree.prototype.get_root_node = function() {
      return this._nodes[this._root];
    };

    return MemTree;

  })(Base);

}).call(this);
