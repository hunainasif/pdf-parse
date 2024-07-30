




export const POST=async(request,response)=>{
    try {
        return NextResponse.json({message:"File Uploaded"},{status:200})
        
    } catch (error) {
        return NextResponse.json({error:error.message},P{status:500})
        
    }
}