// 引入mockjs组件
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const exercise = function() {
    let list = [{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519983729619&di=3e8a039e4f3bba7bcb3e68042a9b0d91&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0707%2F7d2d7d6e7c74a51543617a086d291192.jpg",
        cName: "苹果",
        eName: "apple"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519983772947&di=5ecae915c7c78c54eb98657197991786&imgtype=0&src=http%3A%2F%2Fm.nxrsyt.com%2Fimages%2F201711%2Fsource_img%2F669_P_1510360596535.jpg",
        cName: "香蕉",
        eName: "banana"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519983657976&di=744928fc783e10fe83b2901b08886122&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2471714401%2C443201911%26fm%3D214%26gp%3D0.jpg",
        cName: "老虎",
        eName: "tiger"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519983807800&di=6dbe5df2f679039a8f39554236593e4f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ce3f5768b8d40000012e7e4e4776.jpg%401280w_1l_2o_100sh.jpg",
        cName: "猫",
        eName: "cat"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984041368&di=5b9935496604d0d780d5a22df51a072e&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F150718%2F14-150GP42311123.jpg",
        cName: "狗",
        eName: "dog"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984071679&di=7d9abf3b36ce85826e0ef752c5976fe1&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F96%2F43%2F03r58PICnqH_1024.jpg",
        cName: "杯子",
        eName: "cup"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984156352&di=34097b25580567a4ddd648534997a6f5&imgtype=0&src=http%3A%2F%2Fimg06.tooopen.com%2Fimages%2F20170712%2Ftooopen_sy_216452071742.jpg",
        cName: "火",
        eName: "fire"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984248909&di=be7d005fbbadd36321f792bc04f42175&imgtype=0&src=http%3A%2F%2Fimg12.3lian.com%2Fgaoqing02%2F04%2F51%2F24.jpg",
        cName: "铅笔",
        eName: "pencil"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984275739&di=8d9951dd7561172f93cfa19457630e4e&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F62%2F68%2F94c58PICfd3_1024.jpg",
        cName: "书",
        eName: "book"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984332434&di=3fcff59dabf7e7f02d9126873770ae41&imgtype=0&src=http%3A%2F%2Fwww.72byte.com%2FUploads%2Fpost%2Fimage%2F20161220%2F1482230608446135.gif",
        cName: "电视机",
        eName: "TV"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984352195&di=13e85d564689010e7ef8f1439fd5c84f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c3f255456f4d0000019ae9507919.jpg%401280w_1l_2o_100sh.jpg",
        cName: "汽车",
        eName: "car"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984391277&di=518bcf96c215369d9c23c5d8cda7038a&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F150926%2F14-150926115025134.jpg",
        cName: "红色",
        eName: "red"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984424636&di=84f0242846e2822395642e108a0c4916&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201302%2F23%2F20130223080645_PRKmM.jpeg",
        cName: "眼睛",
        eName: "eye"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520579174&di=6c77a02013b92982b60a6591989b261f&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c82757de25580000012e7e16f777.jpg%401280w_1l_2o_100sh.jpg",
        cName: "椅子",
        eName: "chair"
    },{
        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984477645&di=b7f4996b5cd674e4fa19660cf2f8f18f&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F99%2F18%2F92D58PICBmf.jpg",
        cName: "桌子",
        eName: "desk"
    }];

    return {
        list: list
    }
}
 
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/exercise/list', 'get', exercise);