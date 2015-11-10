(function( $ ) {
	
  var methods = {
    
	show : function() { 
		ssulka = this; //----------ссылка на контейнер---------------------------
      	
		ssulka.html(
			'<div class="container">    '+
			'<div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    '+
            '<div class="panel panel-info" >'+
                    '<div class="panel-heading">'+
                        '<div class="panel-title">Войти</div>'+
                        '<div style="float:right; font-size: 80%; position: relative; top:-10px"><a href="#">Забули пароль?</a></div>'+
                    '</div>'+
                    '<div style="padding-top:30px" class="panel-body" >'+
                        '<div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>'+
                           '<form id="loginform" class="form-horizontal" role="form">'+
                              '<div style="margin-bottom: 25px" class="input-group">'+
                                        '<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>'+
                                        '<input id="login-username" type="text" class="form-control" name="username" value="" placeholder="Логін або email">                                        '+
                                    '</div>'+
                           '<div style="margin-bottom: 25px" class="input-group">'+
                                        '<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>'+
                                        '<input id="login-password" type="password" class="form-control" name="password" placeholder="Пароль">'+
                                    '</div>'+
                            '<div class="input-group">'+
                                      '<div class="checkbox">'+
                                        '<label>'+
                                          '<input id="login-remember" type="checkbox" name="remember" value="1"> Запамятати мене'+
                                        '</label>'+
                                      '</div>'+
                                    '</div>'+
                                '<div style="margin-top:10px" class="form-group">'+
                                 ' <div class="col-sm-12 controls">'+
                                      '<a id="btn-login" href="#" class="btn btn-success">Login  </a>'+
                                   '</div>'+
                                '</div>'+
                                '<div class="form-group">'+
                                    '<div class="col-md-12 control">'+
                                        '<div style="border-top: 1px solid#888; padding-top:15px; font-size:85%" >'+
                                            'Якщо ви ще не знами! '+
                                        '<a href="#" onClick="$("#loginbox").hide(); $("#signupbox").show()">'+
                                            'Приєднуйтеь'+
                                        '</a>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>    '+
                            '</form>     '+
                        '</div>'+                     
                    '</div>  '+
        '</div>'+
       
                    '</div>'+
         '</div'+ 
    '</div>');
				
	}
  };
  
    $.fn.signUp = function( method ) {
    // логика вызова метода
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
    } 
  };
  
  
})(jQuery);