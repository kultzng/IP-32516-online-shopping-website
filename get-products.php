<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = "chachastore"; 

try {
    // Create connection
    $conn = new mysqli($host, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Handle filters
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $subcategory = isset($_GET['subcategory']) ? $_GET['subcategory'] : null;
    $search = isset($_GET['search']) ? trim($_GET['search']) : null;

    // If search is used, it overrides subcategory filtering
    if ($search) {
        $sql = "SELECT * FROM products 
                WHERE productName LIKE ? 
                   OR productCategory LIKE ? 
                   OR productSubCategory LIKE ?";
        $stmt = $conn->prepare($sql);
        $like = "%" . $search . "%";
        $stmt->bind_param("sss", $like, $like, $like);
        $stmt->execute();
        $result = $stmt->get_result();
    }   elseif ($subcategory) {
        $sql = "SELECT * FROM products WHERE productSubCategory = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $subcategory);
        $stmt->execute();
        $result = $stmt->get_result();
    }   elseif ($category) {
        $sql = "SELECT * FROM products WHERE productCategory = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $category);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        $sql = "SELECT * FROM products";
        $result = $conn->query($sql);
    }

    $products = [];
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $products[] = [
                'id' => $row['productId'],
                'name' => $row['productName'],
                'description' => $row['productCategory'] . ' - ' . $row['productSubCategory'],
                //'description' => $row['productSubCategory'],
                'price' => $row['unitPrice'],
                'size' => $row['unitQuantity'],
                'inStock' => $row['inStock']
            ];
        }

        // Return JSON
        header('Content-Type: application/json');
        echo json_encode($products);
    } else {
        echo json_encode(['error' => 'No products found', 'query' => $sql]);
    }

    $conn->close();
} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => $e->getMessage()]);
}
?>
