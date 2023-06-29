import { database } from '../../utils/firebase';

export default async function handler(req, res) {
    let userId = req.body.userId
    console.log(userId)
    const snapshot = await database.ref(`Guests/${userId}`).once('value')
    if (snapshot.exists()) {
        res.statusCode = 200
        res.json(snapshot.val())
    }
    else {
        console.log("FAIL")
        res.statusCode = 500
        res.json({ success: false, error: "User has no guests" });
    }
}