import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(email: string, orderId: string) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Default Resend test domain
      to: email, // Can only send to verified email on free tier, or own email
      subject: `Order Confirmation: Amazon Clone #${orderId}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Your order <strong>#${orderId}</strong> has been placed successfully.</p>
        <p>We are processing it and will notify you when it ships.</p>
        <br />
        <p>Thanks,<br/>Amazon Clone Team</p>
      `
    });
    console.log(`📧 [RESEND] Email sent to ${email} for Order #${orderId}`);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}
