import { getCourseRatings, isEmailPaid } from '../lib/auth'
import CourseCard from './CourseCard'
import tcsImage from '../assets/tcs.png'
import accentureImage from '../assets/course-accenture.webp'
import capgeminiImage from '../assets/course-capgemini.webp'
import './CoursesPage.css'

function CoursesPage({ sessionEmail, onCourseSelect }) {
  const tcsRatings = getCourseRatings(1)
  const accentureRatings = getCourseRatings(2)
  const capgeminiRatings = getCourseRatings(3)

  const courses = [
    {
      id: 1,
      title: 'TCS Mock Practice Test',
      provider: 'Aspire Nexus',
      description: 'Comprehensive TCS placement preparation with mock tests covering all sections of TCS NQT and Digital exams.',
      rating: tcsRatings.averageRating || 0,
      reviews: tcsRatings.totalReviews || 0,
      students: 18200,
      level: 'Beginner',
      duration: '4 weeks',
      price: 20,
      status: 'available',
      testAvailable: false,
      image: tcsImage,
      skills: ['Numerical Ability', 'Reasoning', 'Verbal Ability', 'Coding']
    },
    {
      id: 2,
      title: 'Accenture Mock Practice Test',
      provider: 'Aspire Nexus',
      description: 'Master Accenture placement tests with comprehensive preparation materials and practice tests. (Test Available)',
      rating: accentureRatings.averageRating || 0,
      reviews: accentureRatings.totalReviews || 0,
      students: 12500,
      level: 'Beginner',
      duration: '4 weeks',
      price: 20,
      status: 'available',
      testAvailable: true,
      image: accentureImage,
      skills: ['Aptitude', 'Logical Reasoning', 'Verbal Ability']
    },
    {
      id: 3,
      title: 'Capgemini Mock Practice Test',
      provider: 'Aspire Nexus',
      description: 'Master Capgemini placement tests and pseudo-code assessments. Test available soon.',
      rating: capgeminiRatings.averageRating || 0,
      reviews: capgeminiRatings.totalReviews || 0,
      students: 9400,
      level: 'Beginner',
      duration: '4 weeks',
      price: 20,
      status: 'coming-soon',
      testAvailable: false,
      image: capgeminiImage,
      skills: ['Pseudo Code', 'English Communication', 'Game-based Aptitude']
    }
  ]

  return (
    <div className="courses-page">
      <div className="courses-header">
        <div className="header-content">
          <h1>Placement Preparation Test Platform</h1>
          <p>Take industry-standard mock practice tests and assessments to get placement ready</p>
        </div>
      </div>

      <div className="courses-container">
        <div className="courses-grid">
          {courses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              isPaid={isEmailPaid(sessionEmail, course.id)}
              sessionEmail={sessionEmail}
              onSelect={() => onCourseSelect(course)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
