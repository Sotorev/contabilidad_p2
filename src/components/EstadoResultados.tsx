import React from 'react'
import GastosOperativos from "@/utilities/gastosOperativos";
import costoVariable from "@/utilities/costoVariable";


interface Account {
	id: string;
	name: string;
	accountType: string;
	amount: number;
}

const EstadoResultados = ({accounts} : {accounts: Account[]}) => {

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

	const getOperativeBills = () => {
		const operativeAccounts = GastosOperativos;
		const operativeAccountsSet = new Set(operativeAccounts.map(name => normalizeAccountName(name)));

		if (!accounts) {
			return -1;
		}

		const total = accounts.reduce((sum, account) => {
			if (operativeAccountsSet.has(normalizeAccountName(account.name))) {
				return sum + account.amount;
			}
			return sum;
		}, 0);

		return total;
	};

	const getVariableCost = () => {
		const variableCostAccounts = costoVariable;

		const variableCostAccountsSet = new Set(variableCostAccounts.map(name => normalizeAccountName(name)));

		if (!accounts) {
			return -1;
		}

		const x = accounts.filter((account) => {
			return variableCostAccountsSet.has(normalizeAccountName(account.name));
		});

		console.log('x', x);


		const total = accounts.reduce((sum, account) => {

			if (variableCostAccountsSet.has(normalizeAccountName(account.name))) {
				if (account.name === "Invetario final")
					return sum - account.amount;
				return sum + account.amount;
			}
			return sum;
		}, 0);

		return total;
	};

	const getSales = () => {
		const sales = accounts?.find((account) => normalizeAccountName(account.name) === "ventas");
		const refunds = accounts?.find((account) => normalizeAccountName(account.name) === "devoluciones sobre ventas");

		if (!sales || !refunds) return -1;

		return sales.amount - refunds.amount || 0;
	};

	const getUAII = () => {
		return getSales() - getVariableCost() - getOperativeBills();
	};


	const getUAI = () => {

		if (!accounts) {
			return -1;
		}

		const searchWord = "intereses";
		const taxAccounts = accounts.filter((account) => {
			const normalizedName = normalizeAccountName(account.name);
			return normalizedName.includes(normalizeAccountName(searchWord));
		});

		const total = taxAccounts.reduce((sum, account) => {
			return sum + account.amount;
		}, 0);

		return getUAII() - total;

	};

	const getNetIncome = () => {
		const percentage = (getUAI() * 0.25) / getSales();
		if (percentage < .07)
			return getUAI() - getUAI() * .25;
		else
			return getUAI() - getUAI() * .07;
	};

	const getLegalReserves = () => {
		return getNetIncome() * .05;
	};

	const getDividends = () => {
		return getNetIncome() * .5;
	};

	return (
		<div className="m-4">
			<h1 className="font-bold text-3xl mb-6">Estado de resultados</h1>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<h2 className="font-bold text-lg mb-2">Ventas</h2>
					<p className="text-lg font-medium">Q{getSales().toLocaleString('es-GT')}</p>
				</div>
				<div>
					<h2 className="font-bold text-lg mb-2">Costo variable</h2>
					<p className="text-lg font-medium">Q{getVariableCost().toLocaleString('es-GT')}</p>
				</div>
				<div>
					<h2 className="font-bold text-lg mb-2">Utilidad bruta</h2>
					<p className="text-lg font-medium">Q{(getSales() - getVariableCost()).toLocaleString('es-GT')}</p>
				</div>
				<div>
					<h2 className="font-bold text-lg mb-2">Gastos operativos</h2>
					<p className="text-lg font-medium">Q{getOperativeBills().toLocaleString('es-GT')}</p>
				</div>
				<div>
					<h2 className="font-bold text-lg mb-2">Utilidad antes de impuestos e intereses</h2>
					<p className="text-lg font-medium">Q{getUAII().toLocaleString('es-GT')}</p>
				</div>
				<div>
					<h2 className="font-bold text-lg mb-2">Utilidad antes de impuestos</h2>
					<p className="text-lg font-medium">Q{getUAI().toLocaleString('es-GT')}</p>
				</div>
				<div>
					<h2 className="font-bold text-lg mb-2">Utilidad neta</h2>
					<p className="text-lg font-medium">Q{getNetIncome().toLocaleString('es-GT')}</p>
				</div>
				<div>
					<h2 className="font-bold text-lg mb-2">Reservas legales</h2>
					<p className="text-lg font-medium">Q{getLegalReserves().toLocaleString('es-GT')}</p>
				</div>
				{true &&
					<div>
						<h2 className="font-bold text-lg mb-2">Dividendos</h2>
						<p className="text-lg font-medium">Q{(getNetIncome() / 2).toLocaleString('es-GT')}</p>
					</div>
				}
				<div>
					<h2 className="font-bold text-lg mb-2">Utilidad neta después de impuestos e intereses</h2>
					<p className="text-lg font-medium">Q{(getNetIncome() - getLegalReserves() - getDividends()).toLocaleString('es-GT')}</p>
				</div>
			</div>
		</div>
)
}

export default EstadoResultados