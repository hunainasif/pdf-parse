import { NextResponse } from "next/server";
import pdf from 'pdf-parse/lib/pdf-parse'

export const POST = async (request) => {
  try {
    console.log("We're in");
    let form = await request.formData();
    let file = form.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let arrayBuffer = await file.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);

    const data = await pdf(buffer);
    console.log("Extracted text:", data.text);

    return NextResponse.json(
      { message: "File uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
