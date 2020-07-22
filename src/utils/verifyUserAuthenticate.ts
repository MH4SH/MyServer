export const authorizationUserIsAdmin = (request, response) => {
	if(!verifyUserIsAdmin(request))
		return response.status(403).json({statusCode: 403, error: "Forbidden", message: "access denied"});

	return true;
};

const verifyUserIsAdmin = (request) => {
	let TypeUserAuthenticate =  request._userAuthenticate.type;
	return TypeUserAuthenticate=='1';
};