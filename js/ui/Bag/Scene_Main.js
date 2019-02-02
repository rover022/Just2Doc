/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var Bag;
(function (Bag) {
    var Scene_Main = /** @class */ (function (_super) {
        __extends(Scene_Main, _super);
        function Scene_Main() {
            return _super.call(this) || this;
        }
        Scene_Main.createInstance = function () {
            return (fairygui.UIPackage.createObject("Bag", "Scene_Main"));
        };
        Scene_Main.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.txt_juhao = (this.getChild("txt_juhao"));
            this.ui_heguang = (this.getChild("ui_heguang"));
            this.btn_xiaozhu = (this.getChild("btn_xiaozhu"));
            this.btn_bangzhu = (this.getChild("btn_bangzhu"));
            this.btn_lishi = (this.getChild("btn_lishi"));
            this.label_txt = (this.getChild("label_txt"));
            this.btn_1 = (this.getChild("btn_1"));
            this.btn_2 = (this.getChild("btn_2"));
            this.btn_3 = (this.getChild("btn_3"));
            this.btn_4 = (this.getChild("btn_4"));
            this.ui_chouma = (this.getChild("ui_chouma"));
            this.txt_money = (this.getChild("txt_money"));
            this.txt_state = (this.getChild("txt_state"));
            this.txt_res = (this.getChild("txt_res"));
            this.ui_empty = (this.getChild("ui_empty"));
            this.talk_labe1 = (this.getChild("talk_labe1"));
            this.talk_tishi = (this.getChild("talk_tishi"));
            this.t0 = this.getTransition("t0");
            this.t1 = this.getTransition("t1");
        };
        Scene_Main.URL = "ui://rbw1tv9tfvaib";
        return Scene_Main;
    }(fairygui.GComponent));
    Bag.Scene_Main = Scene_Main;
})(Bag || (Bag = {}));
//# sourceMappingURL=Scene_Main.js.map