'use strict';


function MainFactory() {

	var gender = null;
	var model = null;

    return{
		sayHello : function(name){
			return 'hello ' + name;
		},

		setGender : function(value){
			gender = value;
		},
		getGender : function(){
			return gender;
		},
		setModel : function(value){
			model = value;
		},
		getModel : function(){
			return model;
		}
    };
};

