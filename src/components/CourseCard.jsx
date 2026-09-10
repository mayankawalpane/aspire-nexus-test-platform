import { useState } from 'react'
import { initiateRazorpayPayment } from '../lib/razorpay'
import './CourseCard.css'

function CourseCard({ course, isPaid, sessionEmail, onSelect }) {
  const [paying, setPaying] = useState(false)

  const handleCardClick = (e) => {
    e.stopPropagation()
    onSelect()
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
    if (!isPaid && course.id !== 3) {
      setPaying(true)
      initiateRazorpayPayment({
        email: sessionEmail,
        courseId: course.id,
        courseTitle: course.title,
        amount: course.price,
        onSuccess: () => {
          setPaying(false)
          onSelect()
        },
        onFailure: (err) => {
          setPaying(false)
          alert('Payment failed: ' + err)
        }
      })
    } else {
      onSelect()
    }
  }

  const getButtonText = () => {
    if (course.id === 3) {
      return 'Coming Soon'
    }
    if (isPaid) {
      return course.testAvailable ? 'Start Test' : 'View Details'
    }
    return paying ? 'Redirecting...' : 'Enroll Now'
  }

  return (
    <div className="course-card" onClick={handleCardClick}>
      <div className="card-image">
        {course.image ? (
          <img src={course.image} alt={course.title} />
        ) : (
          <div className="course-placeholder">
            <div className="course-icon">{course.title.charAt(0)}</div>
          </div>
        )}
        {isPaid && (
          <div className="paid-badge">Purchased ✓</div>
        )}
        {course.id === 3 && (
          <div className="paid-badge" style={{ background: '#666666' }}>Coming Soon</div>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <p className="provider">{course.provider}</p>
          <h3 className="course-title">{course.title}</h3>
        </div>

        <p className="course-description">{course.description}</p>

        {course.rating > 0 && (
          <div className="course-rating">
            <span className="rating-value">{course.rating}</span>
            <span className="stars">★★★★★</span>
            <span className="reviews">({course.reviews} reviews)</span>
          </div>
        )}

        <div className="course-meta">
          <span className="meta-item">{course.level}</span>
          <span className="meta-separator">•</span>
          <span className="meta-item">{course.duration}</span>
        </div>

        <div className="course-skills">
          {course.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <div className="price">
          {isPaid ? 'Purchased' : `₹${course.price}`}
        </div>
        <button 
          className={`enroll-btn ${isPaid ? 'paid' : ''}`}
          onClick={handleButtonClick}
          disabled={course.id === 3 || paying}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  )
}

export default CourseCard
