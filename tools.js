const path = require("path");
const fs = require("fs");
const {BigNumber} = require("bignumber.js");
const zlib = require("zlib");

function _readFile(fileName) {
    const ret = fs.readFileSync(path.join(__dirname, "data", fileName)).toString().trim();
    return ret.split("\n").slice(1);
}

function _readCountryLocation() {
    const fileData = _readFile("GeoLite2-Country-Locations-en.csv");
    const data = {};
    for (let one of fileData) {
        const geoInfo = one.split(",");
        const geoId = geoInfo[0];
        const continentCode = geoInfo[2];
        const countryCode = geoInfo[4];
        const contryName = geoInfo[5];
        if (countryCode) {
            data[geoId] = {code: countryCode, continentCode: continentCode};
        } else {
            console.log(countryCode, geoId, contryName);
        }
    }
    return data;
}

function _readIp(fileName) {
    const fileData = _readFile(fileName);
    const data = [];
    for (let one of fileData) {
        const ipInfo = one.split(",");
        if (ipInfo.length === 1) {
            continue;
        };
        const ipRange = ipInfo[0];
        const geoId = ipInfo[1] || ipInfo[2];
        data.push({
            ipRange,
            geoId
        });
    }
    return data;
}

function ipv4ToNum(ip) {
    let ret = 0;
    ip.split(".").map((item) => (ret = (ret << 8) + parseInt(item)));
    return ret >>> 0;
}

function ipv6ToNum(ipv6) {
    const oriLen = ipv6.split(":").length;
    if (oriLen !== 8) {
        ipv6 = ipv6.replace("::", new Array(8 + 2 - oriLen).fill(":0").join(""));
    }
    const cols = ipv6.split(":");
    let ret = new BigNumber(0);
    cols.map((item) => {
        ret = ret.multipliedBy(65536).plus(new BigNumber(`0x${item || 0}`));
    });
    return ret;
}

function _parseIpv4toIntRange(ipRange) {
    const ipInfo = ipRange.split("/");
    const ip = ipInfo[0];
    const mask = Number(ipInfo[1]);
    const ips = ipv4ToNum(ip);
    const ipe = ips + (1 << (32 - mask)) - 1;
    return {ips, ipe};
}

function _parseIpv6toIntRange(ipRange) {
    const ipInfo = ipRange.split("/");
    const ip = ipInfo[0];
    const mask = Number(ipInfo[1]);
    const ips = ipv6ToNum(ip);
    const ipe = ips.plus(new BigNumber(2).pow(128-mask)).minus(1);
    return {ips: `0x${ips.toString(16)}`, ipe: `0x${ipe.toString(16)}`};
}

function readIpv4() {
    return _readIp("GeoLite2-Country-Blocks-IPv4.csv");
}

function _readIpv6() {
    return _readIp("GeoLite2-Country-Blocks-IPv6.csv");
}

function _doParseIpv4(gemIdCountryMap) {
    const ipv4s = readIpv4();
    const finals = [];
    for(let one of ipv4s) {
        const parsedIntIPRange = _parseIpv4toIntRange(one.ipRange);
        const ret = {...parsedIntIPRange, ...gemIdCountryMap[one.geoId]};
        finals.push(ret);
    }
    finals.sort((a, b) => a.ips - b.ips);
    return finals;
}

function _doParseIpv6(gemIdCountryMap) {
    const ipv6s = _readIpv6();
    const finals = [];
    for(let one of ipv6s) {
        const parsedIntIPRange = _parseIpv6toIntRange(one.ipRange);
        const ret = {...parsedIntIPRange, ...gemIdCountryMap[one.geoId]};
        finals.push(ret);
    }
    finals.sort((a, b) => (new BigNumber(a.ips)).gt(new BigNumber(b.ips)) ? 1: -1);
    return finals;
}

async function _saveFile(fileName, data) {
    fs.writeFileSync(path.join(__dirname, "data", fileName), zlib.gzipSync(Buffer.from(JSON.stringify(data), "utf-8")));
}

function parseCsv2Json() {
    const gemIdCountryMap = _readCountryLocation();
    const ipv4s = _doParseIpv4(gemIdCountryMap);
    const ipv6s = _doParseIpv6(gemIdCountryMap);
    _saveFile("ipv4s.json.gz", ipv4s);
    _saveFile("ipv6s.json.gz", ipv6s);
};

if (require.main === module) {
    parseCsv2Json();
}

module.exports = {
    ipv4ToNum,
    ipv6ToNum
};