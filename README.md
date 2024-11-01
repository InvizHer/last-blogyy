
# Blog Platform

A full-stack blog platform built with Node.js, Express, MongoDB, and React.

## Features

- Admin authentication
- Rich text editor for posts
- Image upload support
- Tag-based filtering
- Search functionality
- SEO optimization
- Responsive design

## Setup Instructions

1. Clone the repository
2. Set up environment variables:
   - Backend: Create `server/.env` with:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Frontend: Create `frontend/.env` with:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```

3. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend development server
   cd ../frontend
   npm start
   ```

## Deployment Instructions

### Deploying to Render

1. Create a new account on Render (https://render.com)

2. Create a new Web Service for the backend:
   - Connect your GitHub repository
   - Select the repository and branch
   - Configure the service:
     - Name: blog-backend
     - Environment: Node.js
     - Build Command: `cd server && npm install`
     - Start Command: `cd server && npm start`
   - Add environment variables:
     - MONGODB_URI
     - JWT_SECRET
     - PORT = 8080

3. Create a new Static Site for the frontend:
   - Connect your GitHub repository
   - Select the repository and branch
   - Configure the service:
     - Name: blog-frontend
     - Build Command: `cd frontend && npm install && npm run build`
     - Publish Directory: `frontend/build`
   - Add environment variables:
     - REACT_APP_API_URL = https://your-backend-url.onrender.com/api

4. Update CORS configuration in backend:
   ```javascript
   // server/server.js
   app.use(cors({
     origin: 'https://your-frontend-url.onrender.com'
   }));
   ```

## Project Structure

```
blog-platform/
├── server/                 # Backend directory
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── uploads/           # Image uploads directory
│   ├── package.json
│   └── server.js
│
├── frontend/              # Frontend directory
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context providers
│   │   └── App.js
│   └── package.json
│
└── render.yaml           # Render deployment config
```

## API Endpoints

### Authentication
- POST `/api/auth/login`
  - Body: `{ username, password }`
  - Returns: JWT token

### Posts
- GET `/api/posts`
  - Query params: `search`, `tag`
  - Returns: List of posts
- GET `/api/posts/:slug`
  - Returns: Single post
- POST `/api/posts`
  - Protected route
  - Body: FormData with `title`, `content`, `tags`, `image`
  - Returns: Created post
- PUT `/api/posts/:id`
  - Protected route
  - Body: FormData with `title`, `content`, `tags`, `image`
  - Returns: Updated post
- DELETE `/api/posts/:id`
  - Protected route
  - Returns: Success message

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## SEO Optimization

The application includes several SEO features:
1. Dynamic page titles
2. Meta descriptions
3. Semantic HTML structure
4. SEO-friendly URLs using slugs
5. Responsive images
6. Proper heading hierarchy

## Security Features

1. JWT authentication
2. Password hashing
3. Protected routes
4. CORS configuration
5. Input validation
6. Secure file uploads

## Development Notes

### Adding New Features
1. Create new routes in the backend
2. Add corresponding models if needed
3. Create new components in the frontend
4. Update the relevant context if needed
5. Add new environment variables if required

### Code Style
- Use ESLint and Prettier for consistent formatting
- Follow React best practices
- Use async/await for asynchronous operations
- Implement proper error handling
- Use meaningful variable and function names

## Troubleshooting

Common issues and solutions:

1. CORS errors:
   - Check CORS configuration in backend
   - Verify frontend API URL

2. Image upload issues:
   - Check upload directory permissions
   - Verify multer configuration
   - Check file size limits

3. Authentication issues:
   - Verify JWT token expiration
   - Check token format in requests
   - Validate credentials

4. Database connection issues:
   - Verify MongoDB URI
   - Check network connectivity
   - Validate database credentials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
