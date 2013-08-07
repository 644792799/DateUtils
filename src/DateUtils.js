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
        shortcutsRe = /([ymdhns])/gi,
        shortcutsRe2 = /([ymdhns]+)/gi,
        defaultMask = "fr";

    DateUtils = {
        strToDate: function (str, mask) {
            var obj = _strToObject(str, mask);
            return _objectToDate(obj);
        },

        strToObj: function (str, mask) {
            return _strToObject(str, mask);
        },

        dateToStr: function (date, mask) {
            return mask.toLowerCase()
                .replace(/y+/g, _zeroFill(date.getFullYear()))
                .replace(/m+/g, _zeroFill(date.getMonth() - 1))
                .replace(/d+/g, _zeroFill(date.getDate()))
                .replace(/h+/g, _zeroFill(date.getHours()))
                .replace(/n+/g, _zeroFill(date.getMinutes()))
                .replace(/s+/g, _zeroFill(date.getSeconds()));
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
            mask = _getMask(mask);
            var o = _strToObject(str, mask);
            return this.validate(o.y, o.m, o.d, o.h, o.n, o.s);
        },

        setDefaultMask: function (mask) {
            defaultMask = masks[mask] || mask;
        },

        getDefaultMask: function () {
            return masks[defaultMask] || defaultMask;
        },

        getMask: function (mask) {
            return _getMask(mask);
        },

        setMask: function (key, mask) {
            masks[key] = mask;
        },

        getMasks: function () {
            return masks;
        },

        setMasks: function (masksSet) {
            for (var i in masksSet) {
                if (masksSet.hasOwnProperty(i)) {
                    masks[i] = masksSet[i];
                }
            }
        }
    };


    var _getMask = function (key) {
            return key ? (masks[key] || key) : (masks[defaultMask] || masks);
        },

        _strToObject = function (str, mask) {
            var values = {};
            _getMask(mask).replace(shortcutsRe, function (a, b, index) {
                values[a] = (values[a] || "") + str.charAt(index);
            });
            return values;
        },

        _objectToDate = function (o) {
            return _dateCreate(o.y || 0, o.m || 0, o.d || 0, o.h || 0, o.n || 0, o.s || 0);
        },

        _zeroFill = function (num, len) {
            len = len || 2;
            return new Array(Math.abs(len - (num + "").length + 1)).join('0') + num;
        },

        _dateCreate = function (y, m, d, h, n, s) {
            return new Date(y, m - 1, d, h, n, s);
        };

})();
