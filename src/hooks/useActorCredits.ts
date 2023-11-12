import { getActorMovieCredits } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'

const useActorCredits = (actorId: number) => {
	return useQuery(['actor-credits', { id: actorId }], () => getActorMovieCredits(actorId))
}

export default useActorCredits
