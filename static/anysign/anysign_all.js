var anysign = anysign && {
    logger: {
        openLog: !1,
        e: function (n) {
            anysign.logger.openLog && console.log("anysign error:" + n)
        },
        w: function (n) {
            anysign.logger.openLog && console.log("anysign warning:" + n)
        }
    }
};

function BigInteger(t, r, n) {
    null != t && ("number" == typeof t ? this.fromNumber(t, r, n) : null == r && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, r))
}

function nbi() {
    return new BigInteger(null)
}

function am1(t, r, n, i, e, o) {
    for (; --o >= 0;) {
        var s = r * this[t++] + n[i] + e;
        e = Math.floor(s / 67108864), n[i++] = 67108863 & s
    }
    return e
}

function am2(t, r, n, i, e, o) {
    for (var s = 32767 & r, p = r >> 15; --o >= 0;) {
        var h = 32767 & this[t],
            a = this[t++] >> 15,
            u = p * h + a * s;
        h = s * h + ((32767 & u) << 15) + n[i] + (1073741823 & e), e = (h >>> 30) + (u >>> 15) + p * a + (e >>> 30), n[i++] = 1073741823 & h
    }
    return e
}

function am3(t, r, n, i, e, o) {
    for (var s = 16383 & r, p = r >> 14; --o >= 0;) {
        var h = 16383 & this[t],
            a = this[t++] >> 14,
            u = p * h + a * s;
        h = s * h + ((16383 & u) << 14) + n[i] + e, e = (h >> 28) + (u >> 14) + p * a, n[i++] = 268435455 & h
    }
    return e
}

function int2char(t) {
    return BI_RM.charAt(t)
}

function intAt(t, r) {
    var n = BI_RC[t.charCodeAt(r)];
    return null == n ? -1 : n
}

function bnpCopyTo(t) {
    for (var r = this.t - 1; r >= 0; --r) t[r] = this[r];
    t.t = this.t, t.s = this.s
}

function bnpFromInt(t) {
    this.t = 1, this.s = 0 > t ? -1 : 0, t > 0 ? this[0] = t : -1 > t ? this[0] = t + this.DV : this.t = 0
}

function nbv(t) {
    var r = nbi();
    return r.fromInt(t), r
}

function bnpFromString(t, r) {
    var n;
    if (16 == r) n = 4;
    else if (8 == r) n = 3;
    else if (256 == r) n = 8;
    else if (2 == r) n = 1;
    else if (32 == r) n = 5;
    else {
        if (4 != r) return void this.fromRadix(t, r);
        n = 2
    }
    this.t = 0, this.s = 0;
    for (var i = t.length, e = !1, o = 0; --i >= 0;) {
        var s = 8 == n ? 255 & t[i] : intAt(t, i);
        0 > s ? "-" == t.charAt(i) && (e = !0) : (e = !1, 0 == o ? this[this.t++] = s : o + n > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - o) - 1) << o, this[this.t++] = s >> this.DB - o) : this[this.t - 1] |= s << o, o += n, o >= this.DB && (o -= this.DB))
    }
    8 == n && 0 != (128 & t[0]) && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), e && BigInteger.ZERO.subTo(this, this)
}

function bnpClamp() {
    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
}

function bnToString(t) {
    if (this.s < 0) return "-" + this.negate().toString(t);
    var r;
    if (16 == t) r = 4;
    else if (8 == t) r = 3;
    else if (2 == t) r = 1;
    else if (32 == t) r = 5;
    else {
        if (4 != t) return this.toRadix(t);
        r = 2
    }
    var n, i = (1 << r) - 1,
        e = !1,
        o = "",
        s = this.t,
        p = this.DB - s * this.DB % r;
    if (s-- > 0)
        for (p < this.DB && (n = this[s] >> p) > 0 && (e = !0, o = int2char(n)); s >= 0;) r > p ? (n = (this[s] & (1 << p) - 1) << r - p, n |= this[--s] >> (p += this.DB - r)) : (n = this[s] >> (p -= r) & i, 0 >= p && (p += this.DB, --s)), n > 0 && (e = !0), e && (o += int2char(n));
    return e ? o : "0"
}

function bnNegate() {
    var t = nbi();
    return BigInteger.ZERO.subTo(this, t), t
}

function bnAbs() {
    return this.s < 0 ? this.negate() : this
}

function bnCompareTo(t) {
    var r = this.s - t.s;
    if (0 != r) return r;
    var n = this.t;
    if (r = n - t.t, 0 != r) return this.s < 0 ? -r : r;
    for (; --n >= 0;)
        if (0 != (r = this[n] - t[n])) return r;
    return 0
}

function nbits(t) {
    var r, n = 1;
    return 0 != (r = t >>> 16) && (t = r, n += 16), 0 != (r = t >> 8) && (t = r, n += 8), 0 != (r = t >> 4) && (t = r, n += 4), 0 != (r = t >> 2) && (t = r, n += 2), 0 != (r = t >> 1) && (t = r, n += 1), n
}

function bnBitLength() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}

function bnpDLShiftTo(t, r) {
    var n;
    for (n = this.t - 1; n >= 0; --n) r[n + t] = this[n];
    for (n = t - 1; n >= 0; --n) r[n] = 0;
    r.t = this.t + t, r.s = this.s
}

function bnpDRShiftTo(t, r) {
    for (var n = t; n < this.t; ++n) r[n - t] = this[n];
    r.t = Math.max(this.t - t, 0), r.s = this.s
}

function bnpLShiftTo(t, r) {
    var n, i = t % this.DB,
        e = this.DB - i,
        o = (1 << e) - 1,
        s = Math.floor(t / this.DB),
        p = this.s << i & this.DM;
    for (n = this.t - 1; n >= 0; --n) r[n + s + 1] = this[n] >> e | p, p = (this[n] & o) << i;
    for (n = s - 1; n >= 0; --n) r[n] = 0;
    r[s] = p, r.t = this.t + s + 1, r.s = this.s, r.clamp()
}

function bnpRShiftTo(t, r) {
    r.s = this.s;
    var n = Math.floor(t / this.DB);
    if (n >= this.t) return void(r.t = 0);
    var i = t % this.DB,
        e = this.DB - i,
        o = (1 << i) - 1;
    r[0] = this[n] >> i;
    for (var s = n + 1; s < this.t; ++s) r[s - n - 1] |= (this[s] & o) << e, r[s - n] = this[s] >> i;
    i > 0 && (r[this.t - n - 1] |= (this.s & o) << e), r.t = this.t - n, r.clamp()
}

function bnpSubTo(t, r) {
    for (var n = 0, i = 0, e = Math.min(t.t, this.t); e > n;) i += this[n] - t[n], r[n++] = i & this.DM, i >>= this.DB;
    if (t.t < this.t) {
        for (i -= t.s; n < this.t;) i += this[n], r[n++] = i & this.DM, i >>= this.DB;
        i += this.s
    } else {
        for (i += this.s; n < t.t;) i -= t[n], r[n++] = i & this.DM, i >>= this.DB;
        i -= t.s
    }
    r.s = 0 > i ? -1 : 0, -1 > i ? r[n++] = this.DV + i : i > 0 && (r[n++] = i), r.t = n, r.clamp()
}

function bnpMultiplyTo(t, r) {
    var n = this.abs(),
        i = t.abs(),
        e = n.t;
    for (r.t = e + i.t; --e >= 0;) r[e] = 0;
    for (e = 0; e < i.t; ++e) r[e + n.t] = n.am(0, i[e], r, e, 0, n.t);
    r.s = 0, r.clamp(), this.s != t.s && BigInteger.ZERO.subTo(r, r)
}

function bnpSquareTo(t) {
    for (var r = this.abs(), n = t.t = 2 * r.t; --n >= 0;) t[n] = 0;
    for (n = 0; n < r.t - 1; ++n) {
        var i = r.am(n, r[n], t, 2 * n, 0, 1);
        (t[n + r.t] += r.am(n + 1, 2 * r[n], t, 2 * n + 1, i, r.t - n - 1)) >= r.DV && (t[n + r.t] -= r.DV, t[n + r.t + 1] = 1)
    }
    t.t > 0 && (t[t.t - 1] += r.am(n, r[n], t, 2 * n, 0, 1)), t.s = 0, t.clamp()
}

