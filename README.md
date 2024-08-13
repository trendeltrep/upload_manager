# upload_manager

1. install dependencies:
    * npm install express multer unzipper puppeteer cors morgan 

2. init backend and frontend ports at (by default backend port - 3000, frontend - 3001):
    * /backend.js (backendPort and frontendPort  | 12-13 lines)
    * /frontend.js (backendPort and frontendPort  | 8-9 lines)
    * /public/index.html (at fetch request  | 21 line)

3. run both servers:
    * node backend.js
    * node frontend.js

4. open frontend website -> click choose file -> choose .zip file from /testUpload folder -> click upload

5. Screenshot can be seen now.