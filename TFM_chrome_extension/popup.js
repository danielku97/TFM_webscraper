// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/*  changeColor.onclick = function(element) {
 	alert("clicked");
 	//var names = document.evaluate( '//div[@class='_3k4n _4-u3'][2]/ul[@class='uiList _4kg _4kt _6-h _6-j']/li//div[@class='clearfix']/div[2]/div[@class='_42ef']/div/div[@class='_66jq']' ,document, null, XPathResult.ANY_TYPE, null );
 	var names = document.evaluate( '//h1' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
 	alert("wtf");
 	alert(names);
 	while (thisName) {
	  alertText += thisName.textContent + "\n";
	  thisName = names.iterateNext();
	}
 	alert(alertText);
  };*/

  function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
    });
}
 document.getElementById('clickActivity').addEventListener('click', injectTheScript);

