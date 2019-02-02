var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Skeleton = laya.ani.bone.Skeleton;
var Templet = laya.ani.bone.Templet;
var Sprite = laya.display.Sprite;
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        MainScene.scene = _this;
        return _this;
    }
    MainScene.prototype.init = function () {
        var _this = this;
        App.dataManger.vo.api_token = MainScene.getOption("token");
        console.log('游戏版本:', MainScene.VERSION);
        console.log('token:', App.dataManger.vo.api_token);
        App.netManger.send({}, App.dataManger.configvo.item_login.url, function (data) {
            _this.initGame(data);
        });
        var v = Bag.Scene_Main.createInstance();
        this.initUI(v);
        // App.netManger.send({}, App.dataManger.configvo.item_bet.url, (data: any, a?: any) => {
        //     console.log("数据:", data, a);
        // }, ["多下点"]);
        //
        // App.netManger.send("", App.dataManger.configvo.item_bet.url, (data: any, a?: any) => {
        //     console.log("数据:", data, a);
        // }, ["多下点"]);
        //
    };
    MainScene.prototype.initGame = function (data) {
        if (data.status != 0) {
            console.log("登录拉去失败", data);
            return;
        }
        App.dataManger.vo.nickname = data.data.nickname;
        App.dataManger.vo.deposit = data.data.deposit;
        App.dataManger.vo.username = data.data.username;
        App.dataManger.vo.bet_amount = data.data.bet_amount;
        //
        // App.dataManger.vo.deposit++;
        var bitarr = data.data.bet_amount;
        console.log("筹码:", App.dataManger.vo.bet_amount);
        console.log("deposit:", App.dataManger.vo.deposit);
        this.view.btn_0.onClick(this, this.betClick, [1]);
        this.view.btn_1.onClick(this, this.betClick, [2]);
        this.view.btn_2.onClick(this, this.betClick, [3]);
        this.view.btn_3.onClick(this, this.betClick, [4]);
        // this.view.ui_chouma.btn_0.title = App.dataManger.vo.bet_amount[0];
        this.view.btn_xiaozhu.onClick(this, function () {
            var m_w = new SceneSelfHistroy();
            App.show(m_w);
        });
        this.view.btn_lishi.onClick(this, function () {
            var m_w = new SceneAllHistroy();
            App.show(m_w);
        });
        this.view.btn_bangzhu.onClick(this, function () {
            var m_w = new SceneGameShuoMin();
            App.show(m_w);
        });
        this.update();
        this.displayListContainer.timer.loop(5000, this, this.updateGameState);
        this.initHeGuang();
        this.initPlaySaizi([6, 6, 6]);
    };
    /**
     * 跑时间计时器
     */
    MainScene.prototype.updateGameState = function () {
        var _this = this;
        // App.netManger.send({}, App.dataManger.configvo.item_betList.url, (data: any) => {
        //     this.updateBetListUI(data);
        // });
        App.netManger.send({}, App.dataManger.configvo.item_result.url, function (data) {
            // console.log("数据:", data);
            _this.updateResult(data);
        });
    };
    /**
     * 更新游戏状态
     * @param data
     */
    MainScene.prototype.updateResult = function (data) {
    };
    /**
     * 更新别人的下注信息
     * @param data
     */
    MainScene.prototype.updateBetListUI = function (data) {
    };
    MainScene.prototype.update = function () {
        this.view.txt_money.text = App.dataManger.vo.deposit.toString();
    };
    MainScene.prototype.betClick = function (src) {
        console.log("下注点击:", src);
        App.netManger.send("", App.dataManger.configvo.item_bet.url, function (data, a) {
            console.log("数据:", data, a);
        }, ["多下点"]);
    };
    MainScene.getOption = function (key) {
        if (window.location) {
            var search = location.search;
            if (search == "") {
                return "";
            }
            search = search.slice(1);
            var searchArr = search.split("&");
            var length_1 = searchArr.length;
            for (var i = 0; i < length_1; i++) {
                var str = searchArr[i];
                var arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    };
    /**
     * 第2代添加spine方式
     * @param value
     * @param scene
     * @param displayListContainer
     * @param mode
     * @param _x
     * @param _y
     */
    MainScene.addSkAni2 = function (image_url, displayListContainer, mode, _x, _y, blendMode) {
        if (mode === void 0) { mode = 0; }
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        if (blendMode === void 0) { blendMode = ""; }
        var promise = new Promise(function (resolve, reject) {
            //
            var spine = new RogerSpine(image_url, displayListContainer, mode, function (v) {
                resolve(v);
            });
            spine.x = _x;
            spine.y = _y;
            if (blendMode.length > 1) {
                spine.blendMode = blendMode;
            }
            //
        });
        return promise;
    };
    MainScene.prototype.initPlaySaizi = function (num) {
        MainScene.addSkAni2("res/spine/sezi_1.sk", this.saizi_sprite, 0, 320, 400).then(function (value) {
            value.showSkinByIndex(num[0]);
            value.play(0, false);
        });
        MainScene.addSkAni2("res/spine/sezi_2.sk", this.saizi_sprite, 0, 320, 400).then(function (value) {
            value.showSkinByIndex(num[1]);
            value.play(0, false);
        });
        MainScene.addSkAni2("res/spine/sezi_3.sk", this.saizi_sprite, 0, 320, 400).then(function (value) {
            value.showSkinByIndex(num[2]);
            value.play(0, false);
        });
    };
    MainScene.prototype.initHeGuang = function () {
        MainScene.addSkAni2("res/spine/heguanXiao3.sk", this.view.ui_heguang.displayListContainer, 0, 320, 275);
        this.saizi_sprite = new Sprite();
        this.view.ui_heguang.displayListContainer.addChild(this.saizi_sprite);
    };
    MainScene.VERSION = '1.0.1';
    return MainScene;
}(BaseGComponent));
var RogerSpine = /** @class */ (function (_super) {
    __extends(RogerSpine, _super);
    function RogerSpine(url, p_container, mode, f_c) {
        if (mode === void 0) { mode = 1; }
        var _this = _super.call(this) || this;
        _this.mode = mode;
        _this.f_c = f_c;
        _this.mActionIndex = 0;
        _this.mCurrIndex = 0;
        _this.mCurrSkinIndex = 0;
        _this.mAniPath = url;
        _this.mFactory = new Templet();
        _this.mFactory.on(Laya.Event.COMPLETE, _this, _this.parseComplete);
        _this.mFactory.on(Laya.Event.ERROR, _this, _this.onError);
        _this.mFactory.loadAni(_this.mAniPath);
        _this.on(Laya.Event.REMOVED, _this, _this.onRmoved);
        // this.on(Laya.Event.ADDED, this, this.onADDed);
        p_container.addChild(_this);
        return _this;
    }
    RogerSpine.prototype.onADDed = function () {
        // console.log("onADDed...");
        // this.mFactory.destroy();
    };
    RogerSpine.prototype.onRmoved = function () {
        // console.log("onRmoved...");
        this.mFactory.destroy();
    };
    RogerSpine.prototype.onError = function () {
        console.log("error");
    };
    RogerSpine.prototype.parseComplete = function () {
        //创建模式为1，可以启用换装
        this.mArmature = this.mFactory.buildArmature(this.mode);
        this.addChild(this.mArmature);
        this.play();
        this.f_c.call(this, this.mArmature);
    };
    RogerSpine.prototype.completeHandler = function () {
        this.play();
    };
    RogerSpine.prototype.play = function () {
        this.mCurrIndex++;
        // console.log(this.mCurrIndex, this.mArmature.getAnimNum());
        if (this.mCurrIndex >= this.mArmature.getAnimNum()) {
            this.mCurrIndex = 0;
        }
        this.mCurrIndex = 0;
        this.mArmature.showSkinByIndex(2);
        // this.mArmature.showSkinByName(this.mSkinList[this.mCurrSkinIndex]);
        // console.log(this.mCurrIndex, this.mArmature.getAnimNum());
        this.mArmature.play(0, true);
    };
    return RogerSpine;
}(Laya.Sprite));
//# sourceMappingURL=MainScene.js.map