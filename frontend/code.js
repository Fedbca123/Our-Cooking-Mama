import React from 'react';

function doLogin() {
	userId = 0;
	first_name = '';
	last_name = '';

	let login = document.getElementById('');
	let password = document.getElementById('');

	document.getElementById('loginResult').innerHTML = '';

	let tmp = { Login: login, Password: password };

	letjsonPayload = JSON.stringify(tmp);

	let url = ulrBase + '/Login.' + extension;
}

function doRegister() {}

function doLogout() {}
