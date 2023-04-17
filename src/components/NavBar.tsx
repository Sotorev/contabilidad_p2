// NavBar.tsx
import Link from 'next/link';
import React from 'react';

type NavItem = {
	text: string;
	href: string;
};

const navItems: NavItem[] = [
	{ text: 'Administrar cuentas', href: '/accounts-administration' },
	{ text: 'Estadísticas', href: '/statistics' },
];

const NavBar: React.FC = () => {
	return (
		<nav className="bg-blue-500">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<div className="text-white text-xl font-semibold">
							<Link href="/">Razones financieras</Link>
						</div>
					</div>
					<div className="flex items-center">
						{navItems.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
							>
								{item.text}
							</a>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
