function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function scroll(){
	for (i = 0; i < scrollTime; i++){
		window.scrollTo(0,document.body.scrollHeight);
		await sleep(500)
	}
}

scrollTime = 60;

// customTime = document.getElementById("scrollTime").innerHTML;
// CustomTime gets passed in from scrollBot.js google chrome file thing
// if (customTime != null) {
// 	scrollTime = customTime;
// }

alert("Scrolling to the bottom (" + scrollTime/2 + " seconds)");

scroll();
