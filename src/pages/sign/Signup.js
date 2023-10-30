import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetching } from '../../utils/hooks'
import { LoginRegistrationForm } from '../../components/loginForm/loginForm'
import * as S from './signin.styles'
import { getRegistration } from '../../api/userapi'
import { AuthContext } from '../../components/context/context'

export const SignUp = () => {
  const [registrationData, setRegistrationData] = useState(null)
  const [errors, setErrors] = useState(false)
  const navigate = useNavigate()
  const { setIsAuth } = useContext(AuthContext)

  const [fetchNewUser, loading, error] = useFetching(async (regData) => {
    const resp = await getRegistration(regData)
    const respData = await resp.json()
    if (!resp.ok) {
      setErrors(respData)
      throw new Error('Ошибка регистрации')
    } else {
      setIsAuth(respData)
      localStorage.setItem('auth', JSON.stringify(respData))
      navigate('/', { replace: true })
    }
  })

  useEffect(() => {
    if (registrationData) fetchNewUser(registrationData)
  }, [registrationData])

  return (
    <S.wrapper>
      <S.containerEnter>
        <S.modalBlock>
          <LoginRegistrationForm
            regForm
            setData={setRegistrationData}
            apiErrors={errors}
            loading={loading}
          />
          {loading && <div>Выполняется загрузка</div>}
          {error && (
            <div style={{ color: 'red', textAlign: 'center' }}>
              Произошла ошибка: {error}
            </div>
          )}
        </S.modalBlock>
      </S.containerEnter>
    </S.wrapper>
  )
}