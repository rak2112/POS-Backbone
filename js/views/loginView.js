(function(App) {
  App.Login = {};

  App.Login.model = Backbone.Model.extend({
  	url:'login.php',
    defaults:{
			name: 'admin',
			password: 'admin'
    },
    validate: function(attrs){
			// if(!attrs.name.length) errors.push('name');
			// if(!attrs.password.length) errors.push('password');
			// if(errors.length) return errors;
    }
  });

  App.Login.View = Backbone.View.extend({
		tagName: 'div',
    id: 'loginView',
    template: Handlebars.compile($("#login-template").html()),
		initialize: function() {
			this.render();
		},
		events:{
			'submit' : 'onSubmit'
		},
		render: function(){
			var data='',html;
            data = this.template(this.model.toJSON());
            html = this.$el.html(data);
            $('.prods').append(html);
            return this;
		},
		onSubmit: function(e){
			e.preventDefault();
			console.log('submitting...', this.model.toJSON());
			this.model.set({
				name: this.$('input[name=name]').val(),
				password: this.$('input[name=password]').val()
			});
			if(this.model.attributes.name === 'admin' && this.model.attributes.password === 'admin') {
				this.model.save().success(function(res){
					console.log('res',res);
					location.href='/#home';
				}).error(function(res){
					console.log('error resp', res);
				});
				console.log('login Successful');
				
			}
			else{
				this.$el.find('.alert-danger').show();
				console.log('login Failed');
			}
			
		}
  });



}(App));
