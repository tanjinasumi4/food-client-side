import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AddFood from "./pages/dashboard/addFood/addFood";
import AddStudent from "./pages/dashboard/addStudent/AddStudent";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/dashboardHome/DashboardHome";
import ManageAllFoods from "./pages/dashboard/manageAllFoods/ManageAllFoods";
import ManageAllStudents from "./pages/dashboard/manageAllStudents/ManageAllStudents";
import ServingFood from './pages/dashboard/servingFood/ServingFood';
import UpdateFoodInfo from "./pages/dashboard/updateFoodInfo/UpdateFoodInfo";
import UpdateStudentInfo from "./pages/dashboard/updateStudentInfo/UpdateStudentInfo";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Dashboard/>}>
          <Route path="" element={<DashboardHome/>} />
          <Route path="add-food" element={<AddFood/>} />
          <Route path="manage-all-foods" element={<ManageAllFoods/>} />
          <Route path="add-student" element={<AddStudent/>} />
          <Route path="manage-all-students" element={<ManageAllStudents/>} />
          <Route path="serving-food" element={<ServingFood/>}/>
          <Route path="update-food-info/:foodId" element={<UpdateFoodInfo/>} />
          <Route path="update-student-info/:studentId" element={<UpdateStudentInfo/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
