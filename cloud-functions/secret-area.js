exports.handler = (event, context, callback) => {
	// within this function we are safe to perform backend functions, because they are handled by AWS. Public only see value we respond with

	callback(null, {
		statusCode: 200,
		body: 'Welcome to the secret area',
	});
};
