import BalanceGeneral from "@/components/BalanceGeneral";
import EstadoResultados from "@/components/EstadoResultados";

interface Account {
  id: string;
  name: string;
  accountType: string;
  amount: number;
}

const fetchAccounts = async (): Promise<Account[] | undefined> => {
  const res = await fetch('http://localhost:3000/accounts', { next: { revalidate: 3 } });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  console.log(data);
  return data.data;
}
async function Home() {

  const accounts = await fetchAccounts();

  



  if (!accounts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EstadoResultados accounts={accounts} />
      <BalanceGeneral accounts={accounts} />
    </div>
  );
}

export default Home;