jQuery.fn.extend({
	innoPagination : function(options) {
		var settings = $.extend({
			sizes : [ 10, 50, 100 ],
			onPaging : function() {
				return false;
			},
			onSizing : function() {
				return false;
			}
		}, options);

		return this.each(function() {
			var rootAttr = '';
			var $id = $(this).attr("id");
			if (typeof ($id) != "undefined") {
				rootAttr += ' id="' + $id + '"';
			}
			var $class = $(this).attr("class");
			if (typeof ($class) != "undefined") {
				rootAttr += ' class="' + $class + '"';
			}

			var $style = $(this).attr("style");
			if (typeof ($style) != "undefined") {
				rootAttr += ' style="' + $style + '"';
			}

			var pageInfo = $.extend({
				"prevBtnAttr" : "",
				"nextBtnAttr" : ""
			}, {
				"totalrows" : 0,
				"pageno" : 1,
				"pagesize" : 10
			}, $(this).data('pageinfo'));

			var minPageNo = 1;
			var maxPageNo = Math.ceil(pageInfo.totalrows / pageInfo.pagesize);
			maxPageNo = Math.max(minPageNo, maxPageNo);

			if (pageInfo.pageno <= minPageNo) {
				pageInfo.pageno = minPageNo;
				pageInfo.prevBtnAttr = "disabled";
			}
			if (pageInfo.pageno >= maxPageNo) {
				pageInfo.pageno = maxPageNo;
				pageInfo.nextBtnAttr = "disabled";
			}

			var html = '<div' + rootAttr + '>' + 'Page&nbsp;<button type="button" data-pageno="' + (pageInfo.pageno - 1)
					+ '" class="btn-pageno btn btn-white btn-sm "' + pageInfo.prevBtnAttr
					+ '><i class="fa fa-angle-left"></i></button>&nbsp;';

			html += '<select name="_pageno" class="input-sm">';
			for (i = 1; i <= maxPageNo; i++) {
				html += '<option value="' + i + '"';
				if (i == pageInfo.pageno) {
					html += ' selected';
				}
				html += '>' + i + '</option>';
			}
			html += '</select>';

			html += '&nbsp;<button type="button" data-pageno="' + (pageInfo.pageno + 1)
					+ '" class="btn-pageno btn btn-white btn-sm "' + pageInfo.nextBtnAttr
					+ '><i class="fa fa-angle-right"></i></button>';

			html += '&nbsp;|&nbsp;View&nbsp;<select name="_limit" class="input-sm">';
			for (var k = 0; k < settings.sizes.length; k++) {
				var sizes = settings.sizes[k];
				html += '<option value="' + sizes + '"';
				if (sizes == pageInfo.pagesize)
					html += ' selected';
				html += '>' + sizes + '</option>';
			}
			html += '</select>&nbsp;per page';

			html += '&nbsp;|&nbsp;Total&nbsp;<span>' + pageInfo.totalrows + '</<span>&nbsp;found</div>';

			var $div = $(html);
			$div.find("select[name=_pageno]").on("change", settings.onPaging);
			$div.find("select[name=_limit]").on("change", settings.onSizing);

			$div.find("button.btn-pageno:not([disabled])").on("click", function() {
				var pageno = $(this).data("pageno");
				$div.find("select[name=_pageno]").val(pageno);
				settings.onPaging();
			});

			$(this).replaceWith($div);
		});
	}
});