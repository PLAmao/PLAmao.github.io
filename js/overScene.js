(function (w) {
    function OverScene(ctx) {
        this.ctx = ctx;
    }
    util.extend(OverScene.prototype, {
        draw: function () {
            var nickName = "";
            //添加遮罩
            this.ctx.fillStyle = "rgba(0,0,0,.3)";
            this.ctx.fillRect(0, 0, cvs.width, cvs.height);
            //添加文字
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillStyle = "red";
            this.ctx.font = "900 40px 微软雅黑";
            this.ctx.fillText("GAME OVER!", cvs.width / 2, cvs.height / 2 -30);
            if(getBird.point<60) {
                nickName = "菜鸡";
            }else if(getBird.point<80) {
                nickName = "新手";
            }else if(getBird.point<100) {
                nickName = "一般般";
            }else if(getBird.point<150) {
                nickName = "高手";
            }else {
                nickName = "大神";
            }
            this.ctx.fillText("总分数"+getBird.point+","+nickName,cvs.width / 2, cvs.height / 2 +30);
        }
    });
    w.getOverScene = function (ctx) {
        return new OverScene(ctx);
    }
})(window);