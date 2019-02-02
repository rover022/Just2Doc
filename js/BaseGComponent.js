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
var BaseGComponent = /** @class */ (function (_super) {
    __extends(BaseGComponent, _super);
    function BaseGComponent() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
        // this.initUI();
    }
    BaseGComponent.prototype.init = function () {
    };
    BaseGComponent.prototype.initUI = function (src) {
        // this.view = <T><any>Bag.Scene_Main.createInstance();
        this.view = src;
        this.addChild(this.view);
        this.view.setSize(GRoot.inst.width, GRoot.inst.height);
        this.view.addRelation(GRoot.inst, RelationType.Size);
    };
    return BaseGComponent;
}(fairygui.GComponent));
//# sourceMappingURL=BaseGComponent.js.map