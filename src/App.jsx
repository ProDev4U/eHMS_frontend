import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

//Private Routes
import AdminPrivateRoute from "./privateRouts/AdminPrivateRoute";
import DoctorPrivateRoute from "./privateRouts/DoctorPrivateRoute"
import PatientPrivateRoute from './privateRouts/PatientPrivateRoute'

//Auth Pages
import Login from "./scenes/auth/login/Login";
import Register from "./scenes/auth/register/Register";
import Home from "./scenes/auth/home/Home";

//Admin Pages
import AdminDashboard from "./scenes/pages/dashboard/AdminDashboard";
import DoctorsProfile from "./scenes/pages/profile/DoctorsProfile";
import AdminDoctorSchedule from "./scenes/pages/schedule/AdminDoctorSchedule";
import AdminDoctorManage from "./scenes/pages/manage/AdminDoctorManage";
import PatientsProfile from "./scenes/pages/profile/PatientsProfile"; 
import AdminPatientManage from "./scenes/pages/manage/AdminPatientManage";
import AdminPatientRecords from "./scenes/pages/records/AdminPatientRecords";
import AdminNewUserManage from "./scenes/pages/manage/AdminNewUserManage";
import AdminAppointment from "./scenes/pages/appointment/AdminAppointment";
import ChatRoom from "./scenes/pages/chat/Chatroom";

//Doctor Pages
import DoctorDashboard from "./scenes/pages/dashboard/DoctorDashboard"; 
import DoctorProfile from "./scenes/pages/profile/DoctorProfile";
import DoctorSchedule from "./scenes/pages/schedule/DoctorSchedule";
import DoctorAppointment from "./scenes/pages/appointment/DoctorAppointment";
import DoctorSeizures from "./scenes/pages/records/DoctorSeizures";
import DoctorMedications from "./scenes/pages/records/DoctorMedications";
import DoctorCheckups from "./scenes/pages/records/DoctorCheckups";

//Patient Pages
import PatientDashboard from "./scenes/pages/dashboard/PatientDashboard";
import PatientProfile from "./scenes/pages/profile/PatientProfile";
import PatientSeizures from "./scenes/pages/records/PatientSeizures";
import PatientMedications from "./scenes/pages/records/PatientMedications";
import PatientCheckups from "./scenes/pages/records/PatientCheckups";
import PatientAppointment from "./scenes/pages/appointment/PatientAppointment"
import PatientSchedule from "./scenes/pages/schedule/PatientSchedule";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/doctor/profile" element={<DoctorsProfile />} />
          <Route path="/admin/doctor/schedule" element={<AdminDoctorSchedule />} />
          <Route path="/admin/doctor/manage" element={<AdminDoctorManage />} />
          <Route path="/admin/patient/profile" element={<PatientsProfile />} />
          <Route path="/admin/patient/manage" element={<AdminPatientManage />} />
          <Route path="/admin/patient/records" element={<AdminPatientRecords />} />
          <Route path="/admin/new/manage" element={<AdminNewUserManage />} />
          <Route path="/admin/appointment" element={<AdminAppointment />} />
          <Route path="/admin/chat" element={<ChatRoom />} />
        </Route>
        <Route element={<DoctorPrivateRoute />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/doctor/seizures" element={<DoctorSeizures />} />
          <Route path="/doctor/medications" element={<DoctorMedications />} />
          <Route path="/doctor/checkups" element={<DoctorCheckups />} />
          <Route path="/doctor/appointment" element={<DoctorAppointment />} />
          <Route path="/doctor/schedule" element={<DoctorSchedule />} />
          <Route path="/doctor/chat" element={<ChatRoom />} />
        </Route>
        <Route element={<PatientPrivateRoute />}>
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/doctors" element={<DoctorsProfile />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/patient/seizures" element={<PatientSeizures />} />
          <Route path="/patient/medications" element={<PatientMedications />} />
          <Route path="/patient/checkups" element={<PatientCheckups />} />
          <Route path="/patient/appointment" element={ <PatientAppointment />} />
          <Route path="/patient/schedule" element={<PatientSchedule />} />
          <Route path="/patient/chat" element={<ChatRoom />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
