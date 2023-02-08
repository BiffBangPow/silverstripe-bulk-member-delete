"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var BulkDelete = /*#__PURE__*/function () {
  function BulkDelete() {
    _classCallCheck(this, BulkDelete);
    this.actionButton = document.getElementById('bbp-bulkdelete-action');
    this.messageDiv = document.getElementById('bbp-bulkdelete-response');
    this.security = document.getElementById('bbp-bulkdelete-secID');
    this.memberList = document.getElementById('bbp-bulkdelete-members');
  }
  _createClass(BulkDelete, [{
    key: "initButtonActions",
    value: function initButtonActions() {
      var _this = this;
      this.actionButton.addEventListener('click', function () {
        _this.submitData();
      });
    }
  }, {
    key: "processResponse",
    value: function processResponse(res, classInstance) {
      if (res.target.status != 200) {
        classInstance.messageDiv.innerHTML('<p>Sorry, there was a problem.  Please try again');
      } else {
        var resData = JSON.parse(res.target.responseText);
        if (resData.status === 1) {
          var message = '<p><br><strong>Deleted ' + resData.message.deleted + ' accounts</strong></p>';
          if (resData.message.invalid.length > 0) {
            message += '<p><strong>Invalid addresses:</strong></p><ul>';
            resData.message.invalid.forEach(function (address) {
              message += '<li>' + address + '</li>';
            });
            message += '</ul>';
          }
          if (resData.message.notfound.length > 0) {
            message += '<p><strong>Not found on the system:</strong></p>';
            resData.message.notfound.forEach(function (address) {
              message += '<li>' + address + '</li>';
            });
            message += '</ul>';
          }
          message += '<p><br><strong>Please refresh the page to update the member list</strong></p>';
          classInstance.memberList.value = '';
          classInstance.memberList.classList.remove('changed');
          document.getElementById('Form_EditForm').classList.remove('changed');
          classInstance.messageDiv.innerHTML = message;
        } else {
          classInstance.messageDiv.innerHTML = resData.message;
        }
      }
      classInstance.actionButton.removeAttribute('disabled');
    }
  }, {
    key: "processError",
    value: function processError(classInstance) {
      classInstance.messageDiv.innerHTML('<p>Sorry, there was a problem.  Please refresh the page and try again.</p>');
      classInstance.actionButton.removeAttribute('disabled');
    }
  }, {
    key: "submitData",
    value: function submitData() {
      var _this2 = this;
      var processURL = this.actionButton.dataset.url;
      var XHR = new XMLHttpRequest();
      var FD = new FormData();
      var BD = this;
      FD.append('members', this.memberList.value);
      FD.append('security', this.security.value);
      this.actionButton.setAttribute('disabled', 'disabled');
      this.messageDiv.innerHTML = '<p>Processing..</p>';
      XHR.open('POST', processURL);
      XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      XHR.addEventListener("error", function () {
        _this2.processError(BD);
      });
      XHR.addEventListener("load", function (res) {
        BD.processResponse(res, BD);
      });
      XHR.send(FD);
    }
  }]);
  return BulkDelete;
}();
document.addEventListener("DOMContentLoaded", function () {
  var bulkDelete = new BulkDelete();
  bulkDelete.initButtonActions();
});
//# sourceMappingURL=../../dist/javascript/maps/bulkdelete.js.map
