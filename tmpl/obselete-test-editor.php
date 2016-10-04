<?php

// configuration
$url = 'test-editor.php';
$file2 = 'test-questions.json';
$file1 = 'test-info.json';

// check if form has been submitted
if (isset($_POST['text1']))
{
    // save the text contents
    file_put_contents($file1, $_POST['text1']);

    // redirect to form again
    header(sprintf('Location: %s', $url));
    printf('<a href="%s">Moved</a>.', htmlspecialchars($url));
    exit();
}

if (isset($_POST['text2']))
{
    // save the text contents
    file_put_contents($file2, $_POST['text2']);

    // redirect to form again
    header(sprintf('Location: %s', $url));
    printf('<a href="%s">Moved</a>.', htmlspecialchars($url));
    exit();
}

// read the textfile
$text1 = file_get_contents($file1);
$text2 = file_get_contents($file2);

?>
<!-- HTML form -->

<html lang="en">
	<head>
		<meta name="keywords" content="">
		<meta name="desciption" content="">
    <link rel="stylesheet" type="text/css" href="./css/editor.css">
		<title>Test Editor 1.0</title>
  </head>

	<body>
    <div class="container">
    <h2>testtitle | account | last modded | passpercent</h2>
    <p>
      "testtitle" used to set the title of the test.<br />
      "account" the display name for the account being tested on.<br />
      "lastmodified" when the test was last updated."<br />
	  "passpercent" the percentage score required to pass the test."<br />
      </br/>
    </p>
    <hr />
<div >
  <form action="" method="post">
  <textarea style="width:780px;height:140px;" name="text1"><?php echo htmlspecialchars($text1) ?></textarea>
  <br />
  <input type="submit" />
  <input type="reset" />
  </form>
</div>
<h2>Questions | Answers | Correct Select | Incorrect Help</h2>
<p>
  "question" is the actual question that will be asked.<br />
  "answers" are the multiple joices available for selection.<br />
  "correct is the array index starting at zero fo the correct answer."<br />
  "incorrect" is a special field mad to provide additional information on what is the correct answer and why. <br />
  </br/>
</p>
<hr />

<div >
  <form action="" method="post">
  <textarea style="width:780px;height:400px;" name="text2"><?php echo htmlspecialchars($text2) ?></textarea>
  <br />
  <input type="submit" />
  <input type="reset" />
  </form>
</div>


</div>

</body>
</html>
