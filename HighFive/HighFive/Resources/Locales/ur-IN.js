HighFive.merge(new System.Globalization.CultureInfo("ur-IN", true), {
    englishName: "Urdu (India)",
    nativeName: "اردو (بھارت)",

    numberFormat: HighFive.merge(new System.Globalization.NumberFormatInfo(), {
        nanSymbol: "NaN",
        negativeSign: "-",
        positiveSign: "+",
        negativeInfinitySymbol: "-∞",
        positiveInfinitySymbol: "∞",
        percentSymbol: "٪",
        percentGroupSizes: [3],
        percentDecimalDigits: 2,
        percentDecimalSeparator: ".",
        percentGroupSeparator: ",",
        percentPositivePattern: 1,
        percentNegativePattern: 1,
        currencySymbol: "₹",
        currencyGroupSizes: [3,2],
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

    dateTimeFormat: HighFive.merge(new System.Globalization.DateTimeFormatInfo(), {
        abbreviatedDayNames: ["اتوار","پیر","منگل","بدھ","جمعرات","جمعہ","ہفتہ"],
        abbreviatedMonthGenitiveNames: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر",""],
        abbreviatedMonthNames: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر",""],
        amDesignator: "دن",
        dateSeparator: "/",
        dayNames: ["اتوار","پیر","منگل","بدھ","جمعرات","جمعہ","ہفتہ"],
        firstDayOfWeek: 1,
        fullDateTimePattern: "dddd, d MMMM, yyyy h:mm:ss tt",
        longDatePattern: "dddd, d MMMM, yyyy",
        longTimePattern: "h:mm:ss tt",
        monthDayPattern: "d MMMM",
        monthGenitiveNames: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر",""],
        monthNames: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر",""],
        pmDesignator: "رات",
        rfc1123: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
        shortDatePattern: "d/M/yy",
        shortestDayNames: ["ا","پ","م","ب","ج","ج","ہ"],
        shortTimePattern: "h:mm tt",
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
        sortableDateTimePattern1: "yyyy'-'MM'-'dd",
        timeSeparator: ":",
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
        yearMonthPattern: "MMMM yyyy",
        roundtripFormat: "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffzzz"
    }),

    TextInfo: HighFive.merge(new System.Globalization.TextInfo(), {
        ANSICodePage: 1256,
        CultureName: "ur-IN",
        EBCDICCodePage: 500,
        IsRightToLeft: true,
        LCID: 2080,
        listSeparator: ";",
        MacCodePage: 2,
        OEMCodePage: 720,
        IsReadOnly: true
    })
});