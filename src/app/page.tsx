import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-800 to-slate-800 text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-center animate__animated animate__fadeInUp">
        Quiz Application
      </h1>

      <Link href='/user/quiz'>
        <button className="px-6 py-3 bg-sky-900 text-white rounded-full text-lg font-medium shadow-lg hover:bg-sky-700 transition ease-in-out duration-300 transform hover:scale-105">
          Start Quiz
        </button>
      </Link>
    </div>
  );
}
