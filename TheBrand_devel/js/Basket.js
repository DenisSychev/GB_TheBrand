"use strict";

function Basket(id) {
  Container.call(this, id);
  this.countGoods = 0;
  this.amountGoods = 0;
  this.basketItems = [];
  this.loadBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

/**
 * Отрисовка товаров в корзине
 * @param htmlElement
 */
Basket.prototype.render = function (htmlElement) {

  //<button type="reset" class="whiteButton">cLEAR SHOPPING CART</button>
  var $btnClearBasket = $('<button />', {
    type: "reset",
    class: "whiteButton",
    text: 'cLEAR SHOPPING CART'
  });

  /**
   * Таблица с товарами корзины
   * @type {jQuery|HTMLElement}
   */
  var $basketDiv = $('<div />', {
    class: 'table',
    id: this.id + '_items'
  });

  var $basketDivCaption = $('<div />', {
    class: "row caption"
  });

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
  //Добавляется кнопка очистки корзины в HTML
  $btnClearBasket.prependTo($('.buttons'));
};

/**
 * Получение и загрузка товаров
 */
Basket.prototype.loadBasketItems = function () {
  var appendId = '#' + this.id + '_items';
  var appendAmount = $('.total>p');
  var appendGrandAmount = $('.total>h3');

  $.get({
    url: 'json/basket.json',
    dataType: 'json',
    context: this,
    success: function (data) {
      this.countGoods = data.basket.length;
      this.amount = data.amount;

      var $basketAmount = $('<span />', {
        class: 'sub',
        text: '$' + this.amount
      });

      $basketAmount.appendTo(appendAmount);

      var $basketGrandAmount = $('<span />', {
        class: 'grand',
        text: '$' + this.amount
      });

      $basketGrandAmount.appendTo(appendGrandAmount);

      for (var i = 0; i < data.basket.length; i++) {
        this.id_product = data.basket[i].id_product;
        this.src = data.basket[i].src;
        this.title = data.basket[i].title;
        this.color = data.basket[i].color;
        this.size = data.basket[i].size;
        this.currency = data.basket[i].currency;
        this.price = data.basket[i].price;
        this.shipping = data.basket[i].shipping;

        var $basketItemsDiv = $('<div />', {
          class: 'row',
          'data-id': this.id_product
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

        var $goodPriceCell = $('<div />', {
          class: 'cell unite_price',
          text: this.currency
        });

        var $goodPrice = $('<span />', {
          text: this.price
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
        var $goodQuantity = $('<p />', {
          'data-id': this.id_product,
          text: 1
        });


        var $btnPlusProd = $('<button />', {
          class: 'whiteButton plus',
          text: '+'
        });

        var $btnMinusProd = $('<button />', {
          class: 'whiteButton minus',
          text: '-'
        });

        /**
         * Стоимость доставки товара
         */
        var $goodShipping = $('<div />', {
          class: 'cell shipping',
          text: this.shipping
        });

        var $goodsSubtotal = $('<div />', {
          class: 'cell subtotal',
          text: '$' + this.price
        });

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

        $goodPrice.appendTo($goodPriceCell);
        $goodPriceCell.appendTo($basketItemsDiv);
        //Столбец с количеством добавляется в строку

        $btnMinusProd.appendTo($goodQuantityDiv);
        $goodQuantity.appendTo($goodQuantityDiv);
        $btnPlusProd.appendTo($goodQuantityDiv);
        $goodQuantityDiv.appendTo($basketItemsDiv);

        //Сюда добавить выбор количества товара

        //Столбец с информацией о доставке добавляется в строку
        $goodShipping.appendTo($basketItemsDiv);

        //Столбец с суммой выбранного количества товара
        $goodsSubtotal.appendTo($basketItemsDiv);

        //Крестик из набора Fontello добавляется в кнопку удаления товара
        $iconCancelCircled.appendTo($goodDell);
        //Кнопка удаления товара добавляется в строку
        $goodDell.appendTo($basketItemsDiv);
        //Сформированная строка добавляется в таблицу
        $basketItemsDiv.appendTo(appendId);

        // for (var itemKey in data.basket) {
        //   this.basketItems.push(data.basket[itemKey]);
        // }
      }
    }
  })
};

Basket.prototype.countGoodPlus = function (id_product, countProd, price) {
  var findProdById = $('.row').find('[data-id="'+ id_product +'"]');
  $(findProdById).find('.quantity_cart').find('p').text(++countProd);
  this.countGoods++;
  this.amount += price;
  this.refresh();
};

Basket.prototype.countGoodMinus = function (id_product, countProd, price) {
  var findProdById = $('.row').find('[data-id="'+ id_product +'"]');
  $(findProdById).find('.quantity_cart').find('p').text(--countProd);
  this.countGoods--;
  this.amount -= price;
  this.refresh();
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