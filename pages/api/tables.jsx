import { database } from '../../utils/firebase';

export default async function handler(req, res) {
    let userId = req.body.userId
    const snapshot = await database.ref(`Tables/${userId}`).once('value')
    if(snapshot.exists()) {
        res.statusCode = 200
        res.json(snapshot.val())
        console.log(snapshot.val())
    }
    else {
        console.log("FAIL")
    }
}