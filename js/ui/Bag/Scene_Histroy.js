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
    var Scene_Histroy = /** @class */ (function (_super) {
        __extends(Scene_Histroy, _super);
        function Scene_Histroy() {
            return _super.call(this) || this;
        }
        Scene_Histroy.createInstance = function () {
            return (fairygui.UIPackage.createObject("Bag", "Scene_Histroy"));
        };
        Scene_Histroy.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.btn_back = (this.getChild("btn_back"));
            this.list_all = (this.getChild("list_all"));
        };
        Scene_Histroy.URL = "ui://rbw1tv9tmee5p";
        return Scene_Histroy;
    }(fairygui.GComponent));
    Bag.Scene_Histroy = Scene_Histroy;
})(Bag || (Bag = {}));
//# sourceMappingURL=Scene_Histroy.js.map