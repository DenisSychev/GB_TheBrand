"use strict";

function GoodInBasket(id, imgSrc, title, color, size, price) {
  Container.call(this.id);
  this.imgSrc = imgSrc;
  this.title = title;
  this.color = color;
  this.size = size;
  this.price = price
}

GoodInBasket.prototype = Object.create(Container.prototype);
GoodInBasket.prototype.constructor = GoodInBasket;

GoodInBasket.prototype.render = function (jQuerySelector) {
  var $goodContainer = $('<div />', {
    class: 'row',
  });

  var $goodDescription = $('<div />', {
    class: 'cell prod_details'
  });

  var $goodImg = $('<img />', {
    src: this.imgSrc,
    alt: this.title
  });

  var $goodTextBlock = $('<div />', {
    class: 'text'
  });

  var $goodTitle = $('<h4 />', {
    text: this.title
  });

  var $goodColor = $('<p>Color:' + this.color + '<p/>');

  var $goodSize = $('<p>Size:' + this.size + '<p/>');

  var $goodPrice = $('<div />', {
    class: 'cell unite_price',
    text: '$' + this.price
  });

  var $goodShipping = $('<div />', {
    class: 'cell shipping',
    text: 'FREE'
  });

  var $goodsSubtotal = $('<div />', {
    class: 'cell subtotal',
    text: '300'
  });

  /**
   * Кнопка удаления товара со страницы корзины
   * @type {jQuery|HTMLElement}
   */
  var $goodDell = $('<div />', {
    class: 'cell dell'
  });

  /**
   * Добавление крестика из набора Fontello
   * @type {jQuery|HTMLElement}
   */
  var $iconCancelCircled = $('<i />', {
    class: 'icon-cancel-circled'
  });

  $goodTitle.appendTo($goodTextBlock);
  $goodColor.appendTo($goodTextBlock);
  $goodSize.appendTo($goodTextBlock);

  $goodImg.appendTo($goodDescription);

  $goodTextBlock.appendTo($goodDescription);

  $goodDescription.appendTo($goodContainer);

  $goodPrice.appendTo($goodContainer);

  //Сюда добавить выбор количества товара

  $goodShipping.appendTo($goodContainer);

  $goodsSubtotal.appendTo($goodContainer);

  $iconCancelCircled.appendTo($goodDell);
  $goodDell.appendTo($goodContainer);

  $goodContainer.appendTo(jQuerySelector);
};