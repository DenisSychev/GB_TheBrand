"use strict";

function Good(id, imgSrc, title, price) {
  Container.call(this, id);
  this.imgSrc = imgSrc;
  this.title = title;
  this.price = price
}

Good.prototype = Object.create(Container.prototype);
Good.prototype.constructor = Good;

Good.prototype.render = function (jQuerySelector) {

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
    src: this.imgSrc,
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
  $iconBasket.appendTo($goodAddToCart);

  //Добавление блока Описание товара в Секцию товара
  $goodDescription.appendTo($goodContainer);
  //Добавление Кнопки добавить в корзину в Секцию товара
  $goodAddToCart.appendTo($goodContainer);
  //Добавление Секции товара в HTML
  $goodContainer.appendTo(jQuerySelector);
};