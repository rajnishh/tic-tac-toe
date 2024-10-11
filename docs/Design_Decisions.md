# Design Decisions

1. **Stateless Python Engine**: 
   - Keeping the engine stateless ensures scalability and simplicity.
   - The Node.js backend manages all the session-related information.

2. **JWT for Authentication**: 
   - JWT allows for secure token-based authentication, minimizing the need for server-side session storage.

3. **MongoDB for Stats**: 
   - MongoDB is used due to its flexibility in storing JSON-like documents, making it ideal for user statistics.

4. **React + React Native**: 
   - Code reusability between the web and mobile apps was maximized by using React for both platforms.
   - Redux ensures state consistency across both environments.
