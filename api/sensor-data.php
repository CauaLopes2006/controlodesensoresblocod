<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get JSON data from request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['temperature']) && isset($data['humidity'])) {
    $temperature = $data['temperature'];
    $humidity = $data['humidity'];
    
    // Save to database (example using MySQL)
    $conn = new mysqli("localhost", "username", "password", "database");
    $stmt = $conn->prepare("INSERT INTO sensor_data (temperature, humidity) VALUES (?, ?)");
    $stmt->bind_param("dd", $temperature, $humidity);
    $stmt->execute();
    $stmt->close();
    
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
}
?>