"use strict";

(function(){
	update_static_height();
	align_hero_containers();
	setTimeout(function(){
		update_static_height();
		align_hero_containers();
	}, 100);
	setTimeout(function(){
		update_static_height();
		align_hero_containers();
	}, 500);
	
	let el_reached_subscribers = Array.from(document.querySelectorAll(".block.floating, .block.footer"));
	
	setInterval(function(){
		check_reached_subscribers();
	}, 500)
	
	document.addEventListener("scroll", function(event){
		
	});
	
	function update_static_height(){
		let el_targets = document.querySelectorAll(".block");
		let window_height = window.innerHeight;
		
		for(let target of el_targets){
			let data_static_height = parseFloat(target.dataset.static_height);
			let result_height;
			
			if(data_static_height){
				result_height = window_height * data_static_height;
			} else if(target.classList.contains("title")){
				result_height = window_height;
			} else if(target.classList.contains("floating")){
				result_height = window_height * 0.8;
			} else if(target.classList.contains("parallax-bg")){
				result_height = window_height;
			} else if(target.classList.contains("footer")){
				result_height = window_height;
			}
			
			target.style.height = result_height + "px";
		}
	}
	
	function check_reached_subscribers(){
		for(let i = 0; i < el_reached_subscribers.length; i++){
			if(el_reached_subscribers[i] == null) continue;
			
			if(is_el_reached(el_reached_subscribers[i])){
				let target_subscriber = el_reached_subscribers[i];
				el_reached_subscribers[i] = null;
				
				let icons_to_animate = target_subscriber.querySelectorAll(".icon.waiting");
				for(let el_icon of icons_to_animate){
					animate_icon(el_icon);
				}
			}
		}
	}
	
	function animate_icon(el_icon){
		let animation_type = el_icon.dataset.animation;
		let transition_multiplier = +el_icon.dataset.transition_multiplier;
		let rotate_multiplier = +el_icon.dataset.rotate_multiplier;
		
		let animation_delay_ms = Math.random() * 1000;
		let rotation_deg = Math.round(Math.random() * 25 - 12) * rotate_multiplier;
		let translate_dist_px = Math.round(Math.random() * 9 + 1) * transition_multiplier;
		
		let style_rotate = "rotate(" + rotation_deg + "deg)";
		let style_transform = "";
		
		switch(animation_type){
			case "up":{
				style_transform = "translateY(-" + translate_dist_px + "vh)";
				break;
			}
			case "down":{
				style_transform = "translateY(" + translate_dist_px + "vh)";
				break;
			}
			case "right":{
				style_transform = "translateX(" + translate_dist_px + "vw)";
				break;
			}
			case "left":{
				style_transform = "translateX(-" + translate_dist_px + "vw)";
				break;
			}
		}
		setTimeout(function(){
			el_icon.style.transform = style_transform + " " + style_rotate;
			el_icon.classList.remove("waiting");
			el_icon.classList.add("triggered");
		}, animation_delay_ms);
		
	}
	
	function is_el_reached(el){
		let window_height = window.innerHeight;
		let bounding_rect = el.getBoundingClientRect();
		
		if(bounding_rect.top < 0) return true;
		if(window_height / bounding_rect.top > 1.5){
			return true;
		}
		return false;
	}
	
	/*
	function adjust_parallax_blocks_style(){
		let el_blocks = document.querySelectorAll(".block.parallax-bg");
		let window_width  = window.innerWidth;
		let window_height = window.innerHeight;
		
		for(let el_targ_block of el_blocks){
			if(el_targ_block.dataset.respect_img_size == "1"){
				let img_original_width  = +el_targ_block.dataset.img_width;
				let img_original_height = +el_targ_block.dataset.img_height;
				let img_scale = window_width / img_original_width;
				let img_result_width  = Math.round(img_original_width  * img_scale);
				let img_result_height = Math.round(img_original_height * img_scale);
				
				el_targ_block.style.backgroundSize = `${img_result_width}px ${img_result_height}px`;
			}
		}
	}
	*/
	
	function align_hero_containers(){
		let el_hero_containers = document.querySelectorAll(".block > .hero-container");
		
		for(let el_hero_cont of el_hero_containers){
			let hero_cont_height = el_hero_cont.clientHeight;
			let block_height = el_hero_cont.parentNode.clientHeight;
			let result_interval = (block_height - hero_cont_height) / 2;
			
			el_hero_cont.style.top = result_interval + "px";
		}
	}
})()

