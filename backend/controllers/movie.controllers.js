import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    return res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("Error in GetTrendingMovie Controllers ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes(404)) {
      return res.status(404).send(null);
    }
    console.error("Error in GetMovieTrailers Controllers Routes");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
