// Для всех современных браузеров
(function() {
    var buttons = document.getElementsByTagName('button');

    var changecolor = function (e) {

    	console.log( e.type );//название события
    	console.log( e.target );//инициатор события
    	console.log( e.currentTarget );//на чем находится обработчик
    	e.preventDefault();//отключить логику элемента заданого по умолчанию

    	if (this.id === 'day') {
    		document.body.className = 'day';
    	} else if (this.id === 'night') {
    		document.body.className = 'night';
    	}
    };

    var sayHI = function () {
    	alert('Привет');
    };

    for (var i = 0, len = buttons.length; i < len; i++ ){
       buttons[i].addEventListener('click', changecolor, false);// добавляем событие
       buttons[i].addEventListener('click', sayHI, false);

       buttons[i].removeEventListener('click', changecolor, false);// убираем событие
    };

})();

// Для IE ниже 9 ой версии
(function() {
    var buttons = document.getElementsByTagName('button');

    var changecolor = function (e) {
    	
    	e.returnValue = false;//отключить логику элемента заданого по умолчанию

    	var elem = e.srcElement;

    	if (elem.id === 'day') {
    		document.body.className = 'day';
    	} else if (elem.id === 'night') {
    		document.body.className = 'night';
    	}
    };

    var sayHI = function () {
    	alert('Привет');
    };

    for (var i = 0, len = buttons.length; i < len; i++ ){
       buttons[i].attachEvent('onclick', changecolor);// добавляем событие
      
    };

})();

// Кросбраузерный обькт

var eventObj = {
	addEvent: function (el, type, fn){
		if (typeof addEventListener !== 'undefined'){ 
			el.addEventListener(type, fn, false);//современный браузер
		} else if (typeof attachEvent !== 'undefined'){
			el.attachEvent('on' + type, fn);// IE нижу 9
		} else {
			el['on' + type] = fn;// Остальные
		}
	},

	getTarget: function (event){
		if (typeof event.target !== 'undefined'){
			return event.target;
		} else {
			return event.srcElement;
		}
	},

	preventDefault: function(event) {
		if (typeof event.preventDefault !== 'undefined') {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	removeEvent: function (el, type, fn){
		if (typeof removeEventListener !== 'undefined'){ 
			el.removeEventListener(type, fn, false);//современный браузер
		} else if (typeof detachEvent !== 'undefined'){
			el.detachEvent('on' + type, fn);// IE нижу 9
		} else {
			el['on' + type] = fn;// Остальные
		}
	}
};


(function() {
    var buttons = document.getElementsByTagName('button');

    var changecolor = function (e) {
    	
    eventObj.preventDefault(e);

    	var elem = eventObj.preventDefault(e);

    	if (elem.id === 'day') {
    		document.body.className = 'day';
    	} else if (elem.id === 'night') {
    		document.body.className = 'night';
    	}
    };    

    for (var i = 0, len = buttons.length; i < len; i++ ){       
         eventObj.addEvent(buttons[i], 'click', changecolor)  // добавляем событие
      
    };

})();
