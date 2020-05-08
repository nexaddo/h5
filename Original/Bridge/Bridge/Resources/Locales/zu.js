Bridge.merge(new System.Globalization.CultureInfo("zu", true), {
    englishName: "isiZulu",
    nativeName: "isiZulu",

    numberFormat: Bridge.merge(new System.Globalization.NumberFormatInfo(), {
        nanSymbol: "NaN",
        negativeSign: "-",
        positiveSign: "+",
        negativeInfinitySymbol: "-∞",
        positiveInfinitySymbol: "∞",
        percentSymbol: "%",
        percentGroupSizes: [3],
        percentDecimalDigits: 2,
        percentDecimalSeparator: ".",
        percentGroupSeparator: ",",
        percentPositivePattern: 1,
        percentNegativePattern: 1,
        currencySymbol: "R",
        currencyGroupSizes: [3],
        currencyDecimalDigits: 2,
        currencyDecimalSeparator: ".",
        currencyGroupSeparator: ",",
        currencyNegativePattern: 1,
        currencyPositivePattern: 0,
        numberGroupSizes: [3],
        numberDecimalDigits: 2,
        numberDecimalSeparator: ".",
        numberGroupSeparator: ",",
        numberNegativePattern: 1
    }),

    dateTimeFormat: Bridge.merge(new System.Globalization.DateTimeFormatInfo(), {
        abbreviatedDayNames: ["Son","Mso","Bil","Tha","Sin","Hla","Mgq"],
        abbreviatedMonthGenitiveNames: ["Jan","Feb","Mas","Eph","Mey","Jun","Jul","Aga","Sep","Okt","Nov","Dis",""],
        abbreviatedMonthNames: ["Jan","Feb","Mas","Eph","Mey","Jun","Jul","Aga","Sep","Okt","Nov","Dis",""],
        amDesignator: "AM",
        dateSeparator: "/",
        dayNames: ["ISonto","UMsombuluko","ULwesibili","ULwesithathu","ULwesine","ULwesihlanu","UMgqibelo"],
        firstDayOfWeek: 0,
        fullDateTimePattern: "dddd, MMMM d, yyyy HH:mm:ss",
        longDatePattern: "dddd, MMMM d, yyyy",
        longTimePattern: "HH:mm:ss",
        monthDayPattern: "MMMM d",
        monthGenitiveNames: ["UMasingana","Februwari","Mashi","Ephreli","Meyi","Juni","Julayi","Agasti","Septhemba","Okthoba","Novemba","Disemba",""],
        monthNames: ["Januwari","Februwari","Mashi","Ephreli","Meyi","Juni","Julayi","Agasti","Septhemba","Okthoba","Novemba","Disemba",""],
        pmDesignator: "PM",
        rfc1123: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
        shortDatePattern: "M/d/yyyy",
        shortestDayNames: ["Son","Mso","Bil","Tha","Sin","Hla","Mgq"],
        shortTimePattern: "HH:mm",
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
        sortableDateTimePattern1: "yyyy'-'MM'-'dd",
        timeSeparator: ":",
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
        yearMonthPattern: "MMMM yyyy",
        roundtripFormat: "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffzzz"
    }),

    TextInfo: Bridge.merge(new System.Globalization.TextInfo(), {
        ANSICodePage: 1252,
        CultureName: "zu-ZA",
        EBCDICCodePage: 500,
        IsRightToLeft: false,
        LCID: 1077,
        listSeparator: ";",
        MacCodePage: 10000,
        OEMCodePage: 850,
        IsReadOnly: true
    })
});