(function(App) {


  App.Categories = {};
  App.Categories.Model = Backbone.Model.extend({});
  App.Categories.Collection = Backbone.Collection.extend({

    url: 'data/data.json',
    model: App.Categories.Model,
    parse: function(data) {
      return data.categories;
    }
  });


  App.collections.categories = new App.Categories.Collection();


  App.Categories.view = App.BaseView.extend({

    el: '.prods',
    collection: App.collections.categories,
    template: $('#prods-template'),
    events: {
      'click ul#items li.plan': 'categoryClicked',
      'click a#home': 'homeClicked'
    },
    initialize: function() {

      this.collection.fetch();
      this.collection.once('all', this.getHtml, this);
    },

    getHtml: function() {
      var liTemplates = _.template(this.template.html(), {
        categories: this.collection.toJSON()
      });
      //this.$el.html(liTemplates);
      this.render(liTemplates);
      //App.baseView.render.call(this, liTemplates) 


    },

    homeClicked: function(e) {
      e.preventDefault();

      App.Events.trigger('home:clicked');
    },

    categoryClicked: function(e) {
      e.preventDefault();
      var id = $(e.currentTarget).data('id');
      App.Events.trigger('category:changed', id);

    }

  });


}(App));
