# URL shortener
This is an exercise project.

## Features
- Input a URL and get a shortened URL that links to the original URL's web page.
- Get the same shortened URL for the same input URL.
- Click the copy button to copy the shortened URL to your clipboard.

## Getting started
Make sure to install node.js and npm first.

1. Clone the project
```
git clone https://github.com/linlinlearning/url-shortener.git
```
2. Go to the directory
```
cd url-shortener
```
3. Install required dependencies
```
npm install
```
4. Install nodemon
```
npm i nodemon
```
5. Set environment variable: MONGODB_URI
```
MONGODB_URI=your connection string
```
6. Start the server
```
npm run start
```
7. When seeing this message in the terminal, type localhost:3000 into a browser's address bar
```
App is running on http://localhost:3000
```
## Built with
-  node.js @ 18.16.0
-  express @ 4.18.2
-  express-handlebars @ 7.1.0
-  mongoose @ 7.4.0
-  bootstrap @ 5.2.0
-  body-parser @ 1.20.2 