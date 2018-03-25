"use strict";

$(document).ready(function () {

  /**
   * Отрисовка товаров на странице
   * @type {Good}
   */
  var good = new Good('good');
  good.render($('.products'));

  /**
   * Отрисовка товаров на странице корзины (shopping_cart.html)
   * @type {Basket}
   */
  var basket = new Basket('shopping_cart');
  basket.render($('#shopping_cart'));

  /**
   * Отрисовка товаров в Drop Down меню
   * @type {BasketInDropDownPanel}
   */
  var DDmenu = new BasketInDropDownPanel('basket');
  DDmenu.render($('.basket'));
  console.log(DDmenu.basketItems);

  /**
   * Обработка клика на кнопку Add to Cart на товаре
   */
  $('.cartProduct').on('click', function () {
    console.log('Произошёл клик по кнопке');
    var id_product = parseInt($(this).attr('data-id'));
    var price = $(this).parent().find('.price').text();
    var src = $(this).parent().find('img').attr('src');
    var title = $(this).parent().find('h2.desc').text();
    DDmenu.add(id_product, price, src, title);
  })

  /**
   * Добавление того же товара, который есть в корзине
   */
  $('#plus').on('click', function () {
    console.log('Произошёл клик плюсу');
    var id_product = $(this).parent().find('.row').attr('data-id');
    var countProd = $(this).parent().find('input').attr('value');
    var price = $(this).parent().find('.unite_price').find('span').text();
    basket.countGoodPlus(id_product, countProd, price);
  })
});