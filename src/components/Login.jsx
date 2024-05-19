import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { name, password });
      localStorage.setItem('token', response.data.token);
      alert('Login bem-sucedido!');
    } catch (error) {
      alert('Erro ao fazer login. Verifique as credenciais e tente novamente.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" value={name} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
