HighFive.merge(new System.Globalization.CultureInfo("so-ET", true), {
    englishName: "Somali (Ethiopia)",
    nativeName: "Soomaali (Itoobiya)",

    numberFormat: HighFive.merge(new System.Globalization.NumberFormatInfo(), {
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
        currencySymbol: "Br",
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

    dateTimeFormat: HighFive.merge(new System.Globalization.DateTimeFormatInfo(), {
        abbreviatedDayNames: ["Axd","Isn","Tal","Arb","Kha","Jim","Sab"],
        abbreviatedMonthGenitiveNames: ["Kob","Lab","Sad","Afr","Sha","Lix","Tod","Sid","Sag","Tob","KIT","LIT",""],
        abbreviatedMonthNames: ["Kob","Lab","Sad","Afr","Sha","Lix","Tod","Sid","Sag","Tob","KIT","LIT",""],
        amDesignator: "sn.",
        dateSeparator: "/",
        dayNames: ["Axad","Isniin","Talaado","Arbaco","Khamiis","Jimco","Sabti"],
        firstDayOfWeek: 0,
        fullDateTimePattern: "dddd, MMMM dd, yyyy h:mm:ss tt",
        longDatePattern: "dddd, MMMM dd, yyyy",
        longTimePattern: "h:mm:ss tt",
        monthDayPattern: "MMMM d",
        monthGenitiveNames: ["Bisha Koobaad","Bisha Labaad","Bisha Saddexaad","Bisha Afraad","Bisha Shanaad","Bisha Lixaad","Bisha Todobaad","Bisha Sideedaad","Bisha Sagaalaad","Bisha Tobnaad","Bisha Kow iyo Tobnaad","Bisha Laba iyo Tobnaad",""],
        monthNames: ["Bisha Koobaad","Bisha Labaad","Bisha Saddexaad","Bisha Afraad","Bisha Shanaad","Bisha Lixaad","Bisha Todobaad","Bisha Sideedaad","Bisha Sagaalaad","Bisha Tobnaad","Bisha Kow iyo Tobnaad","Bisha Laba iyo Tobnaad",""],
        pmDesignator: "gn.",
        rfc1123: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
        shortDatePattern: "dd/MM/yyyy",
        shortestDayNames: ["Axd","Isn","Tal","Arb","Kha","Jim","Sab"],
        shortTimePattern: "h:mm tt",
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
        sortableDateTimePattern1: "yyyy'-'MM'-'dd",
        timeSeparator: ":",
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
        yearMonthPattern: "MMMM yyyy",
        roundtripFormat: "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffzzz"
    }),

    TextInfo: HighFive.merge(new System.Globalization.TextInfo(), {
        ANSICodePage: 0,
        CultureName: "so-ET",
        EBCDICCodePage: 500,
        IsRightToLeft: false,
        LCID: 4096,
        listSeparator: ";",
        MacCodePage: 2,
        OEMCodePage: 1,
        IsReadOnly: true
    })
});