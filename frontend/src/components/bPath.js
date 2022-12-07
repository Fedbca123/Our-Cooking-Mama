<<<<<<< HEAD
const app_name = 'our-cooking-mom-test'
=======
const app_name = "our-cooking-mom-test";
>>>>>>> 4312bf5c5d7347bdef9cf783283f657713102718

exports.buildPath = function buildPath(route) {
	if (process.env.NODE_ENV === "production") {
		return "https://" + app_name + ".herokuapp.com/" + route;
	} else {
		return "http://localhost:3000/" + route;
	}
};
