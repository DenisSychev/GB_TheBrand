"use strict";

function BasketInDropDownPanel(id) {
  Container.call(this, id);
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

        /**
         * Контейнер товара в drop down меню
         * @type {jQuery|HTMLElement}
         */
        var $basketItemsDiv = $('<div />', {
          class: 'inBasket'
        });

        /**
         * Картинка товара
         * @type {jQuery|HTMLElement}
         */
        var $goodImg = $('<img />', {
          src: this.src,
          alt: this.title
        });

        /**
         * Контейнер с описанием товара
         * @type {jQuery|HTMLElement}
         */
        var $goodSpecific = $('<div />', {
          class: 'specific'
        });

        /**
         * Название товара
         * @type {jQuery|HTMLElement}
         */
        var $goodTitle = $('<h4 />', {
          text: this.title
        });

        /**
         * Контейнер рейтинга товара
         * @type {jQuery|HTMLElement}
         */
        var $goodRating = $('<div />', {
          class: 'rating'
        });

        /**
         * Целая звезда из набора Fontello для рейтинга товара
         * @type {jQuery|HTMLElement}
         */
        var $iconFullStar = $('<i />', {
          class: 'icon-star'
        });

        /**
         * Половина звезды из набора Fontello для рейтинга товара
         * @type {jQuery|HTMLElement}
         */
        var $iconHalfStar = $('<i />', {
          class: 'icon-star-half-alt'
        });

        /**
         * Контейнер количества и суммы одного товара
         * @type {jQuery|HTMLElement}
         */
        var $goodCountDiv = $('<div />', {
          class: 'count',
          text: 'x'
        });

        /**
         * Количество одного товара
         * @type {jQuery|HTMLElement}
         */
        var $goodCount = $('<div />', {
          class: 'number',
          text: 1
        });

        /**
         * Цена единицы товара
         * @type {jQuery|HTMLElement}
         */
        var $goodPrice = $('<div />', {
          class: 'amount',
          text: '$' + this.price
        });

        /**
         * Контейнер кнопки удаления товара
         * @type {jQuery|HTMLElement}
         */
        var $goodDell = $('<div />', {
          class: 'dell'
        });

        /**
         * Крестик из набора Fontello для удаления товара
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

        $goodCount.prependTo($goodCountDiv);
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