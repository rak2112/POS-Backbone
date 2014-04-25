App.Router={};
App.Router = Backbone.Router.extend({
routes:{
  '':'index',
  'home': 'homeRoute',
  "checkout" : "checkingOut"
},
initialize: function(options){
  
},
index: function(){
 // App.categoriesView = new App.Categories.view();
  //App.Events.trigger('cart:goToHome');
},
checkingOut: function(){
	App.checkout = new App.checkOutView();
  App.Events.trigger('cart:goToCheckOut', App.cartView.collection.cartProperties.totalPrice);
},
homeRoute: function(){
	App.categoriesView = new App.Categories.view();
  App.Events.trigger('reset:cart');
   
}

});
