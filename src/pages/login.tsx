import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const usuarios = [
  {
    id: "1",
    name: "Gabriel Souza",
    email: "gabriel@gmail.com",
    senha: "senhadogabriel",
    saldo: "0.90",
  },
  {
    id: "2",
    name: "Diego Candido",
    email: "diego@gmail.com",
    senha: "senhadodiego",
    saldo: "127.23",
  },
];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar se o usuário existe e a senha está correta
    const usuario = usuarios.find(
      (user) => user.email === email && user.senha === password
    );

    if (usuario) {
      // Limpar o erro e redirecionar
      setError('');
      console.log(`Bem-vindo, ${usuario.name}! Saldo: R$ ${usuario.saldo}`);
      navigate('/home');
    } else {
      // Exibir mensagem de erro
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <img
            src="./public/capybara.jpg"
            alt="Xis do Vini"
            className="w-32 h-32 object-cover rounded-full mb-6"
          />
          <h2 className="text-center text-3xl font-extrabold text-white">
            Delivery App
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Entre para fazer seu pedido
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
