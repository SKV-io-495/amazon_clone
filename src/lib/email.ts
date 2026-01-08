export async function sendOrderConfirmation(email: string, orderId: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`\n📧 [MOCK EMAIL] Sending confirmation to ${email} for Order #${orderId}`);
  console.log(`   Subject: Your Amazon.clone Order Confirmation`);
  console.log(`   Body: Thanks for shopping with us! Your order ${orderId} has been placed.\n`);
  
  return true;
}
