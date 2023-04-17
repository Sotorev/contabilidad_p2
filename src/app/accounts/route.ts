import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

type Data = {
	name: string;
	accountType: string;
	id: string;
	amount: number;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
	if (request.body) {
		// Convertir el cuerpo de la solicitud a JSON
		const requestBody = await request.json();

		// Función para manejar un único objeto Data
		const handleData = (data: Data) => {
			const dataString = JSON.stringify(data);
			fs.writeFile(`reports.json`, dataString, function (err) {
				if (err) throw err;
			});
		};

		handleData(requestBody);

		return NextResponse.json({ status: 200, message: requestBody });
	}

	return NextResponse.json({ status: 200, message: "a" });
}

export async function GET() {

	try {
		const JSONData = fs.readFileSync("reports.json", 'utf8');
		const res = JSON.parse(JSONData);
		return NextResponse.json({ status: 200, data: res });
	}
	catch (err) {
		return NextResponse.json({ status: 500, message: err });
	}

}