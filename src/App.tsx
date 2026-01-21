import Category from './Components/Category/Category';
import { Routes, Route } from 'react-router-dom';
import CategoryInterface from './Components/Category/CategoryInterface';
import BranchInterface from './Components/Branch/BranchInterface';
import DisplayAllCategory from './Components/Category/DisplayAllCategory';
import DisplayAllBranch from './Components/Branch/DisplayAllBranch';
import BranchLogin from './Components/Branch/BranchLogin';
import BranchDashboard from './Components/Branch/BranchDashboard';
import Branch from './Components/Branch/Branch';
import FooditemsInterface from './Components/Fooditems/FooditemsInterface';
import DisplayFooditems from './Components/Fooditems/DisplayFooditems';
import Fooditems from './Components/Fooditems/Fooditems';
import BatchInterface from './Components/Batch/BatchInterface';
import DisplayAllBatch from './Components/Batch/DisplayAllBatch';
import Batch from './Components/Batch/Batch';
import Section from './Components/Section/Section';
import SectionInterface from './Components/Section/SectionInterface';
import DisplayAllSection from './Components/Section/DisplayAllSection';
import Student from './Components/Students/Student';
import StudentInterface from './Components/Students/StudentInterface';
import DisplayAllStudent from './Components/Students/DisplayAllStudent';
import EmployeeInterface from './Components/Employees/EmployeeInterface';
import DisplayAllEmployee from './Components/Employees/DisplayAllEmployee';
import Employees from './Components/Employees/Employees';
import Deliveryboy from './Components/Deliveryboy/Deliveryboy';
import DeliveryboyInterface from './Components/Deliveryboy/DeliveryboyInterface';
import DisplayAllDeliveryboy from './Components/Deliveryboy/DisplayAllDelivery';
import AdminDashboard from './Components/adminlogin/AdminDashboard';
import AdminLogin from './Components/adminlogin/AdminLogin';
import { useState } from 'react';
import Homepage from './Pages/homepage/Homepage';
import ProductDetailComponent from './Pages/productdetailcomponent/ProductDetailComponent';
import Carts from './Pages/carts/Cart';
/***************************** IMPORT UI'S **************************************/



function App() {

      const [refresh,setRefresh]=useState(false)
  
  return (
    <div>
    <Routes>  
      <Route path="categoryinterface" element={<CategoryInterface refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='branchinterface' element={<BranchInterface refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='allcategory' element={<DisplayAllCategory refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='allbranch' element={<DisplayAllBranch refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='branchlogin' element={<BranchLogin/>} />
      <Route path='branchdashboard' element={<BranchDashboard/>} />
      <Route path='category/*' element={<Category/>} />
      <Route path='branch' element={<Branch/>} />
      <Route path='fooditems/*' element={<Fooditems/>} />
      <Route path='batch/*' element={<Batch/>} />
      <Route path='section/*' element={<Section/>} />
      <Route path='student/*' element={<Student/>} />
      <Route path='employees/*' element={<Employees/>} />
      <Route path='deliveryboy/*' element={<Deliveryboy/>} />
      <Route path='fooditemsinterface' element={<FooditemsInterface refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='displayfooditems' element={<DisplayFooditems refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='batchinterface' element={<BatchInterface refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='displaybatch' element={<DisplayAllBatch refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='sectioninterface' element={<SectionInterface refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='displaysection' element={<DisplayAllSection refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='studentinterface' element={<StudentInterface refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='displaystudent' element={<DisplayAllStudent refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='employeeinterface' element={<EmployeeInterface refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='displayemployee' element={<DisplayAllEmployee refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='deliveryboyinterface' element={<DeliveryboyInterface refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='displaydeliveryboy' element={<DisplayAllDeliveryboy refresh={refresh} setRefresh={setRefresh} />} />
      <Route path='adminlogin' element={<AdminLogin />} />
      <Route path='admindashboard' element={<AdminDashboard />} />

         {/****************************** USER INTERFACES ****************************************************/}

      <Route path='homepage' element={<Homepage />} />
      <Route path='productdetailcomponent/:id' element={<ProductDetailComponent />} />
      <Route path='cart' element={<Carts />} />

    




         {/****************************** USER INTERFACES END ****************************************************/}

    </Routes>
   
    </div>
  );
}

export default App;
