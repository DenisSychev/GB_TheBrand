"use strict";

$(document).ready(function () {
    var good = new Good('123', 'img/products/product-9.jpg', 'Mango People T-shirt', '52.00');
    good.render($('.items'));

    var basket = new Basket('shopping_cart');
    basket.render($('#shopping_cart'));

    var DDmenu = new BasketInDropDownPanel('basket');
    DDmenu.render($('.basket'));

    //$('.cartProduct').on('click')
});