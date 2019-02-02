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
    var Scene_Help = /** @class */ (function (_super) {
        __extends(Scene_Help, _super);
        function Scene_Help() {
            return _super.call(this) || this;
        }
        Scene_Help.createInstance = function () {
            return (fairygui.UIPackage.createObject("Bag", "Scene_Help"));
        };
        Scene_Help.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.btn_back = (this.getChild("btn_back"));
        };
        Scene_Help.URL = "ui://rbw1tv9tmee5o";
        return Scene_Help;
    }(fairygui.GComponent));
    Bag.Scene_Help = Scene_Help;
})(Bag || (Bag = {}));
//# sourceMappingURL=Scene_Help.js.map