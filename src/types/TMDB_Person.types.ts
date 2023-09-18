import { Movie_Credit } from "./TMDB_Movie.types"

export type Actor = {
	also_known_as: string[]
	biography: string
	birthday: string
	deathday: string | null
	gender: number
	id: number
	imdb_id: string
	name: string
	place_of_birth: string
	profile_path: string
}

export type Actor_Credit = Actor & Credit_Details & { cast_id: string}

export type Actor_Movie_Credits = {
	cast: Movie_Credit[]
	id: number
}

export type Credit_Details = {
	character: string
	credit_id: string
}
