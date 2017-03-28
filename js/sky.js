(function (w) {
    function Sky(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed || 10;
        this.imgWidth = this.img.width;
        this.imgHeight = this.img.height;
        Sky.len++;
        this.x = (Sky.len - 1) * this.imgWidth;
        this.y = 0;
    }
    Sky.len = 0; //记录创建了多少对象
    util.extend(Sky.prototype, {
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
        },
        update: function () {
            this.x -= this.speed;
            if(this.x<-this.imgWidth) {
                this.x = this.x+this.imgWidth*Sky.len;
            }
        }
    });
    w.getSky = function(ctx, img, speed) {
        return new Sky(ctx, img, speed);
    };
})(window);