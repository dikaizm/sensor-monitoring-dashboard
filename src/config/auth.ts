const authConfig = {
    secret: process.env.JWT_SECRET!,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
}

export default authConfig