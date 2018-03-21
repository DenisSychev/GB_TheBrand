"use strict";

$(document).ready(function () {
    var good = new Good('good');
    good.render($('.products'));

    var basket = new Basket('shopping_cart');
    basket.render($('#shopping_cart'));

    var DDmenu = new BasketInDropDownPanel('basket');
    DDmenu.render($('.basket'));

    $('.cartProduct').on('click', function () {
      var id_product = parseInt($(this).attr('data-id'));
      var price = parseInt($(this).parent().find('.price').text());
      var src = $(this).parent().find('img');
      var title = $(this).parent.find('h2.desc');
      basket.add(id_product, price, src, title);
    })
});