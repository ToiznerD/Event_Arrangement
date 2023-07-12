import { database } from '../../utils/firebase';

export default async function register(req, res) {
    try {
        const { username, password, email, eventDate } = req.body;
        let id = 0;
        const snap = await database.ref('Users/Total').once('value');
        if (snap.exists()) {
            id = snap.val() + 1;
        }

        const newUserRef = database.ref('Users').child(id.toString());
        const newUser = {
            username: username,
            password: password,
            email: email,
            date: eventDate
        };

        await newUserRef.set(newUser);

        await database.ref('Users/Total').set(id)

        res.status(200).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
}