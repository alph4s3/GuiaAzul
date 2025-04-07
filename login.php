<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Example user credentials (should be replaced with real database check)
    if ($email == "test@example.com" && $password == "password123") {
        $_SESSION['user'] = $email;  // Store the email in session
        header("Location: index.php");  // Redirect to the main page
        exit;
    } else {
        $error = "Invalid login credentials!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Guía Azul</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <section class="auth-section">
        <div class="auth-container">
            <h1>Login to Guía Azul</h1>
            <?php if (isset($error)): ?>
                <p class="error"><?php echo $error; ?></p>
            <?php endif; ?>
            <form action="login.php" method="POST">
                <label for="login-email">Email:</label>
                <input type="email" id="login-email" name="email" required>

                <label for="login-password">Password:</label>
                <input type="password" id="login-password" name="password" required>

                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="javascript:void(0)" onclick="toggleAuthForm('register')">Register here</a></p>
        </div>
    </section>

    <script>
        function toggleAuthForm(formType) {
            if (formType === 'register') {
                window.location.href = 'register.php'; // Redirect to the register page
            }
        }
    </script>
</body>
</html>
