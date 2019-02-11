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
    var item_2 = /** @class */ (function (_super) {
        __extends(item_2, _super);
        function item_2() {
            return _super.call(this) || this;
        }
        item_2.createInstance = function () {
            return (fairygui.UIPackage.createObject("Bag", "item_2"));
        };
        item_2.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.txt_title = (this.getChild("txt_title"));
            this.txt_time = (this.getChild("txt_time"));
            this.txt_big = (this.getChild("txt_big"));
            this.txt_small = (this.getChild("txt_small"));
            this.txt_odd = (this.getChild("txt_odd"));
            this.txt_even = (this.getChild("txt_even"));
            this.txt_juhao = (this.getChild("txt_juhao"));
            this.txt_prize = (this.getChild("txt_prize"));
        };
        item_2.URL = "ui://rbw1tv9tir441z";
        return item_2;
    }(fairygui.GComponent));
    Bag.item_2 = item_2;
})(Bag || (Bag = {}));
//# sourceMappingURL=item_2.js.map