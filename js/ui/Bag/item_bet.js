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
    var item_bet = /** @class */ (function (_super) {
        __extends(item_bet, _super);
        function item_bet() {
            return _super.call(this) || this;
        }
        item_bet.createInstance = function () {
            return (fairygui.UIPackage.createObject("Bag", "item_bet"));
        };
        item_bet.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.txt_m = (this.getChild("txt_m"));
            this.txt_n = (this.getChild("txt_n"));
            this.txt_m1 = (this.getChild("txt_m1"));
        };
        item_bet.URL = "ui://rbw1tv9tmee5s";
        return item_bet;
    }(fairygui.GButton));
    Bag.item_bet = item_bet;
})(Bag || (Bag = {}));
//# sourceMappingURL=item_bet.js.map