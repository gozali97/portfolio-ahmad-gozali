import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"
import PublicLayout from "./layouts/PublicLayout"
import AdminLayout from "./Components/Admin/AdminLayout"
import Login from "./Components/Admin/Login"
import Dashboard from "./Components/Admin/Dashboard"
import ProjectList from "./Components/Admin/Projects/ProjectList"
import ProjectForm from "./Components/Admin/Projects/ProjectForm"
import TechList from "./Components/Admin/TechStack/TechList"
import TechForm from "./Components/Admin/TechStack/TechForm"
import ProfileManager from "./Components/Admin/Profile/ProfileManager"

function App() {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<ProjectList />} />
              <Route path="projects/new" element={<ProjectForm />} />
              <Route path="projects/edit/:id" element={<ProjectForm />} />
              <Route path="tech" element={<TechList />} />
              <Route path="tech/new" element={<TechForm />} />
              <Route path="tech/edit/:id" element={<TechForm />} />
              <Route path="profile" element={<ProfileManager />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
