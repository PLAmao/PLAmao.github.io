(function(w) {
    function Bird(ctx,img,x,y,widthFrame,heightFrame,speed) {
        this.ctx = ctx;
        this.img = img;
        this.x = x;
        this.y = y;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        //小鸟的宽度
        this.width = this.img.width/this.widthFrame;
        //小鸟的高度
        this.height = this.img.height/this.heightFrame;
        //当前是第几帧
        this.currentFrame = 0;
        //小鸟下落的速度
        this.speed = speed || 2;
        //小鸟的加速度
        this.speedPlus = 0.2;

        this._bind();
    }
    util.extend(Bird.prototype,{
        draw:function() {
            //当下降速度为1时，旋转角度为10度
            var baseRadian = Math.PI/180*10;
            //设置最大的旋转角度为45度
            var maxRadian = Math.PI/180*45;
            //根据速度计算旋转角度
            var currentRadian = this.speed*baseRadian;
            //限制最大的旋转角度
            currentRadian = currentRadian>=maxRadian?maxRadian:currentRadian;
            this.ctx.save();
            this.ctx.translate(this.x+this.width/2,this.y+this.height/2);
            this.ctx.rotate(currentRadian);
            this.ctx.drawImage(this.img,
            this.currentFrame*this.width,0,this.width,this.height,
            -this.width/2,-this.height/2,this.width,this.height);

            this.ctx.restore();
            

        },
        update: function() {
            //绘制下一帧
            this.currentFrame = ++this.currentFrame>=this.widthFrame?0:this.currentFrame;
            //让小鸟不断下落
            this.y += this.speed;
            //刷新速度
            this.speed+=this.speedPlus;
        },
        _bind: function() {
            var that = this;
            //让小鸟上升
            document.onclick = function() {
                that.speed = -4;
            }
        }
    });
    //单例模式，只有一只小鸟
    var bird = null;
    w.getBird = function(ctx,img,x,y,widthFrame,heightFrame) {
        return bird||(bird = new Bird(ctx,img,x,y,widthFrame,heightFrame));
    };
})(window);