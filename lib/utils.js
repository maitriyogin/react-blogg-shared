'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = undefined;

var _immutable = require('immutable');

var utils = exports.utils = {
  getIndex: function getIndex(list, id) {
    id = parseInt(id);
    return list.findIndex(function (val) {
      return val.get('_id') == id;
    });
  },
  getItem: function getItem(state, listName, id) {
    var list = state.get(listName);
    if (list == null) {
      return;
    }
    id = parseInt(id);
    var i = utils.getIndex(list, id);
    return list.get(i);
  },
  filterList: function filterList(state, listName, fkName, fkId) {
    if (state != null && listName != null && fkName != null) {
      fkId = parseInt(fkId);

      var list = state.get(listName);
      if (list == null) {
        return _immutable.List.of();
      }
      list = list.filter(function (item) {
        return item.get(fkName) == fkId;
      });

      return list;
    } else {
      return _immutable.List.of();
    }
  },
  updateItem: function updateItem(list, item, id) {
    var i = utils.getIndex(list, id);
    return list.set(i, item);
  }
};