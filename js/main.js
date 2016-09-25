var App = {
	collections: {},
	Router:{}
};

(function(exports, $, Backbone) {
	App.init = function() {
		App.Events = _.extend({}, Backbone.Events);
		App.productsView = new App.Products.view();
		App.cartView = new App.Cart.view();
		App.router = new App.Router();
        Backbone.history.start();
		App.router.navigate('home', true);
 };

}(window, jQuery, Backbone));
