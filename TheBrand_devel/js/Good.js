"use strict";

function Good(id, imgSrc, title, price) {
  Container.call(this.id);
  this.imgSrc = imgSrc;
  this.title = title;
  this.price = price
}

Good.prototype = Object.create(Container.prototype);
Good.prototype.constructor = Good;

Good.prototype.render = function (jQuerySelector) {
  var $goodContainer = $('<section />', {
    class: 'product',
  });

  var $goodDescription = $('<a />', {
    href: '#',
    class: 'descProduct'
  });

  var $goodImg = $('<img />', {
    src: this.imgSrc,
    alt: this.title
  });

  var $goodTitle = $('<h2 />', {
    class: 'desc',
    text: this.title
  });

  var $goodPrice = $('<p class="price">' + this.price + '</p>');

  /**
   * Кнопка добавить в корзину
   * @type {jQuery|HTMLElement}
   */
  var $goodAddToCart = $('<a />', {
    class: 'cartProduct',
    'data-id': this.id,
    text: 'Add to Cart'
  });

  /**
   * Добавление иконки корзины и набора Fontello
   * @type {jQuery|HTMLElement}
   */
  var $iconBasket = $('<i />', {
    class: 'icon-basket',
    'aria-hidden': 'true'
  });

  $goodImg.appendTo($goodDescription);
  $goodTitle.appendTo($goodDescription);
  $goodPrice.appendTo($goodDescription);

  $iconBasket.appendTo($goodAddToCart);

  $goodDescription.appendTo($goodContainer);
  $goodAddToCart.appendTo($goodContainer);

  $goodContainer.appendTo(jQuerySelector);
};