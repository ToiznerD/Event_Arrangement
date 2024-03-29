import { database } from '../../utils/firebase';

export default async function register(req, res) {
    try {
        const { username, password, email, eventDate } = req.body;

        // Check if username already exists
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

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
        await database.ref('Users/Total').set(id);

        const newUserTableRef = database.ref('Tables').child(id.toString());
        const newUserTable = {
            tables: { amount: 0 }
        };
        await newUserTableRef.set(newUserTable);

        const newUserGuestRef = database.ref('Guests').child(id.toString());
        const newUserGuest = {
            guests: { key: 0 },
            amount: 0
        };
        await newUserGuestRef.set(newUserGuest);

        res.status(200).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
}

async function checkUsernameExists(username) {
    const snapshot = await database.ref('Users').orderByChild('username').equalTo(username).once('value');
    return snapshot.exists();
}
