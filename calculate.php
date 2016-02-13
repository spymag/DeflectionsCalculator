    <!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="stylesheet.css"/>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <script type="text/javascript" src="script.js"></script>
    </head>
<body>

<?php

        // The code below creates the class
        class Beam {
            // Creating some properties (variables tied to an object)
            //public $isAlive = true;
            public $breadth;
            public $height;
            public $length;
            public $area;
            public $YoungModulus = 210;
            
            // Assigning the values
            public function __construct($breadth, $height, $length) {
              $this->breadth = $breadth;
              $this->height = $height;
              $this->length = $length;
              //$this->YoungModulus = $YoungModulus;
            }
                        
            // Creating a method (function tied to an object)
            public function report() {
              $area = $this->breadth * $this->height;
              return "The beam dimensions are " . $this->breadth . "m, " . $this->height . "m, " . $this->length. "m, ". $area . " m2 and " .$this->YoungModulus . "GPa .";
            }
          }
          
        // Creating a new beam with varriables as given by the user
        $me = new Beam($_GET["breadthListItem"], $_GET["heightListItem"], $_GET["lengthListItem"]); 
        // Printing out, what the report method returns
        echo $me->report();
        ?>
        
        </body>
<body>
  <button id="button1">Show me the Beam!</button>
  <form>
    <input type="number" value="4" name="test">
  </form
 <br/>
<div class="shapes"></div>
  </div>
</body>
</html>