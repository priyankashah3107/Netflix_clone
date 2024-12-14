import { User } from "../models/user.models.js";
import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function searchPerson(req, res) {
  const { query } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    // save search History in the DB
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          name: data.results[0].name,
          image: data.results[0].profile_path,
          department: data.results[0].known_for_department,
          searchType: "person",
          createdAt: Date.now(),
        },
      },
    });
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error in SearchPerson Controllers Routes", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function movieSearch(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      // `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(400).send(null);
    }

    // save the movie search History from the Database

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          name: data.results[0].title,
          image: data.results[0].poster_path,
          description: data.results[0].overview,
          searchType: "movie",
          createdAt: Date.now(),
        },
      },
    });

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error in MovieSearch Contoller Routes", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function TvSearch(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(400).send(null);
    }

    // save searchHistory in the db
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          name: data.results[0].original_name,
          image: data.results[0].poster_path,
          searchType: "tv",
          createdAt: Date.now(),
        },
      },
    });

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error in TvSearch Contoller Routes", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function HistorySearch(req, res) {
  try {
    return res.status(200).json({ success: true, content: req.user });
  } catch (error) {
    console.error("Error in Search History Contoller Routes", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;
  // this comes as a string
  // console.log(typeof id);
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "Item Removed Successfully" });
  } catch (error) {
    console.error(
      "Error in removeItemFromSearchHistory Contoller Routes",
      error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
