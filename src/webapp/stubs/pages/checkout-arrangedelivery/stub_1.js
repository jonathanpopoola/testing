module.exports = {
	"customer": require('../../customers/stub_customer1'),
	"order": {
		"smallItems": [
			require( '../../products/stub_product1' ),
			require( '../../products/stub_product2' )
		],
		"largeItems": [
			require( '../../products/stub_product3' ),
			require( '../../products/stub_product4' )
		],
		"otherItems": [
			require( '../../products/stub_product7' )
		],
		"totalItems": 5,
		"deliveries": 3,
		"price": {
			"subtotal": 1234.99,
			"delivery": 20.99,
			"discount": 29.99,
			"total": 1299.99
		}
	}
};
