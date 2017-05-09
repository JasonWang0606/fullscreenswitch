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
			// 初始化插件
			// 实现：初始化dom结构、布局、分页及绑定事件
			init : function () {
				var me = this;
				me.selectors = me.settings.selectors;
				me.sections = me.selectors.sections;
				me.section = me.selectors.section;

				me.direction = me.selectors.direction === "vertical" ? true : false;
				me.pagesCount = me.pagesCount();
				me.index = (me.settings.index>=0 && me.settings.index < pagesCount) ? me.settings.index : 0;
				if (!me.direction) {
					me._initLayout();
				}

				if (me.settings.pagination) {
					me._initPaging();
				}

				me.initEvent();
			},

			// 获取滑动页面数量*/
			pagesCount : function () {
				return this.section.length;
			},

			// 获取滑动的宽度（横屏滑动）或高度（竖屏滑动）
			switchLength : function () {
				return this.direction ? this.elem.height() : this.elem.width();
			},

			// 主要针对横屏情况进行页面布局
			_initLayout : function () {
				var me = this,
					width = (me.pagesCount * 100 + "%"),
					cellWidth = (100/me.pagesCount).toFixed(2) + "%";
				me.sections.width(width);
				me.section.width(cellWidth).css("float","left");
			},

			// 实现分页的dom结构及css样式 
			_initPaging : function () {
				var me = this,
					pagesClass = me.settings.page.substring(1),
					activeClass = me.settings.active.substring(1);
				var pageHtml = "<ul class="+pagesClass+">";
				for (var i=0;i<me.pagesCount;i++) {
					pageHtml += "<li></li>"
				}
				me.element.append(pageHtml);
				var pages = me.element.find(me.selectors.page);
				me.pageItem = pages.find("li");
				me.pageItem.eq(me.index).addClass(me.activeClass);

				if (me.direction) {
					pages.addClass("vertical");
				} else {
					pages.addClass("herizontal");
				}
			},

			// 初始化插件事务
			_initEvent : function () {

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
		// 滑动方向，默认垂直vertical 为true，herizontal 为false
		direction : true,
		callback :  ""
	}
})(jQuery)