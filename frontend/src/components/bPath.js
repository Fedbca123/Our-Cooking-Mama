const app_name = "our-cooking-mom-test";

exports.buildPath = function buildPath(route) {
	if (process.env.NODE_ENV === "production") {
		return "https://" + app_name + ".herokuapp.com/" + route;
	} else {
		return "http://localhost:5000/" + route;
	}
};
