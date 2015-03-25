module.exports = {
	outOf: 5,
	average: {
		overallRating: 4.5,
		wouldRecommendPercentage: 84,
		ratings: [
			{
				name: "Picture Quality",
				rating: 4.5
			},{
				name: "Sound Quality",
				rating: 3.5
			},{
				name: "Connectivity",
				rating: 3.2
			},{
				name: "Design",
				rating: 2.6
			}
		],
	},
	items: [
		{
			overallRating: 3.5,
			date: 1449878400,
			title: "",
			description: "very basic to look at but for the price a great tv",
			wouldRecommend: true,
			ratings: [
				{
					name: "Picture Quality",
					rating: 4.5
				},{
					name: "Sound Quality",
					rating: 3.5
				},{
					name: "Connectivity",
					rating: 3.2
				},{
					name: "Design",
					rating: 2.6
				}
			],
			user: {
				username: "Challis",
				location: "Essex",
				age: "55 to 64",
				gender: "female"
			},
			helpful: {
				yes: 0,
				no: 1
			}
		},{
			overallRating: 1,
			date: 1449878400,
			title: "Time will tell",
			description: "I really do not know why firms ask for a review when you have only had the item a number of weeks.\nAsk me again in 12 months & might be able to give an honest and more informative answer.\nUp to now its fine.\nPlug in, connect leads, switch on. Do initial set-up, simples.",
			wouldRecommend: false,
			ratings: [
				{
					name: "Picture Quality",
					rating: 4.2
				},{
					name: "Sound Quality",
					rating: 1.5
				},{
					name: "Connectivity",
					rating: 0.2
				},{
					name: "Design",
					rating: 3.8
				}
			],
			user: {
				username: "Little moma",
				location: "Norwich, Norwich, Norfolk, UK",
				age: "45 to 54",
				gender: "female"
			},
			helpful: {
				yes: 0,
				no: 2
			}
		}
	]
};
