import React, {useState, useEffect} from 'react'
import './styles.css'

import { Card } from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: ''})

  function handleAddStudent(){
    const newStudent = {
      name: studentName, 
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute:'2-digit',
        second:'2-digit'
      })
    }
    setStudents(prevState => [...prevState, newStudent])
  }
  
  useEffect(() => {
   fetch('https://api.github.com/users/thaliaramoss')
   .then(response => response.json())
   .then(data => {
    setUser({
      name: data.name,
      avatar: data.avatar_url
    })

   })
    //corpo do useEffect -> ações que serão executadas
  }, [] /* array de dependências -- quais os estdados que o useEffect depende, se estiver vazio o useEffect vai ser executado apenas uma vez - quando a interface for renderizada e a tela for exibida para o user*/ )

  return (
  <div className='container'>
    <header>
    <h1>Lista de Presença</h1>
    <div>
      <strong>{user.name}</strong>
      <img src={user.avatar} alt="foto de perfil" />
    </div>
    </header>
   <input type="text" 
   placeholder='digite seu nome' 
   onChange={e => setStudentName(e.target.value)}
   />
   <button type='button' onClick={handleAddStudent}>
    adicionar
  </button>

{
  students.map(student => (
    <Card 
      key={student.time}
      name={student.name} 
      time={student.time} 
      />
      )
  )

}
  
  </div>

  )
}