function bnpDivRemTo(t, r, n) {
    var i = t.abs();
    if (!(i.t <= 0)) {
        var e = this.abs();
        if (e.t < i.t) return null != r && r.fromInt(0), void(null != n && this.copyTo(n));
        null == n && (n = nbi());
        var o = nbi(),
            s = this.s,
            p = t.s,
            h = this.DB - nbits(i[i.t - 1]);
        h > 0 ? (i.lShiftTo(h, o), e.lShiftTo(h, n)) : (i.copyTo(o), e.copyTo(n));
        var a = o.t,
            u = o[a - 1];
        if (0 != u) {
            var g = u * (1 << this.F1) + (a > 1 ? o[a - 2] >> this.F2 : 0),
                f = this.FV / g,
                c = (1 << this.F1) / g,
                l = 1 << this.F2,
                b = n.t,
                y = b - a,
                v = null == r ? nbi() : r;
            for (o.dlShiftTo(y, v), n.compareTo(v) >= 0 && (n[n.t++] = 1, n.subTo(v, n)), BigInteger.ONE.dlShiftTo(a, v), v.subTo(o, o); o.t < a;) o[o.t++] = 0;
            for (; --y >= 0;) {
                var m = n[--b] == u ? this.DM : Math.floor(n[b] * f + (n[b - 1] + l) * c);
                if ((n[b] += o.am(0, m, n, y, 0, a)) < m)
                    for (o.dlShiftTo(y, v), n.subTo(v, n); n[b] < --m;) n.subTo(v, n)
            }
            null != r && (n.drShiftTo(a, r), s != p && BigInteger.ZERO.subTo(r, r)), n.t = a, n.clamp(), h > 0 && n.rShiftTo(h, n), 0 > s && BigInteger.ZERO.subTo(n, n)
        }
    }
}

function bnMod(t) {
    var r = nbi();
    return this.abs().divRemTo(t, null, r), this.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && t.subTo(r, r), r
}

function Classic(t) {
    this.m = t
}

function cConvert(t) {
    return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
}

function cRevert(t) {
    return t
}

function cReduce(t) {
    t.divRemTo(this.m, null, t)
}

function cMulTo(t, r, n) {
    t.multiplyTo(r, n), this.reduce(n)
}

function cSqrTo(t, r) {
    t.squareTo(r), this.reduce(r)
}

function bnpInvDigit() {
    if (this.t < 1) return 0;
    var t = this[0];
    if (0 == (1 & t)) return 0;
    var r = 3 & t;
    return r = r * (2 - (15 & t) * r) & 15, r = r * (2 - (255 & t) * r) & 255, r = r * (2 - ((65535 & t) * r & 65535)) & 65535, r = r * (2 - t * r % this.DV) % this.DV, r > 0 ? this.DV - r : -r
}

function Montgomery(t) {
    this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
}

function montConvert(t) {
    var r = nbi();
    return t.abs().dlShiftTo(this.m.t, r), r.divRemTo(this.m, null, r), t.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(r, r), r
}

function montRevert(t) {
    var r = nbi();
    return t.copyTo(r), this.reduce(r), r
}

