export const getGoogleMapsApiKey = (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API Key not found" });
    }
    res.json({ apiKey });
};