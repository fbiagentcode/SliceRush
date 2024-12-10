# ***SliceRush 🍕***

![Slice Rush landing page](https://media.licdn.com/dms/image/v2/D4E12AQE6PSLIFtoF4Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733853946842?e=1739404800&v=beta&t=tjt6-sjV2mmE5PRoOP9EuDoLCEcbZz95a958pis5NCw)

# A pizza delivery application made for Oasis Infobyte Web Development internship (Level 3).

---
### **Features**

- **User Authentication:** Secure **JWT-based** Authentication providing login, email verification, and password reset functionality.  
- **Real-Time Order Management:** Track orders and receive notifications, both in the app and through emails.  
- **Payment Integration:** Seamless transactions using **Stripe**.  
- **Image Uploads:** Efficiently handled with **Multer**, stored securely on **Cloud** with **Supabase**.  
- **Responsive Design:** Built with **React**, **Vite**, **TailwindCSS**, and **ShadCN components**.  
- **Backend APIs:** Developed using **Node.js**, **Express**, and **MongoDB** for robust functionality.

---

### Prerequisites
Node.js: Ensure you have Node.js (v16 or higher) installed.
MongoDB Atlas or Local MongoDB Instance: Set up a MongoDB connection.
Supabase Account: For storage and file management.
Stripe Account: For payment processing and webhook configuration.


### **Installation Instructions**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/slicerush.git
   cd slicerush
   ```

2. **Install dependencies** for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file in both the `client` and `server` directories with the following keys:

   **Client:**
   ```env
   VITE_ORIGIN=<your-backend-url>
   VITE_STRIPE_PUBLISHABLE_KEY=<your-backend-url>
   ```

   **Server:**
   ```env
   PORT=5000
   CONNECTION_STRING=<your-mongodb-uri>
   SUPABASE_KEY=<your-supabase-key>
   SUPABASE_URL=<your-supabase-url>
   JWT_SECRET_KEY=<your-jwt-secret-key>
   
   # Admin email credentials
   ADMIN_USER=<your-admin-user>
   ADMIN_PASSWORD=<your-admin-password>
   
   # Application origin
   ORIGIN=http://localhost:3000
   VITE_ORIGIN=http://localhost:5173
   
   # Stripe
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   WEBHOOK_SECRET=<your-stripe-webhook-secret>
  ```

4. **Start the app**:
```
   - **Server**:  
     ```bash
     cd server
     npm start
     ```
   - **Client**:  
     ```bash
     cd client
     npm run dev
     ```
```

5. Visit `http://localhost:5173` in your browser to explore SliceRush!

---

### **Technologies Used**

- **Frontend**: React, TailwindCSS, ShadCN components  
- **Backend**: Node.js, Express, MongoDB  
- **Payment**: Stripe  
- **File Uploads**: Multer  
- **Email Service**: Nodemailer (with Mailtrap)  

---

### **Project Structure**

Here's an overview of the folder structure:


  slicerush/
  ├── client/
  │   ├── src/
  │   │   ├── components/
  │   │   ├── pages/
  │   │   ├── App.jsx
  │   │   ├── index.js
  │   ├── public/
  │   ├── package.json
  ├── server/
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   ├── utils/
  │   ├── app.js
  │   ├── server.js
  │   ├── package.json
  ├── README.md


### **Contributing**
1. Fork the repository.  
2. Create your feature branch: `git checkout -b feature-name`.  
3. Commit your changes: `git commit -m "Add a new feature"`.  
4. Push to the branch: `git push origin feature-name`.  
5. Submit a pull request.



### **Contact**

Feel free to reach out with feedback or questions:  
**LinkedIn**: [Chandana Ramesh](https://www.linkedin.com/in/chandana-ramesh-5795bb334/)  



