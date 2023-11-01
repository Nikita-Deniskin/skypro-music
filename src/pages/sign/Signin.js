import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LoginRegistrationForm } from '../../components/loginForm/loginForm'
import { getRegistration } from '../../api/userapi'
import { useFetching } from '../../utils/hooks'
import * as S from './signin.styles'
import { AuthContext } from '../../components/context/context'
import { useGetTokensMutation } from '../../services/TracksService'
import { setAuth } from '../../store/slices/authSlice'

export default function SignIn() {
  const [loginData, setLoginData] = useState(null)
  const [errors, setErrors] = useState(false)
  const navigate = useNavigate()
  const { setIsAuth } = useContext(AuthContext)
  const dispatch = useDispatch()
  const [getTokens, { error: tokenError }] = useGetTokensMutation()
  const [loginUser, loading, error] = useFetching(async (logData) => {
    const resp = await getRegistration(logData, 'login')
    const respData = await resp.json()
    if (!resp.ok) {
      setErrors(respData)
      throw new Error('Ошибка авторизации')
    } else {
      setIsAuth(respData)
      dispatch(setAuth(respData))
      // localStorage.setItem('auth', JSON.stringify(respData))
      navigate('/', { replace: true })
    }
  })
  useEffect(() => {
    if (loginData) {
      loginUser(loginData)
      getTokens(loginData)
    }
  }, [loginData])

  return (
    <S.wrapper>
      <S.containerEnter>
        <S.modalBlock>
          <LoginRegistrationForm
            setData={setLoginData}
            apiErrors={errors}
            loading={loading}
          />
          {loading && <div>Выполняется загрузка</div>}
          {(error || tokenError) && (
            <div style={{ color: 'red', textAlign: 'center' }}>
              Произошла ошибка: {error} {tokenError}
            </div>
          )}
        </S.modalBlock>
      </S.containerEnter>
    </S.wrapper>
  )
}