function montReduce(t) {
    for (; t.t <= this.mt2;) t[t.t++] = 0;
    for (var r = 0; r < this.m.t; ++r) {
        var n = 32767 & t[r],
            i = n * this.mpl + ((n * this.mph + (t[r] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (n = r + this.m.t, t[n] += this.m.am(0, i, t, r, 0, this.m.t); t[n] >= t.DV;) t[n] -= t.DV, t[++n]++
    }
    t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
}

function montSqrTo(t, r) {
    t.squareTo(r), this.reduce(r)
}

function montMulTo(t, r, n) {
    t.multiplyTo(r, n), this.reduce(n)
}

function bnpIsEven() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}

function bnpExp(t, r) {
    if (t > 4294967295 || 1 > t) return BigInteger.ONE;
    var n = nbi(),
        i = nbi(),
        e = r.convert(this),
        o = nbits(t) - 1;
    for (e.copyTo(n); --o >= 0;)
        if (r.sqrTo(n, i), (t & 1 << o) > 0) r.mulTo(i, e, n);
        else {
            var s = n;
            n = i, i = s
        }
    return r.revert(n)
}

function bnModPowInt(t, r) {
    var n;
    return n = 256 > t || r.isEven() ? new Classic(r) : new Montgomery(r), this.exp(t, n)
}

function Arcfour() {
    this.i = 0, this.j = 0, this.S = new Array
}

function ARC4init(t) {
    var r, n, i;
    for (r = 0; 256 > r; ++r) this.S[r] = r;
    for (n = 0, r = 0; 256 > r; ++r) n = n + this.S[r] + t[r % t.length] & 255, i = this.S[r], this.S[r] = this.S[n], this.S[n] = i;
    this.i = 0, this.j = 0
}

function ARC4next() {
    var t;
    return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
}

function prng_newstate() {
    return new Arcfour
}

function rng_seed_int(t) {
    rng_pool[rng_pptr++] ^= 255 & t, rng_pool[rng_pptr++] ^= t >> 8 & 255, rng_pool[rng_pptr++] ^= t >> 16 & 255, rng_pool[rng_pptr++] ^= t >> 24 & 255, rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}

function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}

function rng_get_byte() {
    if (null == rng_state) {
        for (rng_seed_time(), rng_state = prng_newstate(), rng_state.init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}

function rng_get_bytes(t) {
    var r;
    for (r = 0; r < t.length; ++r) t[r] = rng_get_byte()
}

function SecureRandom() {}

function parseBigInt(t, r) {
    return new BigInteger(t, r)
}

function linebrk(t, r) {
    for (var n = "", i = 0; i + r < t.length;) n += t.substring(i, i + r) + "\n", i += r;
    return n + t.substring(i, t.length)
}

function byte2Hex(t) {
    return 16 > t ? "0" + t.toString(16) : t.toString(16)
}

function pkcs1pad2(t, r) {
    if (r < t.length + 11) return alert("Message too long for RSA"), null;
    for (var n = new Array, i = t.length - 1; i >= 0 && r > 0;) {
        var e = t.charCodeAt(i--);
        128 > e ? n[--r] = e : e > 127 && 2048 > e ? (n[--r] = 63 & e | 128, n[--r] = e >> 6 | 192) : (n[--r] = 63 & e | 128, n[--r] = e >> 6 & 63 | 128, n[--r] = e >> 12 | 224)
    }
    n[--r] = 0;
    for (var o = new SecureRandom, s = new Array; r > 2;) {
        for (s[0] = 0; 0 == s[0];) o.nextBytes(s);
        n[--r] = s[0]
    }
    return n[--r] = 2, n[--r] = 0, new BigInteger(n)
}

function pkcs1pad2Uint8(t, r) {
    if (r < t.length + 11) return alert("Message too long for RSA"), null;
    for (var n = new Array, i = t.length - 1; i >= 0 && r > 0;) {
        var e = t[i--];
        n[--r] = e
    }
    n[--r] = 0;
    for (var o = new SecureRandom, s = new Array; r > 2;) {
        for (s[0] = 0; 0 == s[0];) o.nextBytes(s);
        n[--r] = s[0]
    }
    return n[--r] = 2, n[--r] = 0, new BigInteger(n)
}

function RSAKey() {
    this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
}

function RSASetPublic(t, r) {
    null != t && null != r && t.length > 0 && r.length > 0 ? (this.n = parseBigInt(t, 16), this.e = parseInt(r, 16)) : alert("Invalid RSA public key")
}

function RSADoPublic(t) {
    return t.modPowInt(this.e, this.n)
}

function RSAEncrypt(t) {
    var r = pkcs1pad2(t, this.n.bitLength() + 7 >> 3);
    if (null == r) return null;
    var n = this.doPublic(r);
    if (null == n) return null;
    var i = n.toString(16);
    return 0 == (1 & i.length) ? i : "0" + i
}

function RSAUint8ArrayEncrypt(t) {
    var r = pkcs1pad2Uint8(t, this.n.bitLength() + 7 >> 3);
    if (null == r) return null;
    var n = this.doPublic(r);
    if (null == n) return null;
    var i = n.toString(16);
    return 0 == (1 & i.length) ? i : "0" + i
}

function aesEncrypt(t, r) {
    var n = CryptoJS.enc.Hex.parse(r),
        i = CryptoJS.AES.encrypt(t, n);
    return i
}

function tripleDesEncrypt(t, r) {
    var n = CryptoJS.enc.Hex.parse(r),
        i = CryptoJS.TripleDES.encrypt(t, n, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return i
}

function tripleDesDecrypt(t, r) {
    var n = CryptoJS.enc.Hex.parse(r),
        i = CryptoJS.TripleDES.decrypt(t, n, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return i
}

function sha1DigestBase64(t) {
    return Base64.encodeUint8Array(anysign.hex.hexStrToUint8Array(CryptoJS.SHA1(t) + ""))
}

function sha1Digest(t) {
    return CryptoJS.SHA1(t)
}

function md5Digest(t) {
    return CryptoJS.MD5(t)
}

function rsaPubkeyEnc(t, r, n) {
    var i = new RSAKey;
    i.setPublic(t, r);
    var e = i.encrypt(n),
        o = anysign.hex.hexStrToUint8Array(e);
    return Base64.encodeUint8Array(o)
}

function rsaPubkeyUint8Enc(t, r, n) {
    var i = new RSAKey;
    i.setPublic(t, r);
    var e = i.encryptUint8(n),
        o = anysign.hex.hexStrToUint8Array(e);
    return Base64.encodeUint8Array(o)
}

function rsaPubkeyEncByDefault(t) {
    return rsaPubkeyEnc(pubN, pubE, t)
}

function rsaPubkeyUint8EncByDefault(t) {
    return rsaPubkeyUint8Enc(pubN, pubE, t)
}
var dbits, canary = 0xdeadbeefcafe,
    j_lm = 15715070 == (16777215 & canary);
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP), BigInteger.prototype.F1 = BI_FP - dbits, BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
    BI_RC = new Array,
    rr, vv;
for (rr = "0".charCodeAt(0), vv = 0; 9 >= vv; ++vv) BI_RC[rr++] = vv;
for (rr = "a".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
for (rr = "A".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
Classic.prototype.convert = cConvert, Classic.prototype.revert = cRevert, Classic.prototype.reduce = cReduce, Classic.prototype.mulTo = cMulTo, Classic.prototype.sqrTo = cSqrTo, Montgomery.prototype.convert = montConvert, Montgomery.prototype.revert = montRevert, Montgomery.prototype.reduce = montReduce, Montgomery.prototype.mulTo = montMulTo, Montgomery.prototype.sqrTo = montSqrTo, BigInteger.prototype.copyTo = bnpCopyTo, BigInteger.prototype.fromInt = bnpFromInt, BigInteger.prototype.fromString = bnpFromString, BigInteger.prototype.clamp = bnpClamp, BigInteger.prototype.dlShiftTo = bnpDLShiftTo, BigInteger.prototype.drShiftTo = bnpDRShiftTo, BigInteger.prototype.lShiftTo = bnpLShiftTo, BigInteger.prototype.rShiftTo = bnpRShiftTo, BigInteger.prototype.subTo = bnpSubTo, BigInteger.prototype.multiplyTo = bnpMultiplyTo, BigInteger.prototype.squareTo = bnpSquareTo, BigInteger.prototype.divRemTo = bnpDivRemTo, BigInteger.prototype.invDigit = bnpInvDigit, BigInteger.prototype.isEven = bnpIsEven, BigInteger.prototype.exp = bnpExp, BigInteger.prototype.toString = bnToString, BigInteger.prototype.negate = bnNegate, BigInteger.prototype.abs = bnAbs, BigInteger.prototype.compareTo = bnCompareTo, BigInteger.prototype.bitLength = bnBitLength, BigInteger.prototype.mod = bnMod, BigInteger.prototype.modPowInt = bnModPowInt, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), Arcfour.prototype.init = ARC4init, Arcfour.prototype.next = ARC4next;
var rng_psize = 256,
    rng_state, rng_pool, rng_pptr;
if (null == rng_pool) {
    rng_pool = new Array, rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
        var ua = new Uint8Array(32);
        for (window.crypto.getRandomValues(ua), t = 0; 32 > t; ++t) rng_pool[rng_pptr++] = ua[t]
    }
    if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = 255 & z.charCodeAt(t)
    }
    for (; rng_psize > rng_pptr;) t = Math.floor(65536 * Math.random()), rng_pool[rng_pptr++] = t >>> 8, rng_pool[rng_pptr++] = 255 & t;
    rng_pptr = 0, rng_seed_time()
}
SecureRandom.prototype.nextBytes = rng_get_bytes, RSAKey.prototype.doPublic = RSADoPublic, RSAKey.prototype.setPublic = RSASetPublic, RSAKey.prototype.encrypt = RSAEncrypt, RSAKey.prototype.encryptUint8 = RSAUint8ArrayEncrypt;
var pubN = "9d0eff07c47a27a898c18fc89fd25b21898885b5a97054e81684e22bf13cd8725e7ff03ba2f8c1ad8c998952a30a65ff61ecbdb042661b8813e7a936de3474a51eb8a05458f7b357d95bb4f55741380403c1148108dfab4399af45d351deebaabffff552c10c6cd1599bc87642d37af5d474138a37fb60cdb7dcb3dbb9872a29",
    pubE = "10001",
    encCertSN = "0980990000019ecf6a";
var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encodeUint8Array: function (r) {
            for (var e, t = 32768, n = 0, o = r.length, a = "", i = ""; o > n;) {
                e = r.subarray(n, Math.min(n + t, o));
                for (var c = 0, f = e.length; f > c; c++) i += String.fromCharCode(e[c]);
                a += i, n += t, i = ""
            }
            return btoa(a)
        },
        decodeUint8ArrayB64: function (r) {
            return new Uint8Array(atob(r).split("").map(function (r) {
                return r.charCodeAt(0)
            }))
        },
        encode: function (r) {
            var e, t, n, o, a, i, c, f = "",
                u = 0;
            for (r = Base64._utf8_encode(r); u < r.length;) e = r.charCodeAt(u++), t = r.charCodeAt(u++), n = r.charCodeAt(u++), o = e >> 2, a = (3 & e) << 4 | t >> 4, i = (15 & t) << 2 | n >> 6, c = 63 & n, isNaN(t) ? i = c = 64 : isNaN(n) && (c = 64), f = f + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(i) + this._keyStr.charAt(c);
            return f
        },
        decode: function (r) {
            var e, t, n, o, a, i, c, f = "",
                u = 0;
            for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < r.length;) o = this._keyStr.indexOf(r.charAt(u++)), a = this._keyStr.indexOf(r.charAt(u++)), i = this._keyStr.indexOf(r.charAt(u++)), c = this._keyStr.indexOf(r.charAt(u++)), e = o << 2 | a >> 4, t = (15 & a) << 4 | i >> 2, n = (3 & i) << 6 | c, f += String.fromCharCode(e), 64 != i && (f += String.fromCharCode(t)), 64 != c && (f += String.fromCharCode(n));
            return f = Base64._utf8_decode(f)
        },
        _utf8_encode: function (r) {
            r = r.replace(/\r\n/g, "\n");
            for (var e = "", t = 0; t < r.length; t++) {
                var n = r.charCodeAt(t);
                128 > n ? e += String.fromCharCode(n) : n > 127 && 2048 > n ? (e += String.fromCharCode(n >> 6 | 192), e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224), e += String.fromCharCode(n >> 6 & 63 | 128), e += String.fromCharCode(63 & n | 128))
            }
            return e
        },
        _utf8_decode: function (r) {
            for (var e = "", t = 0, n = 0, o = 0, a = 0; t < r.length;) n = r.charCodeAt(t), 128 > n ? (e += String.fromCharCode(n), t++) : n > 191 && 224 > n ? (o = r.charCodeAt(t + 1), e += String.fromCharCode((31 & n) << 6 | 63 & o), t += 2) : (o = r.charCodeAt(t + 1), a = r.charCodeAt(t + 2), e += String.fromCharCode((15 & n) << 12 | (63 & o) << 6 | 63 & a), t += 3);
            return e
        }
    },
    anysign = anysign || {
        binary: {
            uint32ArrayToUint8Array: function (r) {
                if (!r) return null;
                for (var e, t = new Uint8Array(4 * r.length), n = 0, o = r.length; o > n; n++) e = n << 2, t[e] = r[n] >> 24 & 255, t[e + 1] = r[n] >> 16 & 255, t[e + 2] = r[n] >> 8 & 255, t[e + 3] = 255 & r[n];
                return t
            }
        },
        hex: {
            hexEncodeArray: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
            uint8ArrayToHexStr: function (r) {
                if (!r) return null;
                for (var e = "", t = 0; t < r.length; t++) {
                    var n = r[t];
                    e += this.hexEncodeArray[n >>> 4], e += this.hexEncodeArray[15 & n]
                }
                return e
            },
            hexStrToUint8Array: function (r) {
                if (!r || r.length % 2 != 0) return null;
                for (var e = [], t = 0; t < r.length; t += 2) e.push(parseInt("0x" + r.substr(t, 2), 16));
                return new Uint8Array(e)
            },
            hexStrToUint8Str: function (r) {
                if (!r || r.length % 2 != 0) return null;
                for (var e = "", t = 0; t < r.length; t += 2) e += String.fromCharCode(parseInt("0x" + r.substr(t, 2), 16));
                return decodeURIComponent(escape(e))
            }
        },
        charset: {
            strToUtf8ArrayUint8: function (r) {
                for (var e = unescape(encodeURIComponent(r)), t = new Uint8Array(e.length), n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
                return t
            },
            utf8ArrayUint8ToStr: function (r) {
                for (var e = "", t = 0; t < r.length; t++) e += String.fromCharCode(r[t]);
                return decodeURIComponent(escape(e))
            },
            toUtf8str: function (r) {
                return unescape(encodeURIComponent(r))
            },
            uint8ArrayAscIIToStr: function (r) {
                return String.fromCharCode.apply(null, r)
            },
            strToUint8ArrayAscII: function (r) {
                for (var e = new Uint8Array(r.length), t = 0, n = r.length; n > t; ++t) e[t] = r.charCodeAt(t);
                return e
            }
        },
        zip: {
            compressToB64: function (r) {
                var e = new Zlib.Deflate(r),
                    t = e.compress();
                if (t instanceof Array) {
                    for (var n = new Uint8Array(t.length), o = 0, a = n.length; a > o; ++o) n[o] = t[o];
                    t = n
                }
                return Base64.encodeUint8Array(t)
            }
        },
        json: {
            stringify: function (r) {
                return JSON.stringify(r)
            },
            stringToObj: function (r) {
                return JSON.parse(r)
            }
        },
        digest: {
            crc32: function (r) {
                var e = [];
                if (window.crcTable) e = window.crcTable;
                else {
                    for (var t, n = 0; 256 > n; n++) {
                        t = n;
                        for (var o = 0; 8 > o; o++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                        e[n] = t
                    }
                    window.crcTable = e
                }
                for (var a = -1, i = 0; i < r.length; i++) a = a >>> 8 ^ e[255 & (a ^ r.charCodeAt(i))];
                return (-1 ^ a) >>> 0
            }
        }
    };
! function (r) {
    function e() {
        for (var e, t = !0, n = l, o = d.length; o > n && t;)
            if (e = d[n], void 0 !== e && null !== e) {
                if ("string" == typeof e) {
                    var a = h.cloneNode(!1);
                    a.text = e, s.parentNode.insertBefore(a, s)
                } else e.apply(r);
                e = n, d[e] = null, l = e + 1, n += 1
            } else t = !1
    }

    function t() {
        if (d.length) {
            var e, n = d.pop();
            "string" == typeof n ? (e = h.cloneNode(!0), e.type = "text/javascript", e.async = !0, e.src = n, e.onload = e.onreadystatechange = function () {
                (!e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e = void 0, t())
            }, s.parentNode.insertBefore(e, s)) : (n.apply(r), t())
        }
    }

    function n(r, t) {
        return function () {
            d[t] = r.responseText, e(), r = void 0
        }
    }

    function o() {
        var r, t, o = arguments.length;
        for (r = 0; o > r; r += 1) "string" == typeof arguments[r] ? (t = i(arguments[r]), t.onload = n(t, d.length), d[d.length] = null, t.send()) : (d[d.length] = arguments[r], e())
    }

    function a() {
        d.push(Array.prototype.slice.call(arguments, 0).reverse()), t()
    }
    var i, c, f, u = r.document,
        h = u.createElement("script"),
        s = u.getElementsByTagName("script")[0],
        d = [],
        l = 0;
    r.XMLHttpRequest && (c = new r.XMLHttpRequest, "withCredentials" in c ? f = function (e) {
        return c = new r.XMLHttpRequest, c.open("get", e, !0), c
    } : r.XDomainRequest && (f = function (e) {
        return c = new r.XDomainRequest, c.open("get", e), c
    })), i = f, r.JcorsLoader = {
        load: i ? o : a
    }
}(window);

function toUInt(t) {
    return 0 > t ? t + 4294967296 : t
}

function bytes32(t) {
    return [t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t]
}

function bytes16sw(t) {
    return [255 & t, t >>> 8 & 255]
}

function adler32(t, r, e) {
    switch (arguments.length) {
    case 1:
        r = 0;
    case 2:
        e = t.length - r
    }
    for (var a = 1, n = 0, o = 0; e > o; o++) a = (a + t[r + o]) % 65521, n = (n + a) % 65521;
    return toUInt(n << 16 | a)
}

function crc32(t, r, e) {
    switch (arguments.length) {
    case 1:
        r = 0;
    case 2:
        e = t.length - r
    }
    var a = arguments.callee.crctable;
    if (!a) {
        a = [];
        for (var n, o = 0; 256 > o; o++) {
            n = o;
            for (var p = 0; 8 > p; p++) n = 1 & n ? 3988292384 ^ n >>> 1 : n >>> 1;
            a[o] = toUInt(n)
        }
        arguments.callee.crctable = a
    }
    for (var n = 4294967295, s = 0; e > s; s++) n = a[255 & (n ^ t[r + s])] ^ n >>> 8;
    return toUInt(4294967295 ^ n)
}! function () {
    function t(t, r) {
        return this.slice(t, r)
    }

    function r(t, r) {
        arguments.length < 2 && (r = 0);
        for (var e = 0, a = t.length; a > e; ++e, ++r) this[r] = 255 & t[e]
    }

    function e(e) {
        var a;
        if ("number" == typeof e) {
            a = new Array(e);
            for (var n = 0; e > n; ++n) a[n] = 0
        } else a = e.slice(0);
        return a.subarray = t, a.buffer = a, a.byteLength = a.length, a.set = r, "object" == typeof e && e.buffer && (a.buffer = e.buffer), a
    }
    try {
        new Uint8Array(1);
        return
    } catch (a) {}
    window.Uint8Array = e, window.Uint32Array = e, window.Int32Array = e
}(),
function () {
    "response" in XMLHttpRequest.prototype || "mozResponseArrayBuffer" in XMLHttpRequest.prototype || "mozResponse" in XMLHttpRequest.prototype || "responseArrayBuffer" in XMLHttpRequest.prototype || Object.defineProperty(XMLHttpRequest.prototype, "response", {
        get: function () {
            return new Uint8Array(new VBArray(this.responseBody).toArray())
        }
    })
}(),
function () {
    if (!("btoa" in window)) {
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        window.btoa = function (r) {
            var e, a, n = "";
            for (e = 0, a = r.length; a > e; e += 3) {
                var o = 255 & r.charCodeAt(e),
                    p = 255 & r.charCodeAt(e + 1),
                    s = 255 & r.charCodeAt(e + 2),
                    y = o >> 2,
                    u = (3 & o) << 4 | p >> 4,
                    i = a > e + 1 ? (15 & p) << 2 | s >> 6 : 64,
                    c = a > e + 2 ? 63 & s : 64;
                n += t.charAt(y) + t.charAt(u) + t.charAt(i) + t.charAt(c)
            }
            return n
        }
    }
}();
var capabal = capabal || {
    crypto: {
        getRandomValues: function (t) {
            var r, e, a = t.length;
            if (a)
                for (; --a;) e = Math.floor(Math.random() * (a + 1)), r = t[e], t[e] = t[a], t[a] = r;
            return t
        }
    }
};
! function () {
    var t = function () {
            var t = Array.prototype.slice.call(this.getContext("2d").getImageData(0, 0, this.width, this.height).data),
                r = this.width,
                e = this.height,
                a = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82];
            Array.prototype.push.apply(a, bytes32(r)), Array.prototype.push.apply(a, bytes32(e)), a.push(8, 6, 0, 0, 0), Array.prototype.push.apply(a, bytes32(crc32(a, 12, 17)));
            for (var n = e * (4 * r + 1), o = 0; e > o; o++) t.splice(o * (4 * r + 1), 0, 0);
            var p = Math.ceil(n / 32768);
            Array.prototype.push.apply(a, bytes32(n + 5 * p + 6));
            var s = a.length,
                y = n + 5 * p + 6 + 4;
            a.push(73, 68, 65, 84, 120, 1);
            for (var u = 0; p > u; u++) {
                var i = Math.min(32768, n - 32768 * u);
                a.push(u == p - 1 ? 1 : 0), Array.prototype.push.apply(a, bytes16sw(i)), Array.prototype.push.apply(a, bytes16sw(~i));
                var c = t.slice(32768 * u, 32768 * u + i);
                Array.prototype.push.apply(a, c)
            }
            return Array.prototype.push.apply(a, bytes32(adler32(t))), Array.prototype.push.apply(a, bytes32(crc32(a, s, y))), a.push(0, 0, 0, 0, 73, 69, 78, 68), Array.prototype.push.apply(a, bytes32(crc32(a, a.length - 4, 4))), "data:image/png;base64," + btoa(a.map(function (t) {
                return String.fromCharCode(t)
            }).join(""))
        },
        r = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function (e) {
        var a = r.apply(this, arguments);
        return "data:," == a ? (HTMLCanvasElement.prototype.toDataURL = t, this.toDataURL()) : (HTMLCanvasElement.prototype.toDataURL = r, a)
    }
}();
var AnySignRoot = function () {
        this.Version = "4.7", this.EncCertSN = null, this.EncKey = null, this.TermSrc = "IOS", this.Digest = null, this.EncData = null
    },
    Digest = function () {
        this.Alg = null, this.Value = null
    },
    FormInfo = function () {
        this.WONo = null, this.WOHash = null, this.IsSync = !1, this.IsUnit = !1, this.EncAlg = "SM2", this.FlowID = null, this.Channel = null, this.USignArray = [], this.DataArray = [], this.CachetArray = [], this.ExtInfo = null
    },
    SaveFormInfo = function () {
        this.WONo = null, this.WOHash = null, this.Channel = null, this.USignObjs = [], this.USignConfigs = [], this.DataObjs = [], this.DataConfigs = [], this.CachetArray = []
    },
    ExtInfo = function () {},
    PlainData = function () {
        this.P10Data = null, this.CertOID = null
    },
    P10Data = function () {
        this.RawHash = null, this.Hash = null, this.Value = null, this.ValueType = null, this.P10SignValue = null, this.Hashalg = null, this.Dn = null, this.IDType = null, this.IDNumber = null, this.Templname = "3", this.Channel = "10000"
    },
    CertOID = function () {
        this.Version = "3.2", this.IDType = null, this.IDNumber = null, this.RawHash = null, this.BioFeature = null, this.ClientOS = null
    },
    BioFeature = function () {
        this.PhotoArray = [], this.SoundArray = [], this.Script = null
    },
    Script = function () {
        this.Format = "zip", this.Width = "180", this.Color = null, this.Count = null, this.Data = null, this.Device = null, this.RefHeight = 99999, this.RefWidth = 99999, this.Geoloca = null
    },
    Device = function () {
        this.DeviceName = "ANDROID_PAD_" + navigator.appName, this.SampleRate = "1024", this.PressMax = "1024", this.Width = 99999, this.Height = 99999, this.DriverVer = "v1.0", this.DeviceID = navigator.appVersion, this.CertInfo = null
    },
    ClientOS = function () {
        this.Name = navigator.platform, this.Edition = navigator.appCodeName, this.ServicePack = "None", this.Version = navigator.appVersion, this.OSArch = "32/64", this.DeviceID = navigator.appVersion
    },
    ImageSize = function (i, t) {
        this.Width = i, this.Height = t, this.Unit = "dp"
    },
    SignatureObj = function () {
        this.Cid = 0, this.SignRule = null, this.Signer = null, this.Image = null, this.ImageSize = null, this.IsTSS = !1, this.Points = null, this.KeyPair = null, this.ImageFMT = DataFormat.IMAGE_PNG, this.TimeTag = null
    },
    PhotoEvidence = function () {
        this.Format = null, this.Hash = null, this.BioType = null
    },
    SoundEvidence = function () {
        this.Format = null, this.Hash = null, this.BioType = null
    },
    DataObj = function () {
        this.Cid = 0, this.OwnerCid = 0, this.PointHash = null, this.Data = null, this.Name = null, this.Format = null, this.PDFCrdRule = null
    },
    PDFCrdRule = function () {
        this.DocCrdTid = null, this.DocFormat = null, this.DocStyleTid = null
    };

function anysignWebImpl() {
    function t() {
        l = !1, o = null, d = null, _ = !1, D = !1, f = [], C = [], O = [], A = []
    }

    function n(t) {
        for (var n in E) {
            var e = E[n];
            if (e && e.cid == t) return e
        }
        return null
    }

    function e(t, n, e, i, r, a) {
        t.Points || (t.Points = new PlainData), t.Points.P10Data || (t.Points.P10Data = new P10Data), t.Points.CertOID || (t.Points.CertOID = new CertOID), t.Points.CertOID.BioFeature || (t.Points.CertOID.BioFeature = new BioFeature), t.Points.CertOID.BioFeature.Script = new Script, t.Points.CertOID.ClientOS = new ClientOS;
        var o = t.Points.CertOID.BioFeature.Script;
        o.Color = parseInt("0x" + n.substr(1)) + "", o.Data = anysign.zip.compressToB64(anysign.charset.strToUint8ArrayAscII(e)), o.Count = i + "", o.Device = new Device, o.RefWidth = r, o.RefHeight = a
    }

    function i(t) {
        return c.FORMDATA_XML <= t && t <= c.FORMDATA_PRESERVED ? !0 : !1
    }

    function r(t) {
        return t >= 20 && 29 >= t || t >= 200 && 299 >= t ? !0 : !1
    }

    function a(t) {
        return t >= 50 && 59 >= t || t >= 500 && 599 >= t || i(t) ? !0 : !1
    }
    var o, s, u, g, d, c = {
            FORMDATA_XML: 10,
            FORMDATA_HTML: 11,
            FORMDATA_PDF: 12,
            FORMDATA_JSON: 13,
            FORMDATA_PRESERVED: 19
        },
        l = !1,
        _ = !1,
        D = !1,
        f = [],
        C = [],
        O = [],
        E = [],
        A = [];
    this._initAnySignApi = function (n, e) {
        return n && e ? (t(), o = n, d = e, !0) : !1
    }, this._addDataObj = function (t, n) {
        if (!_ && a(t)) {
            n.cid = t, E[t] = n;
            var e = new DataObj;
            return e.Format = n.format, e.Name = n.name, e.Cid = t, O[t] = e, !0
        }
        return !1
    }, this._addSignatureObj = function (t, n) {
        if (!_ && n && r(t)) {
            n.cid = t, C[t] = n;
            var e = new SignatureObj;
            return e.Cid = t, e.Signer = n.signer, e.SignRule = n.signRule, e.IsTSS = n.isTSS, e.TimeTag = n.timeTag, f[t] = e, !0
        }
        return !1
    }, this._addEvidence = function (t, n, e, i, r) {
        var a = f[t];
        if (a.Points || (a.Points = new PlainData), a.Points.P10Data || (a.Points.P10Data = new P10Data), a.Points.CertOID || (a.Points.CertOID = new CertOID), a.Points.CertOID.BioFeature || (a.Points.CertOID.BioFeature = new BioFeature), a.Points.CertOID.BioFeature.Script) return !1;
        if (i == BioType.PHOTO_SIGNER_IDENTITY_CARD_BACK || i == BioType.PHOTO_SIGNER_IDENTITY_CARD_FRONT) {
            var o = new PhotoEvidence;
            o.Format = e;
            var s = sha1Digest(n);
            return o.Hash = "BS64:" + s.toString().toUpperCase(), o.BioType = i, a.Points.CertOID.BioFeature.PhotoArray[r] = o, !0
        }
        if (i == BioType.SOUND_SIGNER_RETELL || i == BioType.SOUND_SIGNER_OTHER) {
            var u = new SoundEvidence;
            u.Format = e;
            var g = sha1Digest(n);
            return u.Hash = "BS64:" + g.toString().toUpperCase(), u.BioType = i, a.Points.CertOID.BioFeature.SoundArray[r] = u, !0
        }
        return !1
    }, this._addEvidenceV2 = function (t, n, e, i) {
        var r = f[t];
        if (r.Points || (r.Points = new PlainData), r.Points.P10Data || (r.Points.P10Data = new P10Data), r.Points.CertOID || (r.Points.CertOID = new CertOID), r.Points.CertOID.BioFeature || (r.Points.CertOID.BioFeature = new BioFeature), r.Points.CertOID.BioFeature.Script) return !1;
        if (e == BioType.PHOTO_SIGNER_IDENTITY_CARD_BACK || e == BioType.PHOTO_SIGNER_IDENTITY_CARD_FRONT) {
            var a = new PhotoEvidence;
            a.Format = DataFormat.IMAGE_JPEG;
            var o = sha1Digest(n);
            return a.Hash = "BS64:" + o.toString().toUpperCase(), a.BioType = e, r.Points.CertOID.BioFeature.PhotoArray[i] = a, !0
        }
        if (e == BioType.SOUND_SIGNER_RETELL || e == BioType.SOUND_SIGNER_OTHER) {
            var s = new SoundEvidence;
            s.Format = DataFormat.MEDIA_3GP;
            var u = sha1Digest(n);
            return s.Hash = "BS64:" + u.toString().toUpperCase(), s.BioType = e, r.Points.CertOID.BioFeature.SoundArray[i] = s, !0
        }
        return !1
    }, this._addChachetObj = function (t) {
        return !_ && t ? (A.push(t), !0) : !1
    }, this._addPhotoObj = function (t, n, e) {
        return !1
    }, this._addMediaObj = function (t, n, e) {
        return !1
    }, this._setTemplate = function (t, n, e, r) {
        if (!D && i(t)) {
            if (null == n || 0 === n.length) return anysign.logger.e("contentUtf8Str must not be null or empty"), !1;
            if (null == e || 0 === e.length) return anysign.logger.e("businessId must not be null or empty"), !1;
            if (null == r || 0 === r.length) return anysign.logger.e("template_serial must not be null or empty"), !1;
            u = e, g = sha1DigestBase64(e) + "";
            var a = new DataObj;
            if (a.Cid = t, a.Data = Base64.encodeUint8Array(anysign.charset.strToUtf8ArrayUint8(n)), c.FORMDATA_XML === t || c.FORMDATA_JSON === t) {
                var o = new PDFCrdRule;
                o.DocFormat = t, o.DocStyleTid = r, a.PDFCrdRule = o
            }
            var s = new DataConfig;
            return s.cid = t, s.nessesary = !0, O[t] = a, E[t] = s, D = !0, !0
        }
        return !1
    }, this._setTID = function (t) {
        return s = t, !0
    }, this._setData = function (t, e) {
        if (n(t) && e) {
            if ("string" == typeof e) {
                var i = O[t];
                i.Data = Base64.encodeUint8Array(anysign.charset.strToUtf8ArrayUint8(e))
            } else if (e instanceof Uint8Array) {
                var i = O[t];
                i.Data = Base64.encodeUint8Array(e)
            }
            return !0
        }
        return !1
    }, this._commitConfig = function () {
        return _ = !0, !0
    }, this._resetConfig = function () {
        return t(), !0
    }, 
        
        
        this._showSignatureDialog = function (t) {
        if (_) {
            if (D) {
                if (null == C[t]) return EC_WRONG_CONTEXT_ID;
                var n = C[t],
                    i = getWindowHeight(),
                    r = getWindowWidth(),
                    a = document.getElementById("dialog1");
//                a.style.height = i, a.style.width = r, a.style.display = "block";
                var s = document.getElementById("anysign_title"),
                    u = n.title,
                    g = u.substring(n.titleSpanFromOffset, n.titleSpanToOffset + 1).big();
                //return s.innerHTML = u.substring(0, n.titleSpanFromOffset) + g + u.substring(n.titleSpanToOffset + 1, u.length), 
                return setSignResCallback(n, function (t, i, r, a, s, u, g) {
                    if (o) {
                        if (r) {
                            var d = f[t];
                            if (e(d, n.penColor, a, s, u, g), d.ImageSize = new ImageSize(calculatedSigWidth, calculatedSigHeight), d.Image = i, d.SignRule && d.SignRule instanceof SignRule_XYZ) {
                                var c = d.SignRule.XYZRule;
                                "dp" === c.Unit ? d.SignRule.XYZRule = {
                                    Left: c.Left,
                                    Top: c.Top,
                                    Right: c.Left + calculatedSigWidth,
                                    Bottom: c.Top - calculatedSigHeight,
                                    Pageno: c.Pageno,
                                    Unit: c.Unit
                                } : "pt" === c.Unit && (d.SignRule.XYZRule = {
                                    Left: c.Left,
                                    Top: c.Top,
                                    Right: c.Left + .45 * calculatedSigWidth,
                                    Bottom: c.Top - .45 * calculatedSigHeight,
                                    Pageno: c.Pageno,
                                    Unit: c.Unit
                                })
                            }
                            o(n.cid, CALLBACK_TYPE_SIGNATURE, r)
                        } else o(n.cid, CALLBACK_TYPE_DIALOG_CANCEL, null);
                        clear_canvas();
                        //var l = document.getElementById("dialog");
                        //l.style.display = "none", setIsAnysignInputDlgShown(!1)
                    }
                }), setIsAnysignInputDlgShown(!0), RESULT_OK
            }
            return EC_TEMPLATE_NOT_SET
        }
        return EC_API_NOT_INITED
    }, 
        
        
        this._takePicture = function (t) {
        return !1
    }, this._picturePreview = function (t) {
        return !1
    }, this._startMediaRecording = function (t) {
        return !1
    }, this._audioPreview = function (t) {
        return !1
    }, this._mediaPreview = function (t) {
        return !1
    }, this._startMediaRecording = function (t) {
        return !1
    }, this._finishMediaRecording = function (t) {
        return !1
    }, this._isReadyToUpload = function () {
        if (!_ || !D) return !1;
        for (var t in C) {
            var n = C[t],
                e = n.cid,
                i = f[e];
            if (null == i || null == i.Points || null == i.Points.CertOID || null == i.Points.CertOID.BioFeature || null == i.Points.CertOID.BioFeature.Script) return !1
        }
        for (t in E) {
            var n = E[t],
                r = O[n.cid];
            if ((null == r || null == r.Data) && n.nessesary) return !1
        }
        return !0
    }, this._saveBusinessSession = function (t) {
        t = md5Digest("424A4341" + t) + "", t = t.substring(0, 24);
        var n = new SaveFormInfo;
        n.WONo = u, n.WOHash = g, n.Channel = d;
        var e;
        for (var i in C) e = C[i], n.USignConfigs.push(e), n.USignObjs.push(f[e.cid]);
        for (i in E) e = E[i], n.DataConfigs.push(e), n.DataObjs.push(O[e.cid]);
        n.CachetArray = A;
        var r = anysign.json.stringify(n),
            a = tripleDesEncrypt(r, t) + "";
        return a
    }, this._restoreBusinessSession = function (t, n) {
        n = md5Digest("424A4341" + n) + "", n = n.substring(0, 24);
        var e = tripleDesDecrypt(t, n) + "",
            i = anysign.hex.hexStrToUint8Str(e),
            r = anysign.json.stringToObj(i);
        u = r.WONo, g = r.WOHash, d = r.Channel;
        var a, o;
        for (var s in r.USignConfigs) {
            a = r.USignConfigs[s].cid;
            for (var c in r.USignObjs) o = r.USignObjs[c].Cid, a == o && (C[a] = r.USignConfigs[s], f[o] = r.USignObjs[c])
        }
        for (var s in r.DataConfigs) {
            a = r.DataConfigs[s].cid;
            for (var c in r.DataObjs) o = r.DataObjs[c].Cid, a == o && (E[a] = r.DataConfigs[s], O[o] = r.DataObjs[c])
        }
        return A = r.CachetArray, _ = !0, D = !0, !0
    }, this._getUploadDataGram = function () {
        if (_ && this._isReadyToUpload() && D) {
            var t = new AnySignRoot,
                n = new FormInfo,
                e = new Uint8Array(24);
            void 0 != window.crypto ? window.crypto.getRandomValues(e) : void 0 != window.msCrypto ? window.msCrypto.getRandomValues(e) : capabal.crypto.getRandomValues(e), t.EncKey = rsaPubkeyUint8EncByDefault(e), t.EncCertSN = encCertSN;
            var i, r = [];
            for (var a in C) i = C[a], r.push(f[i.cid]);
            var o = [];
            for (a in E) i = E[a], o.push(O[i.cid]);
            n.WONo = u, n.WOHash = g, n.Channel = d, null != A && A.length > 0 && (n.IsUnit = !0), n.USignArray = r, n.DataArray = o, n.CachetArray = A, n.ExtInfo = new ExtInfo;
            var s = anysign.json.stringify(n);
            return t.EncData = tripleDesEncrypt(s, anysign.hex.uint8ArrayToHexStr(e)) + "", t.Digest = new Digest, t.Digest.Alg = "CRC32", t.Digest.Value = anysign.digest.crc32(t.EncData).toString(16).toUpperCase(), anysign.json.stringify(t)
        }
        return null
    }, this._getOSInfo = function () {
        if (isMobile.Android()) {
            var t = navigator.userAgent.toLowerCase(),
                n = t.indexOf("android"),
                e = t.indexOf(";", n);
            n += 8;
            var i = t.substring(n, e);
            return "android##" + i
        }
        if (isMobile.iOS()) {
            var n, e, i, t = navigator.userAgent;
            if (-1 != (n = t.indexOf("OS")) && -1 != (e = t.indexOf("like Mac OS"))) return i = t.substring(n + 3, e - 1), i = i.replace(/_/g, "."), "ios##" + i
        }
        return "unknown"
    }
}

function onBridgeReady() {
    WeixinJSBridge.call("hideOptionMenu")
}
var CALLBACK_TYPE_SIGNATURE = 1,
    CALLBACK_TYPE_DIALOG_DISMISS = 2,
    CALLBACK_TYPE_DIALOG_CANCEL = 3,
    CALLBACK_TYPE_BUFFER_SAVED = 4,
    CALLBACK_TYPE_ON_PICTURE_TAKEN = 5,
    CALLBACK_TYPE_DATA_DELETED = 6,
    CALLBACK_TYPE_START_RECORDING = 7,
    CALLBACK_TYPE_STOP_RECORDING = 8,
    CALLBACK_TYPE_ON_MEDIA_DATA = 9,
    CALLBACK_TYPE_ERROR = -1,
    CALLBACK_TYPE_ERROR_PICTURE = -2,
    CALLBACK_TYPE_OPERATION_CANCELED = -3,
    CALLBACK_TYPE_GETVERSION = 10,
    RESULT_OK = 0,
    RESULT_ERROR = -1,
    EC_API_NOT_INITED = 1,
    EC_WRONG_CONTEXT_ID = 2,
    EC_CAMERA_INIT_FAILED = 3,
    EC_NATIVE_EXCEPTION = 4,
    EC_DEVICE_NOT_SUPPORTED = 5,
    EC_TEMPLATE_NOT_SET = 6,
    isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) ? !0 : !1
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) ? !0 : !1
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? !0 : !1
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) ? !0 : !1
        },
        any: function () {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows()
        }
    };
"undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", onBridgeReady, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", onBridgeReady), document.attachEvent("onWeixinJSBridgeReady", onBridgeReady)) : onBridgeReady();

function clear_canvas() {
    var t = document.getElementById("anysignCanvas"),
        e = t.getContext("2d");
    e.clearRect(0, 0, t.width, t.height), e.closePath();
    var n = t.width,
        i = t.height;
    t.width = t.height = 0, t.width = n, t.height = i, calculatedSigWidth = 0, calculatedSigHeight = 0, signTrack = "", signTrachPointCount = 0, firstPointTime = 0, points = [], minX = 9999, minY = 9999, maxX = 0, maxY = 0, imageDataTmp = null, isDrawn = !1
}

function sign_confirm() {
    //if (!isDrawn) return void custom_alert("请手写签名", "确认");
    var t = document.getElementById("anysignCanvas"),
        e = t.getContext("2d"),
        n = maxX - minX + paste_padding + paste_padding,
        i = maxY - minY + paste_padding + paste_padding,
        w = t.width,
        h = t.height;
    if (imageDataTmp = e.getImageData(0, 0, w, h), signResCallback) {
        var a = getSigData(),
            t = document.getElementById("anysignCanvas");
        signResCallback(signObjTmp.cid, a[0].substr(22, a[0].length), a[1].substr(22, a[1].length), signTrack, signTrachPointCount, t.width, t.height)
    }
    //document.body.parentNode.style.overflow = "scroll"
}

