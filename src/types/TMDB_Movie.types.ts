import { Actor_Credit, Credit_Details } from "./TMDB_Person.types"

type Dates = {
	maximum: string
	minimum: string
}

export type Movie = {
	id: number
	adult: boolean
	backdrop_path: string
	genres: Movie_Genre[]
	homepage: string
	imdb_id: string
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	runtime: number
	title: string
	vote_average: number
}

export type Movie_Cast_Credit = {
	id: number
	cast: Actor_Credit[]
}

export type Movie_Credit = Omit<Movie, 'genres' | 'homepage' | 'imdb_id' > & Credit_Details & { genre_ids: number[] }

export type Movie_Genre = {
	id: number
	name: string
}

export type Movie_Genres = {
	genres: Movie_Genre[]
}

export type Movie_Results = {
	page: number
	results: Movie[]
	total_pages: number
	total_results: number
}

export type NowPlaying_Movies = Movie_Results & { dates : Dates}

