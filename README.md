# Aspire Nexus - Unified Placement Preparation Platform

A complete placement preparation platform with Razorpay payment integration, course management, test assessments, and ratings.

## Features

✅ **User Authentication** - Local email/password signup and login
✅ **Course Catalog** - Browse TCS and Accenture mock test courses  
✅ **Razorpay Integration** - Secure ₹20 payment gateway
✅ **Course Detail Pages** - Comprehensive course information
✅ **Ratin/home/monkey/MCA/Sem 3/Styling Scripting Web Development/Practicals/trafficlite.htmlg System** - Rate and review courses after purchase
✅ **Test Assessments** - Three-part assessment system:
   - Technical Assessment (45 min) - 45 MCQ questions
   - Behavioral & Cognitive (40 min) - Personality assessment
   - Communication Assessment (30 min) - Grammar and communication
✅ **Score Tracking** - Detailed results with percentage breakdown
✅ **Responsive Design** - Mobile-friendly interface

## Flow

1. **Login/Signup** - Create account or login with email and password
2. **Browse Courses** - View available courses with ratings
3. **Course Details** - Click on a course to see full details
4. **Purchase** - Pay ₹20 via Razorpay to unlock course
5. **Start Test** - Begin the assessment (only for Accenture course)
6. **Complete Sections** - Complete all three timed sections
7. **View Results** - Get detailed score breakdown
8. **Rate Course** - Submit rating and review

## Setup Instructions

### 1. Install Dependencies

```bash
cd aspire-nexus-unified
npm install
```

### 2. Configure Razorpay

Create a `.env` file in the root directory:

```
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

To get your Razorpay keys:
1. Sign up at https://razorpay.com/
2. Go to Dashboard > Settings > API Keys
3. Generate Test/Live keys
4. Copy the Key ID to your .env file

### 3. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
aspire-nexus-unified/
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx          # Authentication page
│   │   ├── CoursesPage.jsx        # Course catalog
│   │   ├── CourseCard.jsx         # Individual course card
│   │   ├── CourseDetailPage.jsx   # Course details & purchase
│   │   ├── TestAssessment.jsx     # Main test container
│   │   └── assessments/           # Assessment components
│   ├── lib/
│   │   ├── auth.js                # Authentication & storage
│   │   └── razorpay.js            # Razorpay integration
│   ├── App.jsx                    # Main app router
│   └── main.jsx                   # Entry point
├── public/                        # Static assets
├── .env                           # Environment variables
└── package.json                   # Dependencies

```

## Tech Stack

- **Frontend**: React 18 + Vite
- **Payment**: Razorpay
- **Storage**: LocalStorage
- **Styling**: Vanilla CSS

## Razorpay Test Mode

In test mode, use these test cards:
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

## Features Breakdown

### Authentication
- Email/password based signup and login
- Session management using localStorage
- Logout functionality

### Payment System
- Razorpay checkout integration
- ₹20 course pricing
- Payment verification and tracking
- Purchase history storage

### Course Management
- Two courses: TCS and Accenture
- Course ratings and reviews
- Purchase status tracking
- Test availability status

### Assessment System
- **Technical**: 45 MCQ questions covering MS Office, Pseudocode, Networking, Cloud, OS, SQL, Security, Programming
- **Behavioral**: 40 personality questions
- **Communication**: 30 grammar and communication questions
- Timer for each section
- Auto-submit on time expiry
- Detailed score calculation

### Results
- Overall percentage
- Section-wise breakdown
- Pass/Fail indicators (60% threshold)
- Test attempt tracking

## Responsive Design

The entire application is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (375px)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- All data is stored in browser's localStorage
- Razorpay handles secure payment processing
- Speech synthesis used for audio in communication assessment
- Microphone access required for speaking assessment

## Future Enhancements

- Backend API integration
- Database for persistent storage
- Email notifications
- Certificate generation
- Admin dashboard
- More courses and assessments

## License

© 2026 Aspire Nexus Inc. All rights reserved.
