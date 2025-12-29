//定时跳动
import axios from "@/utils/request.js"
import {setCacheLoca, getCacheLoca, delCache} from 'imba-cache'
import {userApi} from "@/utils/modules/user.js";

export const setLocal = setCacheLoca
export const getLocal = getCacheLoca
export const removeLocal = delCache
export const refreshToken = () => {
    var url = window.location.href;
    if (url.indexOf("hnredirect") > 0) {
        return
    }
    var refresh_token = "undefined";
    if (getLocal("saber-refreshToken")) {
        refresh_token = JSON.parse(getLocal("saber-refreshToken")).content;
    }
    if (refresh_token == "undefined" || (refresh_token != "undefined" && !refresh_token)) {
        refresh_token = window.localStorage.refresh_token;
    }
    let data = {
        grant_type: "refresh_token",
        refresh_token: refresh_token
    }
    //刷新token
    userApi.refreshToken(data).then((res) => {
        setLocal("refresh_token", res.data.refresh_token);
        setLocal("BladeAuth", res.data.access_token);
    })
}
export const setNumFun = (array, data, timeName1 = 'name', time) => {
    if (!array["values"] && array["values"] != 0) {
        array["values"] = 0
        array.value = Number(data);
    } else {
        timeName1 = setTimeout(() => {
            array["values"] = Number(array.value);
            array.value = Number(data);
        }, time ? time : Math.random() * 5)
    }
}
//echarts 换行
export const ecahrts_hh = (e, max) => {
    var newStr = "";
    var start, end;
    var name_len = e.length;    　　　　　　　　　　　　   //每个内容名称的长度
    var max_name = max;    　　　　　　　　　　　　　　　　　　//每行最多显示的字数
    var new_row = Math.ceil(name_len / max_name); 　　　　// 最多能显示几行，向上取整比如2.1就是3行
    if (name_len > max_name) { 　　　　　　　　　　　　　　  //如果长度大于每行最多显示的字数
        for (var i = 0; i < new_row; i++) { 　　　　　　　　　　　   //循环次数就是行数
            var old = '';    　　　　　　　　　　　　　　　　    //每次截取的字符
            start = i * max_name;    　　　　　　　　　　     //截取的起点
            end = start + max_name;    　　　　　　　　　  //截取的终点
            if (i == new_row - 1) {    　　　　　　　　　　　　   //最后一行就不换行了
                old = e.substring(start);
            } else {
                old = e.substring(start, end) + "\n";
            }
            newStr += old; //拼接字符串
        }
    } else {                                          //如果小于每行最多显示的字数就返回原来的字符串
        newStr = e;
    }
    return newStr;
}
// 两个浮点数求和
export const accAdd = (num1, num2) => {
    var r1, r2, m;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    // return (num1*m+num2*m)/m;
    return Math.round(num1 * m + num2 * m) / m;
}

// 两个浮点数相减
export const accp = (num1, num2) => {
    var r1, r2, m, n;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
}

// 生成 min 到 max 之间的随机
export const getRandomNumber = (min, max) => {
    // 计算范围内的随机数
    let random = Math.random() * (max - min + 1) + min;
    // 向下取整得到整数
    let randomNumber = Math.floor(random);
    // 返回随机数
    return randomNumber;
}

// 保留小数方法
export const toFixedFn = (num1, xsLen = 2) => {
    if (!isNaN(num1)) {
        num1 = Math.round(num1 * 100) / 100;
        let str = num1.toString();
        let rs = str.indexOf('.');
        if (rs < 0) {
            rs = str.length;
            str += '.';
        }
        while (str.length <= rs + xsLen) {
            str += '0';
        }
        // console.log("将浮点数四舍五入，取小数点后2位，位数不够进行补位：");
        // console.log(str);
        return str;
    } else {
        return '0.00'
    }
}

// js中保留4位小数，超过4位截取保留4位，不足4位补足0
export const getFloat = function (number, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
        return Math.round(number);
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
    number = Number(number).toFixed(n); //补足位数
    return number;
}


