// Session management
export function getSession() {
  return localStorage.getItem('aspire_session') || ''
}

export function setSession(email) {
  localStorage.setItem('aspire_session', email)
}

export function logout() {
  localStorage.removeItem('aspire_session')
}

// User registration
export function registerUser(email, password) {
  const users = JSON.parse(localStorage.getItem('aspire_users') || '{}')
  if (users[email]) {
    return { success: false, message: 'Email already registered' }
  }
  users[email] = { password, registered: new Date().toISOString() }
  localStorage.setItem('aspire_users', JSON.stringify(users))
  return { success: true }
}

// User login
export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('aspire_users') || '{}')
  if (!users[email]) {
    return { success: false, message: 'Email not registered' }
  }
  if (users[email].password !== password) {
    return { success: false, message: 'Incorrect password' }
  }
  return { success: true }
}

// Payment management
export function isEmailPaid(email, courseId) {
  const payments = JSON.parse(localStorage.getItem('aspire_payments') || '{}')
  const key = `${email}_${courseId}`
  return !!payments[key]
}

export function markEmailPaid(email, courseId, paymentDetails) {
  const payments = JSON.parse(localStorage.getItem('aspire_payments') || '{}')
  const key = `${email}_${courseId}`
  payments[key] = {
    ...paymentDetails,
    paidAt: new Date().toISOString()
  }
  localStorage.setItem('aspire_payments', JSON.stringify(payments))
}

export function getPaymentDetails(email, courseId) {
  const payments = JSON.parse(localStorage.getItem('aspire_payments') || '{}')
  const key = `${email}_${courseId}`
  return payments[key] || null
}

// Course ratings
export function submitCourseRating(email, courseId, rating, review) {
  const ratings = JSON.parse(localStorage.getItem('aspire_ratings') || '{}')
  const key = `${courseId}`
  if (!ratings[key]) {
    ratings[key] = []
  }
  ratings[key].push({
    email,
    rating,
    review,
    timestamp: new Date().toISOString()
  })
  localStorage.setItem('aspire_ratings', JSON.stringify(ratings))
}

export function getCourseRatings(courseId) {
  const ratings = JSON.parse(localStorage.getItem('aspire_ratings') || '{}')
  const courseRatings = ratings[courseId] || []
  
  if (courseRatings.length === 0) {
    return { averageRating: 0, totalReviews: 0, reviews: [] }
  }

  const sum = courseRatings.reduce((acc, r) => acc + r.rating, 0)
  const averageRating = (sum / courseRatings.length).toFixed(1)
  
  return {
    averageRating: parseFloat(averageRating),
    totalReviews: courseRatings.length,
    reviews: courseRatings
  }
}

export function hasUserRated(email, courseId) {
  const ratings = JSON.parse(localStorage.getItem('aspire_ratings') || '{}')
  const courseRatings = ratings[courseId] || []
  return courseRatings.some(r => r.email === email)
}

// Test attempts tracking
export function recordAttempt(email, courseId) {
  const attempts = JSON.parse(localStorage.getItem('aspire_attempts') || '{}')
  const key = `${email}_${courseId}`
  attempts[key] = (attempts[key] || 0) + 1
  localStorage.setItem('aspire_attempts', JSON.stringify(attempts))
}

export function getAttempts(email, courseId) {
  const attempts = JSON.parse(localStorage.getItem('aspire_attempts') || '{}')
  const key = `${email}_${courseId}`
  return attempts[key] || 0
}

// Test results storage
export function saveTestResult(email, courseId, results) {
  const testResults = JSON.parse(localStorage.getItem('aspire_test_results') || '{}')
  const key = `${email}_${courseId}`
  if (!testResults[key]) {
    testResults[key] = []
  }
  testResults[key].push({
    ...results,
    completedAt: new Date().toISOString()
  })
  localStorage.setItem('aspire_test_results', JSON.stringify(testResults))
}

export function getTestResults(email, courseId) {
  const testResults = JSON.parse(localStorage.getItem('aspire_test_results') || '{}')
  const key = `${email}_${courseId}`
  return testResults[key] || []
}
