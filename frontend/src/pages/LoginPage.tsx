import { ChangeEvent, useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  function handleUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  return (
    <main className="w-full mx-auto">
      <div className="bg-white border border-gray-400 w-80">
        <h1>Login</h1>
        <form className="flex flex-col gap-4">
          <InputText id="username" label="Username" value={username} onChange={handleUsername} />
          <InputText id="password" label="Password" type="password" value={password} onChange={handlePassword} />
          <button type="submit" className="text-white bg-blue-500">Login</button>
        </form>
      </div>
    </main>
  )
}

interface InputTextType {
  id: string
  label: string
  type?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function InputText({ id, label, type = 'text', value, onChange }: InputTextType) {
  return (
    <div className="flex flex-col items-start gap-2">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} onChange={onChange} value={value} />
    </div>
  )
}