if (typeof (pidCrypt) != "undefined" && typeof (BigInteger) != "undefined" && typeof (SecureRandom) != "undefined" && typeof (Arcfour) != "undefined") {
    function parseBigInt(b, a) {
        return new BigInteger(b, a)
    }
    function linebrk(c, d) {
        var a = "";
        var b = 0;
        while (b + d < c.length) {
            a += c.substring(b, b + d) + "\n";
            b += d
        }
        return a + c.substring(b, c.length)
    }
    function byte2Hex(a) {
        if (a < 16) {
            return "0" + a.toString(16)
        }
        else {
            return a.toString(16)
        }
    }
    function pkcs1unpad2(f, g) {
        var a = f.toByteArray();
        var e = 0;
        while (e < a.length && a[e] == 0) {
            ++e
        }
        if (a.length - e != g - 1 || a[e] != 2) {
            return null
        }
++e;
        while (a[e] != 0) {
            if (++e >= a.length) {
                return null
            }
        }
        var c = "";
        while (++e < a.length) {
            c += String.fromCharCode(a[e])
        }
        return c
    }
    function pkcs1pad2(d, f) {
        if (f < d.length + 11) {
            alert("Message too long for RSA");
            return null
        }
        var e = new Array();
        var c = d.length - 1;
        while (c >= 0 && f > 0) {
            e[--f] = d.charCodeAt(c--)
        }
        e[--f] = 0;
        var b = new SecureRandom();
        var a = new Array();
        while (f > 2) {
            a[0] = 0;
            while (a[0] == 0) {
                b.nextBytes(a)
            }
            e[--f] = a[0]
        }
        e[--f] = 2;
        e[--f] = 0;
        return new BigInteger(e)
    }
    pidCrypt.RSA = function () {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null
    };
    pidCrypt.RSA.prototype.doPrivate = function (a) {
        if (this.p == null || this.q == null) {
            return a.modPow(this.d, this.n)
        }
        var c = a.mod(this.p).modPow(this.dmp1, this.p);
        var b = a.mod(this.q).modPow(this.dmq1, this.q);
        while (c.compareTo(b) < 0) {
            c = c.add(this.p)
        }
        return c.subtract(b).multiply(this.coeff).mod(this.p).multiply(this.q).add(b)
    };
    pidCrypt.RSA.prototype.setPublic = function (c, b, a) {
        if (typeof (a) == "undefined") {
            a = 16
        }
        if (c != null && b != null && c.length > 0 && b.length > 0) {
            this.n = parseBigInt(c, a);
            this.e = parseInt(b, a)
        }
        else {
            alert("Invalid RSA public key")
        }
    };
    pidCrypt.RSA.prototype.doPublic = function (a) {
        return a.modPowInt(this.e, this.n)
    };
    pidCrypt.RSA.prototype.encryptRaw = function (d) {
        var a = pkcs1pad2(d, (this.n.bitLength() + 7) >> 3);
        if (a == null) {
            return null
        }
        var e = this.doPublic(a);
        if (e == null) {
            return null
        }
        var b = e.toString(16);
        if ((b.length & 1) == 0) {
            return b
        }
        else {
            return "0" + b
        }
    };
    pidCrypt.RSA.prototype.encrypt = function (a) {
        a = pidCryptUtil.encodeBase64(a);
        return this.encryptRaw(a)
    };
    pidCrypt.RSA.prototype.decryptRaw = function (b) {
        var d = parseBigInt(b, 16);
        var a = this.doPrivate(d);
        if (a == null) {
            return null
        }
        return pkcs1unpad2(a, (this.n.bitLength() + 7) >> 3)
    };
    pidCrypt.RSA.prototype.decrypt = function (b) {
        var a = this.decryptRaw(b);
        a = (a) ? pidCryptUtil.decodeBase64(a) : "";
        return a
    };
    pidCrypt.RSA.prototype.setPrivate = function (d, b, c, a) {
        if (typeof (a) == "undefined") {
            a = 16
        }
        if (d != null && b != null && d.length > 0 && b.length > 0) {
            this.n = parseBigInt(d, a);
            this.e = parseInt(b, a);
            this.d = parseBigInt(c, a)
        }
        else {
            alert("Invalid RSA private key")
        }
    };
    pidCrypt.RSA.prototype.setPrivateEx = function (e, i, a, d, c, h, g, b, f) {
        if (typeof (f) == "undefined") {
            f = 16
        }
        if (e != null && i != null && e.length > 0 && i.length > 0) {
            this.n = parseBigInt(e, f);
            this.e = parseInt(i, f);
            this.d = parseBigInt(a, f);
            this.p = parseBigInt(d, f);
            this.q = parseBigInt(c, f);
            this.dmp1 = parseBigInt(h, f);
            this.dmq1 = parseBigInt(g, f);
            this.coeff = parseBigInt(b, f)
        }
        else {
            alert("Invalid RSA private key")
        }
    };
    pidCrypt.RSA.prototype.generate = function (b, i) {
        var a = new SecureRandom();
        var f = b >> 1;
        this.e = parseInt(i, 16);
        var c = new BigInteger(i, 16);
        for (;;) {
            for (;;) {
                this.p = new BigInteger(b - f, 1, a);
                if (this.p.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                    break 
                }
            }
            for (;;) {
                this.q = new BigInteger(f, 1, a);
                if (this.q.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                    break 
                }
            }
            if (this.p.compareTo(this.q) <= 0) {
                var h = this.p;
                this.p = this.q;
                this.q = h
            }
            var g = this.p.subtract(BigInteger.ONE);
            var d = this.q.subtract(BigInteger.ONE);
            var e = g.multiply(d);
            if (e.gcd(c).compareTo(BigInteger.ONE) == 0) {
                this.n = this.p.multiply(this.q);
                this.d = c.modInverse(e);
                this.dmp1 = this.d.mod(g);
                this.dmq1 = this.d.mod(d);
                this.coeff = this.q.modInverse(this.p);
                break 
            }
        }
    };
    pidCrypt.RSA.prototype.getASNData = function (a) {
        var e = {
        };
        var c = [];
        var d = 0;
        if (a.value && a.type == "INTEGER") {
            c[d++] = a.value
        }
        if (a.sub) {
            for (var b = 0;b < a.sub.length;b++) {
                c = c.concat(this.getASNData(a.sub[b]))
            }
        }
        return c
    };
    pidCrypt.RSA.prototype.setKeyFromASN = function (c, e) {
        var d = ["N", "E", "D", "P", "Q", "DP", "DQ", "C"];
        var f = {
        };
        var a = this.getASNData(e);
        switch (c) {
            case "Public":
            case "public":
            for (var b = 0;b < a.length;b++) {
                f[d[b]] = a[b].toLowerCase()
            }
            this.setPublic(f.N, f.E, 16);
            break;
            case "Private":
            case "private":
            for (var b = 1;b < a.length;b++) {
                f[d[b - 1]] = a[b].toLowerCase()
            }
            this.setPrivateEx(f.N, f.E, f.D, f.P, f.Q, f.DP, f.DQ, f.C, 16);
            break 
        }
    };
    pidCrypt.RSA.prototype.setPublicKeyFromASN = function (a) {
        this.setKeyFromASN("public", a)
    };
    pidCrypt.RSA.prototype.setPrivateKeyFromASN = function (a) {
        this.setKeyFromASN("private", a)
    };
    pidCrypt.RSA.prototype.getParameters = function () {
        var a = {
        };
        if (this.n != null) {
            a.n = this.n
        }
        a.e = this.e;
        if (this.d != null) {
            a.d = this.d
        }
        if (this.p != null) {
            a.p = this.p
        }
        if (this.q != null) {
            a.q = this.q
        }
        if (this.dmp1 != null) {
            a.dmp1 = this.dmp1
        }
        if (this.dmq1 != null) {
            a.dmq1 = this.dmq1
        }
        if (this.coeff != null) {
            a.c = this.coeff
        }
        return a
    }
};