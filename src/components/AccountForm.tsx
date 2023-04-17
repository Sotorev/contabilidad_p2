"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

type Account = {
	id: string;
	name: string;
	accountType: string;
	amount: number;
};


function AccountForm(): JSX.Element {
	const [name, setName] = useState<string>('');
	const [accountType, setAccountType] = useState<string>('Debe');
	const [amount, setAmount] = useState<number>(0);
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
	const [editName, setEditName] = useState<string>(''); // Nuevo estado
	const [editAccountType, setEditAccountType] = useState<string>(''); // Nuevo estado
	const [editAmount, setEditAmount] = useState<number>(0); // Nuevo estado



	useEffect(() => {
		const getAccounts = async () => {
			try {
				const res = await fetch('/accounts');
				const data = await res.json();
				if (data.data)
					setAccounts(data.data);
			} catch (error) {
				console.error(error);
			}

		};
		getAccounts();

	}, []);

	const updateAccounts = async (data: Account[]) => {

		await fetch('/accounts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

	};


	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newAccount: Account = {
			id: uuid(),
			name,
			accountType,
			amount
		};
		const updatedAccounts = [...accounts, newAccount];
		updateAccounts(updatedAccounts);
		setName('');
		setAccountType('Debe');
		setAccounts(updatedAccounts);
	};

	const handleEdit = async (id: string, newName: string, accountType: string) => {
		const updatedAccounts = accounts.map((account) => {
			if (account.id === id) {
				return {
					...account,
					name: newName,
					accountType: accountType,
					amount: account.amount
				};
			}
			return account;
		});
		updateAccounts(updatedAccounts);
		setAccounts(updatedAccounts);
	};

	const handleDelete = async (id: string) => {
		const updatedAccounts = accounts.filter((account) => account.id !== id);
		updateAccounts(updatedAccounts);
		setAccounts(updatedAccounts);
	};

	const handleEditClick = (account: Account) => {
		setSelectedAccount(account);
		setEditName(account.name); // Nueva asignación
		setEditAccountType(account.accountType); // Nueva asignación
		setEditAmount(account.amount); // Nueva asignación
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleEditSubmit = () => {
		if (selectedAccount) {
			handleEdit(selectedAccount.id, editName, editAccountType);
			setShowModal(false);
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>


				<form onSubmit={handleSubmit}>
					<div className="flex flex-col mb-4">
						<label htmlFor="name" className="text-lg mb-2">
							Nombre
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={(event) => setName(event.target.value)}
							className="px-4 py-2 border rounded-lg"
						/>
					</div>
					<div className="flex flex-col mb-4">
						<label htmlFor="amount" className="text-lg mb-2">
							Cantidad
						</label>
						<input
							id="amount"
							type="number"
							value={amount}
							onChange={(event) => setAmount(parseFloat(event.target.value))}
							className="px-4 py-2 border rounded-lg"
						/>
					</div>
					<div className="flex flex-col mb-4">
						<label htmlFor="isDebit" className="text-lg mb-2">
							Tipo de cuenta
						</label>
						<select
							id="isDebit"
							value={accountType}
							onChange={(event) => setAccountType(event.target.value)}
							className="px-4 py-2 border rounded-lg"
						>
							<option value="Debe">Debe</option>
							<option value="Haber">Haber</option>
						</select>
					</div>
					<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
						Crear cuenta
					</button>



				</form>
			</div>
			<div>
				<button className="px-4 py-2 my-4 bg-red-500 hover:bg-red-700 text-white rounded-lg" onClick={() => { updateAccounts([]); setAccounts([]) }}>Limpiar tabla</button>

				<table className="w-full border-collapse ">
					<thead>
						<tr className="border-b">
							<th className='py-2 px-4 text-left'>Nombre</th>
							{/* <th className='py-2 px-4 text-left'>Tipo de cuenta</th> */}
							<th className='py-2 px-4 text-left'>Debe</th>
							<th className='py-2 px-4 text-left'>Haber</th>
							<th className='py-2 px-4 text-left'>Acciones</th>
						</tr>
					</thead>
					<tbody className='w-full border-collapse'>
						{accounts.map((account) => (
							<tr
								key={account.id}
								className="hover:bg-gray-100 cursor-pointer"
							>
								<td className="border-b py-2 px-4 text-left">{account.name}</td>
								{/* <td className="border-b py-2 px-4 text-left">{account.accountType}</td> */}
								<td className="border-b py-2 px-4 text-left">{account.accountType === "Debe" ? account.amount : ""}</td>
								<td className="border-b py-2 px-4 text-left">{account.accountType === "Haber" ? account.amount : ""}</td>

								<td className="border-b py-2 px-4 text-center">
									<button
										onClick={() => handleEditClick(account)}
										className="text-blue-500 hover:text-blue-700 mr-4"
									>
										<FontAwesomeIcon icon={faEdit} />
									</button>
									<button
										onClick={() => handleDelete(account.id)}
										className="text-red-500 hover:text-red-700"
									>
										<FontAwesomeIcon icon={faDeleteLeft} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{showModal && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen">
						<div className="bg-neutral-400 rounded-lg w-1/2">
							<div className="p-4">
								<h2 className="text-xl mb-4">Editar cuenta</h2>
								<div className="flex flex-col mb-4">
									<label htmlFor="editName" className="text-lg mb-2">
										Nombre
									</label>
									<input
										id="editName"
										type="text"
										value={editName} // Cambio al nuevo estado
										onChange={(event) => setEditName(event.target.value)} // Cambio al nuevo estado
										className="px-4 py-2 border rounded-lg"
									/>
								</div>
								<div className="flex flex-col mb-4">
									<label htmlFor="editAccountType" className="text-lg mb-2">
										Tipo de cuenta
									</label>
									<select
										id="editAccountType"
										value={editAccountType} // Cambio al nuevo estado
										onChange={(event) => setEditAccountType(event.target.value)} // Cambio al nuevo estado
										className="px-4 py-2 border rounded-lg"
									>
										<option value="Debe">Debe</option>
										<option value="Haber">Haber</option>
									</select>
								</div>
								<div className="flex flex-col mb-4">
									<label htmlFor="editAmount" className="text-lg mb-2">
										Monto
									</label>
									<input
										id="editAmount"
										type="number"
										value={editAmount} // Cambio al nuevo estado
										onChange={(event) => setEditAmount(parseFloat(event.target.value))} // Cambio al nuevo estado
										className="px-4 py-2 border rounded-lg"
									/>
								</div>

								<button
									onClick={handleEditSubmit}
									className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
								>
									Guardar cambios
								</button>
								<button
									onClick={handleCloseModal}
									className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

		</div>
	);
}

export default AccountForm;
