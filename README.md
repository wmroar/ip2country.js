
#### 1. 安装

```
npm install ip2country.js
```
#### 2. example

```
const {ip2country} = require("ip2country.js");
const countryCodeV4 = ip2country("37.73.88.37");

const countryCodeV6 = ip2country("2a02:8070:c69d:db00:ca0:ca0e:8235:1a33");
```

#### 3. 数据来源

```
https://www.maxmind.com/en/accounts/current/geoip/downloads

找到 GeoLite2 Country: CSV Format, 下载之后, 解压到本项目的data目录下, 然后执行

node tools.js, 会更新数据
```