#  NOTEish

A clean and responsive **personal notes web app** built with Node.js, Express, MongoDB, and EJS.  
Create, edit, delete, and share your notes — now with support for **dark mode**, **Google Keep-style popups**, and **WhatsApp sharing**.

---

# Screenshots
![alt text](https://github.com/aryanm9026/NOTEish/blob/master/Screenshots/home-light.png)
![alt text](https://github.com/aryanm9026/NOTEish/blob/master/Screenshots/home-dark.png)
![alt text](https://github.com/aryanm9026/NOTEish/blob/master/Screenshots/login-page.png)
![alt text](https://github.com/aryanm9026/NOTEish/blob/master/Screenshots/noteprompt-dark.png)
![alt text](https://github.com/aryanm9026/NOTEish/blob/master/Screenshots/noteprompt-light.png)
![alt text](https://github.com/aryanm9026/NOTEish/blob/master/Screenshots/writenote-light.png)

##  Features

-  Create, edit, and delete notes  
-  Pop-up modal for full-screen note editing (like Google Keep)  
-  Dark mode toggle (persists user preference)  
-  Share notes on WhatsApp in readable format  
-  MongoDB integration with timestamps and sorting  
-  User authentication with login/signup  
-  Terms & Conditions checkbox on signup  
-  Mobile responsive using Bootstrap  

---

##  Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Bootstrap, EJS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (with Mongoose ODM)  
- **Templating**: EJS  
- **Auth**: Simple username/email-password authentication (extendable)  
- **Other**: dotenv, body-parser  

---

##  Getting Started

###  Installation

```bash
git clone https://github.com/yourusername/NOTEish.git
cd NOTEish
npm install
```
### Setup your .env file

- PORT=4000
- MONGO_URI= Your Database URL
- MAIN_URL=http://localhost:4000

### Run app

```bash
npm run start
```

# Future enhancements

- AI note summarization

- OAuth-based login (Google/GitHub)

- Tags & categories

- Export notes as PDF or Markdown

### Pull requests are welcome!