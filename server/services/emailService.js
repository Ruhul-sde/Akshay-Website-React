
const nodemailer = require("nodemailer");
const AdminConfig = require("../models/AdminConfig");

const sendTicketNotification = async (ticket) => {
  try {
    const config = await AdminConfig.findOne();
    
    if (!config || !config.emailNotifications) {
      console.log("Email notifications are disabled");
      return;
    }

    if (!config.smtpConfig.user || !config.smtpConfig.pass) {
      console.log("SMTP configuration is incomplete");
      return;
    }

    const transporter = nodemailer.createTransport({
      host: config.smtpConfig.host,
      port: config.smtpConfig.port,
      secure: config.smtpConfig.secure,
      auth: {
        user: config.smtpConfig.user,
        pass: config.smtpConfig.pass
      }
    });

    const mailOptions = {
      from: `"Support System" <${config.smtpConfig.user}>`,
      to: config.adminEmail,
      subject: `New Support Ticket: ${ticket.ticketNumber} - ${ticket.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .ticket-info { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
            .label { font-weight: bold; color: #667eea; margin-right: 10px; }
            .priority-high { color: #ef4444; font-weight: bold; }
            .priority-medium { color: #f59e0b; font-weight: bold; }
            .priority-low { color: #10b981; font-weight: bold; }
            .footer { background: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎫 New Support Ticket Created</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">You have a new support ticket that requires attention</p>
            </div>
            <div class="content">
              <div class="ticket-info">
                <h2 style="margin-top: 0; color: #667eea;">Ticket Details</h2>
                <p><span class="label">Ticket Number:</span>${ticket.ticketNumber}</p>
                <p><span class="label">Subject:</span>${ticket.subject}</p>
                <p><span class="label">Category:</span>${ticket.category}</p>
                <p><span class="label">Priority:</span><span class="priority-${ticket.priority}">${ticket.priority.toUpperCase()}</span></p>
                <p><span class="label">Status:</span>${ticket.status.toUpperCase()}</p>
              </div>
              
              <div class="ticket-info">
                <h2 style="margin-top: 0; color: #667eea;">Customer Information</h2>
                <p><span class="label">Name:</span>${ticket.userName}</p>
                <p><span class="label">Email:</span>${ticket.userEmail}</p>
                <p><span class="label">User ID:</span>${ticket.userId}</p>
              </div>
              
              <div class="ticket-info">
                <h2 style="margin-top: 0; color: #667eea;">Description</h2>
                <p style="white-space: pre-wrap;">${ticket.description}</p>
              </div>
              
              <div class="ticket-info">
                <p><span class="label">Created At:</span>${new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0;">This is an automated notification from your Support Ticketing System</p>
              <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">Please do not reply to this email</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email notification sent for ticket ${ticket.ticketNumber}`);
  } catch (err) {
    console.error("Error sending email notification:", err.message);
  }
};

module.exports = { sendTicketNotification };
