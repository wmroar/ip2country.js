const net = require("net");
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

const curDIR = __dirname;

const readBufferV4 = fs.readFileSync(path.join(curDIR, "./data/ipv4s.json.gz"));
const decodeBufferV4 = zlib.gunzipSync(readBufferV4);
const ipv4s = JSON.parse(decodeBufferV4.toString());

const readBufferV6 = fs.readFileSync(path.join(curDIR, "./data/ipv6s.json.gz"));
const decodeBufferV6 = zlib.gunzipSync(readBufferV6);
const ipv6s = JSON.parse(decodeBufferV6.toString());

const {BigNumber} = require("bignumber.js");
const {ipv4ToNum, ipv6ToNum} = require("./tools");

// binary search for ipv6
function _searchIPv4(ipv4) {
    const myIpNum = ipv4ToNum(ipv4);
    let left = 0;
    let right = ipv4s.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        const midIpInfo = ipv4s[mid];
        if (myIpNum < midIpInfo.ips) {
            right = mid - 1;
        } else {
            if (myIpNum <= midIpInfo.ipe) {
                return ipv4s[mid];
            } else {
                left = mid + 1;
            }
        }
    }
    return null;
}

// binary search for ipv6
function _searchIPv6(ipv6) {
    const myIpNum = ipv6ToNum(ipv6);
    let left = 0;
    let right = ipv6s.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        const midIpInfo = ipv6s[mid];
        if (myIpNum.lt(new BigNumber(midIpInfo.ips))) {
            right = mid - 1;
        } else {
            if (myIpNum.lte(new BigNumber(midIpInfo.ipe))) {
                return ipv6s[mid];
            } else {
                left = mid + 1;
            }
        }
    }
    return null;
}

function ip2country(ip) {
    let ret;
    if (net.isIPv4(ip)) {
        ret = _searchIPv4(ip);
    } else if (net.isIPv6(ip)) {
        ret = _searchIPv6(ip);
    }

    // return ret?.code ?? "unkown";
    if (ret) {
        return ret.code;
    };
    return "unkown";
}

module.exports = {
    ip2country
};

