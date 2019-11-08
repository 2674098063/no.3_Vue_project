var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    console.log(req.method)
    next();
});

const {
    find,
    insert,
    updata,
    remove,
    finds
} = require('../mongo/index');

/* GET home page. */
router.get('/news', async function(req, res, next) {
    let src = req.originalUrl;
    src = src.split('?');
    res.append('Access-Control-Allow-Origin', '*');
    let data = await finds('vues', null, src[1]);
    res.json(data);
});


router.get('/entries', async function(req, res, next) {
    let src = req.originalUrl;
    src = src.split('?');
    res.append('Access-Control-Allow-Origin', '*');
    let data = await find('entries', null);
    res.json(data);
});
router.get('/restaurants', async function(req, res, next) {
    let src = req.originalUrl;
    src = src.split('?');
    res.append('Access-Control-Allow-Origin', '*');
    let data = await find('restaurants', null);
    res.json(data);
});
router.get('/batch_shop', async function(req, res, next) {
    let src = req.originalUrl;
    src = src.split('?')[1];
    console.log(src)
    res.append('Access-Control-Allow-Origin', '*');
    let data = await find('batch_shop', {
        batch_id: src
    });
    if (data.length) {
        res.json(data);
    } else {
        res.send('请求错误')
    }

});
// router.get('/reg', upload.array(), (req, res) => {
//     var { name, psw } = req.body;
//     console.log(name, psw);
//     if (name == 'fxxy' && psw == 'fxxy') {
//         res.send('1');
//     } else {
//         res.send('0');
//     }
// });


// app.post('/user', upload.array(), async function(req, res, next) {
//     res.append('Access-Control-Allow-Origin', '*');
//     var { tel, password } = req.body;
//     let str = await find('user', {
//         name: tel
//     });
//     console.log(str);
//     res.json(data);
// });


router.post('/user', upload.array(), async(req, res) => {
    console.log(req.method)
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    var { tel, password } = req.body;
    let str = await find('user', {
        tel: tel
    });
    if (str.length) {
        let is = await find('user', {
            tel: tel,
            password: password
        });
        if (is.length) {
            let obj = { tel, password }
            const token = Buffer.from(JSON.stringify(obj)).toString('base64')

            res.send('登陆成功,key:' + token);
        } else {
            res.send('账号、密码错误')
        }
    } else {
        insert('user', [{...req.body }])
        let obj = { tel, password }
        const token = Buffer.from(JSON.stringify(obj)).toString('base64')
        res.send('注册成功,key:' + token);
    }
});
router.post('/tokenKey', upload.array(), async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    var { tokenKey } = req.body;
    const token = Buffer.from(tokenKey, 'base64').toString('utf8');
    let arr = JSON.stringify(token).replace(/\\|"/g, '').replace(/\{|\}/g, '').split(',')
    let str = await find('user', {
        tel: arr[0].split(":")[1],
        password: arr[1].split(":")[1]
    });
    if (str.length) {
        res.send(str);
        // res.data(str)
    } else {
        res.send('0')
    }
});
router.get('/coupon', async function(req, res, next) {
    let src = req.originalUrl;
    src = src.split('?');
    res.append('Access-Control-Allow-Origin', '*');
    let data = await find('coupon', null);
    res.json(data);
});


module.exports = router;