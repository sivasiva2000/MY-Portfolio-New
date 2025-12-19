# EmailJS Setup Guide for Contact Form

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (free account)
3. Verify your email

## Step 2: Add Email Service
1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your email account (sivakandhasami01@gmail.com)
5. Copy the **Service ID** (looks like: `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**Body:**
```
You have a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply directly to this email to respond.
```

4. Save template and copy the **Template ID** (looks like: `template_xyz789`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (looks like: `AbC123XyZ_def456`)

## Step 5: Update Contact.jsx
Open `src/components/Contact.jsx` and replace these lines (around line 28):

```javascript
// TODO: Replace these with your EmailJS credentials
const serviceId = 'YOUR_SERVICE_ID'        // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID'      // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY'        // Replace with your Public Key
```

**Example:**
```javascript
const serviceId = 'service_abc123'
const templateId = 'template_xyz789'
const publicKey = 'AbC123XyZ_def456'
```

## Step 6: Test
1. Save the file
2. Go to your portfolio website
3. Fill out the contact form
4. Click "Send Message"
5. Check your email inbox (sivakandhasami01@gmail.com)

## Free Tier Limits
- ✅ 200 emails per month
- ✅ No credit card required
- ✅ Perfect for portfolio sites

## Troubleshooting
- **Emails not arriving?** Check spam folder
- **Error sending?** Verify all IDs are correct
- **Still not working?** Check browser console for errors (F12)

## Alternative Options (if you prefer)

### Option 1: Formspree
- Simple alternative
- Setup: [https://formspree.io/](https://formspree.io/)

### Option 2: Web3Forms
- No account needed
- Setup: [https://web3forms.com/](https://web3forms.com/)

---
**After setup, you can delete this file!**
