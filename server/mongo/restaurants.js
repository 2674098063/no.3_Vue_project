const https = require('https')
const {
    insert
} = require('./index')
https.get('https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=23.12908&longitude=113.264359&offset=8&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=4cb55cd00f0b46d8834eea37ce199c16&terminal=h5', (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });
    res.on('end', () => {
        let restaurants = JSON.parse(rawData).items
        restaurants.forEach(element => {
            insert('restaurants', [{
                name: element.restaurant.name,
                order_lead_time: element.restaurant.order_lead_time,
                description: element.restaurant.description,
                distance: element.restaurant.distance,
                image_path: element.restaurant.image_path
            }])
        });
    });
}).on('error', (e) => {
    console.error(`出现错误: ${e.message}`);
});