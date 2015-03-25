module.exports = {

	"breadcrumb": require('../../modules/breadcrumb'),

	"product": require('../../products/stub_product1'),

	"extras": {
		"title": "Essential Extras",
		"products": require( '../../modules/recommendations' )
	},

	"otherItems": {
		"title": "You may also like",
		"products": require( '../../modules/recommendations' )
	},

	"alternatives": {
		"title": "Alternatives",
		"products": require( '../../modules/recommendations' )
	},

	"reviews": {
		"title": "Customer reviews and ratings",
		"reviews": require( '../../modules/reviews' ),
	},

	"questionsAndAnswers": {
		"title": "Questions and Answers"
	},

	"specialOffers": require( '../../modules/specialOffers' ),

	"credit": {
		"title": "Credit Offers"
	},

	"deliveryInfo": {
		"title": "Delivery costs & reservation information",
		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed rhoncus magna. Praesent nec sollicitudin augue, et ultrices velit. Aliquam erat volutpat. Cras tincidunt neque eget risus cursus mollis. Aliquam non rhoncus nibh. Suspendisse ac quam urna. Nulla quam lorem, sagittis a orci at, porttitor fringilla nisi. Vestibulum id justo id libero viverra facilisis sed nec nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;"
	},

	"fulfilment": {
		collection: {
			active: true,
			quantity: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],

		}
	},

	"isHelpful": require('../../modules/isHelpful')
};
