import React from 'react'


interface Account {
	id: string;
	name: string;
	accountType: string;
	amount: number;
}

const BalanceGeneral = ({accounts}: {accounts: Account[]}) => {
	return (
		<div className='m-4'>
			<h1 className='font-bold text-3xl'>Balance General</h1>
		</div>
	)
}

export default BalanceGeneral