import { getActor } from '../services/TMDB_API'
import { useQuery } from '@tanstack/react-query'

const useActor = (actorId: number) => {
	return useQuery(['actor', { id: actorId }], () => getActor(actorId))
}

export default useActor
