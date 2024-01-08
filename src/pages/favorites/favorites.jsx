// import { useEffect, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TrackList from '../../components/traklist/Tracklist'
import { useGetFavoritesQuery } from '../../services/AuthorizedRequestService'
import { setCurrentPage } from '../../store/slices/tracksSlice'

function Favorites() {
  const dispatch = useDispatch()
  const { data, error, isLoading } = useGetFavoritesQuery()
  useEffect(() => {
    if (data) dispatch(setCurrentPage('Favorites'))
  }, [data])

  return (
    <>
      <TrackList
        title="Мои треки"
        allTracks={data}
        error={error}
        isLoading={isLoading}
      />
      {isLoading && <div>Загрузка...</div>}
      {error && <div>Ошибка...{error}</div>}
    </>
  )
}

export default Favorites