import { NextResponse } from "next/server";
import { promises as fs } from 'fs'; // Use fs.promises for async file operations
import path from 'path';
// import pdf from "pdf-parse" // Uncomment this if you want to use pdf-parse
import * as pdfParse from "pdf-parse"


export const POST = async (request) => {
    try {
        // Parse the form data to get the uploaded file
        let form = await request.formData();
        let file = form.get("file");
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert the file to an ArrayBuffer
        let arrayBuffer = await file.arrayBuffer();
        // Convert ArrayBuffer to Buffer
        let buffer = Buffer.from(arrayBuffer);

        // Define the directory and file path where you want to save the file
        const uploadDir = path.join(process.cwd(), 'uploads');
        const fileName = `${Date.now()}-${file.name}`; // Optional: Add a timestamp or unique identifier
        const filePath = path.join(uploadDir, fileName);

        // Ensure the upload directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        // Write the buffer to a file
        await fs.writeFile(filePath, buffer);
        console.log(`File saved to ${filePath}`);

        // Read the saved file as a buffer
        let dataBuffer = await fs.readFile(filePath);
        console.log("bufferd", dataBuffer);

        // Uncomment and use pdf-parse to extract text from PDF if needed
        try {

            let data = await pdfParse(dataBuffer);
        }
        catch (e) {
            console.log(e)
        }
        // console.log(data.text);

        // Respond with the file path
        return NextResponse.json({ message: "File uploaded successfully", filePath }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
