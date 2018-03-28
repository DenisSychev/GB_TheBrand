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

  $('.dell').on('click', function () {
    console.log('Произошёл клиу по крестику удаления товара');
    var id_product = parseInt($(this).attr('data-id'));
    var countProd = parseInt($(this).parent('.inBasket[data-id='+ id_product +']').find('.number').text());
    var price = parseInt($(this).parent('.inBasket[data-id='+ id_product +']').find('.amount > span'));
    DDmenu.remove(id_product, countProd, price);
  });

  /**
   * Обработка клика на кнопку Add to Cart на товаре
   */
  $('.cartProduct').on('click', function () {
    console.log('Произошёл клик по кнопке Добавить в корзину');
    var id_product = parseInt($(this).attr('data-id'));
    var price = $(this).parent().find('.price > span').text();
    var src = $(this).parent().find('img').attr('src');
    var title = $(this).parent().find('h2.desc').text();
    DDmenu.add(id_product, price, src, title);
  });

  /**
   * Добавление товара, который уже есть в корзине
   */
  $('.plus').on('click', function () {
    console.log('Произошёл клик плюсу');
    var id_product = $(this).closest('#shopping_cart_items').find('.row').attr('data-id');
    console.log(id_product);
    var countProd = $(this).closest('#shopping_cart_items').find('p[data-id='+ id_product +']').text();
    console.log(countProd);
    var price = $(this).closest('#shopping_cart_items').find('.unite_price > span').text();
    console.log(price);
    basket.countGoodPlus(id_product, countProd, price);
  });

  /**
   * Удаление товара, который уже есть в корзине
   */
  $('.minus').on('click', function () {
    console.log('Произошёл клик минусу');
    var id_product = $(this).closest('#shopping_cart_items').find('.row').attr('data-id');
    console.log(id_product);
    var countProd = $(this).closest('#shopping_cart_items').find('p[data-id='+ id_product +']').text();
    console.log(countProd);
    var price = $(this).closest('#shopping_cart_items').find('.unite_price > span').text();
    console.log(price);
    basket.countGoodMinus(id_product, countProd, price);
  })
});