export const qfw = function (num, check = false) {
    if (num) {
        let nums = Number(num).toFixed(2)
        let newNum = Number(nums).toLocaleString("en-US"); // 数字转成千分位 = 123,456.78
        const numArr = newNum.split("."); // 按小数点吧数字拆分 = [123,456, 78]
        if (!numArr[1]) { // 如果数组没有下标1的元素，就加.00，例：123,456 = 123,456.00
            newNum = newNum + (check ? ".00" : '');
        } else if (numArr[1].length === 1) { // 如果数组下标1的元素只有一位小数，就加个0，例：123,456.7 = 123,456.70
            newNum = newNum + "0";
        } else if (numArr[1].length >= 2) { // // 如果数组下标1的元素小数位大于等于2位，就截取前两位，例：123,456.789 = 123,456.78
            newNum = numArr[0] + "." + numArr[1].substr(0, 2);
        }
        return newNum;
    } else {
        return check ? "0.00" : '0'
    }
}
// 两数相除
export const accSub = function (num1, num2) {
    var t1, t2, r1, r2;
    try {
        t1 = num1.toString().split('.')[1].length;
    } catch (e) {
        t1 = 0;
    }
    try {
        t2 = num2.toString().split(".")[1].length;
    } catch (e) {
        t2 = 0;
    }
    r1 = Number(num1.toString().replace(".", ""));
    r2 = Number(num2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

export const accMul = function (num1, num2) {
    var m = 0, s1 = num1.toString(), s2 = num2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

export const SetUnitConversion = function (num = 0, dw, len = 2) {
    var moneyUnits = ["", "万元", "亿元", "万亿"]
    // var moneyUnits = []
    if (dw == '元') {
        moneyUnits = ["元", "万元", "亿元", "万亿"]
    }
    if (dw == '户') {
        moneyUnits = ["户", "万户", "亿户"]
    }

    var dividend = 10000;
    var curentNum = num;
    //转换数字
    var curentUnit = moneyUnits[0];
    //转换单位
    for (var i = 0; i < 4; i++) {
        curentUnit = moneyUnits[i]
        if (StrNumSize(curentNum) < 5) {
            break;
        }
        curentNum = curentNum / dividend
    }
    var m = {num: 0, unit: ""}
    m.num = DonetoFixed(curentNum, 2).toFixed(len)
    m.unit = curentUnit;
    return m;
}


export const SetUnitConversion2 = function (amountStr, dw) {
    // 清理输入中的非数字和小数点字符
    // 清理输入并转换为数字
    const num = parseFloat(amountStr.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return "0元";

    let value, unit;

    // 分级判断

    if (dw == '户') {
        if (num >= 100000000) {
            value = num / 100000000;
            unit = "亿户";
        } else if (num >= 10000) {
            value = num / 10000;
            unit = "万户";
        } else {
            value = num;
            unit = "户";
        }
    } else {
        if (num >= 100000000) {
            value = num / 100000000;
            unit = "亿元";
        } else if (num >= 10000) {
            value = num / 10000;
            unit = "万元";
        } else {
            value = num;
            unit = "元";
        }
    }


    // 格式化处理
    let [integer, decimal] = value.toFixed(4).split(".");
    //integer = integer.replace(/^0+(?=\d)/, ""); // 去除前导零（保留至少一位）

    // 处理小数部分
    //decimal = decimal.replace(/0+$/, "");
    const formatted = decimal ? `${integer}.${decimal}` : integer;

    return {
        num: formatted,
        unit: unit
    }
    //formatted + unit;

}


function StrNumSize(tempNum) {
    var stringNum = tempNum.toString()
    var index = stringNum.indexOf(".")
    var newNum = stringNum;
    if (index != -1) {
        newNum = stringNum.substring(0, index)
    }
    return newNum.length
}

// function DonetoFixed(num, count) {//保留两位不四舍五入
//   var newNum = parseInt(num * Math.pow(10, count)) / Math.pow(10, count);
function DonetoFixed(num, count) {//保留两位并四舍五入
    var newNum = Math.round(num * Math.pow(10, count)) / Math.pow(10, count);
    return newNum;
}

export const echarts_tooltip = function (keyList = () => {
}, className = 'echarts_tooltip') {
    return {
        trigger: 'axis',
        className: className,
        formatter: (params) => {
            let conter = ''
            keyList(params).map(i => {
                let icon = i.icon ? `<div class="icon" style="background: ${i.icon}"></div>` : ''
                conter += `<div class="tooltips_box_item">
                    <div class="tooltips_box_item_left itemCenter">
                          ${icon}
                          ${i.label}:
                    </div>
                    <div class="tooltips_box_item_right">${i.key}${i.dw}</div>
              </div>`
            })
            return `<div class="tooltips">
                       <div class="tooltips_title">${params[0].name}</div>
                       <div class="tooltips_box"> ${conter}</div>
               </div>`
        }
    }
}

// 判断税务机关代码类型  返回 0-省 1-市 2-区县 3-科所
export const swjgdmls = (value = '') => {
    if (value.slice(-8) == '00000000') {
        return 0
    } else if (value.slice(-6) == '000000') {
        return 1
    } else if (value.slice(-4) == '0000') {
        return 2
    } else if (value.slice(-2) == '00') {
        return 3
    }
}

// 返回年份
export const getYearList = (starts = 2019, dw = '') => {
    let arr = [], end = new Date().getFullYear()
    for (let i = starts; i <= end; i++) {
        arr.push({
            label: i + dw,
            value: i
        })
    }
    return arr
}
//value 文字 数组[0] 文字大小 数组[1] 数字大小 size 默认大小
export const getSelectWidth = (value = '', arr = [16, 16], size) => {
    let max = 0
    //获取数字
    max += value.match(/[a-zA-Z0-9]/g)?.join('').length * arr[1] || 0
    //特殊符号 中文
    max += value.match(/[^a-zA-Z0-9]/g)?.join('').length * arr[0] || 0
    return (!max ? size : max + 50) + 'px'
}
export const downloadFile = async (url = '', name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name || 'downloaded_file'; // 指定下载文件名
    document.body.appendChild(link); // 需要先添加到DOM
    link.click();
    document.body.removeChild(link); // 下载完成后移除元素
}

export const getMapArea = (points) => {
    const R = 6378137; // 地球半径（米）
    let area = 0;
    const len = points.length;

    for (let i = 0; i < len; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % len]; // 下一个点，最后一个点连接第一个点形成闭合多边形

        const x1 = (p1.jd * Math.PI / 180) * Math.cos(p1.wd * Math.PI / 180);
        const y1 = p1.wd * Math.PI / 180;
        const x2 = (p2.jd * Math.PI / 180) * Math.cos(p2.wd * Math.PI / 180);
        const y2 = p2.wd * Math.PI / 180;

        area += (x1 * y2 - x2 * y1);
    }
    return (Math.abs(area) / 2 * R * R).toFixed(2);
}
export const deepCopy = (obj) => {
    const deepCopy = (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof Array) return obj.map(item => deepCopy(item));
        if (obj instanceof Object) {
            const copy = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    copy[key] = deepCopy(obj[key]);
                }
            }
            return copy;
        }
    };
    return deepCopy(obj);
};

const ajax_gg = (url, params) => {
    // Promise
}