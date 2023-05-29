import { database } from "../../utils/firebase"
import cookie from "cookie";

export default async function handler(req, res) {

    const { username, password } = req.body.token;
    let user = await searchUser(username);

    // Perform validation and authentication logic
  if (user !== null) {
    console.log(user);
        if (password === user.password) {
          // Successful login
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", JSON.stringify(user), {
              httpOnly: false,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
            })
          )

          res.statusCode = 200;
          res.json({ success: true });
        }
    } else {
      // Invalid credentials
      res.statusCode = 401
      res.json({success: false, message: "Invalid credentials"})
     }
}
  
const searchUser = async (username) => {
    const snapshot = await database.ref('Users').orderByChild('username').equalTo(username).once('value');
    if (snapshot.exists()) {
       // User exists in the database
      const users = snapshot.val();
      const userId = Object.keys(users)[0]; // Get the user ID
      const userData = users[userId]; // Get the user data

      return { userId, ...userData };
    }
  }