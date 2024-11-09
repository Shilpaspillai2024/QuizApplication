import Link from "next/link";

const AdminSidebar = () => {
  return (
    <div className="fixed top-16 left-0 bg-slate-900 text-white h-full w-64 p-4 shadow-lg">
      <nav className="space-y-4 mt-4">
        {/* <Link href="/admin" className="block px-4 py-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white transition duration-300">
          Dashboard
        </Link> */}
        <Link href="/admin/add-category" className="block px-4 py-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white transition duration-300">
          Add Category
        </Link>
        <Link href="/admin/add-question" className="block px-4 py-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white transition duration-300">
          Add Question
        </Link>
        <Link href="/admin/results" className="block px-4 py-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white transition duration-300">
          View Results
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
