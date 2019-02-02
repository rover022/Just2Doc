var App = /** @class */ (function () {
    function App() {
    }
    App.init = function () {
        this.netManger = new NetManger();
        this.dataManger = new DateManger();
    };
    App.show = function (m) {
        m.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(m);
    };
    App.debug = false;
    return App;
}());
var UserVo = /** @class */ (function () {
    function UserVo() {
        this.id = 502536;
        this.username = "phper1";
        this.nickname = "phper1";
        this.deposit = 0.00;
        this.phone = "";
        // "birthday": "1970-01-01",
        // "signature": "",
        // "avatar": "",
        // "ex_vip_time": "1970-01-01 00:00:01",
        this.api_token = "aefab9e287ea71cd4f4f94977dcffd50";
        this.bet_amount = [10, 50, 100, 500, 1000];
    }
    return UserVo;
}());
var DateManger = /** @class */ (function () {
    function DateManger() {
        this.vo = new UserVo();
    }
    return DateManger;
}());
var NetMgVo = /** @class */ (function () {
    function NetMgVo() {
    }
    return NetMgVo;
}());
//# sourceMappingURL=App.js.map