function Context() {
 /*   this.privKey = "MIIEpQIBAAKCAQEAzwUWJ9nE3QtNWi887HciO1hwFvNhWrx1dyIcwbXhDI9W1nxVC4qokFRiG/trKYBsQy7lWfaIgBC07zSL2iGdhqkl16SqalPgTya/DcrDg/q5osL8izXsfdcr5HfYFIILcial2CaEjJlQCT4PkVLf0y2PR/sBkQu5Y1CAZIJJLoZ6V/b9"
                   + "qqKi2WY3kOtqBLDi52DwhhLsvPaOv2WYuOFcw1o+8HjuaoMAsJQWFz1BoPnFhHV88o4JvU/17V5C3onVk6AiPHLWvhzBFegaMoz8kOlHf74YGE17VR5zIqHozaPdhtCk7SBcwfMgnZfjRf5CJrUtN8H5pD5bpKoSWKG/ewIDAQABAoIBABXX4I2V4bq9DY1d"
                   + "fJ0quNbwLuuNBJGxXueSFtytlzBfE3eQKN0N5VlNPgjbz2PSpBm2ogaLB74ThTPUJImAkIF76X1GZ6DOdtWDLheDdHvBgcLVthXuO6TPhlcV+hu32QNTZp5W+hdnudUv0i6wQuOiZALhTjoCta3v+YwhXx1kbGLQ0FDTOOuGJkMA+o1dS/cg5boGZBdZJih7"
                   + "E6bZGPaNPzqceSYou+93GT25xH0Cvq1JwQEvsVkBkG1T94LlH0i62TTBgcOB1JZ+EgR9i+kZC3DhS+uwiRYNkupXrVcxjBUwV6ty+uSvEtmdi1/miABXzyWWVPt8nsOmJtJCXVkCgYEA9vXYrxV2eP4cHldiWibdCZ1tyi1Hv3jWR3Yj+wxUrPuRSDusECx6"
                   + "IKG57sgbuR/F1SZXwdFPl5Za1U1iLTiiUJAaZMPpQ38no4eKBuVc1jNNwYJyd5Fu7O2swhnpl5QpV1qAwKM9XJlycIiBCQqgrI2oD6X4IfoAdBa1kvNGKw0CgYEA1pj535tyN3PjJrHYOq/j3d0c/SU4FpT4kr+kA0Mo/wStPjxrSiwL+0LUDlOSvESqO4Tc"
                   + "c8Fx4qIONizVvJ4kvuIM8W0I1YNQLvsl0liR1VcE+eel2sLmhinkDOxXCbRt7T/Ob0Xmw5q2roCCb47Z8QHdVx9WwptWSsLABYH30qcCgYEAg9gEcpSWx0mCYYBtdYvB/dwaPRGneEVewJAF7YVLv34etd2FoqzcFofA6AXVJyQbTgxGVacVQux2WeISQ+o0"
                   + "XaZRMPKWmf5MfzVhLwVMZt7E6EZoLgVqnvrUfFuxJcdnuscKbc24eLNDMWju2pDd7sFBs/j7W8hIbbGiBm3yTBECgYEAhHOS9mK5UmSitQVb0o0xdYS+GbjZL4bvDZRfJOxU52H5k8oy5mrdUk3jGJyYmr8+2tGcR44EPr+LSgDOQ0bQo0heeLy1kSMlYHn+"
                   + "1B96k1TMa3qAsc9N/UzpxtgwuHq2xpJ1VdStI9ngG0CSQUzIU6q09MsQ/7hkwGwHnN6lGU0CgYEAu1sPOqShEo3lOj+xtUFaWO4Gi4sCaKfPHdf9xX7gZKmRM7BGjQdzoIT8yuvRmmFovbcK2htaAK1rPENlj5H8xzv5Wez2nhuJbmo/Jsq1l8oZhYZ++981"
                   + "+6CNUlPyCyzR2n/WXb8QGkuUxblYNdTAW0y6yPzK39EWt8SH8Pk3ohg=";
    this.pubKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzwUWJ9nE3QtNWi887HciO1hwFvNhWrx1dyIcwbXhDI9W1nxVC4qokFRiG/trKYBsQy7lWfaIgBC07zSL2iGdhqkl16SqalPgTya/DcrDg/q5osL8izXsfdcr5HfYFIILcial2CaEjJlQCT4PkVLf"
                  + "0y2PR/sBkQu5Y1CAZIJJLoZ6V/b9qqKi2WY3kOtqBLDi52DwhhLsvPaOv2WYuOFcw1o+8HjuaoMAsJQWFz1BoPnFhHV88o4JvU/17V5C3onVk6AiPHLWvhzBFegaMoz8kOlHf74YGE17VR5zIqHozaPdhtCk7SBcwfMgnZfjRf5CJrUtN8H5pD5bpKoSWKG/"
                  + "ewIDAQAB";*/
    this.privKey = "MIIEowIBAAKCAQEA0cuapB0AQsC4Hly7SD9XkS6XlUMXHe7pBhYDA0YSOKG4S/+3LMBH2jUibknLYaMAxrO/tCdjL2YHVZ6VCfrHewVvZrZbr6DbBNFs5kOiR5UFocdYYuPl1eaXjtEn+mJK5A8yaMr7kK1Jbl4iyAvxDBaNHQChXpT9FXmPe/YPOMiIhoKnVoge99Y0yTPEEaTVv0NJWElIWOqd1r67cNIsNhRGwaiCYE8IZIZQYfkeHAIDY+ll222kPYXU5pDIbXAw47KRN5NtSyyDLiET31uJOiPp8RrK+rvvAwlQz0b58LvtDtmTZV4tbGM+aqRHkcwCszddFcG2+fr9zvj04CSRawIDAQABAoIBACFtOWRwonwATNW5"
                + "nLV0MjWVoN1NZT+Fs2ce1rgM0BZp3f1t7veYY1pnIOdFprwVxqfiN+cyZ2FD9mMz8zc119bIFOneoFkpXfw0ig9eM1sIaW9PXcvT1+ju5rMArEf+pUQVD8kWnmJ82bhWE2CgVnXAmhdG5G83eeOUDMKJf/9h2gX537+t9CkwiZ5HG4lZPqWauswGmTMhHiT+ZKLzVYOXpD+I+ORTqTicH5BpMH3GDabtOmJ929/d7MgG0U3OMxhVSggdWs9YWugtSj179N6gwu3ciXQY3o27Vkb3tEimB4vK2Ss+3J2TvhxuoG+R9vk16SVv1vKwOTlJGF5v1YECgYEA/fb5WZgj4jla4lEjlPhSboRSpWjFQjbtgyOurpLQDQjKcdSpj8ll"
                + "//udqRXgT6vC+kbXLYnEdFC5opMFz6tz61xd/4zU00T0fcHrz8ECyqjFyEjwl4Vu2nfI0+H2bXNjOC+hOOvN6cBSxTweipO17ywVWbSDIFkzL/8lvsUJLGECgYEA03oDc3X6O31/B2E+xQempEFUXPd5TgV+LSIPRlmFw2n2blIFwLD7bmQrL8qVOrprYBLZzNiX0hVBLD9Z6AW2OxJUKvU9hlhR9A1TKnSXJ4hazt/UgjBzgYduFpaTfzFvpiqfchs5SJ0Zv4oY9lsj/P42NLkJuL3tHrpXQ9i2MUsCgYACaA2y0KM+aIa48EXjCntVesGBub1sxDJ59KOaGeAIz5WDgJ1etGzYAR1cVc27U4hUcMlnMBABfiZUKQp8DkbZ"
                + "6xUk78OwgM3ER0shu9V38CN3o2FMPkJvpYTspQ59uQMurBzd+jYISf8+yTQM4htuOb+2CuTXMKEwij1kUl+k4QKBgQC0F61Gr4rJDMeX/k2ZNznHmccBYNLSCcV5JA9EBsruLpfpPTqe7VlBmlZY3bmWCNmWOJd4Zl9sTiNxTgX/nJWi2qoI505c0WwBXTOc7SsoRGuoz17G/AHxpeavn82+PNhq9tNQNjTjTL53qmA1tEoCkm6RGZ9Yz41WZLQaGDyX3wKBgGm43VqGvpf1ns3xFid15NlDZjHJ46YMnSz11Bw7vI6wWT1f9loQ30qTMEAK3VbJSCEzF9sU6SxlJZCbThLq8T68JSu6Bm8Frlrl1Eq1Hmf851bvuAB5LHvJ"
                + "5M0bJuakh29dfsFvx0jYqUwf57r4OJq4iQaC+MMHSE2tKLXrm0x2";
  this.pubKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWETgoOiqSu/N7AFL0CBZdutei1Jeda5t0ezLYpfb+y6hXA4VZgQCTPyc7dPumcB3c8sag0wVY9T9Wkk4NvP5LH0DjNGzKmGlByRdjn9mamfzBSwPnX+rJfpT8K52IsSZZbxCF0u3WOWMpY7UaO66zV3UPefvlGmNrIwVElyH1Zwv8+tyb8LkdGjZYYUN6+hkjrGlDrq4ytZ2Ok9LnPSDFh229Yl59Nny6TM8teC0wgSUjC5L3Ik9Sis9EwzXNj9BZgIDPkfFXxhinLQG6GdwE2SlAat2k8PkEocSobthNf0Jn90ubsKgPcCtywEcGszn3muZ8O2wFrhcJpKxW2QIQIDAQAB"

                  
    this.pem = pidCryptUtil.decodeBase64(this.pubKey);
    this.pem2 = pidCryptUtil.decodeBase64(this.privKey);

    this.splitFrame = (frame, chunkLength) => {
        var largo = frame.length;
        var inicio = 0;
        var result = [];
        do {
            result.push(frame.substr(inicio, chunkLength));
            inicio += chunkLength;
        } while (inicio < largo);
        return result;
    };

    this.encrypt = (clearText) => {
        var rsa = new pidCrypt.RSA();
        var asn = pidCrypt.ASN1.decode(pidCryptUtil.toByteArray(this.pem));
        var tree = asn.toHexTree();
        rsa.setPublicKeyFromASN(tree);
        var aux = this.splitFrame(clearText, 160);
        var temp = [];
        for (i in aux) {
            temp.push(rsa.encrypt(aux[i]));
        }
        return temp.join("");
    };

    this.decrypt = (cipherText) => {
        var rsa = new pidCrypt.RSA();
        var asn = pidCrypt.ASN1.decode(pidCryptUtil.toByteArray(this.pem2));
        var tree = asn.toHexTree();
        rsa.setPrivateKeyFromASN(tree);
        var aux = this.splitFrame(cipherText, 512);
        var temp = [];
        for (i in aux) {
            temp.push(rsa.decrypt(aux[i]));
        }
        return temp.join("");
    };
}





