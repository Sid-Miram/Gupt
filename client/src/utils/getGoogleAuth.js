// This is used to send request to authentication server to get consent. 
// Used in pages -> login Screen. 

function getGoogleOAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
    client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID,
    response_type: "code",
    prompt: "consent",
    scope: ["openid", "profile", "email"].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthUrl;
