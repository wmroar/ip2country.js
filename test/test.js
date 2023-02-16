const assert = require("assert");
const {describe, it} = require("mocha");
const {ip2county} = require("../index");

describe("IPV4", function() {
    it("should return SE", function() {
        const code = ip2county("62.115.178.200");
        assert.equal(code, "SE");
    });
    it("should return KR", function() {
        const code = ip2county("1.208.104.38");
        assert.equal(code, "KR");
    });
    it("should return HONGKONG", function() {
        const code = ip2county("175.45.20.138");
        assert.equal(code, "HK");
    });
    it("should return USA", function() {
        const code = ip2county("140.99.172.124");
        assert.equal(code, "US");
    });
    it("should return Italy", function() {
        const code = ip2county("151.29.239.197");
        assert.equal(code, "IT");
    });
    it("should return UKline", function() {
        const code = ip2county("37.73.88.37");
        assert.equal(code, "UA");
    });
    it("should return China", function() {
        const code = ip2county("180.111.217.148");
        assert.equal(code, "CN");
    });
    it("should return unkown", function() {
        const code = ip2county("127.0.0.8");
        assert.equal(code, "unkown");
    });
});

describe("IPV6", function() {
    it("should return DE", function() {
        const code = ip2county("2a02:8070:c69d:db00:ca0:ca0e:8235:1a33");
        assert.equal(code, "DE");
    });
    it("should return Brasil", function() {
        const code = ip2county("2804:7f4:8280:23b6:758a:a9b:7a01:cdfa");
        assert.equal(code, "BR");
    });
});