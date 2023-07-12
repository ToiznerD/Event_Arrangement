import { database } from '../../utils/firebase';

export default async function register(req, res) {
    try {
        const { userID, username, password, email, eventDate } = req.body;

        const newUser = {
            username: username,
            password: password,
            email: email,
            date: eventDate
        };
        await database.ref(`Users/${userID}`).update(newUser);

        res.status(200).json({ message: 'User updated successfully!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
}