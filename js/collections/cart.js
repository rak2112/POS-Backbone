(function(App) {

  App.Cart = {};
  //App.Pos.Router = {};

  //App.Cart.Model = Backbone.Model.extend({});


  App.Cart.Model = Backbone.Model.extend({
    idAttribute: "productid",
    defaults: {
      unitPriceTotal: 1,
      unit: 1
    }
  });

  App.Cart.collection = Backbone.Collection.extend({
    cartProperties: {
      totalPrice: 0

    },
    model: App.Cart.Model,
    initialize: function() {
      this.listenTo(App.Events, 'item:addToCart', this.addingItem, this);
      this.listenTo(App.Events, 'item:removeFromCart', this.removeItem, this);
      this.listenTo(App.Events, 'item:keyPadValue', this.keyVal, this);
      //this.on('all', this.logEvent, this);
    },

    keyVal: function(key) {
      collection = this.toJSON();
      item = collection.pop();
      this.incrementItem(item, key);

    },

    addingItem: function(collectionItem, key) {
      var item = collectionItem.toJSON();
      // this.isInCart(item);
      if (this.isInCart(item)) {
        //  check if it is in the collection
        // if it is increment unit
        this.incrementItem(item);
      } else {
        // if not add
        this.addItem(item);
      }

    },

    isInCart: function(item) {
      return this.get({
        productid: item.productid
      }) !== undefined ? true : false;
    },

    incrementItem: function(item, key) {
      if (!item) {
        App.Events.trigger('item:changed');
      } else {
        var product, _unitTotalPrice, totalPriceConversion;
        product = this.get({
          productid: item.productid
        });
        if (!key) {
          _unit = product.get('unit') + 1;
          _unitTotalPrice = _unit * product.get('price');
          _unitTotalPrice = _unitTotalPrice.toFixed(2);
          product.set('unit', _unit);
          product.set('unitPriceTotal', _unitTotalPrice);
        } else {
          if (key !== undefined && item !== undefined) {

            var unitsToAdd, length;
            if (key == '-1') {
              units = product.get('unit');

              units = units.toFixed();
              units = units.slice(0, -1);
              length = units.length;
              if (length === 0) {
                units = 0;
                product.set('unit', units);
              }
              units = parseFloat(units);
              product.set('unit', units);
              _unitTotalPrice = units * product.get('price');
              product.set('unitPriceTotal', _unitTotalPrice);

            } else {
              unitsToAdd = product.get('unit') + key;
              _unit = parseInt(unitsToAdd, 10); //key was in string, converted back into number..    
              _unitTotalPrice = _unit * product.get('price');
              _unitTotalPrice = _unitTotalPrice.toFixed(2);
              product.set('unit', _unit);
              product.set('unitPriceTotal', _unitTotalPrice);
            }

          }
        }

      }
      this.cartProperties.totalPrice = this.getTotalPrice();
      App.Events.trigger('item:changed');
    },

    decrementItem: function() {
      App.Events.trigger('item:changed');

    },

    removeItem: function(item) {
      this.remove(item);
      this.cartProperties.totalPrice = this.getTotalPrice();
      App.Events.trigger('item:removed');
    },

    addItem: function(item) {

      var product, _unitTotalPrice;
      this.add(item);
      product = this.get({
        productid: item.productid
      });


      _unitTotalPrice = product.get('price'); //setting the unit price equal to price of the item...
      product.set('unitPriceTotal', _unitTotalPrice); //total price of each product ..
      //trigger add
      this.cartProperties.totalPrice = this.getTotalPrice();
      App.Events.trigger('item:added');
    },
    getTotalPrice: function() {
      var price, unitTotal,
        total = 0,
        products = this.toJSON();
      _.each(products, function(model) {
        unitTotal = model.unitPriceTotal;
        // console.log('typeof', unitTotal, typeof unitTotal);
        price = parseFloat(unitTotal);
        total += price;
      })

      return total.toFixed(2);
      //console.log('total cart price', total);

    }


  });
  App.Cart.view = App.BaseView.extend({
    el: '.checkOut',
    template: Handlebars.compile($('#cart-template').html()),
    events: {
      'click .itemList a#delete': 'deleteItem',
      'click ul.keyPads li.symbol': 'keyPadClicked',
      'click .keyPad a#payNow': 'displayCheckOut'
    },
    initialize: function() {
      this.collection = new App.Cart.collection();

      this.listenTo(App.Events, 'item:added', this.getHTML, this);
      this.listenTo(App.Events, 'item:changed', this.getHTML, this);
      this.listenTo(App.Events, 'item:removed', this.getHTML, this);
      this.listenTo(App.Events, 'reset:cart', this.resetCollection, this);

      //this.collection.reset();

    },
    resetCollection: function() {
      this.collection.reset();
      this.collection.cartProperties.totalPrice = 0;
      this.getHTML();
    },
    displayCheckOut: function(e) {
      e.preventDefault();
      App.router.navigate('checkout', true);
    },
    deleteItem: function(e) {
      e.preventDefault();
      var $countTarget = $(e.currentTarget);
      var itemId = $countTarget.parents('li').attr('id');
      App.Events.trigger('item:removeFromCart', this.collection.get({
        productid: itemId
      }));
    },
    getHTML: function() {
      var cartHtml = '';
      cartHtml += this.template({
        cart: this.collection.toJSON()
      });

      this.onRender(cartHtml);
      // this.$el.find('.itemList').html(cartHtml);
      // this.$el.find('.totalPrice').html(this.collection.cartProperties.totalPrice);
      //return this;
    },
    onRender: function(cartHtml) {
      this.$el.find('.itemList').html(cartHtml);
      this.$el.find('.totalPrice').html('Total: £' + this.collection.cartProperties.totalPrice);
      return this;
    },

    keyPadClicked: function(e) {
      e.preventDefault();
      var key;
      var $currentKey = $(e.currentTarget);
      key = $currentKey.attr('data-val');
      App.Events.trigger('item:keyPadValue', key);
    }
  });

}(App));
