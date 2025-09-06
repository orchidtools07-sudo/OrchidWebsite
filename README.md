# Orchid Infrastructure Developers Website

A modern, responsive website for Orchid Infrastructure Developers with real-time lead management and cross-device synchronization.

## Features

- **Modern React Frontend**: Built with React 18 and React Router
- **Real-time Lead Management**: Cross-device synchronization with backend API
- **Admin Panel**: Secure admin interface with password-protected delete functionality
- **Contact Forms**: Multiple contact forms with email integration
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Offline Support**: Automatic fallback to localStorage when offline

## Architecture

### Frontend
- React 18 with functional components and hooks
- React Router for navigation
- EmailJS for email notifications
- CSS3 with modern animations and glassmorphism effects

### Backend
- Node.js with Express server
- File-based JSON storage for leads
- CORS enabled for cross-origin requests
- RESTful API endpoints

### Lead Management System
- **Cross-device synchronization**: Leads submitted from any device appear instantly in admin panel
- **Offline support**: Forms work offline and sync when connection is restored
- **Real-time updates**: Admin panel polls for new leads every 10 seconds
- **Secure deletion**: Password-protected lead deletion with luxury UI

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd OrchidWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure EmailJS** (Optional)
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Update the service IDs and template IDs in:
     - `src/pages/Contact.js`
     - `src/components/ScheduleCallPopup.js`

### Running the Application

#### Development Mode (Recommended)
Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend development server on `http://localhost:3000`

#### Individual Services

**Frontend only:**
```bash
npm start
```

**Backend only:**
```bash
npm run server
```

### Production Deployment

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Deploy backend:**
   - Update the API_BASE_URL in `src/services/api.js` with your production backend URL
   - Deploy the backend server to your hosting platform
   - Ensure CORS origins include your production domain

3. **Deploy frontend:**
   - Deploy the `build` folder to your static hosting service (Netlify, Vercel, etc.)

## API Endpoints

### Leads Management
- `GET /api/leads` - Retrieve all leads
- `POST /api/leads` - Submit a new lead
- `DELETE /api/leads/:id` - Delete a specific lead
- `GET /api/health` - Health check endpoint

### Request/Response Examples

**Submit Lead:**
```json
POST /api/leads
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "subject": "Property Interest",
  "message": "Looking for residential property",
  "source": "Contact Form"
}
```

**Response:**
```json
{
  "success": true,
  "lead": {
    "id": "1704067200000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "subject": "Property Interest",
    "message": "Looking for residential property",
    "source": "Contact Form",
    "date": "2024-01-01T00:00:00.000Z"
  }
}
```

## Admin Panel

### Access
- URL: `/admin`
- Username: `admin`
- Password: `orchid2024`

### Features
- **Dashboard**: Overview of leads with statistics and charts
- **Lead Management**: View, export, and delete leads
- **Real-time Updates**: Automatic refresh every 10 seconds
- **Online Status**: Visual indicator of connection status
- **Secure Delete**: Password protection for lead deletion (Password: `Welcome@2025`)

### Delete Password Recovery
For password assistance, contact **Vikrant Shekhawat** at [developer@oidpl.com](mailto:developer@oidpl.com)

## Cross-Device Synchronization

The application now supports real-time cross-device synchronization:

1. **Form Submissions**: When someone fills a form on any device, it immediately appears in all open admin panels
2. **Automatic Polling**: Admin panel checks for new leads every 10 seconds
3. **Offline Support**: Forms work offline and sync when connection is restored
4. **Fallback System**: Automatic fallback to localStorage if API is unavailable

## File Structure

```
src/
├── components/           # Reusable React components
│   ├── ContactPopup.js  # Contact form popup
│   ├── ScheduleCallPopup.js  # Schedule call popup
│   └── ...
├── pages/               # Page components
│   ├── AdminPanel.js    # Admin dashboard
│   ├── Contact.js       # Contact page
│   └── ...
├── services/            # API and utility services
│   └── api.js          # Lead management API service
├── images/             # Static images
└── ...

server.js               # Backend Express server
leads.json             # Lead storage file (auto-created)
package.json           # Dependencies and scripts
```

## Environment Variables

Create a `.env` file for production configuration:

```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Update the `origin` array in `server.js` to include your domain
2. **API Connection Failed**: Check if backend server is running on correct port
3. **Leads Not Syncing**: Verify network connection and API endpoint URLs
4. **EmailJS Not Working**: Check service IDs and template IDs configuration

### Support

For technical support, contact [developer@oidpl.com](mailto:developer@oidpl.com)

## License

Private - Orchid Infrastructure Developers Pvt. Ltd.
