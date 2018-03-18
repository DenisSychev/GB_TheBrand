"use strict";

function Basket(idBasket) {
  Container.call(this, idBasket);
  this.countGoods = 0;
  this.amountGoods = 0;
  this.basketItems = [];
  this.loadBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

/**
 * Отрисовка товаров в корзине
 * @param jQuerySelector
 */
Basket.prototype.render = function (htmlElement) {
  var $basketDiv = $('<div />', {
    class: 'table',
    id: this.id + '_items'
  });

  var $basketDivCaption = $('<div />', {
    class: "row caption"
  });

  // var $basketItemsDiv = $('<div />', {
  //   class: 'row',
  //   id: this.id + '_items'
  // });

  //Заголовки таблицы
  var $captionDetails = $('<div />', {
    class: "cell",
    text: 'Product Details'
  });

  var $captionPrice = $('<div />', {
    class: "cell",
    text: 'unite Price'
  });

  var $captionQuantity = $('<div />', {
    class: "cell",
    text: 'Quantity'
  });

  var $captionShipping = $('<div />', {
    class: "cell",
    text: 'shipping'
  });

  var $captionSubtotal = $('<div />', {
    class: "cell",
    text: 'Subtotal'
  });

  var $captionAction = $('<div />', {
    class: "cell",
    text: 'Action'
  });

  //Собирается заголовок таблицы
  $captionDetails.appendTo($basketDivCaption);
  $captionPrice.appendTo($basketDivCaption);
  $captionQuantity.appendTo($basketDivCaption);
  $captionShipping.appendTo($basketDivCaption);
  $captionSubtotal.appendTo($basketDivCaption);
  $captionAction.appendTo($basketDivCaption);
  //Встраивается заголовок таблицы
  $basketDivCaption.appendTo($basketDiv);
  //Собранная таблица встраивается в HTML
  $basketDiv.prependTo(htmlElement);
};

/**
 * Получение и загрузка товаров
 */
Basket.prototype.loadBasketItems = function () {
  var appendId = '#' + this.id + '_items';

  $.get({
    url: 'json/basket.json',
    dataType: 'json',
    context: this,
    success: function (data) {
      this.countGoods = data.basket.length;
      for (var i = 0; i < data.basket.length; i++) {
        //this.amount = data.amount; //Сумма товаров
        this.src = data.basket[i].src;
        this.title = data.basket[i].title;
        this.color = data.basket[i].color;
        this.size = data.basket[i].size;
        this.price = data.basket[i].price;
        this.shipping = data.basket[i].shipping;

        var $basketItemsDiv = $('<div />', {
          class: 'row'
        });

        var $goodDescription = $('<div />', {
          class: 'cell prod_details'
        });

        var $goodImg = $('<img />', {
          src: this.src,
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

        /**
         * Блок с количеством товаров
         * @type {jQuery|HTMLElement}
         */
        var $goodQuantityDiv = $('<div />', {
          class: 'cell quantity_cart'
        });
        /**
         * Поле ввода количества товаров
         * @type {jQuery|HTMLElement}
         */
        var $goodQuantity = $('<input type="number" value="1" min="1" />');

        var $goodShipping = $('<div />', {
          class: 'cell shipping',
          text: this.shipping
        });

        // var $goodsSubtotal = $('<div />', {
        //   class: 'cell subtotal',
        //   text: '300'
        // });

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
        //Собирается текст-описание товара
        $goodTitle.appendTo($goodTextBlock);
        $goodColor.appendTo($goodTextBlock);
        $goodSize.appendTo($goodTextBlock);
        //В столбец описания добавляется картинка и текст
        $goodImg.appendTo($goodDescription);
        $goodTextBlock.appendTo($goodDescription);
        //Столбцец описания добавляется в строку
        $goodDescription.appendTo($basketItemsDiv);
        //Столбец с ценой добавляется в троку
        $goodPrice.appendTo($basketItemsDiv);
        //Столбец с количеством добавляется в строку

        $goodQuantity.appendTo($goodQuantityDiv);
        $goodQuantityDiv.appendTo($basketItemsDiv);

        //Сюда добавить выбор количества товара

        //Столбец с информацией о доставке добавляется в строку
        $goodShipping.appendTo($basketItemsDiv);

        //$goodsSubtotal.appendTo($basketData);

        //Крестик из набора Fontello добавляется в кнопку удаления товара
        $iconCancelCircled.appendTo($goodDell);
        //Кнопка удаления товара добавляется в строку
        $goodDell.appendTo($basketItemsDiv);
        //Сформированная строка добавляется в таблицу
        $basketItemsDiv.appendTo(appendId);

        for (var itemKey in data.basket) {
          this.basketItems.push(data.basket[itemKey]);
        }
      }
    }
  })
};

Basket.prototype.add = function (idProduct, src, title, color, size, price, shipping) {
  var basketItem = {
    "id_product": idProduct,
    "src": src,
    "title": title,
    "color": color,
    "size": size,
    "price": price,
    "shipping": shipping
  };

  this.countGoods++;
  this.amount += price;
  this.basketItems.push(basketItem);
  this.refresh(); //Перерисовываем корзину
};

Basket.prototype.refresh = function () {
  var $basketData = $('#basket');
  $basketData.empty(); //Очищаем содержимое контейнера

  var $goodDescription = $('<div />', {
    class: 'cell prod_details'
  });

  var $goodImg = $('<img />', {
    src: this.src,
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
    text: this.shipping
  });

  // var $goodsSubtotal = $('<div />', {
  //   class: 'cell subtotal',
  //   text: '300'
  // });

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
};