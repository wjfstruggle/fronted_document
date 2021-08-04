/**
 * @param {string} str
 * @returns {Boolean}
 */

//用户名称
export function validateName(rule, value, callback) {
    if (!value) {
        return callback(new Error('用户名称不能为空！'));
    }
    else if (value.length < 6 || value.length > 20) {
        return callback(new Error('用户名称在6到20个字符！'));
    }

    const name = /^(?![0-9]*$)[a-zA-Z0-9]{6,20}$/;
    if (!name.test(value)) {
        callback(new Error(rule.message || '仅支持字母和数字，不能为纯数字，可为纯字母，字母不分大小写'))
    }
    else {
        callback();
    }
}

/**
 * 校验输入金额
 * @param {string} str
 * @returns {Boolean}
 */

export function validateNumber(rule, value, callback) {
    if (!value) {
        return callback(new Error('请输入金额！'));
    }
    else if (value < 0 || value > 999999999.99) {
        return callback(new Error('请输入0～999999999.99范围的数字'));
    }
    else {
        callback();
    }
}

/**
 * 文字超出
 * @param {string} str
 * @returns {Boolean}
 */

export function validateText(value, len, callback) {
    if (!value) {
        return callback(new Error('请输入内容！'));
    }
    else if (value.length > len) {
        return callback(new Error(`内容在${len}个文字`));
    }
    else {
        callback();
    }
}

/**
 * 验证是否效的url
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

/**
 * 是否小写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/**
 * 是否是正整数
 * @param {*} str 
 */
export function validIfNum(str) {
    const reg = /^[+]{0,1}(\d+)$/
    return reg.test(str)
}

/**
 * 是否大写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/**
 * 是否字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/**
 * 邮箱验证
 * @param {string} email
 * @returns {Boolean}
 */
export function validateEmail(rule, value, callback) {
    const re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (re.test(value)) {
        callback();
    } else {
        return callback(new Error('请输入正确格式邮箱！'));
    }
}

/**
 * 密码验证
 * @param {string} password
 * @returns {Boolean}
 */
export function validatePassword(rule, value, callback) {
    if (!value) {
        return callback(new Error('密码不能为空！'));
    }
    const password = /^[a-zA-Z0-9_-]{6,20}$/;
    if (password.test(value)) {
        callback();
    } else {
        callback(new Error('密码不能有空格或特殊字符，长度为6-20'));
    }
}

/* 获取验证码 */
export const resend = element => {
    // console.log(element)
    var num = 60
    var timer = setInterval(function () {
        num--
        element.innerHTML = num + '秒后重新获取'
        element.style.color = ' #ccc'
        element.disabled = ' disabled'
        if (num === 0) {
            element.disabled = ''
            element.style.color = ' #ffa600'
            element.innerHTML = '获取验证码'
            clearInterval(timer)
        }
    }, 1000)
}

/**
 * 手机号码验证
 */
export function validatePhone(rule, value, callback) {
    const phone = /^1[34578][0-9]{9}$/;
    if ((phone.test(value))) {
        callback();
    } else {
        callback(new Error('请输入正确的手机号'));
    }
}

/**
 * 固话验证
 */
export function validateTelephone(rule, value, callback) {
    const phone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if (phone.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的办公号码'));
    }
}


/**
 * 身份证号码校验
 */
export function validateIdCardNumber(rule, value, callback) {
    const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if (!value) {
        return callback(new Error('身份证号码不能为空！'));
    }
    if (!format.test(value)) {
        return callback(new Error('身份证号码不正确'))
    }
    //区位码校验
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    if (!city[value.substr(0, 2)]) {
        return callback(new Error('地址编码错误'))
    }
    //出生年月日校验   前正则限制起始年份为1900;
    var year = value.substr(6, 4),//身份证年
        month = value.substr(10, 2),//身份证月
        date = value.substr(12, 2),//身份证日
        time = Date.parse(month + '-' + date + '-' + year),//身份证日期时间戳date
        now_time = Date.parse(new Date()),//当前时间戳
        dates = (new Date(year, month, 0)).getDate();//身份证当月天数
    if (time > now_time || date > dates) {
        return callback(new Error('出生年月日不正确'))
    }
    //校验码判断
    var c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];   //系数
    var b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];  //校验码对照表
    var value_array = value.split("");
    var sum = 0;
    for (var k = 0; k < 17; k++) {
        sum += parseInt(value_array[k]) * parseInt(c[k]);
    }
    if (value_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
        return callback(new Error('身份证系数不正确'))
    }
    else {
        callback()
    }
}
// 递归方法,去掉类目树children为空
export function getTreeData(data) {
    // 循环遍历json数据
    if (data == null || data.length == 0) {
        return;
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
            // children若为空数组，则将children设为undefined
            data[i].children = undefined;
        } else {
            // children若不为空数组，则继续 递归调用 本方法
            getTreeData(data[i].children);
        }
    }
    return data;
}

//输入正数 最多保存两位小数