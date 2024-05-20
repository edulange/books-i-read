import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { name, password });
      localStorage.setItem('token', response.data.token);
      login(); // Atualiza o estado de autenticação
      navigate('/'); // Redireciona para a página principal
      alert('Login bem-sucedido!');
    } catch (error) {
      alert('Erro ao fazer login. Verifique as credenciais e tente novamente.');
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Navega para a página de registro
  };


  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <div>
        <button onClick={handleRegister}>Registrar</button>
      </div>
    </div>
  );
};

export default Login;
