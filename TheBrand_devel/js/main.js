"use strict";

$(document).ready(function () {
    var good1 = new Good('123', 'img/products/product-9.jpg', 'Mango People T-shirt', '52.00');
    good1.render($('.items'));

    // var good2 = new GoodInBasket('123', 'img/products/product-9.jpg', 'Mango People T-shirt', 'M', 'Blue', '52.00');
    // good2.render($('.table'));

    var basket = new Basket('basket');
    basket.render($('#shopping_cart'));

    //$('.cartProduct').on('click')
});