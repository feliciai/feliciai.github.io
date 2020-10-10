var width = $(window).width(); 
window.onscroll = function(){
    if ((width >= 1000)){
        if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            $("#header").css("background","#fff");
            $("#header").css("color","#000");
            $("#header").css("box-shadow","0px 0px 20px rgba(0,0,0,0.09)");
            $("#header").css("padding","20px 0");
            $("#navigation a").hover(function(){
                $(this).css("border-bottom","2px solid var(--secondary-color)");
            },function(){
                $(this).css("border-bottom","2px solid transparent");
            });
        }else{
            $("#header").css("background","transparent");
            $("#header").css("color","#fff");
            $("#header").css("box-shadow","0px 0px 0px rgba(0,0,0,0)");
            $("#header").css("padding","6vh 0");
            $("#navigation a").hover(function(){
                $(this).css("border-bottom","2px solid #fff");
            },function(){
                $(this).css("border-bottom","2px solid transparent");
            });
        }
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            canvas.height = canvas.height + 80;
            //$('canvas').addClass("animated fadeOut");
            setTimeout(function() {}, 2000);
            setTimeout(function() {ballArray = [];}, 4000);
            
        }
    }
    else {
        if(document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
            $("#logo").css("display","none");
            $("#navigation").css("padding-bottom","0");
        }
        else {
            $("#logo").addClass("animated slideInDown");
            $("#logo").css("display","block");
            $("#navigation").css("padding-bottom","15px");
        }
    }
}
$(document).ready( function() {
    if (width >= 300) {
        init();
        animate();
    }
})
function magnify(imglink, caption=""){
    $("#img_here").css("background",`url('${imglink}') center center`);
    $("#magnify").css("display","flex");
    $("#magnify").addClass("animated fadeIn");
    $("#caption").text(caption);
    setTimeout(function(){
        $("#magnify").removeClass("animated fadeIn");
    },800);
}

function closemagnify(){
    $("#magnify").addClass("animated fadeOut");
    setTimeout(function(){
        $("#magnify").css("display","none");
        $("#magnify").removeClass("animated fadeOut");
        $("#img_here").css("background",`url('') center center`);
    },800);
}

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
    },800);
},1650);

$(document).ready(function(){
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('body,html').animate({
        scrollTop: $(hash).offset().top
        }, 800, function(){
        window.location.hash = hash;
       });
      } 
    });
});

$(".carousel-tab").click(function() {
    if ($('.carousel-tab').hasClass('carousel-tab-inactive')) {
        $(this).addClass("carousel-tab-active").siblings().removeClass("carousel-tab-active");
    }
});



//--- adapted from https://www.youtube.com/watch?v=3b7FyIxWW94 "Chris Courses"
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

var colors = [
	'rgba(90, 130, 255, 1)', 'rgba(90, 130, 255, 0.5)', 'rgba(90, 130, 255, 0.2)'
];
//var colors = ['rgb(115, 190, 225)', '#FA69A3', 'rgb(90, 130, 255)'];

var gravity = 0.4;
var friction = 0.6;

var clickX;
var clickY;

// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;
  // init();
});

addEventListener("click", function(event) {
    clickX = event.clientX;
    clickY = event.clientY;
	clickInit();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Ball(x, y, dx, dy, radius, color, gravity, friction) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
    this.gravity = gravity;
    this.friction = friction;

	this.update = function() {
		if (this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * friction;
			this.dx = this.dx * friction;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx * friction;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		//c.stroke();
		c.closePath();
	};
}


// Implementation
var ballArray = [];
var specialBall = new Ball(canvas.width/2, canvas.height - 5*10, 0, 0, 10, "rgb(115, 190, 225)", 0.05, 1);
function init() {
	ballArray = [];

	for (let i = 0; i < 10; i++) {
		var radius = 10;//randomIntFromRange(8, 20);
		var x = gaussianRandom(radius, canvas.width - radius);//randomIntFromRange(radius, canvas.width - radius);
		var y = randomIntFromRange(0, canvas.height - radius);
		var dx = randomIntFromRange(-3, 3)
		var dy = randomIntFromRange(-2, 2)
	    ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors), gravity, friction));
	}
    
    // special
    ballArray.push(specialBall);
}

function clickInit() {
    ballArray = [];

	for (let i = 0; i < 3; i++) {
		var radius = 10;//randomIntFromRange(8, 20);
		var x = randomIntFromRange(clickX - 3, clickX + 3);
		var y = randomIntFromRange(clickY - 3, clickY + 3);
		var dx = randomIntFromRange(-3, 3)
		var dy = randomIntFromRange(-2, 2)
	    ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors), gravity, friction));
	}
    
    // if not yet scrolled
    if (canvas.height == innerHeight) {
        ballArray.push(specialBall);
    }
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}
}



//--- Other fuctions
function gaussianRand() {
    var rand = 0;
    for (var i = 0; i < 6; ++i) {
        rand += Math.random();
    }
    return rand / 6;
}
function gaussianRandom(start, end) {
    return Math.floor(start + gaussianRand() * (end - start + 1));
}
/*
function populateFun(n,colorArray) {
    console.log("here!");
    for (var i = 0; i < n; ++i) {
        var svg = $('#canvas-area').createElement("svg");
        svg.attr("height", "50px");
        svg.attr("width", "50px");
        var circle = svg.createElement("circle");
        circle.attr("cx", function() {
            return (gaussianRandom(0, document.width));
        });
        circle.attr("cy", "-100px");
        circle.attr("r", "25px");
        circle.attr("fill", colorArray[Math.floor(Math.random() * Math.floor(colorArray.length-1))]);
    }
}
*/


