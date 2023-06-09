import cookie from 'cookie';

export default async function handler(req, res) {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
            httpOnly: false,
            secure: process.env.NODE_ENV !== "development",
            expires: new Date(0),
            sameSite: "strict",
            path: "/",
        })
    )

    res.statusCode = 200;
    res.json({ success: true });
}