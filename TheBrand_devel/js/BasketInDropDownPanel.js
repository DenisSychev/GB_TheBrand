"use strict";

function BasketInDropDownPanel(idBasket) {
  Container.call(this, idBasket);
  this.countGoods = 0;
  this.amountGoods = 0;
  this.basketItems = [];
  this.loadBasketItems();
}

BasketInDropDownPanel.prototype = Object.create(Container.prototype);
BasketInDropDownPanel.prototype.constructor = BasketInDropDownPanel;

/**
 * Отрисовка товаров в выпадающем списке
 * @param htmlElement
 */
BasketInDropDownPanel.prototype.render = function (htmlElement) {
  var $basketDropDown = $('<div />', {
    class: 'cartDropDown',
    id: this.id + '_items'
  });

  /**
   * Создание блока для отображения кнопок
   * @type {jQuery|HTMLElement}
   */
  var $basketDDButtons = $('<div />', {
    class: "inBasketButtons"
  });

  /**
   * Кнопка перехода на страницу покупки товаров
   * @type {jQuery|HTMLElement}
   */
  var $buttonCheckout = $('<a />', {
    href: "checkout.html",
    class: "checkoutButton",
    text: "Checkout"
  });

  /**
   * Кнопка перехода на страницу корзины
   * @type {jQuery|HTMLElement}
   */
  var $buttonGoCart = $('<a />', {
    href: "shopping_cart.html",
    class: "gtCartButton",
    text:"Go to cart"
  });

  //Формирование блока кнопок перехода в корзину или в покупку товаров
  $buttonCheckout.appendTo($basketDDButtons);
  $buttonGoCart.appendTo($basketDDButtons);

  // //Добавление блока суммы товаров в корзине
  // $basketDDSum.appendTo($basketDropDown);
  //Добавление блока с кнопками в выпадающее меню
  $basketDDButtons.appendTo($basketDropDown);

  //Добавление выпадающего списка в HTML
  $basketDropDown.appendTo(htmlElement);
};

BasketInDropDownPanel.prototype.loadBasketItems = function () {
  var appendId = '#' + this.id + '_items';

  $.get({
    url: 'json/basket.json',
    dataType: 'json',
    context: this,
    success: function (data) {
      this.countGoods = data.basket.length;
      this.amount = data.amount;
      for (var i = 0; i < data.basket.length; i++) {
        //this.amount = data.amount; //Сумма товаров
        this.src = data.basket[i].src;
        this.title = data.basket[i].title;
        this.price = data.basket[i].price;

        var $basketItemsDiv = $('<div />', {
          class: 'inBasket'
        });

        var $goodImg = $('<img />', {
          src: this.src,
          alt: this.title
        });

        var $goodSpecific = $('<div />', {
          class: 'specific'
        });

        var $goodTitle = $('<h4 />', {
          text: this.title
        });

        var $goodRating = $('<div />', {
          class: 'rating'
        });

        /**
         * Добавление целой звезды из набора Fontello
         * @type {jQuery|HTMLElement}
         */
        var $iconFullStar = $('<i />', {
          class: 'icon-star'
        });

        /**
         * Добавление половины звезды из набора Fontello
         * @type {jQuery|HTMLElement}
         */
        var $iconHalfStar = $('<i />', {
          class: 'icon-star-half-alt'
        });

        var $goodPrice = $('<div />', {
          class: 'amount',
          text: '$' + this.price
        });

        var $goodCountDiv = $('<div />', {
          class: 'count'
        });

        var $goodCount = $('<div />', {
          class: 'number',
          text: 1
        });

        var $goodPrice = $('<div />', {
          class: 'amount',
          text: 'x ' + this.price
        });

        var $goodDell = $('<div />', {
          class: 'dell'
        });

        /**
         * Добавление крестика из набора Fontello
         * @type {jQuery|HTMLElement}
         */
        var $iconCancelCircled = $('<i />', {
          class: 'icon-cancel-circled'
        });

        // /**
        //  * Создание блока отображаения суммы товаров в корзине
        //  * @type {jQuery|HTMLElement}
        //  */
        // var $basketDDSum = $('<div />', {
        //   class: "summCart",
        // });
        //
        // var $basketAmount = $('<p />', {
        //   text: '$' + this.amount
        // });

        $goodImg.appendTo($basketItemsDiv);

        $goodTitle.appendTo($goodSpecific);

        $iconFullStar.appendTo($goodRating);
        $iconHalfStar.appendTo($goodRating);
        $goodRating.appendTo($goodSpecific);

        $goodCount.appendTo($goodCountDiv);
        $goodPrice.appendTo($goodCountDiv);
        $goodCountDiv.appendTo($goodSpecific);

        $goodSpecific.appendTo($basketItemsDiv);

        $iconCancelCircled.appendTo($goodDell);
        $goodDell.appendTo($basketItemsDiv);

        // $basketAmount.appendTo($basketDDSum);
        // $basketDDSum.prependTo(appendId);

        $basketItemsDiv.prependTo(appendId);
      }
    }
  })
};

BasketInDropDownPanel.prototype.add = function (idProduct, src, title, price) {
  var basketItem = {
    "id_product": idProduct,
    "src": src,
    "title": title,
    "price": price
  };

  // this.countGoods++;
  this.amount += price;
  this.basketItems.push(basketItem);
  this.refresh(); //Перерисовываем корзину
};