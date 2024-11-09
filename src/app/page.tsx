import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
   <div className="flex flex-col items-center justify-center h-screen">
    <h1 className=" text-4xl font-bold mb-8"> Quiz App</h1>

    <Link href='/quiz'>
    
    <button className=" px-4 py-2 bg-blue-500 text-white  rounded hover:bg-blue-600">Start Quiz</button>
    </Link>


    <Toaster/>
   </div>
  );
}
