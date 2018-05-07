//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var stage = egret.lifecycle.stage;
var StageScaleMode = egret.StageScaleMode;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.isSound = true;
        _this.gamecount = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
                // console.log('hello,world')
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        var _this = this;
        this.mygroup = new egret.Sprite();
        //this.mygroup.alpha = 0;640 1136
        this.mygroup.graphics.beginFill(0xffffff, 0.1);
        this.mygroup.graphics.drawRect(0, 0, 640, 1136);
        this.mygroup.graphics.endFill();
        this.stage.scaleMode = StageScaleMode.FIXED_WIDTH;
        this.addChild(this.mygroup);
        var chanl;
        RES.getResAsync("wenzi_json", this.startAnimation, this);
        // RES.getResAsync("description_json", this.startAnimation, this);
        var music_sprite = this.createBitmapByName("music_png");
        var sprite = new egret.Sprite();
        sprite.addChild(music_sprite);
        sprite.anchorOffsetX = 33;
        sprite.anchorOffsetY = 33;
        sprite.x = this.stage.stageWidth - 40;
        sprite.y = 40;
        sprite.touchEnabled = true;
        sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            return;
            // this.isSound = !this.isSound;
            // if (this.isSound == false) {
            //     sprite.rotation = 0;
            //     // this.gameSound.close();
            //     if (chanl) {
            //         chanl.volume = 0;
            //     }
            //
            // } else {
            //     // this.gameSound.play();
            //     if (this.gameSound == null) {
            //         let nullSound: egret.Sound = RES.getRes("demo_mp3");
            //         playsound(nullSound, false);
            //
            //         //this.gameSound = RES.getRes("demo_mp3");
            //         // this.gameSound.play(0, -1);
            //         //chanl = this.gameSound.play(0, -1);
            //     }
            //     // chanl.volume = 1;
            //
            // }
        }, this);
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
            if (_this.isSound) {
                sprite.rotation++;
            }
            else {
            }
        }, this);
        //
        this.addChild(sprite);
        // this.gameSound = RES.getRes("demo_mp3");
        // this.gameSound.play(0, -1);
        //chanl = this.gameSound.play(0, -1);
        var nullSound = RES.getRes("demo_mp3");
        // nullSound.play();
        playsound(nullSound, false);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var demodata = result[this.gamecount];
        var textflowArr = demodata.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = 0;
        var b_y = 300;
        //
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                //换个片源
                count = 1;
                _this.gamecount++;
                demodata = result[_this.gamecount];
                if (demodata == null) {
                    console.log("播放完毕了");
                    return;
                }
                textflowArr = demodata.map(function (text) { return parser.parse(text); });
                _this.mygroup.removeChildren();
                b_y = 300;
            }
            var textFlow = textflowArr[count];
            var colornum = parseInt(demodata[0]);
            _this.mygroup.graphics.clear();
            _this.mygroup.graphics.beginFill(colornum);
            _this.mygroup.graphics.drawRect(0, 0, 1000, 1500);
            _this.mygroup.graphics.endFill();
            // 切换描述内容
            // Switch to described content
            textfield = new egret.TextField();
            _this.mygroup.addChild(textfield);
            // console.log("textFlow:", textFlow);
            textfield.textFlow = textFlow;
            textfield.fontFamily = "微软雅黑";
            textfield.width = _this.stage.stageWidth;
            textfield.textAlign = egret.HorizontalAlign.CENTER;
            textfield.y = b_y;
            //最后y的坐标
            var f_y = b_y;
            b_y += textfield.height + 20;
            // textfield.fontFamily = "宋体";
            // textfield.size = 50;
            textfield.alpha = 0;
            textfield.y += 20;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1, y: f_y }, 400);
            tw.wait(2000);
            //tw.to({"alpha": 0}, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=Main.js.map