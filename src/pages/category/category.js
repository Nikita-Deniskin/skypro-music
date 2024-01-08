import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { playLists } from '../../data'
import TrackList from '../../components/traklist/Tracklist'
import { useGetSelectionsQuery } from '../../services/AuthorizedRequestService'
import { setCurrentPage } from '../../store/slices/tracksSlice'

const Categories = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const currentPlayList = playLists.find(
    (playlist) => playlist.id === Number(params.id)
  )
  const { data, error, isLoading } = useGetSelectionsQuery(Number(params.id))
  // console.debug(data)
  useEffect(() => {
    if (data) dispatch(setCurrentPage('Category'))
  }, [data, dispatch])

  return (
    <TrackList
      title={currentPlayList.name}
      allTracks={data?.items}
      error={error}
      isLoading={isLoading}
    />
  )
}

export { Categories }