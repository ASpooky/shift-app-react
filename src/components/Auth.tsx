import { useState, FormEvent } from 'react'
import { TfiCalendar, TfiWrite, TfiUnlock } from 'react-icons/tfi'
import { useMutateAuth } from '../hooks/useMutateAuth'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [isLogin, setIsLogin] = useState(true) //初期値true
  const { loginMutation, registerMutation } = useMutateAuth()

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() //自動送信ストップ
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: pw,
      })
    } else {
      await registerMutation
        .mutateAsync({
          email: email,
          password: pw,
        })
        .then(() =>
          loginMutation.mutate({
            email: email,
            password: pw,
          })
        ) //サインインの場合、登録とログインを同時に行う。
    }
  }
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center">
        <TfiCalendar className="h-8 w-8 mr-2 text-blue-500" />
        <span className="text-center text-3xl font-extrabold">
          シフト管理アプリ Go(echo)&React
        </span>
      </div>
      <br />
      <form onSubmit={submitAuthHandler}>
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="email"
            type="email"
            autoFocus
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
          />
        </div>
        <div className="flex justify-center my-2">
          <button
            className="disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600"
            disabled={!email || !pw}
            type="submit"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </form>
      <div className="flex justify-center my-2 space-x-4">
        {isLogin ? (
          <TfiWrite
            onClick={() => setIsLogin(!isLogin)}
            className="h-6 w-6 my-2 text-blue-500 cursor-pointer"
          />
        ) : (
          <TfiUnlock
            onClick={() => setIsLogin(!isLogin)}
            className="h-6 w-6 my-2 text-blue-500 cursor-pointer"
          />
        )}
      </div>
    </div>
  )
}
