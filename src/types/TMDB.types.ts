type Dates = {
	maximum: string
	minimum: string
}

export type Movie_Genre = {
	id: number
	name: string
}

export type Movie_Genres = {
	genres: Movie_Genre[]
}

export type Movie = {
	adult: boolean
	backdrop_path: string
	genres: Movie_Genre[]
	homepage: string
	id: number
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

export type NowPlaying_Movies = Movie_Results & { dates : Dates}

export type Movie_Results = {
	page: number
	results: Movie[]
	total_pages: number
	total_results: number
}

export type Person = {
	also_known_as: string[]
	biography: string
	birthday: string
	deathday: string | null
	id: number
	imdb_id: string
	name: string
	place_of_birth: string
	profile_path: string
}