function setSignResCallback(t, e) {
    signObjTmp = t, signResCallback = e
}

/*function setSigConfig() {
    var t = document.getElementById("anysignCanvas"),
        e = t.getContext("2d");
    e.strokeStyle = signObjTmp ? signObjTmp.penColor : "black", tmp_ctx.strokeStyle = signObjTmp ? signObjTmp.penColor : "black"
}*/

function setCanvasHeight(t) {
    var e = document.getElementById("anysignCanvas");
    t > 0 && (e.height = t, tmp_canvas && (tmp_canvas.height = t))
}

function getSigData() {
    var t = new Array;
    if (imageDataTmp) {
        var e = document.createElement("canvas"),
            n = e.getContext("2d"),
            i = window.devicePixelRatio ? window.devicePixelRatio : 1;
        e.width = imageDataTmp.width / i, e.height = imageDataTmp.height / i;
        var a = 1;
        signObjTmp.singleWidth / signObjTmp.singleHeight <= e.width / e.height ? signObjTmp.singleWidth <= e.width && (a = signObjTmp.singleWidth / e.width) : signObjTmp.singleHeight <= e.height && (a = signObjTmp.singleHeight / e.height), e.width *= a, e.height *= a, calculatedSigWidth = e.width, calculatedSigHeight = e.height, n.scale(1 / i * a, 1 / i * a);
        var o = document.createElement("canvas");
        o.width = imageDataTmp.width, o.height = imageDataTmp.height, o.getContext("2d").putImageData(imageDataTmp, 0, 0), n.drawImage(o, 0, 0);
        var c = signObjTmp.signatureImgRatio,
            d = 1 / i * a * c,
            s = document.createElement("canvas"),
            m = s.getContext("2d");
        1 > d ? (s.width = imageDataTmp.width * d, s.height = imageDataTmp.height * d, m.scale(d, d)) : (s.width = imageDataTmp.width, s.height = imageDataTmp.height);
        var r = document.createElement("canvas");
        return r.width = imageDataTmp.width, r.height = imageDataTmp.height, r.getContext("2d").putImageData(imageDataTmp, 0, 0), m.drawImage(r, 0, 0), t[0] = s.toDataURL(), t[1] = e.toDataURL(), t
    }
    return null
}

