import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const TabelaUsuarios = ({ atualizaTabela, onAtualizaTabela, setUsuarioSelecionado, usuariosFiltrados }) => {
	const [usuarios, setUsuarios] = useState([])
	const [nome, setNome] = useState('')
	const [telefone, setTelefone] = useState('')
	const [email, setEmail] = useState('')
	const [dataInicial, setDataInicial] = useState('')
	const [dataFinal, setDataFinal] = useState('')

	useEffect(() => {
		if (usuariosFiltrados) {
			setUsuarios(usuariosFiltrados)
		}
	}, [usuariosFiltrados])

	useEffect(() => {
		axios.get('http://localhost:3001/api/usuarios').then((response) => setUsuarios(response.data))
	}, [atualizaTabela])

	function handleEditar(id) {
		const usuario = usuarios.find((u) => u.ID === id)
		setUsuarioSelecionado(usuario)
	}

	function handleExcluir(id) {
		axios.delete(`http://localhost:3001/api/usuarios/${id}`).then(() => {
			setUsuarioSelecionado(null)
			onAtualizaTabela()
			toast.success('Usuário excluído com sucesso!')
		})
	}

	function localizar() {
		const filtros = { nome, telefone, email, dataInicial, dataFinal }
		axios
			.get('http://localhost:3001/api/usuarios', { params: filtros })
			.then((response) => {
				setUsuarios(response.data)
				if (response.data.length) {
					toast.success('Consulta realizada com sucesso!', { autoClose: 1000 })
				} else {
					toast.warn('Não foram encontrados registros para esses filtros', { autoClose: 2000 })
				}
			})
			.catch((err) => {
				toast.error(err)
			})
	}

	return (
		<div className='table-container'>
			<table className='custom-table'>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Telefone</th>
						<th>E-mail</th>
						<th>Data de Nascimento</th>
						<th>Data de Cadastro</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{usuarios.map((usuario) => (
						<tr key={usuario.ID} className='hover:bg-gray-100 border-b border-gray-200'>
							<td>{usuario.NOME}</td>
							<td>{usuario.TELEFONE}</td>
							<td>{usuario.EMAIL}</td>
							<td>{usuario.DATA_NASCIMENTO}</td>
							<td>{usuario.DATA_CADASTRO}</td>
							<td>
								<button  className='edit' onClick={() => handleEditar(usuario.ID)}>Editar</button>
								<button className='delete' onClick={() => handleExcluir(usuario.ID)}>Excluir</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TabelaUsuarios
