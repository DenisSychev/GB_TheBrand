"use strict";

function BasketInDropDownPanel(id) {
  Container.call(this, id);
  this.countGoods = 0;
  //this.amountGoods = 0;
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

  var $basketCount = $('<div />', {
    class: 'totalCount'
  });

  /**
   * Drop down меню
   * @type {jQuery|HTMLElement}
   */
  var $basketDropDown = $('<div />', {
    class: 'cartDropDown',
    id: this.id + '_items'
  });

  /**
   * Блок кнопок
   * @type {jQuery|HTMLElement}
   */
  var $basketDDButtons = $('<div />', {
    class: "inBasketButtons"
  });

  /**
   * Блок суммы товаров в корзине
   * @type {jQuery|HTMLElement}
   */
  var $basketDDSum = $('<div />', {
    class: "summCart"
  });

  /**
   * Текст для блока суммы товаров в корзине
   * @type {jQuery|HTMLElement}
   */
  var $textDDsum = $('<p />', {
    text: 'Total'
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
    text: "Go to cart"
  });

  $basketCount.appendTo(htmlElement);

  //Формирование блока кнопок перехода в корзину или в покупку товаров
  $buttonCheckout.appendTo($basketDDButtons);
  $buttonGoCart.appendTo($basketDDButtons);

  //Добавление блока суммы товаров в корзине
  $textDDsum.appendTo($basketDDSum);
  $basketDDSum.appendTo($basketDropDown);

  //Добавление блока с кнопками в выпадающее меню
  $basketDDButtons.appendTo($basketDropDown);

  //Добавление выпадающего списка в HTML
  $basketDropDown.appendTo(htmlElement);
};

/**
 *  Загрузка и отрисовка товаров из JSON
 */
