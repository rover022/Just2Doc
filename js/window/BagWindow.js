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
var BagWindow = /** @class */ (function (_super) {
    __extends(BagWindow, _super);
    function BagWindow() {
        return _super.call(this) || this;
    }
    BagWindow.prototype.onInit = function () {
        this.contentPane = fairygui.UIPackage.createObject("Bag", "BagWin").asCom;
        this.center();
    };
    BagWindow.prototype.onShown = function () {
        var list = this.contentPane.getChild("list").asList;
        list.on(fairygui.Events.CLICK_ITEM, this, this.__clickItem);
        list.itemRenderer = Handler.create(this, this.renderListItem, null, false);
        list.setVirtual();
        list.numItems = 45;
    };
    BagWindow.prototype.renderListItem = function (index, obj) {
        obj.icon = "res/i" + Math.floor(Math.random() * 10) + ".png";
        obj.text = "" + Math.floor(Math.random() * 100);
    };
    BagWindow.prototype.__clickItem = function (item) {
        this.contentPane.getChild("n11").asLoader.url = item.icon;
        this.contentPane.getChild("n13").text = item.icon;
    };
    return BagWindow;
}(fairygui.Window));
//# sourceMappingURL=BagWindow.js.map