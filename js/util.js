var util = {
    /**
     * 加载所有图片后才执行回调函数
     * @param {Object} imgUrls 图片地址对象
     * @param {Function} callback 回调函数
     */
    loadImage: function (imgUrls, callback) {

        var imgObj = {}; //保存图片资源
        var tempImg = null;
        //记录加载完毕的图片和图片的总数量
        var loaded = 0,
            imgLength = 0;
        for (var key in imgUrls) {
            //累加图片的数量
            imgLength++;
            tempImg = new Image();
            tempImg.onload = function () {
                //记录加载完毕的图片
                loaded++;
                //当全部图片加载完毕后执行回到函数
                if (loaded >= imgLength) {
                    callback(imgObj);
                }
            };
            tempImg.src = imgUrls[key];
            imgObj[key] = tempImg;
        }
    },
    /**
     * 混合式继承
     */
    extend: function () {
        var argLen = arguments.length,
            target = arguments[0];
        for (var i = 1; i < argLen; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    target[key] = arguments[i][key];
                }
            }
        }
    }
};