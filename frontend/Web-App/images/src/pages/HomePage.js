import React from "react";

import PageTitle from "../components/PageTitle";
import LoggedInName from "../components/LoggedInName";
import HomePageUI from "../components/HomeFeedUI";

const CardPage = () => {
	return (
		<div>
			<PageTitle />
			<LoggedInName />
			<HomePageUI />
		</div>
	);
};

export default CardPage;
