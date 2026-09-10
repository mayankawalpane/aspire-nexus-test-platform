import { useState } from 'react'
import LoginPage from './components/LoginPage'
import CoursesPage from './components/CoursesPage'
import CourseDetailPage from './components/CourseDetailPage'
import TestAssessment from './components/TestAssessment'
import { getSession, logout } from './lib/auth'
import './App.css'

function App() {
  const [sessionEmail, setSessionEmail] = useState(() => getSession())
  const [currentPage, setCurrentPage] = useState('courses')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const handleLogin = (email) => {
    setSessionEmail(email)
    setCurrentPage('courses')
  }

  const handleLogout = () => {
    logout()
    setSessionEmail('')
    setCurrentPage('courses')
    setSelectedCourse(null)
  }

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    setCurrentPage('course-detail')
  }

  const handleStartTest = () => {
    setCurrentPage('test')
  }

  const handleBackToCourses = () => {
    setCurrentPage('courses')
    setSelectedCourse(null)
  }

  const handleBackToDetail = () => {
    setCurrentPage('course-detail')
  }

  // Login Page
  if (!sessionEmail) {
    return (
      <div className="app">
        <header className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand">Aspire Nexus - Test Platform</div>
          </div>
        </header>
        <main className="main-content">
          <LoginPage onAuth={handleLogin} />
        </main>
        <footer className="footer">
          <div className="footer-container">
            <p>© 2026 Aspire Nexus Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  // Test Page
  if (currentPage === 'test' && selectedCourse) {
    return (
      <div className="app">
        <header className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={handleBackToCourses}>Aspire Nexus - Test Platform</div>
            <div className="navbar-user">
              <span className="user-email">{sessionEmail}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </header>
        <main className="main-content">
          <TestAssessment 
            course={selectedCourse}
            sessionEmail={sessionEmail}
            onClose={handleBackToDetail} 
          />
        </main>
      </div>
    )
  }

  // Course Detail Page
  if (currentPage === 'course-detail' && selectedCourse) {
    return (
      <div className="app">
        <header className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={handleBackToCourses}>Aspire Nexus - Test Platform</div>
            <div className="navbar-user">
              <span className="user-email">{sessionEmail}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </header>
        <main className="main-content">
          <CourseDetailPage 
            course={selectedCourse}
            sessionEmail={sessionEmail}
            onBack={handleBackToCourses}
            onStartTest={handleStartTest}
          />
        </main>
        <footer className="footer">
          <div className="footer-container">
            <p>© 2026 Aspire Nexus Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  // Courses Page (Default)
  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">Aspire Nexus - Test Platform</div>
          <div className="navbar-user">
            <span className="user-email">{sessionEmail}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>
      <main className="main-content">
        <CoursesPage 
          sessionEmail={sessionEmail}
          onCourseSelect={handleCourseSelect}
        />
      </main>
      <footer className="footer">
        <div className="footer-container">
          <p>© 2026 Aspire Nexus Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
