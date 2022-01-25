class Secca {
    static loadArray(strct, callback) {
        let parts = {};
        for (var y = 0; y < strct.length; ++y) {
            for (var x = 0; x < strct[0].length; ++x) {
                let part = {
                    n:  false,
                    ne: false,
                    e:  false,
                    se: false,
                    s:  false,
                    sw: false,
                    w:  false,
                    nw: false
                };
                if (callback(strct, y, x)) {
                    if (callback(strct, y - 1, x))
                        part.n = true;
                    if (callback(strct, y - 1, x + 1))
                        part.ne = true;
                    if (callback(strct, y, x + 1))
                        part.e = true;
                    if (callback(strct, y + 1, x + 1))
                        part.se = true;
                    if (callback(strct, y + 1, x))
                        part.s = true;
                    if (callback(strct, y + 1, x - 1))
                        part.sw = true;
                    if (callback(strct, y, x - 1))
                        part.w = true;
                    if (callback(strct, y - 1, x - 1))
                        part.nw = true;
                    parts[`${x}_${y}`] = part;
                }
            }
        }
        return parts;
    }
}

module.exports = {
    seccaIsLoaded : "secca loaded!",
    Secca
};