function getRawSigHeight() {
    return imageDataTmp ? void 0 !== window.devicePixelRatio ? imageDataTmp.height / window.devicePixelRatio : imageDataTmp.height : 0
}

function getRawSigWidth() {
    return imageDataTmp ? void 0 !== window.devicePixelRatio ? imageDataTmp.width / window.devicePixelRatio : imageDataTmp.width : 0
}

function cancelSign() {
    clear_canvas();
    var t = document.getElementById("dialog");
    t.style.display = "none", document.body.scroll = "yes", signResCallback && signResCallback(signObjTmp.cid, null, null, 0)
}

function setIsAnysignInputDlgShown(t) {
    isAnysignInputDlgShown = t
}

function testGetImageData() {}

function testEnc() {
    var t = tripleDesEncrypt("abcdefg", "000102030405060708090a0b0c0d0e0f"),
        e = document.getElementById("result");
    e.value = t
}

function testEncAndDec() {
    var t = "133434",
        e = "abdfdsafdasfcdef132432432432g你好吗,,,fdafdas",
        n = tripleDesEncrypt(e, t) + "",
        i = tripleDesDecrypt(n, t) + "",
        a = anysign.hex.hexStrToUint8Str(i),
        o = e + "\n";
    o += n + "\n", o += a + "\n";
    var c = '{"Alg":"111","Value":"2222"}',
        d = (anysign.json.stringToObj(c), document.getElementById("result"));
    d.value = o
}

