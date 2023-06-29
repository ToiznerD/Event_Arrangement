import { database } from '../../utils/firebase';

export default async function updateGuests (req, res){
    try {
      const { userId, guests } = req.body;
  
      console.log(userId);
      await database.ref(`Guests/${userId}`).update(guests);

      res.statusCode = 200;
      res.json({ success: true });
      
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.json({ success: false, error: "Internal Server Error" });
    }
  };