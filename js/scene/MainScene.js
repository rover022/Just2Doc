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
var GButton = fairygui.GButton;
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        _this.selectM = 0;
        _this.gametime = 5;
        _this.game_state = -1;
        /**
         * 游戏所有的游戏记录
         */
        _this.gamedata_list = {};
        _this.gamereadly_list = {};
        _this.gamebet_list = {};
        _this.period_number = -1;
        //下注池
        _this.bet_pool = [];
        MainScene.scene = _this;
        return _this;
    }
    MainScene.prototype.init = function () {
        var _this = this;
        var v = Bag.Scene_Main.createInstance();
        this.initUI(v);
        this.initHeGuang();
        // this.playWinOrLost("niyingle.sk");
        // this.playOtherBetAni();
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
        App.dataManger.vo.api_token = MainScene.getOption("token");
        console.log('游戏版本:', MainScene.VERSION);
        console.log('token:', App.dataManger.vo.api_token);
        if (App.dataManger.vo.api_token == null || App.dataManger.vo.api_token.length < 2) {
            console.log('token:you问题,');
            this.playTiShiBetAni("token:有问题");
            return;
        }
        App.netManger.send({}, App.dataManger.configvo.item_login.url, function (data) {
            _this.initGame(data);
        });
    };
    MainScene.prototype.initGame = function (data) {
        if (data.status != 0) {
            console.log("登录失败", data);
            this.playTiShiBetAni("登录失败");
            return;
        }
        App.dataManger.vo.nickname = data.data.nickname;
        App.dataManger.vo.deposit = data.data.deposit;
        App.dataManger.vo.username = data.data.username;
        App.dataManger.vo.bet_amount = [];
        //
        // App.dataManger.vo.deposit++;
        var bitarr = data.data.bet_amount;
        bitarr.forEach(function (value) {
            App.dataManger.vo.bet_amount.push(parseInt(value));
        });
        console.log("筹码:", App.dataManger.vo.bet_amount);
        console.log("deposit:", App.dataManger.vo.deposit);
        this.makeBetBtn(this.view.btn_1, 1);
        this.makeBetBtn(this.view.btn_2, 2);
        this.makeBetBtn(this.view.btn_3, 3);
        this.makeBetBtn(this.view.btn_4, 4);
        for (var i = 0; i < 5; i++) {
            this.makeBetChouma(this.view.ui_chouma.getChild("btn_" + i).asButton, App.dataManger.vo.bet_amount[i]);
        }
        this.selectM = ~~bitarr[0];
        this.update();
        this.displayListContainer.timer.loop(5000, this, this.updateGameState);
        this.displayListContainer.timer.loop(1000, this, this.time_update);
        this.displayListContainer.timer.loop(2000, this, this.play_update);
        this.updateGameState();
        // this.initPlaySaizi([6, 6, 6]);
    };
    MainScene.prototype.playOtherBetAni = function (_name, bet) {
        if (_name === void 0) { _name = "某人"; }
        if (bet === void 0) { bet = 100; }
        var s1 = "押注:那个" + _name + "下注了" + bet + ",长笑一声哈哈!";
        this.view.talk_labe1.title = s1;
        this.view.t0.play(null, 1);
    };
    MainScene.prototype.playTiShiBetAni = function (_context) {
        if (_context === void 0) { _context = "提示"; }
        this.view.talk_tishi.title = _context;
        this.view.t1.play(null, 1);
    };
    MainScene.prototype.play_update = function () {
        // console.log("play_update", this.bet_pool.length);
        if (this.bet_pool.length > 0) {
            var vo = this.bet_pool.shift();
            this.playOtherBetAni(vo.nickname, vo.bet_amount);
        }
    };
    /**
     * 清理数据
     */
    MainScene.prototype.clearDesk = function () {
        this.saizi_sprite.removeChildren();
        this.initdesk(this.view.btn_1, 0, 0);
        this.initdesk(this.view.btn_2, 0, 0);
        this.initdesk(this.view.btn_3, 0, 0);
        this.initdesk(this.view.btn_4, 0, 0);
        this.bet_pool = [];
    };
    /**
     * 给桌子加钱
     * @param g_
     * @param bet
     * @param allnum
     */
    MainScene.prototype.initdesk = function (g_, bet, allnum) {
        if (bet === void 0) { bet = -1; }
        if (allnum === void 0) { allnum = -1; }
        if (bet == 0 && allnum == 0) {
            g_.data = 0;
            g_.getChild("txt_m").text = "0";
            g_.getChild("txt_n").text = "0";
            return;
        }
        if (allnum != -1) {
            g_.getChild("txt_m").text = allnum.toString();
        }
        if (bet != -1) {
            g_.data = g_.data + bet;
            g_.getChild("txt_n").text = g_.data.toString();
        }
    };
    //bet(1:大 2:小 3:单 4:双)
    MainScene.prototype.makeBetBtn = function (btn, bet) {
        var _this = this;
        btn.data = 0;
        btn.onClick(this, function () {
            if (App.dataManger.vo.deposit < _this.selectM) {
                _this.playTiShiBetAni("金钱不够了 哥们!");
                return;
            }
            if (_this.game_state != 2) {
                _this.playTiShiBetAni("没到下注状态 哥们!");
                return;
            }
            App.netManger.send({
                amount: _this.selectM,
                bet: bet
            }, App.dataManger.configvo.item_bet.url, function (data, _arg) {
                if (data.status == 0) {
                    var _num = _arg[0];
                    console.log("成功下注", _num, typeof _num);
                    App.dataManger.vo.deposit -= _num;
                    _this.initdesk(btn, _num);
                    _this.update();
                }
                else {
                    _this.playTiShiBetAni(data.message);
                }
            }, [_this.selectM]);
        });
    };
    MainScene.prototype.makeBetChouma = function (child, num) {
        var _this = this;
        var ini_m = (~~num);
        child.title = ini_m.toString();
        child.onClick(this, function (_n) {
            _this.selectM = ini_m;
            console.log("选择的筹码", _this.selectM);
        }, [num]);
    };
    MainScene.prototype.time_update = function () {
        this.view.label_txt.text = this.gametime.toString();
        if (this.gametime > 0) {
            this.gametime--;
        }
    };
    /**
     * 跑时间计时器
     */
    MainScene.prototype.updateGameState = function () {
        var _this = this;
        App.netManger.send({}, App.dataManger.configvo.item_betList.url, function (data) {
            _this.updateBetListUI(data);
        });
        //
        var m_obj = {};
        if (this.period_number != -1) {
            m_obj.period_number = this.period_number;
        }
        App.netManger.send(m_obj, App.dataManger.configvo.item_result.url, function (data) {
            // console.log("数据:", data);
            _this.updateResult(data);
        });
    };
    MainScene.prototype.updatemoney = function (src) {
        App.dataManger.vo.deposit = src;
        this.update();
    };
    /**
     * 更新游戏状态
     * @param data
     */
    MainScene.prototype.updateResult = function (vo) {
        if (vo.status != 0) {
            this.playTiShiBetAni("游戏状态错误");
            return;
        }
        var data = vo.data;
        this.game_state = parseInt(data.state);
        this.period_number = data.period_number;
        this.view.txt_juhao.text = "第" + this.period_number + "局";
        //
        //
        // console.log(data.state);
        if (this.game_state == 1) {
            console.log("准备状态");
            // if (this.gamereadly_list[this.period_number] = null) {
            //     this.gamereadly_list[this.period_number] = data;
            // }
            this.gametime = 0;
            this.view.txt_state.text = "准备状态";
        }
        if (this.game_state == 2) {
            //下注状态
            // console.log("下注状态");
            if (this.gamereadly_list[this.period_number] == null) {
                this.gamereadly_list[this.period_number] = data;
                this.gametime = data.rest_time;
                this.playTiShiBetAni("下注开始");
                this.view.txt_state.text = "下注状态";
                this.view.txt_res.text = "";
                this.clearDesk();
            }
        }
        if (this.game_state == 3) {
            //开奖状态
            // console.log("开奖状态");
            if (this.gamedata_list[this.period_number] == null) {
                this.gamedata_list[this.period_number] = data;
                this.gametime = data.rest_time;
                this.playTiShiBetAni("游戏开奖");
                this.view.txt_state.text = "开奖状态";
                this.view.txt_res.text = "开奖结果:" + data.last_detail + " " + data.last_describe;
                //
                var arr_num = data.last_detail.split(",");
                this.initPlaySaizi(arr_num);
                //
                if (data.last_prize > 0) {
                    this.playWinOrLost("niyingle.sk");
                }
                if (data.last_prize < 0) {
                    //this.playWinOrLost("nishule.sk");
                }
            }
            this.updatemoney(data.deposit);
        }
    };
    MainScene.prototype.playWinOrLost = function (src) {
        var _this = this;
        this.view.displayListContainer.timer.once(1500, this, function () {
            MainScene.addSkAni2("res/spine/" + src, _this.saizi_sprite, 0, 320, 350)
                .then(function (value) {
                value.play(0, false);
            });
        });
    };
    /**
     * 更新别人的下注信息
     * @param data
     */
    MainScene.prototype.updateBetListUI = function (data) {
        var _this = this;
        // console.log("betList", data);
        // big: 20
        // even: 0
        // odd: 0
        // small: 10
        if (data.status != 0) {
            console.log('updateBetListUI状态问题');
            return;
        }
        this.initdesk(this.view.btn_1, -1, data.bet_amount.big);
        this.initdesk(this.view.btn_2, -1, data.bet_amount.small);
        this.initdesk(this.view.btn_3, -1, data.bet_amount.odd);
        this.initdesk(this.view.btn_4, -1, data.bet_amount.even);
        //
        // console.log("betList", "桌面清理完毕");
        var arr = data.data;
        // console.log("betList", arr);
        arr.forEach(function (value) {
            var id = value.id;
            //console.log("betList", id, this.gamebet_list[id]);
            if (_this.gamebet_list[id] == null) {
                _this.gamebet_list[id] = value;
                _this.bet_pool.push(value);
                // console.log("betList", "添加数据完毕", this.bet_pool.length);
            }
        });
    };
    MainScene.prototype.update = function () {
        this.view.txt_money.text = App.dataManger.vo.deposit.toString();
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
    /**
     * 播放塞子动画
     * @param num
     */
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
        _this.mCurrIndex = 0;
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