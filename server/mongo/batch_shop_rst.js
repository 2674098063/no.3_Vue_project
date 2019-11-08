const https = require('https')
const {
    insert
} = require('./index')
https.get('https://h5.ele.me/pizza/shopping/restaurants/E8980246486451815945/batch_shop?code=0.9299116746116736&extras=%5B"activities"%2C"albums"%2C"license"%2C"identification"%2C"qualification"%5D&terminal=h5&latitude=23.12908&longitude=113.264359', (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });
    res.on('end', () => {
        let batch_shop = JSON.parse(rawData)
        insert('batch_shop', [{
            menu: batch_shop.menu,
            recommend: batch_shop.recommend,
            rst: batch_shop.rst
        }])

    });
}).on('error', (e) => {
    console.error(`出现错误: ${e.message}`);
});