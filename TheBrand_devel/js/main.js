"use strict";

$(document).ready(function () {
    var good = new Good('good');
    good.render($('.products'));

    var basket = new Basket('shopping_cart');
    basket.render($('#shopping_cart'));

    var DDmenu = new BasketInDropDownPanel('basket');
    DDmenu.render($('.basket'));

    //$('.cartProduct').on('click')
});