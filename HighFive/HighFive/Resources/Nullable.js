    var nullable = {
        hasValue: HighFive.hasValue,

        getValue: function (obj) {
            obj = HighFive.unbox(obj, true);

            if (!HighFive.hasValue(obj)) {
                throw new System.InvalidOperationException.$ctor1("Nullable instance doesn't have a value.");
            }

            return obj;
        },

        getValueOrDefault: function (obj, defValue) {
            return HighFive.hasValue(obj) ? obj : defValue;
        },

        add: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a + b : null;
        },

        band: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a & b : null;
        },

        bor: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a | b : null;
        },

        and: function (a, b) {
            if (a === true && b === true) {
                return true;
            } else if (a === false || b === false) {
                return false;
            }

            return null;
        },

        or: function (a, b) {
            if (a === true || b === true) {
                return true;
            } else if (a === false && b === false) {
                return false;
            }

            return null;
        },

        div: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a / b : null;
        },

        eq: function (a, b) {
            return !HighFive.hasValue(a) ? !HighFive.hasValue(b) : (a === b);
        },

        equals: function (a, b, fn) {
            return !HighFive.hasValue(a) ? !HighFive.hasValue(b) : (fn ? fn(a, b) : HighFive.equals(a, b));
        },

        toString: function (a, fn) {
            return !HighFive.hasValue(a) ? "" : (fn ? fn(a) : a.toString());
        },

        toStringFn: function (fn) {
            return function (v) {
                return System.Nullable.toString(v, fn);
            };
        },

        getHashCode: function (a, fn) {
            return !HighFive.hasValue(a) ? 0 : (fn ? fn(a) : HighFive.getHashCode(a));
        },

        getHashCodeFn: function (fn) {
            return function (v) {
                return System.Nullable.getHashCode(v, fn);
            };
        },

        xor: function (a, b) {
            if (HighFive.hasValue$1(a, b)) {
                if (HighFive.isBoolean(a) && HighFive.isBoolean(b)) {
                    return a != b;
                }

                return a ^ b;
            }

            return null;
        },

        gt: function (a, b) {
            return HighFive.hasValue$1(a, b) && a > b;
        },

        gte: function (a, b) {
            return HighFive.hasValue$1(a, b) && a >= b;
        },

        neq: function (a, b) {
            return !HighFive.hasValue(a) ? HighFive.hasValue(b) : (a !== b);
        },

        lt: function (a, b) {
            return HighFive.hasValue$1(a, b) && a < b;
        },

        lte: function (a, b) {
            return HighFive.hasValue$1(a, b) && a <= b;
        },

        mod: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a % b : null;
        },

        mul: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a * b : null;
        },

        imul: function (a, b) {
            return HighFive.hasValue$1(a, b) ? HighFive.Int.mul(a, b) : null;
        },

        sl: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a << b : null;
        },

        sr: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a >> b : null;
        },

        srr: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a >>> b : null;
        },

        sub: function (a, b) {
            return HighFive.hasValue$1(a, b) ? a - b : null;
        },

        bnot: function (a) {
            return HighFive.hasValue(a) ? ~a : null;
        },

        neg: function (a) {
            return HighFive.hasValue(a) ? -a : null;
        },

        not: function (a) {
            return HighFive.hasValue(a) ? !a : null;
        },

        pos: function (a) {
            return HighFive.hasValue(a) ? +a : null;
        },

        lift: function () {
            for (var i = 1; i < arguments.length; i++) {
                if (!HighFive.hasValue(arguments[i])) {
                    return null;
                }
            }

            if (arguments[0] == null) {
                return null;
            }

            if (arguments[0].apply == undefined) {
                return arguments[0];
            }

            return arguments[0].apply(null, Array.prototype.slice.call(arguments, 1));
        },

        lift1: function (f, o) {
            return HighFive.hasValue(o) ? (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : o[f].apply(o, Array.prototype.slice.call(arguments, 2))) : null;
        },

        lift2: function (f, a, b) {
            return HighFive.hasValue$1(a, b) ? (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : a[f].apply(a, Array.prototype.slice.call(arguments, 2))) : null;
        },

        liftcmp: function (f, a, b) {
            return HighFive.hasValue$1(a, b) ? (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : a[f].apply(a, Array.prototype.slice.call(arguments, 2))) : false;
        },

        lifteq: function (f, a, b) {
            var va = HighFive.hasValue(a),
                vb = HighFive.hasValue(b);

            return (!va && !vb) || (va && vb && (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : a[f].apply(a, Array.prototype.slice.call(arguments, 2))));
        },

        liftne: function (f, a, b) {
            var va = HighFive.hasValue(a),
                vb = HighFive.hasValue(b);

            return (va !== vb) || (va && (typeof f === "function" ? f.apply(null, Array.prototype.slice.call(arguments, 1)) : a[f].apply(a, Array.prototype.slice.call(arguments, 2))));
        },

        getUnderlyingType: function (nullableType) {
            if (!nullableType) {
                throw new System.ArgumentNullException.$ctor1("nullableType");
            }

            if (HighFive.Reflection.isGenericType(nullableType) &&
                !HighFive.Reflection.isGenericTypeDefinition(nullableType)) {
                var genericType = HighFive.Reflection.getGenericTypeDefinition(nullableType);

                if (genericType === System.Nullable$1) {
                    return HighFive.Reflection.getGenericArguments(nullableType)[0];
                }
            }

            return null;
        },

        compare: function (n1, n2) {
            return System.Collections.Generic.Comparer$1.$default.compare(n1, n2);
        }
    };

    System.Nullable = nullable;

    HighFive.define("System.Nullable$1", function (T) {
        return {
            $kind: "struct",

            statics: {
                $nullable: true,
                $nullableType: T,
                getDefaultValue: function () {
                    return null;
                },

                $is: function (obj) {
                    return HighFive.is(obj, T);
                }
            }
        };
    });