/**
 * User: arnogues
 */


(function () {
    var currentLang = 'fr',
        DU = DateUtils,
        i18n = {
            fr: {
                day: 'dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi',
                month: 'janvier,février,mars,avril,mai,juin,juillet,aout,septembre,octobre,novembre,décembre'
            },
            en: {
                day: 'sunday,monday,tuesday,wednesday,thursday,friday,saturday',
                month: 'january,february,march,april,may,june,july,august,september,october,november,december'
            }
        };

    DU.setMasks({
        "fr-long": "%d dd %m yyyy",
        "en-long": "%d dd %m yyyy"
    });

    DU._dateToStrCore = DU.dateToStr;

    DU.dateToStr = function (date, mask, langCode) {
        mask = DU.getMask(mask);
        var lang = i18n[DU.getLangFromMask(mask, langCode)];
        return DU._dateToStrCore(date, mask.replace(/(ddd|mmm)/gi, function(a) {return a.toUpperCase()}), true)
            .replace(/DDD/g, lang.day.split(',')[date.getDay()])
            .replace(/MMM/g, lang.month.split(',')[date.getMonth()]);
    };

    DU.setLang = function (lang) {
        currentLang = lang;
    };

    DU.getLang = function () {
        return currentLang;
    };

    DU.getLangFromMask = function (mask, lang) {
        if (lang) return lang;
        var match = mask.match(/(\w+)\-/);
        if (match && i18n[match[0]]) {
            return match[0];
        }
        return currentLang;
    };
})();
