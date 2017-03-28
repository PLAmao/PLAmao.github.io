(function (w) {
    function Land(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed || 10;
        this.width = this.img.width;
        this.height = this.img.height;
        Land.len++;
        this.x = (Land.len - 1) * this.width;
        this.y = this.ctx.canvas.height - this.height;
    }
    //记录创建对象的个数
    Land.len = 0;
    util.extend(Land.prototype, {
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
        },
        update: function () {
            this.x -= this.speed;
            if (this.x < -this.width) {
                this.x += this.width * Land.len;
            }
        }
    });
    w.getLand = function(ctx, img, speed) {
        return new Land(ctx, img, speed);
    };
})(window);