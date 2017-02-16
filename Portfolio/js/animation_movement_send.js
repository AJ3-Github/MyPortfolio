/*----------------------------------------------------------
	Page Configuration
	// https://github.com/yairEO/pathAnimator/
-----------------------------------------------------------*/

	function StartMyAnimationn() {
		// http://editor.method.ac/   PATH CREATOR
		// http://www.janvas.com/XOSYSTEM/PROJECTS/janvas_apps_suite_3.0_public/janvas_application.php
		//var path = "m0 0 h 180 v -199 h 10";
		
		/*
		var path = "m0 0\
		C 0 0,\
		140 -90,\
		180 -230\
		C 110 -130,\
		220 -100,\
		400 0\
		C 500 90,\
		390 220,\
		290 -90\
		"; 
		*/
		MyPath1 = 'm0,0 c179,66 801,-337 405,-280 c-396,57 374,189 374,189 c0,0 88,12 39,47 c-49,35 -94,14 -102,-11 c-8,-25 59,-131 151,-123 c92,8 102,6 130,-40 c228,-46 234,0 234,-71';
		
		MySpeed1 = 3;
		// start "animating" the first Walker on the page
		new AnimateWalker($('.mywalker')[0]).start();
	}


	// handles whatever moves along the path
	function AnimateWalker(walker){
	
		this.pathAnimator = new PathAnimator( MyPath1 );
		this.walker = walker;
		this.reverse = false;
		this.speed = MySpeed1;
		this.easing = '';
		this.startOffset = null;
		this.color = 'deeppink'; // visually separate different walkers easily
	}

	AnimateWalker.prototype = {
		start : function(){
			//this.walker.style.cssText = "";
			this.startOffset = (this.reverse || this.speed < 0) ? 100 : 0; // if in reversed mode, then animation should start from the end, I.E 100%
			this.pathAnimator.context = this; // just a hack to pass the context of every Walker inside it's pathAnimator
			this.pathAnimator.start( this.speed, this.step, this.reverse, this.startOffset, this.finish, this.easing);
		},

		// Execute every "frame"
		step : function(point, angle){
			this.walker.style.cssText = "top:" + point.y + "px;" + 
										"left:" + point.x + "px;" + 
										"transform:rotate(" + angle + "deg);" +
										"-webkit-transform:rotate(" +  angle + "deg);" +
										"color:" + this.color;
		},

		// Restart animation once it was finished
		finish : function(){
			//this.start();
			$('.mywalker').hide();
		},

		// Resume animation from the last completed percentage (also updates the animation with new settings' values)
		resume : function(){
			this.pathAnimator.start( this.speed, this.step, this.reverse, this.pathAnimator.percent, this.finish, this.easing);
		}
	}

	function togglePath(){
		$('#svgPath').toggleClass('show');
	}
	// pause or place the animated object along the path 
	function stopPlay(){
		var thisAnimatedWalker = $(this.parentNode.parentNode).data('walker');
		thisAnimatedWalker.pathAnimator.running ? thisAnimatedWalker.pathAnimator.stop() : thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}