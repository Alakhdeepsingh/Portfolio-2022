/*
This function takes arguments elements[], toRotate and period
*/
class TxtRotate {
	constructor(el, toRotate, period) {
		// console.log("This is: " + this);

		//array to rotate
		this.toRotate = toRotate;

		//list of elements
		this.el = el;
		this.loopNum = 0;

		//10 is for decimal
		this.period = parseInt(period, 10) || 1000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	}
	tick() {
		var i = this.loopNum % this.toRotate.length;

		// console.log(this.loopNum);
		var fullTxt = this.toRotate[i];

		//Contains present value from ['programmer','developer','designer']
		// console.log(fullTxt);
		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
			// console.log("Deleting" + this.txt + this.isDeleting);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}


		// console.log(this.el);
		//Changes html document of given element. 
		/*
		value of this.el
		<span class="txt-rotate" data-period="1000" data-rotate="[ "Programmer.", "Developer.", "Designer." ]">
		</span>
		*/
		this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
		/*
    
		value of this.el after above line
		<span class="txt-rotate" data-period="1000" data-rotate="[ "Programmer.", "Developer.", "Designer." ]">
		<span class="wrap"> Programmer </span>
		</span>
		*/
		//copy object
		var that = this;
		// console.log(that);

		//Rendumness
		var delta = 300 - Math.random() * 100;

		/*
		Delta is used to set time stamp for recalling tick function
		*/
		if (this.isDeleting) {
			delta /= 2;
			// console.log("Delta cruel:" + delta);
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			// console.log("loop number:" + this.loopNum);
			delta = 500;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	}
}




/*This function runs when the window is loaded. 
txt-rotate is html <span> which contains one of '[ "Programmer.", "Developer.", "Designer." ]
'[ "Programmer.", "Developer.", "Designer." ] is given in data-toggler in the same element.
data-period is the time period to change between each of these values.
element will contain <span> element
*/

window.onload = function () {
	var elements = document.getElementsByClassName('txt-rotate');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-rotate');
		// console.log(elements);
		// console.log("toRotate" + toRotate);
		var period = elements[i].getAttribute('data-period');
		// console.log("period" + period)
		// console.log(elements)
		if (toRotate) {
			new TxtRotate(elements[i], JSON.parse(toRotate), period);
		}
	}

	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
	document.body.appendChild(css);
};

var state = 0;

function changeColor() {
	let root = document.documentElement;
	if (state == 0) {
		root.style.setProperty("--kprimary", 'purple');
		root.style.setProperty("--kprimary2", '#00203FFF');
		root.style.setProperty("--kprimary3", 'white');
		root.style.setProperty("--kheadings", '#00203FFF');
		root.style.setProperty("--kprimary4", 'black');

		state++;
		console.log(state + "state");
	} else {
		window.location.reload();
	}
}