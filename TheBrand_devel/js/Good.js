"use strict";

function Good(id) {
  Container.call(this, id);
  this.loadGoodItems();
}

Good.prototype = Object.create(Container.prototype);
Good.prototype.constructor = Good;

Good.prototype.render = function (htmlElement) {
  var $goodsContent = $('<div />', {
    class: 'items content'
  });

  var $btnViewAllProd = $('<button />', {
    class: 'button allProduct',
    text: 'Browse All Product'
  });

  /**
   * Стрелка вправо из набора Fontello
   * @type {jQuery|HTMLElement}
   */
  var $iconBasket = $('<i />', {
    class: 'icon-right'
  });

  $iconBasket.appendTo($btnViewAllProd);
  $btnViewAllProd.after($goodsContent);

  $goodsContent.appendTo(htmlElement);
};

Good.prototype.loadGoodItems = function () {
  var appnedItems = '.items';

  $.get({
    url: 'json/goods.json',
    dataType: 'json',
    context: this,
    success: function (data) {
      console.log('JSON c товаром загрузился успешно');
      for (var i = 0; i < data.product.length; i++){
        this.id = data.product[i].id_product;
        this.src = data.product[i].src;
        this.title = data.product[i].title;
        this.price = data.product[i].price;

        /**
         * Секция товара
         * @type {jQuery|HTMLElement}
         */
        var $goodContainer = $('<section />', {
          class: 'product'
        });

        /**
         * Описание товара
         * @type {jQuery|HTMLElement}
         */
        var $goodDescription = $('<a />', {
          href: 'single_page.html',
          class: 'descProduct'
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
         * Название товара
         * @type {jQuery|HTMLElement}
         */
        var $goodTitle = $('<h2 />', {
          class: 'desc',
          text: this.title
        });

        /**
         * Цена товара
         * @type {jQuery|HTMLElement}
         */
        var $goodPrice = $('<p />', {
          class: "price",
          text: '$' + this.price
        });

        /**
         * Кнопка добавить в корзину. Скрыта до наведения указателя на товар
         * @type {jQuery|HTMLElement}
         */
        var $goodAddToCart = $('<button />', {
          class: 'cartProduct',
          'data-id': this.id,
          text: 'Add to Cart'
        });

        /**
         * Корзина и набора Fontello
         * @type {jQuery|HTMLElement}
         */
        var $iconBasket = $('<i />', {
          class: 'icon-basket',
          'aria-hidden': 'true'
        });

        //Формирование блока Описание товара
        $goodImg.appendTo($goodDescription);
        $goodTitle.appendTo($goodDescription);
        $goodPrice.appendTo($goodDescription);

        //Добавление корзины из Fontello в кнопку
        $iconBasket.prependTo($goodAddToCart);

        //Добавление блока Описание товара в Секцию товара
        $goodDescription.appendTo($goodContainer);
        //Добавление Кнопки добавить в корзину в Секцию товара
        $goodAddToCart.appendTo($goodContainer);
        //Добавление Секции товара в HTML
        $goodContainer.appendTo(appnedItems);
      }
    }
  });
};