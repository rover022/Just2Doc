var Handler = laya.utils.Handler;
var Loader = laya.net.Loader;
var GComponent = fairygui.GComponent;
var GRoot = fairygui.GRoot;
var RelationType = fairygui.RelationType;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        // Laya.init(1136, 640, Laya.WebGL);
        Laya.init(640, 1136, Laya.WebGL);
        // laya.utils.Stat.show(0, 0);
        //设置适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.alignH = "left";
        Laya.stage.alignV = "top";
        //设置横竖屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        App.init();
        Laya.loader.load([
            { url: "res/config.json", type: Loader.TEXT },
            { url: "res/Bag_atlas0.png", type: Loader.IMAGE },
            { url: "res/Bag.fui", type: Loader.BUFFER }
        ], Handler.create(this, this.onLoaded));
    }
    GameMain.prototype.onLoaded = function () {
        var json = Laya.loader.getRes("res/config.json");
        var obj = JSON.parse(json);
        App.dataManger.configvo = obj;
        if (App.debug) {
            App.netManger.sendmode = "get";
            App.dataManger.configvo.item_bet.url = "res/data/bet.json";
            App.dataManger.configvo.item_betList.url = "res/data/betList.json";
            App.dataManger.configvo.item_betHistory.url = "res/data/betHistory.json";
            App.dataManger.configvo.item_login.url = "res/data/login.json";
            App.dataManger.configvo.item_lotteryHistory.url = "res/data/lotteryHistory.json";
            App.dataManger.configvo.item_result.url = "res/data/result.json";
        }
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        fairygui.UIPackage.addPackage("res/Bag");
        fairygui.UIConfig.defaultFont = "微软雅黑";
        //
        Bag.BagBinder.bindAll();
        Laya.stage.addChild(fairygui.GRoot.inst.displayListContainer);
        var m = new MainScene();
        App.show(m);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map