import { useState, useEffect } from 'react'
import axios from 'axios'
import { PatternFormat } from 'react-number-format'
import { toast } from 'react-toastify'

const Cadastro = ({ onCadastrado, usuarioSelecionado, setUsuarioSelecionado, setUsuariosFiltrados }) => {
	const [nome, setNome] = useState('')
	const [telefone, setTelefone] = useState('')
	const [email, setEmail] = useState('')
	const [dataNascimento, setDataNascimento] = useState('')

	useEffect(() => {
		if (usuarioSelecionado) {
			setNome(usuarioSelecionado.NOME)
			setTelefone(usuarioSelecionado.TELEFONE)
			setEmail(usuarioSelecionado.EMAIL)
			setDataNascimento(usuarioSelecionado.DATA_NASCIMENTO)
		} else {
			setNome('')
			setTelefone('')
			setEmail('')
			setDataNascimento('')
		}
	}, [usuarioSelecionado])

	function handleSubmit(event) {
		event.preventDefault()

		const novoUsuario = { nome, telefone, email, dataNascimento }

		if (usuarioSelecionado) {
			axios
				.put(`http://localhost:3001/api/usuarios/${usuarioSelecionado.ID}`, novoUsuario)
				.then(() => {
					onCadastrado()
					limparFormulario()
					toast.success('Usuário alterado com sucesso!')
				})
				.catch((error) => {
					toast.error(error.response.data)
				})
		} else {
			axios
				.post('http://localhost:3001/api/usuarios', novoUsuario)
				.then(() => {
					onCadastrado()
					limparFormulario()
					toast.success('Usuário cadastrado com sucesso!')
				})
				.catch((error) => {
					toast.error(error.response.data)
				})
		}
	}

	function limparFormulario() {
		setNome('')
		setTelefone('')
		setEmail('')
		setDataNascimento('')
		setUsuarioSelecionado(null)
	}

	return (
		<form onSubmit={handleSubmit} className='custom-form'>
			<div className='custom-input-container'>
				<div className='custom-input-wrapper'>
					<label className='custom-label' htmlFor='nome'>
						Nome
					</label>
					<input
						className='custom-input'
						id='nome'
						type='text'
						placeholder='Digite seu nome'
						value={nome}
						onChange={(event) => setNome(event.target.value)}
						required={true}
					/>
				</div>
			</div>
			<div className='custom-input-container'>
				<div className='custom-input-wrapper'>
					<label className='custom-label' htmlFor='telefone'>
						Telefone
					</label>
					<PatternFormat
						required={true}
						format='(##) #####-####'
						placeholder='(##) #####-####'
						className='custom-input'
						id='telefone'
						type='text'
						value={telefone}
						onChange={(event) => setTelefone(event.target.value)}
					/>
				</div>
			</div>
			<div className='custom-input-container'>
				<div className='custom-input-wrapper'>
					<label className='custom-label' htmlFor='email'>
						E-mail
					</label>
					<input
						required={true}
						className='custom-input'
						id='email'
						type='text'
						placeholder='Digite seu e-mail'
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
			</div>
			<div className='custom-input-container'>
				<div className='custom-input-wrapper'>
					<label className='custom-label' htmlFor='dataNascimento'>
						Data de Nascimento
					</label>
					<PatternFormat
						required={true}
						format='##/##/####'
						placeholder='DD/MM/YYYY'
						className='custom-input'
						id='dataNascimento'
						type='text'
						value={dataNascimento}
						onChange={(event) => setDataNascimento(event.target.value)}
					/>
				</div>
			</div>
			<div className='custom-button-container'>
				<button className='custom-button' type='submit'>
					{usuarioSelecionado ? 'Atualizar Usuário' : 'Cadastrar'}
				</button>
				{usuarioSelecionado ? (
					<button type='button' onClick={limparFormulario} className='custom-button'>
						Limpar
					</button>
				) : (
					''
				)}
			</div>
		</form>
	)
}

export default Cadastro
