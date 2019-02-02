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
    var item_1 = /** @class */ (function (_super) {
        __extends(item_1, _super);
        function item_1() {
            return _super.call(this) || this;
        }
        item_1.createInstance = function () {
            return (fairygui.UIPackage.createObject("Bag", "item_1"));
        };
        item_1.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.txt_time = (this.getChild("txt_time"));
            this.txt_juhao = (this.getChild("txt_juhao"));
            this.txt_3 = (this.getChild("txt_3"));
            this.txt_4 = (this.getChild("txt_4"));
            this.txt_5 = (this.getChild("txt_5"));
        };
        item_1.URL = "ui://rbw1tv9tmee5r";
        return item_1;
    }(fairygui.GComponent));
    Bag.item_1 = item_1;
})(Bag || (Bag = {}));
//# sourceMappingURL=item_1.js.map