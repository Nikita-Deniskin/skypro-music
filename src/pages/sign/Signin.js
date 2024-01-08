import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { LoginRegistrationForm } from '../../components/loginForm/loginForm'
import * as S from './signin.styles'
import {
  useGetRegistrationMutation,
  useGetTokensMutation,
} from '../../services/AuthorizedRequestService'

export default function SignIn() {
  const [loginData, setLoginData] = useState(null)
  const navigate = useNavigate()
  const [getTokens, { error: tokenError }] = useGetTokensMutation()
  const [loginUser, result] = useGetRegistrationMutation()

  useEffect(() => {
    if (loginData) {
      loginUser({ data: loginData, url: 'login' })
    }
    if (result.isSuccess) {
      getTokens(result.originalArgs.data)
      navigate('/', { replace: true })
    }
  }, [loginData, result.isSuccess])

  return (
    <S.wrapper>
      <S.containerEnter>
        <S.modalBlock>
          <LoginRegistrationForm
            setData={setLoginData}
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