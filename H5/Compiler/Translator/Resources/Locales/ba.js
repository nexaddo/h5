H5.merge(new System.Globalization.CultureInfo("ba", true), {
    englishName: "Bashkir",
    nativeName: "Башҡорт",

    numberFormat: H5.merge(new System.Globalization.NumberFormatInfo(), {
        nanSymbol: "NaN",
        negativeSign: "-",
        positiveSign: "+",
        negativeInfinitySymbol: "-∞",
        positiveInfinitySymbol: "∞",
        percentSymbol: "%",
        percentGroupSizes: [3],
        percentDecimalDigits: 2,
        percentDecimalSeparator: ",",
        percentGroupSeparator: " ",
        percentPositivePattern: 1,
        percentNegativePattern: 1,
        currencySymbol: "₽",
        currencyGroupSizes: [3],
        currencyDecimalDigits: 2,
        currencyDecimalSeparator: ",",
        currencyGroupSeparator: " ",
        currencyNegativePattern: 8,
        currencyPositivePattern: 3,
        numberGroupSizes: [3],
        numberDecimalDigits: 2,
        numberDecimalSeparator: ",",
        numberGroupSeparator: " ",
        numberNegativePattern: 1
    }),

    dateTimeFormat: H5.merge(new System.Globalization.DateTimeFormatInfo(), {
        abbreviatedDayNames: ["Йш","Дш","Шш","Шр","Кс","Йм","Шб"],
        abbreviatedMonthGenitiveNames: ["ғин","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""],
        abbreviatedMonthNames: ["ғин","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""],
        amDesignator: "",
        dateSeparator: ".",
        dayNames: ["Йәкшәмбе","Дүшәмбе","Шишәмбе","Шаршамбы","Кесаҙна","Йома","Шәмбе"],
        firstDayOfWeek: 1,
        fullDateTimePattern: "d MMMM yyyy 'й' H:mm:ss",
        longDatePattern: "d MMMM yyyy 'й'",
        longTimePattern: "H:mm:ss",
        monthDayPattern: "d MMMM",
        monthGenitiveNames: ["ғинуар","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь",""],
        monthNames: ["ғинуар","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь",""],
        pmDesignator: "",
        rfc1123: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
        shortDatePattern: "dd.MM.yy",
        shortestDayNames: ["Йш","Дш","Шш","Шр","Кс","Йм","Шб"],
        shortTimePattern: "H:mm",
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
        sortableDateTimePattern1: "yyyy'-'MM'-'dd",
        timeSeparator: ":",
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
        yearMonthPattern: "MMMM yyyy",
        roundtripFormat: "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffzzz"
    }),

    TextInfo: H5.merge(new System.Globalization.TextInfo(), {
        ANSICodePage: 1251,
        CultureName: "ba-RU",
        EBCDICCodePage: 20880,
        IsRightToLeft: false,
        LCID: 1133,
        listSeparator: ";",
        MacCodePage: 10007,
        OEMCodePage: 866,
        IsReadOnly: true
    })
});