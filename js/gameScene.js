(function (w) {
    function GameScene(ctx, imgObj) {
        this.ctx = ctx;
        this.imgObj = imgObj;
        //游戏中所需的角色对象
        this.roles = [];
        //小鸟的x坐标
        this.birdX = 20;
        //继承观察者类的属性
        Observer.call(this);
        this._initRoles();
    }
    util.extend(GameScene.prototype,Observer.prototype,{
        _initRoles: function () {
            //2个天空背景
            for (var i = 0; i < 2; i++) {
                this.roles.push(getSky(this.ctx, this.imgObj.sky, 2));
            }
            //6个管道
            for (var i = 0; i < 6; i++) {
                this.roles.push(getPipe(this.ctx, this.imgObj.pipeUp, this.imgObj.pipeDown, 300, 100, this.imgObj.land.height, 2, this.birdX));
            }
            //4个大地
            for (var i = 0; i < 4; i++) {
                this.roles.push(getLand(this.ctx, this.imgObj.land, 2));
            }
            //1只鸟
            this.roles.push(getBird(this.ctx, this.imgObj.bird, this.birdX, 20, 3, 1,2));
        },
        draw: function () {
            //每次绘制新的画面的时候判断小鸟有没有碰到管道或大地，如果有就暂停定时器
            var bird = getBird();
            var birdCoreX = bird.x + bird.width / 2;
            var birdCordY = bird.y + bird.height / 2;
            if (this.ctx.isPointInPath(birdCoreX, birdCordY) || birdCordY < 0 || birdCordY > this.ctx.canvas.height - this.imgObj.land.height) {
                //小鸟死亡是触发观察者
                this.trigger("over");
                return;
            }

            this.ctx.clearRect(0, 0, cvs.width, cvs.height);

            this.ctx.beginPath();
            this.roles.forEach(function (v, i) {
                v.draw();
                v.update();
            });

            //在右上角显示分数
            this.ctx.save();
            this.ctx.textAlign = "right";
            this.ctx.textBaseline = 'top';
            this.ctx.fillStyle = "red";
            this.ctx.font = "900 40px 微软雅黑";
            this.ctx.fillText("  " + getBird.point + "  ", cvs.width, 0);
            this.ctx.restore();
        }
    });
    w.getGameScene = function (ctx, imgObj) {
        return new GameScene(ctx, imgObj);
    };
})(window);