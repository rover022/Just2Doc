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
var SceneAllHistroy = /** @class */ (function (_super) {
    __extends(SceneAllHistroy, _super);
    function SceneAllHistroy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneAllHistroy.prototype.init = function () {
        var _this = this;
        var v = Bag.Scene_Histroy.createInstance();
        this.initUI(v);
        // super.initUI();
        this.view.btn_back.onClick(this, function () {
            _this.removeFromParent();
        });
        App.netManger.send({}, App.dataManger.configvo.item_lotteryHistory.url, function (data) {
            // console.log("数据:", data);
            _this.update(data);
        });
        this.view.list_all.removeChildren();
    };
    SceneAllHistroy.prototype.update = function (data) {
        var _this = this;
        console.log("全部历史", data);
        if (data.status == 0) {
            var vo_arr = data.data;
            vo_arr.forEach(function (value) {
                var s = Bag.item_1.createInstance();
                s.txt_time.text = value.due_time;
                s.txt_juhao.text = value.period_number;
                s.txt_3.text = value.detail;
                s.txt_4.text = value.describe;
                s.txt_5.text = value.describe;
                _this.view.list_all.addChild(s);
            });
        }
        else {
            console.log(data);
        }
    };
    return SceneAllHistroy;
}(BaseGComponent));
var SceneSelfHistroy = /** @class */ (function (_super) {
    __extends(SceneSelfHistroy, _super);
    function SceneSelfHistroy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneSelfHistroy.prototype.init = function () {
        var _this = this;
        var v = Bag.Scene_SelfBet.createInstance();
        this.initUI(v);
        this.view.btn_back.onClick(this, function () {
            _this.removeFromParent();
        });
        App.netManger.send({}, App.dataManger.configvo.item_betHistory.url, function (data) {
            // console.log("数据:", data);
            _this.update(data);
        });
        this.view.list_my.removeChildren();
    };
    SceneSelfHistroy.prototype.update = function (data) {
        var _this = this;
        console.log("自己历史", data);
        if (data.status == 0) {
            var vo_arr = data.data;
            vo_arr.forEach(function (value) {
                var s = Bag.item_2.createInstance();
                _this.view.list_my.addChild(s);
            });
        }
        else {
            console.log(data);
        }
    };
    return SceneSelfHistroy;
}(BaseGComponent));
var SceneGameShuoMin = /** @class */ (function (_super) {
    __extends(SceneGameShuoMin, _super);
    function SceneGameShuoMin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneGameShuoMin.prototype.init = function () {
        var _this = this;
        var v = Bag.Scene_Help.createInstance();
        this.initUI(v);
        this.view.btn_back.onClick(this, function () {
            _this.removeFromParent();
        });
    };
    return SceneGameShuoMin;
}(BaseGComponent));
//# sourceMappingURL=SceneHistroy.js.map