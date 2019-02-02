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
var NetManger = /** @class */ (function () {
    function NetManger() {
        this.sendmode = "post";
    }
    NetManger.prototype.send = function (data, url, callback, arg, responseType) {
        var _this = this;
        if (responseType === void 0) { responseType = "text"; }
        if (App.dataManger.vo.api_token.length < 2) {
            console.log("哥,还没登录呢!");
            MainScene.scene.playTiShiBetAni("哥,还没登录呢!");
            return;
        }
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 5000; //设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, function (data) {
            if (callback) {
                var data_obj = JSON.parse(data);
                if (MainScene.getOption("debug").length > 1) {
                    console.log("收:", data_obj);
                }
                callback.call(_this, data_obj, arg);
            }
        });
        xhr.once(Laya.Event.ERROR, this, function () {
            console.log("请求错误");
        });
        xhr.on(Laya.Event.PROGRESS, this, function () {
            //console.log("请求进度");
        });
        if (data == null) {
            data = {};
        }
        data.api_token = App.dataManger.vo.api_token;
        var data_string = JSON.stringify(data);
        xhr.send(url, data_string, this.sendmode, responseType, ["content-type", "application/json;charset=UTF-8"]);
        if (MainScene.getOption("debug").length > 1) {
            console.log("开始发送", url);
        }
    };
    return NetManger;
}());
var HttpRequestExtension = /** @class */ (function (_super) {
    __extends(HttpRequestExtension, _super);
    function HttpRequestExtension() {
        return _super.call(this) || this;
    }
    HttpRequestExtension.prototype.send = function (url, data, method, responseType, headers) {
        if (data === void 0) { data = null; }
        if (method === void 0) { method = "get"; }
        if (responseType === void 0) { responseType = "text"; }
        if (headers === void 0) { headers = null; }
        _super.prototype.send.call(this, url, data, method, responseType, headers);
        this._http.upload.onprogress = function (e) {
            //上传进度
        };
        this._http.upload.onload = function (e) {
        };
        this._http.upload.onerror = function (e) {
        };
        this._http.upload.onabort = function (e) {
        };
    };
    return HttpRequestExtension;
}(Laya.HttpRequest));
//# sourceMappingURL=NetManger.js.map