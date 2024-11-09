
import AdminSidebar from '../../../components/AdminSidebar';
import Navbar from '@/components/Navbar';



const AdminPage = () => {

  
 
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <AdminSidebar />

      <main className="flex-1 p-6 pt-20 ml-64"> 
        <h1 className="text-3xl font-bold text-gray-800 ">Welcome to the QuizApp Dashboard</h1>
        
      </main>
    </div>
  );
};

export default AdminPage;

