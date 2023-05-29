import { database } from '../../utils/firebase';

export default async function updateGuests (req, res){
    try {
      const { userId, guests } = req.body;
  
      console.log(userId);
  
      const snapshot = await database.ref(`Guests/${userId}`).once('value');
  
      if (snapshot.exists()) {
        await database.ref(`Guests/${userId}`).update(guests);
  
        res.statusCode = 200;
        res.json({ success: true });
      } else {
        console.log("FAIL");
        res.statusCode = 404;
        res.json({ success: false, error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.json({ success: false, error: "Internal Server Error" });
    }
  };