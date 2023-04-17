import React from 'react'
import { balanceDetails } from '../utilities/balanceGeneral'

interface Account {
	id: string;
	name: string;
	accountType: string;
	amount: number;
}

const BalanceGeneral = ({ accounts }: { accounts: Account[] }) => {
	const removeAccents = (str: string) => {
		const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ';
		const withoutAccents = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn';
		const strArray = str.split('');
		const strArrayWithoutAccents = strArray.map((char) => {
			const index = accents.indexOf(char);
			return index !== -1 ? withoutAccents[index] : char;
		});
		return strArrayWithoutAccents.join('');
	};

	const normalizeAccountName = (name: string) => removeAccents(name.trim().toLowerCase());

	const userAccounts = accounts.map(account => {
		return {
			...account,
			name: normalizeAccountName(account.name),
		};
	});

	const getTotal = (category: string) => {
		return userAccounts
			.filter(account => {
				const accountDetails = balanceDetails.find(detail => normalizeAccountName(detail.name) === account.name);
				return accountDetails?.category === category;
			})
			.reduce((total, account) => total + account.amount, 0);
	};

	return (
		<div className="bg-white shadow-md rounded my-6">
			<h1 className='font-bold text-3xl mb-8'>Balance General</h1>
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
						<th className="py-3 px-6 text-left">Cuenta</th>
						<th className="py-3 px-6 text-left"></th>
						<th className="py-3 px-6 text-left"></th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm font-light">
					<tr className=' font-bold uppercase'>
						<td className='px-6'>
							Activo corriente
						</td>
					</tr>
					{
						accounts.map((account) => {
							const normalizedAccountName = normalizeAccountName(account.name);
							const accountDetails = balanceDetails.find(detail => normalizeAccountName(detail.name) === normalizedAccountName);
							if (accountDetails?.category === 'activo corriente')
							return (
								<tr className="border-b border-gray-200" key={account.id}>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{account.name}
									</td>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										{account.amount}
									</td>
									

								</tr>
							)
						})
					}
					<tr className="border-b border-gray-200 font-bold">
						<td className="py-3 px-6 text-left whitespace-nowrap">
							Total activo corriente
						</td>
						<td className="py-3 px-6 text-left whitespace-nowrap">
							{getTotal('activo corriente')}
						</td>
					</tr>
					<tr className=' font-bold uppercase'>
						<td className='px-6'>
							Activo no corriente
						</td>
					</tr>
					{
						accounts.map((account) => {
							const normalizedAccountName = normalizeAccountName(account.name);
							const accountDetails = balanceDetails.find(detail => normalizeAccountName(detail.name) === normalizedAccountName);
							if (accountDetails?.category === 'activo no corriente')
								return (
									<tr className="border-b border-gray-200" key={account.id}>
										<td className="py-3 px-6 text-left whitespace-nowrap">
											{account.name}
										</td>
										<td className="py-3 px-6 text-left whitespace-nowrap">
											{account.amount}
										</td>

									</tr>
								)
						})
						
					}
					<tr className="border-b border-gray-200 font-bold">
						<td className="py-3 px-6 text-left whitespace-nowrap">
							Total activo no corriente
						</td>
						<td className="py-3 px-6 text-left whitespace-nowrap">
							{getTotal('activo no corriente')}
						</td>
					</tr>
					<tr className=' font-bold uppercase'>
						<td className='px-6'>
							Pasivo corriente
						</td>
					</tr>
					{
						accounts.map((account) => {
							const normalizedAccountName = normalizeAccountName(account.name);
							const accountDetails = balanceDetails.find(detail => normalizeAccountName(detail.name) === normalizedAccountName);
							if (accountDetails?.category === 'pasivo corriente')
								return (
									<tr className="border-b border-gray-200" key={account.id}>
										<td className="py-3 px-6 text-left whitespace-nowrap">
											{account.name}
										</td>
										<td className="py-3 px-6 text-left whitespace-nowrap">
											{account.amount}
										</td>
									</tr>
								)
						})
					}
					<tr className="border-b border-gray-200 font-bold">
						<td className="py-3 px-6 text-left whitespace-nowrap">
							Total pasivo corriente
						</td>
						<td className="py-3 px-6 text-left whitespace-nowrap">
							{getTotal('pasivo corriente')}
						</td>
					</tr>
					<tr className=' font-bold uppercase'>
						<td className='px-6'>
							Pasivo no corriente
						</td>
					</tr>
					{
						accounts.map((account) => {
							const normalizedAccountName = normalizeAccountName(account.name);
							const accountDetails = balanceDetails.find(detail => normalizeAccountName(detail.name) === normalizedAccountName);
							if (accountDetails?.category === 'pasivo no corriente')
								return (
									<tr className="border-b border-gray-200" key={account.id}>
										<td className="py-3 px-6 text-left whitespace-nowrap">
											{account.name}
										</td>
										<td className="py-3 px-6 text-left whitespace-nowrap">
											{account.amount}
										</td>
									</tr>
								)
						})
					}
					<tr className="border-b border-gray-200 font-bold">
						<td className="py-3 px-6 text-left whitespace-nowrap">
							Total pasivo no corriente
						</td>
						<td className="py-3 px-6 text-left whitespace-nowrap">
							{getTotal('pasivo no corriente')}
						</td>
					</tr>
					<tr className=' font-bold uppercase'>
						<td className='px-6'>
							Capital contable
						</td>
					</tr>
					{
						accounts.map((account) => {
							const normalizedAccountName = normalizeAccountName(account.name);
							const accountDetails = balanceDetails.find(detail => normalizeAccountName(detail.name) === normalizedAccountName);
							if (accountDetails?.category === 'capital contable')
								return (
									<tr className="border-b border-gray-200" key={account.id}>
										<td className="py-3 px-6 text-left whitespace-nowrap">
											{account.name}
										</td>
										<td className="py-3 px-6 text-left whitespace-nowrap">
											{account.amount}
										</td>
									</tr>
								)
						})
					}
					<tr className="border-b border-gray-200 font-bold">
						<td className="py-3 px-6 text-left whitespace-nowrap">
							Total capital contable
						</td>
						<td className="py-3 px-6 text-left whitespace-nowrap">
							{getTotal('capital contable')}
						</td>
					</tr>



				</tbody>
			</table>
		</div>
	);
};

export default BalanceGeneral;