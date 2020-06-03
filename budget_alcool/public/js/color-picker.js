$(document).ready(function() {
	jQuery.fn.pickify = function() {

		this.on('hide.bs.dropdown', function (e) {
			if (e.clickEvent)
				e.preventDefault()
		})

		return this.each(function() {
			picker = $(this).children('.picker')
			board = picker.children('.board')
			choice = board.children()
			rainbow = picker.children('.rainbow')
	
			let colors = picker.attr('data-hsv').split(',')
			let hsv = {h: colors[0], s: colors[1], v: colors[2]}
			picker.data('hsv', hsv)
			let hex = '#'+rgb2hex(hsv2rgb(hsv))
			changeColour(hsv, picker)
			changeHue(colors[0], picker)
			
			// making things happen
			rainbow.slider({
				value: colors[0],
		 		min: 0,
				max: 359,
				slide: (e, ui) => {
					changeHue(ui.value, $(e.target).parent())
				}
			})
			choice.draggable({
				containment: '.board',
				cursor: 'crosshair',
				create: () => {
					choice.css({'left': colors[1]*1.8, 'top': 180-colors[2]*1.8})
				},
				drag: (e, ui) => {
					changeSatVal(ui.position.left, ui.position.top, $(e.target).parent().parent())
				}
			})
			board.on('click', function(e) {
				let target = $(e.currentTarget).parent()
				let offset = $(e.currentTarget).offset()
				let left = e.pageX-offset.left
				let top = e.pageY-offset.top

				$(e.currentTarget).find('.choice').css({'left': left, 'top': top})
				changeSatVal(left, top, target)
				changeColour(target.data('hsv'), target)
			})
			
			// drag var actions
			function changeHue(hue, target) {
				target.children('.board').css('background-color', 'hsl('+hue+',100%,50%)')
				let hsv = target.data('hsv')
				hsv.h = hue
				changeColour(hsv, target)
			}
			function changeSatVal(sat, val, target) {
				sat = Math.floor(sat/1.8)
				val = Math.floor(100-val/1.8)
				let hsv = target.data('hsv')
				hsv.s = sat
				hsv.v = val
				changeColour(hsv, target)
			}
			
			// changing the colours
			function changeColour(hsv, target) {
				let rgb = hsv2rgb(hsv)
				let hex = rgb2hex(rgb)
				target.data('hsv', hsv).data('rgb', rgb)
				target.parent().children('.icon').css('background-color', '#'+hex).css('color', '#'+hex)
				target.parent().children('input').val('#'+hex)
			}
			
			function hsv2rgb(hsv) {
				h = hsv.h
				s = hsv.s
				v = hsv.v
				let r, g, b
				let i
				let f, p, q, t
				h = Math.max(0, Math.min(360, h))
				s = Math.max(0, Math.min(100, s))
				v = Math.max(0, Math.min(100, v))
				s /= 100
				v /= 100
				if(s == 0) {
					r = g = b = v
					return {r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255)}
				}
				h /= 60
				i = Math.floor(h)
				f = h - i // factorial part of h
				p = v * (1 - s)
				q = v * (1 - s * f)
				t = v * (1 - s * (1 - f))
				switch(i) {
					case 0: r = v; g = t; b = p; break;
					case 1: r = q; g = v; b = p; break; 
					case 2: r = p; g = v; b = t; break; 
					case 3: r = p; g = q; b = v; break; 
					case 4: r = t; g = p; b = v; break; 
					default: r = v; g = p; b = q;
				}
				return {r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255)}
			}
			function rgb2hex(rgb) {
				function hex(x) {
					return ("0" + parseInt(x).toString(16)).slice(-2)
				}
				return hex(rgb.r) + hex(rgb.g) + hex(rgb.b)
			}
		})
	}
	$('.color-picker').pickify()
})