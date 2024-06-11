import React from 'react'

export default function StruggleDoc() {
  return (
    <p>
        Issues and Solutions
Authentication and Routing:

Issue: Authentication logic and routing between client and server were causing issues, especially when trying to navigate to protected routes.
Solution: Implemented ProtectedRoute and UnprotectedRoute components to handle routing based on authentication status. Used localStorage to store authentication state and user details.
Login and Registration Forms:

Issue: Login and registration forms were not properly handling user input and displaying feedback.
Solution: Enhanced the forms with proper error handling and notifications using Ant Design's notification component. Ensured user data was correctly stored in localStorage upon successful login.
Server-Side Issues:

Issue: Various errors related to the database connection, session management, and passport configuration.
Solution: Refactored server-side code to ensure proper database connection pooling, session configuration, and passport authentication setup. Fixed routes and middleware functions to handle authentication and redirection correctly.
Styling and UI Enhancements:

Issue: The user interface, particularly the HealthCard component, looked plain and unappealing.
Solution: Applied CSS styling to enhance the visual appearance. Used margin, padding, and other styling properties to create a more visually appealing layout.
Dynamic Image Loading:

Issue: Needed to dynamically load images based on user IDs.
Solution: Used the picsum.photos service to load random images based on user IDs for variety and visual interest.
Handling User Data:

Issue: Managing and displaying user data (like email and hostname) dynamically after login.
Solution: Stored user data in localStorage and passed it as props to components like HealthCard to display user-specific information.
Continuous Time Update:

Issue: Displaying a continuously updating clock for current date and time.
Solution: Used setInterval within a useEffect hook to update the time every second, ensuring it always displayed the current time.
Key Components and Functions
App.js:

Managed routing with ProtectedRoute and UnprotectedRoute.
Fetched health checks and managed user state.
HealthLogin and HealthRegisterForm:

Enhanced with Ant Design's Form and notification components for better user experience and error handling.
HealthCard:

Improved styling and dynamic image loading.
Added functionality to update description and display user info.
Server-Side Code:

Proper session management, passport setup, and middleware functions.
Routes for authentication (/auth) and health checks (/health).
General Enhancements:

Used localStorage for persistent state management.
Applied CSS for better visual presentation and layout management.
This summary covers the main struggles and their solutions. Let me know if there's anything specific you'd like to revisit or further detail before we move on to the next part!
    </p>
  )
}
