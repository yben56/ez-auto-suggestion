<?PHP
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

if (isset($_POST['search'])) {
	$search =  $_POST['search'];
	
	//do query
	$data = array();
	for ($i = 0; $i < 10; $i++) {
		$data[$i] = generateRandomString(6);
	}

	echo json_encode($data);
}
?>