import { useState, useEffect } from 'react'
import { isEmailPaid, getCourseRatings, submitCourseRating, hasUserRated } from '../lib/auth'
import { initiateRazorpayPayment } from '../lib/razorpay'
import './CourseDetailPage.css'

function CourseDetailPage({ course, sessionEmail, onBack, onStartTest }) {
  const [isPaid, setIsPaid] = useState(false)
  const [paying, setPaying] = useState(false)
  const [ratings, setRatings] = useState({ averageRating: 0, totalReviews: 0, reviews: [] })
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [userRating, setUserRating] = useState(5)
  const [userReview, setUserReview] = useState('')
  const [hasRated, setHasRated] = useState(false)

  useEffect(() => {
    setIsPaid(isEmailPaid(sessionEmail, course.id))
    setRatings(getCourseRatings(course.id))
    setHasRated(hasUserRated(sessionEmail, course.id))
  }, [sessionEmail, course.id])

  const handlePurchase = () => {
    setPaying(true)
    initiateRazorpayPayment({
      email: sessionEmail,
      courseId: course.id,
      courseTitle: course.title,
      amount: course.price,
      onSuccess: () => {
        setPaying(false)
        setIsPaid(true)
        if (course.testAvailable && onStartTest) {
          onStartTest()
        }
      },
      onFailure: (error) => {
        setPaying(false)
        alert('Payment failed: ' + error)
      }
    })
  }

  const handleSubmitRating = () => {
    if (!isPaid) {
      alert('Please purchase the course before rating.')
      return
    }
    
    submitCourseRating(sessionEmail, course.id, userRating, userReview)
    setRatings(getCourseRatings(course.id))
    setHasRated(true)
    setShowRatingModal(false)
    setUserReview('')
  }

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }

  return (
    <div className="course-detail-page">
      <button className="back-btn" onClick={onBack}>← Back to Courses</button>

      <div className="detail-container">
        <div className="detail-header">
          <div className="header-left" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {course.image ? (
              <img src={course.image} alt={course.title} className="detail-image" style={{ width: '140px', height: '140px', objectFit: 'contain', borderRadius: '12px', background: '#FAFAFA', padding: '10px', border: '1px solid #E5E5E5' }} />
            ) : (
              <div className="detail-icon">{course.title.charAt(0)}</div>
            )}
            <div className="detail-info">
              <p className="detail-provider">{course.provider}</p>
              <h1>{course.title}</h1>
              {ratings.totalReviews > 0 && (
                <div className="detail-rating">
                  <span className="rating-value">{ratings.averageRating}</span>
                  <span className="stars">{renderStars(ratings.averageRating)}</span>
                  <span className="reviews">({ratings.totalReviews} reviews)</span>
                </div>
              )}
            </div>
          </div>

          <div className="header-right-action" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
            {!isPaid ? (
              <div className="purchase-section" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div className="price-tag" style={{ fontSize: '2rem', fontWeight: 700, color: '#A100FF' }}>₹{course.price}</div>
                <button 
                  className="purchase-btn" 
                  onClick={handlePurchase}
                  disabled={paying}
                  style={{ background: '#A100FF', color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {paying ? 'Processing...' : 'Purchase Course'}
                </button>
              </div>
            ) : (
              <>
                {course.testAvailable ? (
                  <button className="start-btn" onClick={onStartTest} style={{ background: '#A100FF', color: 'white', border: 'none', padding: '1rem 3rem', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(161, 0, 255, 0.3)' }}>
                    Start Test
                  </button>
                ) : (
                  <div className="coming-soon-msg" style={{ background: '#F8F9FA', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid #E5E5E5', textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, color: '#10b981', margin: 0 }}>✓ Course Purchased</p>
                    <p style={{ color: '#666666', fontSize: '0.9rem', margin: 0 }}>Test Coming Soon</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h2>About This Course</h2>
            <p>{course.description}</p>
          </div>

          <div className="detail-section">
            <h2>Course Details</h2>
            <div className="detail-meta">
              <div className="meta-row">
                <span className="meta-label">Level:</span>
                <span className="meta-value">{course.level}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Duration:</span>
                <span className="meta-value">{course.duration}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>Skills You'll Learn</h2>
            <div className="skills-list">
              {course.skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>

          {isPaid && course.testAvailable && (
            <div className="detail-section">
              <h2>Assessment Details</h2>
              <p>This assessment consists of three timed sections:</p>
              <ul className="assessment-info">
                <li><strong>Technical Assessment</strong> - 45 minutes</li>
                <li><strong>Behavioral & Cognitive</strong> - 40 minutes</li>
                <li><strong>Communication Assessment</strong> - 30 minutes</li>
              </ul>
              <p>Take the test as many times as you like. Each attempt helps you improve!</p>
            </div>
          )}



          {isPaid && (
            <div className="detail-section">
              <div className="rating-header">
                <h2>Ratings & Reviews</h2>
                {!hasRated && (
                  <button className="rate-btn" onClick={() => setShowRatingModal(true)}>
                    Rate This Course
                  </button>
                )}
              </div>
              
              {ratings.reviews.length > 0 ? (
                <div className="reviews-list">
                  {ratings.reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <div className="review-header">
                        <span className="review-stars">{renderStars(review.rating)}</span>
                        <span className="review-date">
                          {new Date(review.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      {review.review && <p className="review-text">{review.review}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-reviews">No reviews yet. Be the first to rate!</p>
              )}
            </div>
          )}
        </div>
      </div>

      {showRatingModal && (
        <div className="modal-overlay" onClick={() => setShowRatingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Rate This Course</h2>
            <div className="rating-selector">
              <label>Your Rating:</label>
              <div className="star-selector">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`star ${star <= userRating ? 'selected' : ''}`}
                    onClick={() => setUserRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="review-input">
              <label>Your Review (Optional):</label>
              <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Share your experience..."
                rows="4"
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowRatingModal(false)}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmitRating}>
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseDetailPage
