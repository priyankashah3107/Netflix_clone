import { fetchFromTMDB } from "../services/tmdb.services.js";

// Feteching Tv Shows
export async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    return res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("Error in GetTrendingMovie Controllers ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
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

export async function getTvDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    return res.status(200).json({ success: true, message: data });
  } catch (error) {
    if (error.message.includes(404)) {
      return res.status(404).json({
        success: false,
        message: "Invalid id: The pre-requisite id is invalid or not found",
      });
    }
    console.error("Error in GetMovieDetails Controllers ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarTv(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    return res.status(200).json({ success: false, similar: data.results });
  } catch (error) {
    if (error.message.includes(404)) {
      return res.status(400).json({
        success: false,
        message: "The resource you requested could not be found.",
      });
    }
    console.error("Error in getSimilar Controllers", error.message);
    return res
      .status(200)
      .json({ success: false, message: "Internal Server Error" });
  }
}

//TV SERIES LISTS : airing_today, on_the_air, top_rated
export async function getTvsbyCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    return res.status(200).json({ success: true, categories: data.results });
  } catch (error) {
    console.error(
      "Error in GetMovieByCategory Controllers Route",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