function custom_alert(t, e) {
    showMsgDialog(t)
}

function preventDefault(t) {
    t = t || window.event, t.preventDefault && t.preventDefault(), t.returnValue = !1
}

function setSelectState(t) {
    for (var e = document.getElementsByTagName("select"), n = 0; n < e.length; n++) e[n].style.visibility = t
}

function showMessageBox2(t, e, n, i) {
    closeWindow();
    var a = getWindowHeight(),
        o = getWindowWidth();
    isIe && setSelectState("hidden");
    var c = document.createElement("div");
    c.id = "back";
    var d = "font-size:15pt; text-align:center; z-index:7;top:0px;left:0px;position:fixed;background:#666;width:" + o + "px;height:" + a + "px;";
    d += isIe ? "filter:alpha(opacity=0);" : "opacity:0;", c.style.cssText = d;
    var s = document.createElement("div");
    s.id = "mesWindow", s.innerHTML = "<div id='mesWindowContent'>" + e + "</div><div id='mesWindowBottom'><input id='mesWindowBtnOk' type='button' onclick='closeWindow();'value='确认' /></div>", c.appendChild(s), document.body.appendChild(c), showBackground(c, 80), "ontouchstart" in document.documentElement ? (c.ontouchstart = function (t) {
        return "mesWindowBtnOk" !== t.target.id ? (preventDefault(t), !1) : !0
    }, c.ontouchmove = function (t) {
        preventDefault(t)
    }) : (c.onmousedown = function (t) {
        "mesWindowBtnOk" !== t.target.id && preventDefault(t)
    }, c.onmousemove = function (t) {
        preventDefault(t)
    })
}

function showBackground(t, e) {
    if (isIe) t.filters.alpha.opacity += 1, t.filters.alpha.opacity < e && setTimeout(function () {
        showBackground(t, e)
    }, 5);
    else {
        var n = parseFloat(t.style.opacity);
        n += .01, t.style.opacity = n, e / 100 > n && setTimeout(function () {
            showBackground(t, e)
        }, 5)
    }
}

function closeWindow() {
    null != document.getElementById("back") && document.getElementById("back").parentNode.removeChild(document.getElementById("back")), null != document.getElementById("mesWindow") && document.getElementById("mesWindow").parentNode.removeChild(document.getElementById("mesWindow")), isIe && setSelectState("")
}

function showMsgDialog(t) {
    showMessageBox2("修改小结内容", t, null, 350)
}

function getWindowWidth() {
    var t = 630,
        e = 460;
    return document.body && document.body.offsetWidth && (t = document.body.offsetWidth, e = document.body.offsetHeight), "CSS1Compat" == document.compatMode && document.documentElement && document.documentElement.offsetWidth && (t = document.documentElement.offsetWidth, e = document.documentElement.offsetHeight), window.innerWidth && window.innerHeight && (t = window.innerWidth, e = window.innerHeight), t
}

function getWindowHeight() {
    var t = 630,
        e = 460;
    return document.body && document.body.offsetWidth && (t = document.body.offsetWidth, e = document.body.offsetHeight), "CSS1Compat" == document.compatMode && document.documentElement && document.documentElement.offsetWidth && (t = document.documentElement.offsetWidth, e = document.documentElement.offsetHeight), window.innerWidth && window.innerHeight && (t = window.innerWidth, e = window.innerHeight), e
}
var points = [],
    firstPointTime = 0,
    signTrack = "",
    signTrachPointCount = 0,
    calculatedSigWidth = 0,
    calculatedSigHeight = 0,
    minX = 9999,
    minY = 9999,
    maxX = 0,
    maxY = 0,
    curX = 0,
    curY = 0,
    lastX = 0,
    lastY = 0,
    paste_padding = 10,
    imageDataTmp, isDown = !1,
    isDrawn = !1,
    isAnysignInputDlgShown = !1,
    isCopyingImg = !1,
    base_stroke_width = window.innerWidth >= 480 ? 7.5 : 5,
    tmp_canvas, tmp_ctx, signResCallback, signObjTmp;

