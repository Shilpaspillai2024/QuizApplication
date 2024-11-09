
import { NextRequest,NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req:NextRequest){
    try {

        const {username,password}= await req.json()
        const adminUsername=process.env.ADMIN_USERNAME;
        const adminPassword=process.env.ADMIN_PASSWORD;
    

        if(username===adminUsername && password===adminPassword){
            
          const jwtSecret=process.env.JWT_SECRET;
          if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
          }
  
            const token=jwt.sign({username},jwtSecret,{expiresIn:'1d'})

            const response =NextResponse.json({success:true,message:'Login Successfull'})

            response.cookies.set(
                'token',token,
                {
                    httpOnly:true,
                    maxAge:60*60*24
                }

            )
            
            
            
            return response;
        }else{
            return NextResponse.json({success:false,message:'Invalid credentials'},{status:401})
        }
        
    } catch (error) {
        console.error('error handling login rquest:',error)
        return NextResponse.json({success:false,message:'An error occured'},{status:500})
        
    }
}