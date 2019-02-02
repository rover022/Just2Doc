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
    var CloseButton = /** @class */ (function (_super) {
        __extends(CloseButton, _super);
        function CloseButton() {
            return _super.call(this) || this;
        }
        CloseButton.createInstance = function () {
            return (fairygui.UIPackage.createObject("Bag", "CloseButton"));
        };
        CloseButton.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.c1 = this.getController("c1");
        };
        CloseButton.URL = "ui://rbw1tv9tdwwc4";
        return CloseButton;
    }(fairygui.GButton));
    Bag.CloseButton = CloseButton;
})(Bag || (Bag = {}));
//# sourceMappingURL=CloseButton.js.map