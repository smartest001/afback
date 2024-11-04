import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function OPTIONS() {
    const response = NextResponse.json(null, { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*'); // Replace * with your allowed origin if needed
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
}

export async function POST(request) {
    try {
        const origin = request.headers.get('origin');
        const allowedOrigins = ['https://your-frontend-domain.com', 'http://localhost:3000']; // Adjust to your frontend origin(s)

        // Check if the request origin is allowed
        if (origin && allowedOrigins.includes(origin)) {
            const response = NextResponse.next();
            response.headers.set('Access-Control-Allow-Origin', origin);
            response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return response;
        }

        const { email, name, phoneNumber, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'thetobiwealth@gmail.com',
                pass: 'rkie lmvu bhhv pfbg'
            }
        });

        const mailOption = {
            from: 'thetobiwealth@gmail.com',
            to: 'thetobiwealth@gmail.com',
            subject: "Comfy Properties",
            html: `
                <h3>Show of interest</h3>
                <li> name: ${name}</li>
                <li> email: ${email}</li>
                <li> Phone number: ${phoneNumber}</li>
                <p>${message}</p> 
            `
        };

        await transporter.sendMail(mailOption);

        const response = NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
        response.headers.set('Access-Control-Allow-Origin', origin);
        return response;
    } catch (error) {
        const response = NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
        response.headers.set('Access-Control-Allow-Origin', '*');
        return response;
    }
}
