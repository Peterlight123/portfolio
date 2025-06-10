<?php
// THIS IS PSEUDO-CODE FOR BACKEND - DO NOT PUT DIRECTLY IN HTML

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // IMPORTANT: Set specific origin in production

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['success' => false, 'message' => 'Invalid JSON received.']);
        exit;
    }

    // Sanitize and validate data here (VERY IMPORTANT FOR SECURITY)
    $fullName = htmlspecialchars($data['fullName'] ?? 'N/A');
    $emailAddress = filter_var($data['emailAddress'] ?? '', FILTER_VALIDATE_EMAIL);
    $amount = filter_var($data['amount'] ?? 0, FILTER_VALIDATE_FLOAT);
    $orderNotes = htmlspecialchars($data['orderNotes'] ?? 'None');
    $paymentMethod = htmlspecialchars($data['paymentMethod'] ?? 'N/A');

    // Build email content based on selected method
    $emailSubject = "New Payment Order from " . $fullName;
    $emailBody = "A new payment order has been initiated.\n\n";
    $emailBody .= "Customer Name: " . $fullName . "\n";
    $emailBody .= "Customer Email: " . $emailAddress . "\n";
    $emailBody .= "Amount: NGN " . number_format($amount, 2) . "\n";
    $emailBody .= "Payment Method: " . $paymentMethod . "\n";
    $emailBody .= "Order Notes: " . $orderNotes . "\n\n";

    if ($paymentMethod === 'transfer') {
        $emailBody .= "--- Bank Transfer Details ---\n";
        $emailBody .= "Transfer Reference: " . htmlspecialchars($data['transferRef'] ?? 'N/A') . "\n";
        $emailBody .= "Bank Name: " . htmlspecialchars($data['bankDetails']['bankName'] ?? 'N/A') . "\n";
        $emailBody .= "Account Name: " . htmlspecialchars($data['bankDetails']['accountName'] ?? 'N/A') . "\n";
        $emailBody .= "Account Number: " . htmlspecialchars($data['bankDetails']['accountNumber'] ?? 'N/A') . "\n";
    } elseif ($paymentMethod === 'crypto' && isset($data['crypto'])) {
        $emailBody .= "--- Cryptocurrency Payment Details ---\n";
        $emailBody .= "Crypto Type: " . htmlspecialchars($data['crypto']['type'] ?? 'N/A') . "\n";
        $emailBody .= "Crypto Address: " . htmlspecialchars($data['crypto']['address'] ?? 'N/A') . "\n";
        if (isset($data['crypto']['network'])) {
            $emailBody .= "Network: " . htmlspecialchars($data['crypto']['network'] ?? 'N/A') . "\n";
        }
    }

    $to = "petereluwade55@gmail.com";
    $headers = "From: webmaster@yourdomain.com\r\n"; // Replace with your actual sender email
    $headers .= "Reply-To: " . $emailAddress . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Use a robust email sending library like PHPMailer or integrate with an API like SendGrid
    // For a basic PHP mail function (less reliable for production):
    // if (mail($to, $emailSubject, $emailBody, $headers)) {
    //     echo json_encode(['success' => true, 'message' => 'Payment details received and email sent!']);
    // } else {
    //     echo json_encode(['success' => false, 'message' => 'Failed to send email.']);
    // }

    // In a real scenario, use a proper email library or service for reliability and features.
    echo json_encode(['success' => true, 'message' => 'Payment details received by server (email sending simulated).']);

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
