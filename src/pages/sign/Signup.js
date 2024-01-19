import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginRegistrationForm } from '../../components/loginForm/loginForm'
import * as S from './signin.styles'
import {
  useGetRegistrationMutation,
  useGetTokensMutation,
} from '../../services/AuthorizedRequestService'

export const SignUp = () => {
  const [registrationData, setRegistrationData] = useState(null)
  const navigate = useNavigate()
  const [getTokens, { error: tokenError }] = useGetTokensMutation()
  const [registerUser, result] = useGetRegistrationMutation()

  useEffect(() => {
    if (registrationData)
      registerUser({ data: registrationData, url: 'signup' })
    if (result.isSuccess) {
      getTokens(result.originalArgs.data)
      navigate('/', { replace: true })
    }
  }, [registrationData, result.isSuccess])

  return (
    <S.wrapper>
      <S.containerEnter>
        <S.modalBlock>
          <LoginRegistrationForm
            regForm
            setData={setRegistrationData}
            apiErrors={
              (result.error?.status === 400 || result.error?.status === 401) &&
              result.error.data
            }
            loading={result.isLoading}
          />
          {result.isLoading && <div>Выполняется загрузка</div>}
          {result.isError &&
            result.error.status !== 400 &&
            result.error.status !== 401 && (
              <div style={{ color: 'red', textAlign: 'center' }}>
                Произошла ошибка: {result.error?.status}
              </div>
            )}
          {tokenError && (
            <div style={{ color: 'red', textAlign: 'center' }}>
              Произошла ошибка: {tokenError.data}
            </div>
          )}
        </S.modalBlock>
      </S.containerEnter>
    </S.wrapper>
  )
}