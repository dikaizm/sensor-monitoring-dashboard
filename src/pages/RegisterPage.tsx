import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { MdEmail, MdLock, MdPerson } from "react-icons/md"
import InputText from "../components/InputText"
import appConfig from "../config/env"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

import AppLogo from "../components/AppLogo"
import PrimaryButton from "../components/PrimaryButton"
import ModalAlert from "../components/ModalAlert"

export default function RegisterPage() {
  const [isAuth, setIsAuth] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [role, setRole] = useState<string>('')

  const [modalState, setModalState] = useState<boolean>(false)

  // error state
  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
  const [registerError, setRegisterError] = useState<string>('')

  const navigate = useNavigate()

  function handleName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handleConfirmPassword(event: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value)
  }

  function handleRole(event: ChangeEvent<HTMLSelectElement>) {
    setRole(event.target.value)
  }

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (!name) setNameError('Nama tidak boleh kosong')
    if (!email) setEmailError('Email tidak boleh kosong')
    if (password.length < 6) setPasswordError('Password minimal 6 karakter')
    if (password !== confirmPassword) setConfirmPasswordError('Password tidak sama')
    if (!role) setRegisterError('Role tidak boleh kosong')
    if (!name || !email || password.length < 6 || password !== confirmPassword || !role) return

    try {
      const newUser = {
        name,
        email,
        password,
        confirmPassword,
        roleRequest: role
      }

      const response = await fetch(`${appConfig.apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }

      setModalState(true)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)

      setRegisterError(error.message)
    }
  }

  useEffect(() => {
    if (Cookies.get('auth')) {
      setIsAuth(true)
    }
  }, [])

  if (isAuth) {
    navigate('/')
    return <></>
  }

  return (
    <main className="relative flex flex-col justify-between min-h-screen mx-auto bg-slate-50">

      {modalState && (
        <ModalAlert title="Akun berhasil didaftarkan" onClose={() => {
          setModalState(false)
          navigate('/login')
        }}>
          <div className="flex flex-col gap-3">
            <p className="text-sm">Akun Anda berhasil didaftarkan, silahkan masuk untuk mengakses dashboard.</p>
            <PrimaryButton onClick={() => navigate('/login')}>Masuk</PrimaryButton>
          </div>
        </ModalAlert>
      )}

      <div className="relative flex justify-between gap-4 px-8 py-4">
        <a href="/">
          <AppLogo />
        </a>

        <div className="flex items-center gap-3">
          <span>Sudah memiliki akun?</span>
          <a className="px-3 py-2 text-blue-500 border border-blue-500 rounded-lg" href="/login">Masuk</a>
        </div>
      </div>

      <div className="flex items-center justify-center h-full ">
        <div className="relative p-12 rounded-xl w-[32rem] h-fit bg-white border border-slate-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Daftar Akun</h1>
            <p>Masukkan data akun Anda</p>
          </div>

          <form className="flex flex-col gap-4 mt-6">
            <InputText id="name" label="Nama Lengkap" placeholder="Masukkan nama lengkap" value={name} onChange={handleName} icon={<MdPerson className="w-full h-full" />}
              error={{ value: nameError, setValue: setNameError }}
            />
            <InputText id="email" type="email" label="Email" placeholder="Masukkan email" value={email} onChange={handleEmail} icon={<MdEmail className="w-full h-full" />}
              error={{ value: emailError, setValue: setEmailError }}
            />
            <InputText id="password" label="Password" placeholder="Masukkan password" type="password" value={password} onChange={handlePassword} icon={<MdLock className="w-full h-full" />}
              error={{ value: passwordError, setValue: setPasswordError }}
            />
            <InputText id="confirmPassword" label="Ulangi Password" placeholder="Masukkan password yang sama" type="password" value={confirmPassword} onChange={handleConfirmPassword} icon={<MdLock className="w-full h-full" />}
              error={{ value: confirmPasswordError, setValue: setConfirmPasswordError }}
            />

            {/* select option */}
            <div className="flex flex-col gap-2">
              <label htmlFor="Role">Request Role</label>
              <select name="Role" id="Role"
                className="p-2 border rounded-lg border-slate-400"
                value={role}
                onChange={handleRole}
              >
                <option value="" defaultValue="">Pilih Role</option>
                <option value="admin">Admin</option>
                <option value="operator">Operator</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <div className="w-full">
              <PrimaryButton type="submit" onClick={handleSubmit} width="w-full">Daftar</PrimaryButton>
              {registerError && (<p className="mt-2 text-sm text-red-500">{registerError}</p>)}
            </div>
          </form>

        </div>
      </div>

      <div className="w-full py-8 text-center">
        <p className="text-sm text-slate-500">Copyright 2024</p>
      </div>
    </main>
  )
}