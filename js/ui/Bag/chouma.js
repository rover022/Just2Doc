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
    var chouma = /** @class */ (function (_super) {
        __extends(chouma, _super);
        function chouma() {
            return _super.call(this) || this;
        }
        chouma.createInstance = function () {
            return (fairygui.UIPackage.createObject("Bag", "chouma"));
        };
        chouma.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.c1 = this.getController("c1");
            this.btn_0 = (this.getChild("btn_0"));
            this.btn_1 = (this.getChild("btn_1"));
            this.btn_2 = (this.getChild("btn_2"));
            this.btn_3 = (this.getChild("btn_3"));
            this.btn_4 = (this.getChild("btn_4"));
        };
        chouma.URL = "ui://rbw1tv9tmee5n";
        return chouma;
    }(fairygui.GComponent));
    Bag.chouma = chouma;
})(Bag || (Bag = {}));
//# sourceMappingURL=chouma.js.map