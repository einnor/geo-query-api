var config = {
	port: process.env.PORT || 3000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/geo_query_api",
	test_port: 3001,
	test_db: "mongodb://localhost/geo_query_api_test"
}

module.exports = config;