BasketInDropDownPanel.prototype.loadBasketItems = function () {
  var appendId = '#' + this.id + '_items';
  var appendAmount = '.summCart';
  var appendCount = '.totalCount';

  $.get({
    url: 'json/basket.json',
    dataType: 'json',
    context: this,
    success: function (data) {
      console.log('JSON c корзиной загрузился успешно');
      this.countGoods = data.basket.length;
      this.amountGoods = data.amount;

      /**
       * Количество товаров в корзине
       * @type {jQuery|HTMLElement}
       */
      var $countGoods = $('<span />', {
        text: this.countGoods
      });

      $countGoods.appendTo(appendCount);

      /**
       * Сумма всех товаров в корзине
       * @type {jQuery|HTMLElement}
       */
      var $basketAmount = $('<p />', {
        text: '$' + this.amountGoods
      });

      //Добавление суммы всех товаров в корзине в блок суммы
      $basketAmount.appendTo(appendAmount);

      for (var i = 0; i < data.basket.length; i++) {
        //this.amount = data.amount; //Сумма товаров
        this.id_product = data.basket[i].id_product;
        this.src = data.basket[i].src;
        this.title = data.basket[i].title;
        this.price = data.basket[i].price;

        /**
         * Контейнер товара в drop down меню
         * @type {jQuery|HTMLElement}
         */
        var $basketItemsDiv = $('<div />', {
          class: 'inBasket',
          'data-id': this.id_product
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
        var $goodPriceClass = $('<div />', {
          class: 'amount',
          text: '$'
        });

        var $goodPrice = $('<span />', {
          text: this.price
        });

        $goodPrice.appendTo($goodPriceClass);

        /**
         * Контейнер кнопки удаления товара
         * @type {jQuery|HTMLElement}
         */
        var $goodDell = $('<div />', {
          class: 'dell',
          'data-id': this.id_product
        });

        /**
         * Крестик из набора Fontello для удаления товара
         * @type {jQuery|HTMLElement}
         */
        var $iconCancelCircled = $('<i />', {
          class: 'icon-cancel-circled'
        });

        $goodImg.appendTo($basketItemsDiv);

        $goodTitle.appendTo($goodSpecific);

        $iconFullStar.appendTo($goodRating);
        $iconHalfStar.appendTo($goodRating);
        $goodRating.appendTo($goodSpecific);

        $goodCount.prependTo($goodCountDiv);
        $goodPriceClass.appendTo($goodCountDiv);
        $goodCountDiv.appendTo($goodSpecific);

        $goodSpecific.appendTo($basketItemsDiv);

        $iconCancelCircled.appendTo($goodDell);
        $goodDell.appendTo($basketItemsDiv);

        $basketItemsDiv.prependTo(appendId);

        for (var itemKey in data.basket) {
          this.basketItems.push(data.basket[itemKey])
        }
      }
    }
  })
};

/**
 * Добавление товара в корзину
 * @param {int} id_product Код (data-id)
 * @param {string} src Ссылка на картинку
 * @param {string} title Название
 * @param {int} price Цена
 */
BasketInDropDownPanel.prototype.add = function (id_product, src, title, price) {
  var basketItem = {
    "id_product": id_product,
    "src": src,
    "title": title,
    "price": price
  };

  this.countGoods++;
  this.amountGoods += price;
  this.basketItems.push(basketItem);
  console.log('Товары добавлены в массив' + this.basketItems);
  this.refresh();
};

/**
 * Удаление товара из корзины
 * @param {int} id_product Код (data-id)
 * @param {int} countProd Количество единиц этого товара
 * @param {int} price Цена
 */
BasketInDropDownPanel.prototype.remove = function (id_product, countProd, price) {
  var sumPriceThisProd = countProd * price;
  //this.countGoods -=countProd;
  this.amountGoods -= sumPriceThisProd;
  $('.cartDropDown').find('.inBasket[data-id='+ id_product +']').remove();
  this.refresh();
};

/**
 * Обновление drop down блока 
 */
BasketInDropDownPanel.prototype.refresh = function () {
  var $basketDropDown = $('.cartDropDown');
  $basketDropDown.empty();
  console.log('Drop down меню очищено после клика на кнопку');

  /**
   * Блок кнопок
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
    text: "Go to cart"
  });

  /**
   * Блок суммы товаров в корзине
   * @type {jQuery|HTMLElement}
   */
  var $basketDDSum = $('<div />', {
    class: "summCart"
  });

  /**
   * Текст для блока суммы товаров в корзине
   * @type {jQuery|HTMLElement}
   */
  var $textDDsum = $('<p />', {
    text: 'Total'
  });

  //Формирование блока кнопок перехода в корзину или в покупку товаров
  $buttonCheckout.appendTo($basketDDButtons);
  $buttonGoCart.appendTo($basketDDButtons);

  //Добавление блока суммы товаров в корзине
  $textDDsum.appendTo($basketDDSum);
  $basketDDSum.appendTo($basketDropDown);

  //Добавление блока с кнопками в выпадающее меню
  $basketDDButtons.appendTo($basketDropDown);

  //Перебор массива basketItems
  for (var i = 0; i < this.basketItems; i++) {

    this.amountGoods = this.basketItems[i].amountGoods;
    this.id_product = this.basketItems[i].id_product;
    this.src = this.basketItems[i].src;
    this.title = this.basketItems[i].title;
    this.price = this.basketItems[i].price;


    /**
     * Сумма всех товаров в корзине
     * @type {jQuery|HTMLElement}
     */
    var $basketAmount = $('<p />', {
      text: '$' + this.amountGoods
    });

    //Добавление суммы всех товаров в корзине в блок суммы
    $basketAmount.appendTo($basketDDSum);


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
      class: 'dell',
      'data-id': this.id_product
    });

    /**
     * Крестик из набора Fontello для удаления товара
     * @type {jQuery|HTMLElement}
     */
    var $iconCancelCircled = $('<i />', {
      class: 'icon-cancel-circled'
    });

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

    $basketItemsDiv.prependTo($basketDropDown);
  }
};