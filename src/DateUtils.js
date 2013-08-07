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
            "fr": "dd/mm/yyyy",
            "en": "mm/dd/yyyy",
            "frhms": "dd-mm-yyyy hh:nn:ss",
            "enhms": "mm-dd-yyyy hh:nn:ss"
        },

        defaultMask = "fr";

    DateUtils = {
        strToDate: function (str, mask) {
            var obj = _strToObject(str, mask);
            return _objectToDate(obj);
        },

        validate: function (y, m, d, h, n, s) {
            h = h || 0;
            n = n || 0;
            s = s || 0;
            var c = _dateCreate(y, m, d, h, n, s);
            return c.getMonth() == m - 1 && c.getFullYear() == y && c.getDate() == d
                && c.getHours() == h && c.getMinutes() == n;
        },

        validateFromMask: function (str, mask) {
            mask = masks[mask] || mask;
            var dateRegExp = new RegExp(mask.replace(/[ymdhns]/gi, '\\d').replace(/\//g, '\\/'));
            if (!dateRegExp.test(str)) return false;
            var o = _strToObject(str, mask);
            return this.validate(o.y, o.m, o.d, o.h, o.n, o.s);
        },

        setDefaultMask: function (mask) {
            defaultMask = masks[mask] || mask;
        },

        setMask: function (key, mask) {
            masks[key] = mask;
        },

        getMask: function (key) {
            return masks[key];
        },

        setMasks: function (maps) {
            for (var i in maps) {
                if (maps.hasOwnProperty(i)) {
                    masks[i] = maps[i];
                }
            }
        },

        getMasks: function () {
            return masks;
        }

    };


    var _getMask = function (key) {
            return key ? (masks[key] || key) : (masks[defaultMask] || masks);
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

        _objectToDate = function (o) {
            return _dateCreate(o.y || 0, o.m || 0, o.d || 0, o.h || 0, o.n || 0, o.s || 0);
        },

        _dateCreate = function (y, m, d, h, n, s) {
            return new Date(y, m - 1, d, h, n, s);
        };

})();
