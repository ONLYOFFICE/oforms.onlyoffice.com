export default async function handler(req, res) {
  try {
    const geoRes = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_SITE_BASE_DOMAIN}/api/ip-geolocation`
    );

    if (!geoRes.ok) {
      return res.status(geoRes.status).json({ error: "Failed to fetch geolocation" });
    }

    const data = await geoRes.json();

    return res.status(200).json({
      IPGeolocationInfo: data,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}