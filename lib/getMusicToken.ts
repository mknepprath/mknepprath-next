import jwt from "jsonwebtoken";

let cachedToken: { token: string; expiration: number } | null = null;

// Function to generate a new JWT token
const generateMusicToken = () => {
  const jwtToken = jwt.sign({}, process.env.MUSIC_PRIVATE_KEY!, {
    algorithm: "ES256",
    expiresIn: "180d", // 6 months
    issuer: process.env.MUSIC_TEAM_ID!,
    header: {
      alg: "ES256",
      kid: process.env.MUSIC_KEY_ID!,
    },
  });

  // Calculate expiration date (in milliseconds)
  const expiration = Date.now() + 180 * 24 * 60 * 60 * 1000; // 180 days from now

  return { token: jwtToken, expiration };
};

// Function to get the current token, generating it if necessary
const getMusicToken = () => {
  // Check if cachedToken exists and is not expired
  if (!cachedToken || cachedToken.expiration <= Date.now()) {
    cachedToken = generateMusicToken();
  }
  return cachedToken.token;
};

export default getMusicToken;
