import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { RecipeDetail } from './pages/RecipeDetail'
import { Login } from './pages/Login'
import ManageRecipes from './pages/teacher/ManageRecipes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/teacher" element={<ManageRecipes />} />
    </Routes>
  )
}

export default App
