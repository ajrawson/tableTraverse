(function( $ ) {
	$.fn.extend({ 
		tableTraverse: function(options) {
			
			var defaults = {
				highlightRow: true,
				highlightClass: 'selectedRow'
			}
			
			var options = $.extend(defaults, options);
			
			return this.each(function() {
				var o = options;
				$(this).find('input').live('keyup', function(e) {
					if(e.which == 39) {
						//right
						var i = $(this).closest('td').index();
						while (i < $(this).closest('tr').find('td:last').index()) {
							i++;
							if ($(this).closest('tr').find('td:nth(' + i +') input[type=text]').length > 0) {
								$(this).closest('tr').find('td:nth(' + i +') input[type=text]').select();
								$(this).change();
								break;
							}
						}
					}
					else if(e.which == 37) {
						//left
						var i = $(this).closest('td').index();
						while (i > 0) {
							i--;
							if ($(this).closest('tr').find('td:nth(' + i +') input[type=text]').length > 0) {
								$(this).closest('tr').find('td:nth(' + i +') input[type=text]').select();
								$(this).change();
								break;
							}
						}
					}
					else if(e.which == 40) {
						//down
						var curr = $(this).closest('tr').index();
						var last = $(this).closest('table').find('tr:last').index();
						if (curr < last) {
							if (o.highlightRow) {
								$(this).closest('tr').removeClass(o.highlightClass);
								$(this).closest('tr').next().addClass(o.highlightClass);
							}
							$(this).closest('tr').next().find('td:eq('+$(this).closest('td').index()+')').find('input').select();
							$(this).change();
						}
					}
					else if(e.which == 38) {
						//up
						var curr = $(this).closest('tr').index();
						if (curr > 0) {
							if (o.highlightRow) {
								$(this).closest('tr').removeClass(o.highlightClass);
								$(this).closest('tr').prev().addClass(o.highlightClass);
							}
							$(this).closest('tr').prev().find('td:eq('+$(this).closest('td').index()+')').find('input').select();
							$(this).change();
						}
					}
				});
							
				$(this).find('input, select').live('blur', function() {
					if (o.highlightRow) {
						$(this).closest('tr').removeClass(o.highlightClass);
					}
				});
				
				$(this).find('input, select').live('focus', function() {
					if (o.highlightRow) {
						$(this).closest('tr').addClass(o.highlightClass);
					}
				});
			});
		}
	});
})(jQuery);