import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

//Private Routes
import AdminPrivateRoute from "./privateRouts/AdminPrivateRoute";
import DoctorPrivateRoute from "./privateRouts/DoctorPrivateRoute"
import PatientPrivateRoute from './privateRouts/PatientPrivateRoute'

//Auth Pages
import Home from "./scenes/auth/home/Home";
import ResetPassword from "./scenes/auth/resetPassword/NewPassword";

//Admin Pages
import AdminDashboard from "./scenes/pages/dashboard/AdminDashboard";
import AdminDoctorManage from "./scenes/pages/manage/AdminDoctorManage";
import AdminPatientManage from "./scenes/pages/manage/AdminPatientManage";
import AdminPatientRecords from "./scenes/pages/records/AdminPatientRecords";
import AdminNewUserManage from "./scenes/pages/manage/AdminNewUserManage";
import AdminAppointment from "./scenes/pages/appointment/AdminAppointment";

//Doctor Pages
import DoctorDashboard from "./scenes/pages/dashboard/DoctorDashboard"; 
import DoctorRelation from "./scenes/pages/relation/DoctorRelation";
import DoctorAppointment from "./scenes/pages/appointment/DoctorAppointment";
import DoctorSeizures from "./scenes/pages/records/DoctorSeizures";
import DoctorMedications from "./scenes/pages/records/DoctorMedications";
import DoctorCheckups from "./scenes/pages/records/DoctorCheckups";

//Patient Pages
import PatientRelation from "./scenes/pages/relation/PatientRelation";
import PatientSeizures from "./scenes/pages/records/PatientSeizures";
import PatientMedications from "./scenes/pages/records/PatientMedications";
import PatientCheckups from "./scenes/pages/records/PatientCheckups";
import PatientAppointment from "./scenes/pages/appointment/PatientAppointment"

//Global
import Profile from "./scenes/pages/profile/Profile";
import ChatRoom from "./scenes/pages/chat/Chatroom";
import Schedule from "./scenes/pages/schedule/Schedule";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/doctor/schedule" element={<Schedule />} />
          <Route path="/admin/doctor/manage" element={<AdminDoctorManage />} />
          <Route path="/admin/patient/manage" element={<AdminPatientManage />} />
          <Route path="/admin/patient/records" element={<AdminPatientRecords />} />
          <Route path="/admin/new/manage" element={<AdminNewUserManage />} />
          <Route path="/admin/appointment" element={<AdminAppointment />} />
          <Route path="/admin/chat" element={<ChatRoom />} />
        </Route>
        <Route element={<DoctorPrivateRoute />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/profile" element={<Profile />} />
          <Route path="/doctor/relation" element={<DoctorRelation />} />
          <Route path="/doctor/seizures" element={<DoctorSeizures />} />
          <Route path="/doctor/medications" element={<DoctorMedications />} />
          <Route path="/doctor/checkups" element={<DoctorCheckups />} />
          <Route path="/doctor/appointment" element={<DoctorAppointment />} />
          <Route path="/doctor/schedule" element={<Schedule />} />
          <Route path="/doctor/chat" element={<ChatRoom />} />
        </Route>
        <Route element={<PatientPrivateRoute />}>
          <Route path="/patient/relation" element={<PatientRelation />} />
          <Route path="/patient/profile" element={<Profile />} />
          <Route path="/patient/seizures" element={<PatientSeizures />} />
          <Route path="/patient/medications" element={<PatientMedications />} />
          <Route path="/patient/checkups" element={<PatientCheckups />} />
          <Route path="/patient/appointment" element={ <PatientAppointment />} />
          <Route path="/patient/schedule" element={<Schedule />} />
          <Route path="/patient/chat" element={<ChatRoom />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
