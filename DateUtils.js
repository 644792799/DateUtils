/**
 * Created with JetBrains PhpStorm.
 * User: arnogues
 * Date: 06/12/12
 * Time: 11:22
 *
 * DateUtils for manipulate and validate dates from date masks
 *
 * WORK IN PROGRESS (quick and dirty ideas are written)
 *
 */

(function () {
    var masks = {
            "fr":"dd/mm/yyyy",
            "en":"mm/dd/yyyy",
            "frhms":"dd-mm-yyyy hh:nn:ss",
            "enhms":"mm-dd-yyyy hh:nn:ss"
        },

        defaultMask;

    DateUtils = {
        strToDate:function (str, mask) {
            return _objectToDate(_strToObject(str, mask));
        },

        validate:function (y, m, d, h, n, s) {
            h = h || 0;
            n = n || 0;
            s = s || 0;
            with (_createDate(y, m - 1, d, h, n, s))
                return getMonth() == m - 1 && getFullYear() == y && getDate() == d && getHours() == h && getMinutes() == n;
        },

        validateFromMask:function (str, mask) {
            mask = this.mask[mask] || mask;
            if (!new RegExp(mask.replace(/[ymdhns]/gi, '\\d').replace(/\//g, '\\/')).test(str)) return false;
            with (_strToObject(str, mask))
                return this.validate(y, m, d, h, n, s);
        },

        setDefaultMask:function (mask) {
            defaultMask = masks[mask] || mask;
        },


        addMask:function (key, mask) {
            masks[key] = mask;
        },

        toStr:function (date, mask) {

        }
    };


    var _getMask = function (key) {
            return masks[key] || currentMask;
        },

        _strToObject = function (str, mask) {
            var dateArr = str.split(/\D+/),
                arr = _getMask(mask).match(/([ymdhns]+)/gi),
                values = {};
            for (var i = 0; i < arr.length; i++) {
                values[arr[i].charAt(0).toLowerCase()] = dateArr[i];
            }
            return values;
        },

        _objectToDate = function (obj) {
            with (obj)
                return _createDate(y, m, d, h, n, s);
        },

        _createDateArr = function (arr) {
            createDate.apply(this, arr);
        },
        _createDate = function (y, m, d, h, n, s) {
            return new Date(y, m, d, h, n, d);
        };

})();
