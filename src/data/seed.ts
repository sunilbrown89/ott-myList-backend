import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "../models/Movie";
import TVShow from "../models/TVShow";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;



const seedData = async () => {
  await Movie.deleteMany({});
  await TVShow.deleteMany({});
  const movies = [
    {
      title: "Inception",
      description: "A mind-bending thriller",
      genres: ["SciFi", "Action"],
      releaseDate: new Date("2010-07-16"),
      director: "Christopher Nolan",
      actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    },
    {
      title: "The Dark Knight",
      description: "Batman faces the Joker",
      genres: ["Action", "Drama"],
      releaseDate: new Date("2008-07-18"),
      director: "Christopher Nolan",
      actors: ["Christian Bale", "Heath Ledger"],
    },
    {
      title: "Titanic",
      description: "A tragic love story",
      genres: ["Romance", "Drama"],
      releaseDate: new Date("1997-12-19"),
      director: "James Cameron",
      actors: ["Leonardo DiCaprio", "Kate Winslet"],
    },
    {
      title: "Avengers: Endgame",
      description: "Superheroes fight Thanos",
      genres: ["Action", "SciFi"],
      releaseDate: new Date("2019-04-26"),
      director: "Anthony Russo",
      actors: ["Robert Downey Jr.", "Chris Evans"],
    },
    {
      title: "The Matrix",
      description: "Virtual reality is a lie",
      genres: ["SciFi", "Action"],
      releaseDate: new Date("1999-03-31"),
      director: "The Wachowskis",
      actors: ["Keanu Reeves", "Laurence Fishburne"],
    },
    {
      title: "Jurassic Park",
      description: "Dinosaurs come alive",
      genres: ["Action", "SciFi"],
      releaseDate: new Date("1993-06-11"),
      director: "Steven Spielberg",
      actors: ["Sam Neill", "Laura Dern"],
    },
    {
      title: "Interstellar",
      description: "Journey across space and time",
      genres: ["SciFi", "Drama"],
      releaseDate: new Date("2014-11-07"),
      director: "Christopher Nolan",
      actors: ["Matthew McConaughey", "Anne Hathaway"],
    },
    {
      title: "The Lion King",
      description: "Animated animal kingdom",
      genres: ["Drama", "Fantasy"],
      releaseDate: new Date("1994-06-24"),
      director: "Roger Allers",
      actors: ["Matthew Broderick", "Jeremy Irons"],
    },
    {
      title: "Gladiator",
      description: "Roman general seeks revenge",
      genres: ["Action", "Drama"],
      releaseDate: new Date("2000-05-05"),
      director: "Ridley Scott",
      actors: ["Russell Crowe", "Joaquin Phoenix"],
    },
    {
      title: "Frozen",
      description: "Two sisters, magical powers",
      genres: ["Fantasy", "Drama"],
      releaseDate: new Date("2013-11-27"),
      director: "Chris Buck",
      actors: ["Kristen Bell", "Idina Menzel"],
    },
  ];
  const tvShows = [
    {
      title: "Stranger Things",
      description: "Kids battle supernatural forces",
      genres: ["SciFi", "Horror"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("2016-07-15"), director: "The Duffer Brothers", actors: ["Millie Bobby Brown", "Finn Wolfhard"] },
      ],
    },
    {
      title: "Breaking Bad",
      description: "Chemistry teacher turns to crime",
      genres: ["Drama", "Action"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("2008-01-20"), director: "Vince Gilligan", actors: ["Bryan Cranston", "Aaron Paul"] },
      ],
    },
    {
      title: "Game of Thrones",
      description: "War for the Iron Throne",
      genres: ["Drama", "Fantasy"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("2011-04-17"), director: "Tim Van Patten", actors: ["Emilia Clarke", "Kit Harington"] },
      ],
    },
    {
      title: "The Witcher",
      description: "Monster hunter adventures",
      genres: ["Fantasy", "Action"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("2019-12-20"), director: "Alik Sakharov", actors: ["Henry Cavill", "Anya Chalotra"] },
      ],
    },
    {
      title: "The Mandalorian",
      description: "Star Wars universe bounty hunter",
      genres: ["Action", "SciFi"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("2019-11-12"), director: "Dave Filoni", actors: ["Pedro Pascal", "Gina Carano"] },
      ],
    },
    {
      title: "Friends",
      description: "Life of six friends in NYC",
      genres: ["Comedy", "Drama"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("1994-09-22"), director: "James Burrows", actors: ["Jennifer Aniston", "Courteney Cox"] },
      ],
    },
    {
      title: "The Office",
      description: "Mockumentary of office life",
      genres: ["Comedy", "Drama"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("2005-03-24"), director: "Greg Daniels", actors: ["Steve Carell", "Rainn Wilson"] },
      ],
    },
    {
      title: "Sherlock",
      description: "Modern detective stories",
      genres: ["Drama", "Action"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("2010-07-25"), director: "Paul McGuigan", actors: ["Benedict Cumberbatch", "Martin Freeman"] },
      ],
    },
    {
      title: "House of Cards",
      description: "Political thriller",
      genres: ["Drama", "Action"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("2013-02-01"), director: "David Fincher", actors: ["Kevin Spacey", "Robin Wright"] },
      ],
    },
    {
      title: "Black Mirror",
      description: "Technology dystopian stories",
      genres: ["SciFi", "Drama"],
      episodes: [
        { episodeNumber: 1, seasonNumber: 1, releaseDate: new Date("2011-12-04"), director: "Charlie Brooker", actors: ["Daniel Lapaine", "Hannah John-Kamen"] },
      ],
    },
  ];

  await Movie.insertMany(movies);
  await TVShow.insertMany(tvShows);

  console.log("Seed data inserted successfully!");
  process.exit(0);
};

export const insertSeedData = async () => {
  try {
    await seedData();
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
   
  }
};


