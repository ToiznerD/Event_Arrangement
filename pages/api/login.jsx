import { database } from "../../utils/firebase"

export default async function handler(req, res) {

    const { username, password } = req.body.token;
    let user = await searchUser(username);

    // Perform validation and authentication logic
  if (user !== null) {
    console.log(user);
        if (password === user.password) {
          res.statusCode = 200;
          res.json( user );
        }
        else {
          // Invalid credentials
          res.statusCode = 401
          res.json({success: false, message: "Invalid credentials"})
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