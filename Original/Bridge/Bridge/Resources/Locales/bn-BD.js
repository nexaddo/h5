Bridge.merge(new System.Globalization.CultureInfo("bn-BD", true), {
    englishName: "Bangla (Bangladesh)",
    nativeName: "বাংলা (বাংলাদেশ)",

    numberFormat: Bridge.merge(new System.Globalization.NumberFormatInfo(), {
        nanSymbol: "NaN",
        negativeSign: "-",
        positiveSign: "+",
        negativeInfinitySymbol: "-∞",
        positiveInfinitySymbol: "∞",
        percentSymbol: "%",
        percentGroupSizes: [3,2],
        percentDecimalDigits: 2,
        percentDecimalSeparator: ".",
        percentGroupSeparator: ",",
        percentPositivePattern: 1,
        percentNegativePattern: 1,
        currencySymbol: "৳",
        currencyGroupSizes: [3,2],
        currencyDecimalDigits: 2,
        currencyDecimalSeparator: ".",
        currencyGroupSeparator: ",",
        currencyNegativePattern: 5,
        currencyPositivePattern: 1,
        numberGroupSizes: [3,2],
        numberDecimalDigits: 2,
        numberDecimalSeparator: ".",
        numberGroupSeparator: ",",
        numberNegativePattern: 1
    }),

    dateTimeFormat: Bridge.merge(new System.Globalization.DateTimeFormatInfo(), {
        abbreviatedDayNames: ["রবি.","সোম.","মঙ্গল.","বুধ.","বৃহ.","শুক্র.","শনি."],
        abbreviatedMonthGenitiveNames: ["জানু.","ফেব্রু.","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগ.","সেপ্টে.","অক্টো.","নভে.","ডিসে.",""],
        abbreviatedMonthNames: ["জানু.","ফেব্রু.","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগ.","সেপ্টে.","অক্টো.","নভে.","ডিসে.",""],
        amDesignator: "পুর্বাহ্ন",
        dateSeparator: "-",
        dayNames: ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
        firstDayOfWeek: 0,
        fullDateTimePattern: "dd MMMM yyyy HH.mm.ss",
        longDatePattern: "dd MMMM yyyy",
        longTimePattern: "HH.mm.ss",
        monthDayPattern: "dd MMMM",
        monthGenitiveNames: ["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",""],
        monthNames: ["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",""],
        pmDesignator: "অপরাহ্ন",
        rfc1123: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
        shortDatePattern: "dd-MM-yy",
        shortestDayNames: ["র","সো","ম","বু","বৃ","শু","শ"],
        shortTimePattern: "HH.mm",
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
        sortableDateTimePattern1: "yyyy'-'MM'-'dd",
        timeSeparator: ".",
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
        yearMonthPattern: "MMMM, yyyy",
        roundtripFormat: "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffzzz"
    }),

    TextInfo: Bridge.merge(new System.Globalization.TextInfo(), {
        ANSICodePage: 0,
        CultureName: "bn-BD",
        EBCDICCodePage: 500,
        IsRightToLeft: false,
        LCID: 2117,
        listSeparator: ",",
        MacCodePage: 2,
        OEMCodePage: 1,
        IsReadOnly: true
    })
});