/**
window.addEventListener("resize", function () {
    var t, e, n, i, a, o = document.getElementById("anysignCanvas"),
        c = o.getContext("2d");
    if (isDrawn) {
        t = document.createElement("canvas"), e = t.getContext("2d");
        var d, s, m, r, g = paste_padding,
            u = g,
            l = g,
            h = g,
            p = g;
        (d = minX - g) < 0 && (u = minX, d = 0), (s = minY - g) < 0 && (l = minY, s = 0), (m = maxX + g) > o.width && (h = 0, m = o.width), (r = maxY + g) > o.height && (p = 0, r = o.height), n = maxX - minX + u + h, i = maxY - minY + l + p, a = c.getImageData(d, s, m - d, r - s), t.width = n, t.height = i
    }
    var w = getWindowHeight(),
        f = getWindowWidth(),
        v = document.getElementById("dialog");
    v.style.height = w + "px", v.style.width = f + "px", o.width = f, o.height = w, o.height = .7 * o.height;
    var y = document.getElementById("btnContainerOuter"),
        _ = document.getElementById("anysign_title");
    _.style.height = .1 * w + "px";
    var y = document.getElementById("btnContainerOuter");
    y.style.height = .2 * w + "px", null != tmp_canvas && (tmp_canvas.width = o.width, tmp_canvas.height = o.height);
    var x = window.devicePixelRatio ? window.devicePixelRatio : 1,
        T = o.width * o.height / 142560;
    if (base_stroke_width = x * T * 2.4, c.strokeStyle = signObjTmp ? signObjTmp.penColor : "black", c.lineWidth = base_stroke_width, c.lineCap = "round", c.lineJoin = "round", c.shadowBlur = 5, tmp_ctx.strokeStyle = signObjTmp ? signObjTmp.penColor : "black", tmp_ctx.lineWidth = base_stroke_width, tmp_ctx.lineCap = "round", tmp_ctx.lineJoin = "round", tmp_ctx.shadowBlur = 5, !isDrawn) return void tmp_canvas.getContext("2d").clearRect(0, 0, o.width, o.height);
    var b;
    b = o.width > n ? o.height >= i ? 1 : o.height / i : o.width / o.height > n / i ? o.height / i : o.width / n, e.putImageData(a, 0, 0);
    var C = document.createElement("canvas"),
        D = C.getContext("2d");
    C.width = n * b, C.height = i * b, D.scale(b, b), D.drawImage(t, 0, 0), c.clearRect(0, 0, o.width, o.height), c.drawImage(C, 0, 0), minX = 0, minY = 0, maxX *= b, maxY *= b, tmp_canvas.getContext("2d").clearRect(0, 0, o.width, o.height)
}), window.addEventListener("load", function () {
    if (document.getElementById("anysignCanvas")) {
        var t = document.getElementById("anysignCanvas"),
            e = t.getContext("2d"),
            n = getWindowHeight(),
            i = getWindowWidth();
        t.width = i, t.height = .7 * n;
        var a = document.getElementById("anysign_title");
        a.style.height = .1 * n + "px";
        var o = document.getElementById("btnContainerOuter");
        o.style.height = .2 * n + "px";
        var c = window.devicePixelRatio ? window.devicePixelRatio : 1,
            d = t.width * t.height / 142560;
        base_stroke_width = c * d * 2.4;
        var o = document.getElementById("container");
        tmp_canvas = document.createElement("canvas"), tmp_ctx = tmp_canvas.getContext("2d"), tmp_canvas.id = "tmp_canvas", tmp_canvas.width = t.width, tmp_canvas.height = t.height, o.appendChild(tmp_canvas), "ontouchstart" in document.documentElement ? (tmp_canvas.ontouchstart = function (t) {
            return isCopyingImg ? !1 : (t.preventDefault(), isDown = !0, t.touches && (t = t.touches[0]), !1)
        }, tmp_canvas.ontouchmove = function (e) {
            if (isDown && !isCopyingImg) {
                var n = JQuery_Capable.offset(e.target);
                "undefined" != typeof e.targetTouches ? (curX = Math.floor(e.targetTouches[0].pageX - n.left), curY = Math.floor(e.targetTouches[0].pageY - n.top)) : (curX = Math.floor(e.pageX - n.left), curY = Math.floor(e.pageY - n.top));
                var i = e.timeStamp;
                0 !== signTrachPointCount || isNaN(i) || (firstPointTime = i), curX > 0 && curY > 0 && curY <= t.height && (signTrack += isNaN(i) ? curX + "," + curY + "," + base_stroke_width + ",0\n" : curX + "," + curY + "," + base_stroke_width + "," + (i - firstPointTime) + "\n", signTrachPointCount += 1, curX > maxX && (maxX = curX), minX > curX && (minX = curX), curY > maxY && (maxY = curY), minY > curY && (minY = curY), points.push({
                    x: curX,
                    y: curY
                }), onPaint(), lastX = curX, lastY = curY), preventDefault(e)
            }
        }, tmp_canvas.ontouchend = function (t) {
            var e = t.timeStamp;
            signTrack += isNaN(e) ? "0,0,-1,0\n" : "0,0,-1," + (e - firstPointTime) + "\n", signTrachPointCount += 1, isCopyingImg = !0, isDown = !1;
            var n = document.getElementById("anysignCanvas"),
                i = n.getContext("2d");
            i.drawImage(tmp_canvas, 0, 0), tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height), points = [], isCopyingImg = !1
        }, tmp_canvas.ontouchcancel = tmp_canvas.ontouchend) : (tmp_canvas.onmousedown = function (t) {
            isDown = !0
        }, tmp_canvas.onmousemove = function (t) {
            if (isDown) {
                var e = JQuery_Capable.offset(t.target),
                    n = document.body.scrollTop | document.documentElement.scrollTop,
                    i = document.body.scrollLeft | document.documentElement.scrollLeft;
                "undefined" != typeof t.targetTouches ? (curX = Math.floor(t.targetTouches[0].clientX - e.left), curY = Math.floor(t.targetTouches[0].clientY - e.top)) : (curX = Math.floor(t.clientX - e.left), curY = Math.floor(t.clientY - e.top));
                var a = t.timeStamp;
                0 !== signTrachPointCount || isNaN(a) || (firstPointTime = a), curX > 0 && curY > 0 && (signTrack += isNaN(a) ? curX + "," + curY + "," + base_stroke_width + ",0\n" : curX + "," + curY + "," + base_stroke_width + "," + (a - firstPointTime) + "\n", signTrachPointCount += 1, curY += n, curX += i, curX > maxX && (maxX = curX), minX > curX && (minX = curX), curY > maxY && (maxY = curY), minY > curY && (minY = curY), points.push({
                    x: curX,
                    y: curY
                }), onPaint(), lastX = curX, lastY = curY), preventDefault(t)
            }
        }, tmp_canvas.onmouseup = function (t) {
            var e = JQuery_Capable.offset(t.target);
            "undefined" != typeof t.targetTouches ? (curX = Math.floor(t.targetTouches[0].clientX - e.left), curY = Math.floor(t.targetTouches[0].clientY - e.top)) : (curX = Math.floor(t.clientX - e.left), curY = Math.floor(t.clientY - e.top));
            var n = t.timeStamp;
            signTrack += isNaN(n) ? "0,0,-1,0\n" : "0,0,-1," + (n - firstPointTime) + "\n", signTrachPointCount += 1, isDown = !1;
            var i = document.getElementById("anysignCanvas"),
                a = i.getContext("2d");
            a.drawImage(tmp_canvas, 0, 0), tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height), points = []
        }, tmp_canvas.onmouseout = tmp_canvas.onmouseup);
        window.devicePixelRatio ? window.devicePixelRatio : 1;
        e.strokeStyle = signObjTmp ? signObjTmp.penColor : "black", e.lineWidth = base_stroke_width, e.lineCap = "round", e.lineJoin = "round", e.shadowBlur = 5, tmp_ctx.strokeStyle = signObjTmp ? signObjTmp.penColor : "black", tmp_ctx.lineWidth = base_stroke_width, tmp_ctx.lineCap = "round", tmp_ctx.lineJoin = "round", tmp_ctx.shadowBlur = 5
    } else alert("你的浏览器不支持canvas标签,请使用firefox和chrome浏览器")
});
*/
var onPaint = function () {
        if (points.length < 3) {
            var t = points[0];
            return tmp_ctx.beginPath(), tmp_ctx.arc(t.x, t.y, tmp_ctx.lineWidth / 2, 0, 2 * Math.PI, !0), tmp_ctx.fill(), void tmp_ctx.closePath()
        }
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height), tmp_ctx.beginPath(), tmp_ctx.moveTo(points[0].x, points[0].y);
        for (var e = 1; e < points.length - 2; e++) {
            var n = (points[e].x + points[e + 1].x) / 2,
                i = (points[e].y + points[e + 1].y) / 2;
            tmp_ctx.quadraticCurveTo(points[e].x, points[e].y, n, i)
        }
        tmp_ctx.quadraticCurveTo(points[e].x, points[e].y, points[e + 1].x, points[e + 1].y), tmp_ctx.stroke(), isDrawn = !0
    },
    JQuery_Capable = {
        offset: function (t) {
            var e, n, i = "undefined",
                a = {
                    top: 0,
                    left: 0
                },
                o = t,
                c = o && o.ownerDocument;
            return c ? (e = c.documentElement, typeof o.getBoundingClientRect !== i && (a = o.getBoundingClientRect()), n = JQuery_Capable.getWindow(c), {
                top: a.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: a.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : void 0
        },
        getWindow: function (t) {
            return JQuery_Capable.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
        },
        isWindow: function (t) {
            return null != t && t == t.window
        }
    },
    isIe = document.all ? !0 : !1,
    messContent;