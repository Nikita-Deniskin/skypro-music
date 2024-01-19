import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TrackList from '../../components/traklist/Tracklist'
import { useFetchAllTrucksQuery } from '../../services/AuthorizedRequestService'
import { setCurrentPage } from '../../store/slices/tracksSlice'

function Main() {
  const dispatch = useDispatch()
  const { data, error, isLoading } = useFetchAllTrucksQuery()

  useEffect(() => {
    if (data) dispatch(setCurrentPage('Main'))
  }, [data])
  return <TrackList allTracks={data} error={error} isLoading={isLoading} />
}

export default Main