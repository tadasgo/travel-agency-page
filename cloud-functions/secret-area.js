exports.handler = (event, context, callback) => {
	// within this function we are safe to perform backend functions, because they are handled by AWS. Public only see value we respond with
	const secretContent = `
		<h3>Welcome to the <strong>secret area</strong></h3>
	`;
	let body;
	// if there is any data inside event parse data as JSON else create empty object
	if (event.body) {
		body = JSON.parse(event.body);
	} else {
		body = {};
	}

	if (body.password === 'pass123') {
		callback(null, {
			statusCode: 200,
			body: 'Welcome to the secret area',
		});
	} else {
		callback(null, {
			// Unauthorized
			statusCode: 401,
		});
	}
};
