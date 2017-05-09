(function ($) {
	var privateFun = function () {
		// 私有方法
	};

	var pageSwitch = (function () {
		function pageSwitch (elem, options) {
			this.settings = $.extend(true, $.fn.pageSwitch.default, options||{});
			this.elem = elem;
			this.init();
		}

		pageSwitch.prototype = {
			init : function () {
				console.log("hello");
			}
		}
		return pageSwitch;
	})();

	// pageSwitch挂载到jQuery对象上
	$.fn.pageSwitch = function (options) {
		// 返回this维持链式调用
		return this.each(function () {
			var me = $(this),
				instance = me.data("pageSwitch");
			//判断是否存在实例
			if(!instance){
				instance = new pageSwitch(me, options);
				me.data("pageSwitch", instance);
			}

			// 如果传入的是字符串
			if($.type(options) === "string") {
				// 调用实例上面对应的方法
				return instance[options]();
			}
		});
	}

	// 定义配置信息
	$.fn.pageSwitch.default = {
		selectors: {
			sections: ".sections",
			section: ".section",
			page: ".pages",
			active: ".active"
		},
		// 索引
		index : 0,
		// 动画效果
		easing : "ease", 
		// 动画时间
		duration: 500,
		// 循环播放
		loop : false,
		// 是否进行分页处理
		pagination : true,
		// 是否触发键盘事件
		keyboard : true,
		// 滑动方向，默认垂直
		direction : "vertical",
		callback :  ""
	}
})(jQuery)