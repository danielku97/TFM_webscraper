function downloadCSV(csv_input) {
  var data, filename, link;
  var csv = csv_input
  if (csv == null) return;
  filename = "TFM_email.csv";
  if (!csv.match(/^data:text\/csv/i)) {
  	csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);
  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

function scrapeScript(suspectedMac, isObesity) {

  // Only differences between the two scripts
  var questionTwo;
  var questionTwoRegex;

  if (isObesity) {
    questionTwo = "If you would like to receive information and updates from The Fasting Method, please provide your email address below (optional)";
    questionTwoRegex = /If you would like to receive information and updates from The Fasting Method\, please provide your email address below \(optional\)/;
  } else {
    questionTwo = "If you would like to receive information and updates from The Longevity Solution, please provide your email address below (optional)";
    questionTwoRegex = /If you would like to receive information and updates from The Longevity Solution\, please provide your email address below \(optional\)/;
  }

  const questionOne = "What is your name? (first name, last name)";
  const questionThree = "Do you agree to the group rules from the admin?";
  const questionOneRegex = /What is your name\? \(first name, last name\)/;
  const questionThreeRegex = /Do you agree to the group rules from the admin\?/;
  const headers = "First Name, Last Name, Email, Additional Info,\n"

  // Xpath to 'Metching Requests - {request_number}'
  // All requests is a bit weird, highlights the bg box that contains all the results'
  const requestNumberXPath = "/html[@id='facebook']/body[@class='_6s5d _71pn _-kb segoe']//div/div[1]/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='du4w35lb l9j0dhe7 cbu4d94t j83agx80']/div[@class='j83agx80 cbu4d94t l9j0dhe7 jgljxmt5 be9z9djy']/div[@class='j83agx80 cbu4d94t d6urw2fd dp1hu0rb l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw jifvfom9 gs1a9yip owycx6da btwxx1t3 buofh1pr dp1hu0rb ka73uehy']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t g5gj957u d2edcug0 hpfvmrgz rj1gh0hx buofh1pr dp1hu0rb']/div[@class='j83agx80 cbu4d94t buofh1pr dp1hu0rb hpfvmrgz l9j0dhe7 du4w35lb']/div[@class='dp1hu0rb d2edcug0 taijpn5t j83agx80 gs1a9yip']/div[@class='k4urcfbm dp1hu0rb d2edcug0 cbu4d94t j83agx80 bp9cbjyn']/div[@class='d2edcug0 sej5wr8e jei6r52m o8rfisnq ecyo15nh']/div[@class='tkr6xdv7 pybr56ya f10w8fjw stjgntxs ni8dbmo4 dhix69tm wkznzc2l rq0escxv ibutc8p7 ue3kfks5 pw54ja7n linmgsc8 cwj9ozl2']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd bp9cbjyn owycx6da btwxx1t3 d1544ag0 tw6a2znq jb3vyjys b5q2rw42 lq239pai mysgfdmx hddg9phg']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz p8fzw8mz pcp91wgn iuny7tx3 ipjc6fyt'][1]/span[@class='d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d3f4x2em fe6kdd0r mau55g9w c8b282yb mdeji52x a5q79mjw g1cxx5fr lrazzd5p oo9gr5id']/span[@class='d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a5q79mjw g1cxx5fr knj5qynh m9osqain']/strong/span[2]";
  const requestNumberXPathMac = "/html[@id='facebook']/body[@class='_6s5d _71pn _-kb sf']/div[@id='mount_0_0']/div/div[1]/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='du4w35lb l9j0dhe7 cbu4d94t j83agx80']/div[@class='j83agx80 cbu4d94t jgljxmt5 l9j0dhe7 be9z9djy']/div[@class='j83agx80 cbu4d94t d6urw2fd dp1hu0rb l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw jifvfom9 gs1a9yip owycx6da btwxx1t3 buofh1pr dp1hu0rb ka73uehy']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t g5gj957u d2edcug0 hpfvmrgz rj1gh0hx buofh1pr dp1hu0rb']/div[@class='j83agx80 cbu4d94t buofh1pr dp1hu0rb hpfvmrgz l9j0dhe7 du4w35lb']/div[@class='dp1hu0rb d2edcug0 taijpn5t j83agx80 gs1a9yip']/div[@class='k4urcfbm dp1hu0rb d2edcug0 cbu4d94t j83agx80 bp9cbjyn']/div[@class='ecyo15nh d2edcug0 hcukyx3x sjgh65i0 cxmmr5t8 tr9rh885']/div[@class='tkr6xdv7 pybr56ya f10w8fjw stjgntxs ni8dbmo4 dhix69tm wkznzc2l rq0escxv ibutc8p7 ue3kfks5 pw54ja7n linmgsc8 cwj9ozl2']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd bp9cbjyn owycx6da btwxx1t3 d1544ag0 tw6a2znq jb3vyjys b5q2rw42 lq239pai mysgfdmx hddg9phg']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz p8fzw8mz pcp91wgn iuny7tx3 ipjc6fyt'][1]";
  const allRequestXPath = "/html[@id='facebook']/body[@class='_6s5d _71pn _-kb segoe']//div/div[1]/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='du4w35lb l9j0dhe7 cbu4d94t j83agx80']/div[@class='j83agx80 cbu4d94t l9j0dhe7 jgljxmt5 be9z9djy']/div[@class='j83agx80 cbu4d94t d6urw2fd dp1hu0rb l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw jifvfom9 gs1a9yip owycx6da btwxx1t3 buofh1pr dp1hu0rb ka73uehy']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t g5gj957u d2edcug0 hpfvmrgz rj1gh0hx buofh1pr dp1hu0rb']/div[@class='j83agx80 cbu4d94t buofh1pr dp1hu0rb hpfvmrgz l9j0dhe7 du4w35lb']/div[@class='dp1hu0rb d2edcug0 taijpn5t j83agx80 gs1a9yip']/div[@class='k4urcfbm dp1hu0rb d2edcug0 cbu4d94t j83agx80 bp9cbjyn']/div[@class='d2edcug0 sej5wr8e jei6r52m o8rfisnq ecyo15nh']";
 	const allRequestXPathMac = "/html[@id='facebook']/body[@class='_6s5d _71pn _-kb sf']/div[@id='mount_0_0']/div/div[1]/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='du4w35lb l9j0dhe7 cbu4d94t j83agx80']/div[@class='j83agx80 cbu4d94t jgljxmt5 l9j0dhe7 be9z9djy']/div[@class='j83agx80 cbu4d94t d6urw2fd dp1hu0rb l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw jifvfom9 gs1a9yip owycx6da btwxx1t3 buofh1pr dp1hu0rb ka73uehy']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t g5gj957u d2edcug0 hpfvmrgz rj1gh0hx buofh1pr dp1hu0rb']/div[@class='j83agx80 cbu4d94t buofh1pr dp1hu0rb hpfvmrgz l9j0dhe7 du4w35lb']/div[@class='dp1hu0rb d2edcug0 taijpn5t j83agx80 gs1a9yip']/div[@class='k4urcfbm dp1hu0rb d2edcug0 cbu4d94t j83agx80 bp9cbjyn']/div[@class='ecyo15nh d2edcug0 hcukyx3x sjgh65i0 cxmmr5t8 tr9rh885']/div[@class='l9j0dhe7 stjgntxs ni8dbmo4 ap1mbyyd dhix69tm wkznzc2l ibutc8p7 l82x9zwi uo3d90p7 cwj9ozl2']";

	var output = headers;
 	var firstNameArray = [];
 	var lastNameArray = [];
 	var emailArray = [];
 	var additionalCommentsArray = []

  var requestTotalDom;
  var allRequestsDom;
  var requestTotal;
  var allRequests;

  if (suspectedMac == false) {
    requestTotalDom = document.evaluate(requestNumberXPath ,document, null, XPathResult.ANY_TYPE, null ).iterateNext();
    allRequestsDom = document.evaluate(allRequestXPath ,document, null, XPathResult.ANY_TYPE, null ).iterateNext();
  } else {
    requestTotalDom = document.evaluate(requestNumberXPathMac ,document, null, XPathResult.ANY_TYPE, null ).iterateNext();
    allRequestsDom = document.evaluate(allRequestXPathMac ,document, null, XPathResult.ANY_TYPE, null ).iterateNext();
  }

  if (allRequestsDom == null) {
    alert("Could not locate the member requests. Please report error to Peter Ku");
  } else if (requestTotalDom == null) {
    alert("Could not total request number. Please report error to Peter Ku");
  } else {
    requestTotal = requestTotalDom.textContent.match(/\d+/)[0];
    allRequests = allRequestsDom.textContent;
  }

 	var requests = allRequests.split(questionOne);

 	// Toss the first cuz it's garbage data
 	requests.splice(0, 1);
 	// Go through each request and extract important data.
 	const extractionRegex = new RegExp("(.*)" + questionTwoRegex.source + "(.*)" + questionThreeRegex.source + "((?:I agree|No Response))", 'i');
 	requestSkipCounter = 0;
 	requestNoRulesCounter = 0;
 	if (requests.length == 0) {
 		alert("No member requests could be found by the script. Perhaps the questions changed or Facebook pushed an update?");
 		return;
 	}
 	requests.forEach(function(request) {
 		results = request.match(extractionRegex);
 		if (results == null) {
     		requestSkipCounter++;
 			return;
 		} else {
 			var name = results[1].replace(",", "");
 			var email = results[2].replace(",", "");
 			var consentToRules = results[3];
 			if (consentToRules.toLowerCase() == "no response") {
 				requestNoRulesCounter++;
 				// March 13th 2021 - We want to return everyone, even if they don't consent to rules
 				// return;
 			}
 			// Make a best guess on their first name
 			var newName = name.split(" ");
 			var firstName = newName[0];
	 	var lastName = name.substring(firstName.length + 1, name.length);
	 	firstName = (firstName.charAt(0).toUpperCase() + firstName.toLowerCase().substring(1, firstName.length)).trim();
	 	lastName = (lastName.charAt(0).toUpperCase() + lastName.toLowerCase().substring(1, lastName.length)).trim();
	 	// Verify email, flag if it doesn't match requirements
	 	var verifiedEmail = email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
	 	// Sanity Check
	 	if (firstName == null || lastName == null || email == null) {
	 		console.log("Sanity check failed, null detected");
	 		requestSkipCounter++;
	 		return;
 			}
 			// Push to arrays
	 	if (verifiedEmail == null) {
	 		additionalCommentsArray.push("Invalid Email");
 			emailArray.push(email);
	 	} else {
	 		additionalCommentsArray.push("");
	 		emailArray.push(verifiedEmail);
	 	}
 			firstNameArray.push(firstName);
 			lastNameArray.push(lastName);
 		}
 	});
 	// Another sanity check assertion
 	var arrayLength = firstNameArray.length
 	if (arrayLength != lastNameArray.length || arrayLength != emailArray.length || arrayLength != additionalCommentsArray.length) {
 		console.log("Sanity check failed, arrays are mismatched lenghts (somehow??)");
 		alert("Unexpected error, this actually should never occur so something interesting must have happened. Contact Peter Ku pleae :)");
 		return;
 	}

 	// Convert data to CSV and download
 	for (var i = 0; i < arrayLength; i++) {
 		output = output + firstNameArray[i] + "," + lastNameArray[i] + "," + emailArray[i] + "," + additionalCommentsArray[i] + "\n";
 	}

 	var quickMaffs = requestTotal - arrayLength - requestNoRulesCounter - requestSkipCounter;
 	var alertMsg = "Of the " + requestTotal + " requests, " + arrayLength + " were processed. " + requestNoRulesCounter + " did not agree to the rules and " + requestSkipCounter + " requests errored out.";
 	
 	if (quickMaffs != 0) {
 		alertMsg = alertMsg + "\n \n" + quickMaffs + " requests were not processed. Remember to scroll down to the bottom of the page.";
  }
 	alert(alertMsg);
	downloadCSV(output);
}

// Main
var suspectedMac = false;
var isObesity = true;


// Xpath to 'The fasting method network by...'
var groupName = "/html[@id='facebook']/body[@class='_6s5d _71pn _-kb segoe']//div/div[1]/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='du4w35lb l9j0dhe7 cbu4d94t j83agx80']/div[@class='j83agx80 cbu4d94t l9j0dhe7 jgljxmt5 be9z9djy']/div[@class='j83agx80 cbu4d94t d6urw2fd dp1hu0rb l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw jifvfom9 gs1a9yip owycx6da btwxx1t3 buofh1pr dp1hu0rb ka73uehy']/div[@class='rq0escxv l9j0dhe7 tkr6xdv7 j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz dp1hu0rb rek2kq2y o36gj0jk']/div[@class='hybvsw6c cjfnh4rs j83agx80 cbu4d94t dp1hu0rb l9j0dhe7 be9z9djy o36gj0jk jyyn76af aip8ia32 so2p5rfc hxa2dpaq']/div[@class='q5bimw55 rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 eg9m0zos l9j0dhe7 du4w35lb ofs802cu pohlnb88 dkue75c7 mb9wzai9 d8ncny3e buofh1pr g5gj957u tgvbjcpo l56l04vs r57mb794 kh7kg01d c3g1iek1 k4xni2cv']/div[@class='j83agx80 cbu4d94t buofh1pr l9j0dhe7']/div[@class='aov4n071']/div[1]/div[@class='oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 a8c37x1j mg4g778l btwxx1t3 pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb lzcic4wl abiwlrkh p8dawk7l ue3kfks5 pw54ja7n uo3d90p7 l82x9zwi']/div[@class='ow4ym5g4 auili1gw rq0escxv j83agx80 buofh1pr g5gj957u i1fnvgqd oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 nnctdnn4 hpfvmrgz qt6c0cv9 jb3vyjys l9j0dhe7 du4w35lb bp9cbjyn btwxx1t3 dflh9lhu scb9dxdr']/div[@class='ow4ym5g4 auili1gw rq0escxv j83agx80 buofh1pr g5gj957u i1fnvgqd oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 tgvbjcpo hpfvmrgz qt6c0cv9 rz4wbd8a a8nywdso jb3vyjys du4w35lb bp9cbjyn btwxx1t3 l9j0dhe7']/div[@class='gs1a9yip ow4ym5g4 auili1gw rq0escxv j83agx80 cbu4d94t buofh1pr g5gj957u i1fnvgqd oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 tgvbjcpo hpfvmrgz rz4wbd8a a8nywdso l9j0dhe7 du4w35lb rj1gh0hx pybr56ya f10w8fjw']/div/div[@class='j83agx80 cbu4d94t ew0dbk1b irj2b8pg']/div[@class='qzhwtbm6 knvmm38d'][1]/span[@class='d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d3f4x2em fe6kdd0r mau55g9w c8b282yb mdeji52x a5q79mjw g1cxx5fr ekzkrbhg oo9gr5id']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd bp9cbjyn owycx6da btwxx1t3 jeutjz8y']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t g5gj957u d2edcug0 hpfvmrgz rj1gh0hx buofh1pr']/span[@class='d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a5q79mjw g1cxx5fr ekzkrbhg oo9gr5id']/span[@class='d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a5q79mjw g1cxx5fr lrazzd5p oo9gr5id']";
var groupNameMac = "/html[@id='facebook']/body[@class='_6s5d _71pn _-kb sf']/div[@id='mount_0_0']/div/div[1]/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb']/div[@class='du4w35lb l9j0dhe7 cbu4d94t j83agx80']/div[@class='j83agx80 cbu4d94t jgljxmt5 l9j0dhe7 be9z9djy']/div[@class='j83agx80 cbu4d94t d6urw2fd dp1hu0rb l9j0dhe7 du4w35lb']/div[@class='rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw jifvfom9 gs1a9yip owycx6da btwxx1t3 buofh1pr dp1hu0rb ka73uehy']/div[@class='rq0escxv l9j0dhe7 tkr6xdv7 j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz dp1hu0rb rek2kq2y o36gj0jk']/div[@class='hybvsw6c cjfnh4rs j83agx80 cbu4d94t dp1hu0rb l9j0dhe7 be9z9djy iyyx5f41 jyyn76af aip8ia32 so2p5rfc hxa2dpaq']/div[@class='q5bimw55 rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 eg9m0zos l9j0dhe7 du4w35lb ofs802cu pohlnb88 dkue75c7 mb9wzai9 d8ncny3e buofh1pr g5gj957u tgvbjcpo l56l04vs r57mb794 kh7kg01d c3g1iek1 k4xni2cv']/div[@class='j83agx80 cbu4d94t buofh1pr']/div[@class='aov4n071']/div[1]/div[@class='oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 a8c37x1j mg4g778l btwxx1t3 pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb lzcic4wl abiwlrkh p8dawk7l ue3kfks5 pw54ja7n uo3d90p7 l82x9zwi']/div[@class='ow4ym5g4 auili1gw rq0escxv j83agx80 buofh1pr g5gj957u i1fnvgqd oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 nnctdnn4 hpfvmrgz qt6c0cv9 jb3vyjys l9j0dhe7 du4w35lb bp9cbjyn btwxx1t3 dflh9lhu scb9dxdr']/div[@class='ow4ym5g4 auili1gw rq0escxv j83agx80 buofh1pr g5gj957u i1fnvgqd oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 tgvbjcpo hpfvmrgz qt6c0cv9 rz4wbd8a a8nywdso jb3vyjys du4w35lb bp9cbjyn btwxx1t3 l9j0dhe7']/div[@class='gs1a9yip ow4ym5g4 auili1gw rq0escxv j83agx80 cbu4d94t buofh1pr g5gj957u i1fnvgqd oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 tgvbjcpo hpfvmrgz rz4wbd8a a8nywdso l9j0dhe7 du4w35lb rj1gh0hx pybr56ya f10w8fjw']/div/div[@class='j83agx80 cbu4d94t ew0dbk1b irj2b8pg']/div[@class='qzhwtbm6 knvmm38d'][1]";

var group = document.evaluate(groupName, document, null, XPathResult.ANY_TYPE, null).iterateNext();


if (group == null) {
  // I think macbooks may have a different link
  group = document.evaluate(groupNameMac, document, null, XPathResult.ANY_TYPE, null).iterateNext();
  suspectedMac = true;
}

if (group == null) {
  alert("Could not locate group name. Please report error to Peter Ku");
}

// They're basically the same thing except for question 2. Could have it passed in as a param but more things
// are subject to change, thus it's better to keep them as separate function calls
if (group.textContent.match(/The Longevity Solution/)){
  isObesity = false
}

scrapeScript(suspectedMac, isObesity);