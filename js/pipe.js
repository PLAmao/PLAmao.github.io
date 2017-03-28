(function(w) {
    /**
     * constructor {Pipe} 管道
     * @param {context} ctx 绘图环境
     * @param {Image} imgUp 上管道的图片
     * @param {Image} imgDown 下管道的图片
     * @param {number} offsetX 管道初始化时与左边界的距离
     * @param {number} space 上下管道之间的距离
     * @param {number} landHeight 大地的高度
     * @param {number} speed 管道移动的速度
     * @param {number} birdX 小鸟x坐标
     */
    function Pipe(ctx,imgUp,imgDown,offsetX,space,landHeight,speed,birdX) {
        this.ctx = ctx;
        this.imgUp = imgUp;
        this.imgDown = imgDown;
        this.offsetX = offsetX||300;
        this.space = space;
        this.landHeight = landHeight;
        this.speed = speed;
        this.birdX = birdX;
        //管道的宽度
        this.width = this.imgUp.width;
        //管道的高度
        this.height = this.imgUp.height;
        Pipe.len++;
        //两条管道渲染时的参考点的x坐标
        this.pipeX = this.offsetX+(Pipe.len-1)*this.width*3;
        //上管道渲染的参考点的y坐标
        this.pipeUpY = 0;
        //下管道渲染的参考点的y坐标
        this.pipeDownY = 0;

        this._init();

        //判断小鸟是否通过管道
        var isPass = false;
    }
    //定义静态属性记录管道的数量
    Pipe.len = 0;
    util.extend(Pipe.prototype,{
        //初始化管道的位置
        _init: function() {
            //管道的最小长度
            var minHeight = 80;
            //管道的最大长度 = 画布的高度-大地的高度 - 最小高度 - 上下管道间的距离
            var maxHeight = this.ctx.canvas.height-this.landHeight - minHeight - this.space;
            //随机生成上管道的长度
            var pipeUpHeight = Math.random()*(maxHeight-minHeight)+minHeight;
            //上管道的y坐标 = 管道的高度 - 管道的总长度
            this.pipeUpY = pipeUpHeight - this.height;
            //下管道的y坐标 = 上管道的高度 + 上下管道间的距离
            this.pipeDownY = pipeUpHeight + this.space;
        },
        //绘制管道
        draw: function() {
            this.ctx.drawImage(this.imgUp,this.pipeX,this.pipeUpY);
            this.ctx.drawImage(this.imgDown,this.pipeX,this.pipeDownY);
            this.drawPath();
        },
        //绘制路径
        drawPath: function() {
            this.ctx.rect(this.pipeX,this.pipeUpY,this.width,this.height);
            this.ctx.rect(this.pipeX,this.pipeDownY,this.width,this.height);
        },
        //让管道动起来
        update: function() {
            //当管道的x坐标小于小鸟的x坐标并且管道还没通过的话，分数加1
            if(this.pipeX<this.birdX&&!this.isPass) {
                //记录管道已经通过
                this.isPass = true;
                //分数+1
                getBird.point++;
            }
            this.pipeX -= this.speed;
            if(this.pipeX < -this.width) {
                this.pipeX += 6*this.width*3;
                this.isPass = false;
            }
        }
    });
    //工厂模式创建对象
    w.getPipe = function(ctx,imgUp,imgDown,offsetX,space,landHeight,speed,birdX) {
        return new Pipe(ctx,imgUp,imgDown,offsetX,space,landHeight,speed,birdX);
    };
})(window);