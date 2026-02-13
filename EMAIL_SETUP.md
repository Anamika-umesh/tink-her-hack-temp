# Email Configuration for VEIL Confession API

Add the following to your `.env.local` file to enable email sending:

## Gmail Example (recommended for testing)
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-specific-password
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Steps to set up Gmail:
1. Enable 2-Step Verification on your Google Account
2. Generate an **App Password** (16-character password)
3. Use that password in `EMAIL_PASSWORD`

## Other Email Services
```
# For Outlook/Office 365:
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password

# For SendGrid:
# Install: npm install nodemailer-sendgrid
# Update the transporter in the API route to use SendGrid

# For custom SMTP:
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
```

After setting up `.env.local`, restart your dev server:
```bash
npm run dev
```

Then test the API with a POST request:
```bash
curl -X POST http://localhost:3000/api/send-confession \
  -H "Content-Type: application/json" \
  -d '{
    "receiverEmail": "test@example.com",
    "confessionText": "Your secret message here",
    "senderEmail": "sender@example.com"
  }'
```
