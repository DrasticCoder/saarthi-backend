import app from './app.js';
import { connectDB } from './config/database.js';
const port = process.env.PORT || 8000;

// Connect Database
connectDB();

app.listen( port , () => {
    console.log(`🚀 Server is up and running on port ${port} 🚀`)
})