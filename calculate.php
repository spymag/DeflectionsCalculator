    <!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="stylesheet.css"/>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <script type="text/javascript" src="script.js"></script>
    </head>
<body>


<div id="form">

        <form action= "calculate.php" method="get">
            Enter breadth[m]:<input type="text" name="breadthListItem"><br>
            Enter height[m]: <input type="text" name="heightListItem"><br>
            Enter length[m]: <input type="text" name="lengthListItem"/>
        
           <select name="action">
            <option>Rectangular</option>
            <option>TriangularBeam</option>
        </select>
        
        <input type="submit" name="submit" value="Calculate Now">
        
        </form>
</div><br/>

  <button id="button1">Show me the Beam!</button>
  <form>
    <input type="number" value="4" name="test">
  </form
 <br/>


<?php



if(isset($_GET["submit"])){

    $action = $_GET['action'];
    #echo "line 32,";
    
    if($action=="Rectangular"){
        // Creating a new beam with varriables as given by the user
        $me = new RectangularBeam($_GET["breadthListItem"], $_GET["heightListItem"], $_GET["lengthListItem"]); 
        // Printing out, what the report method returns
        echo $me->report();      
    } else{
        $me = new TriangularBeam($_GET["breadthListItem"], $_GET["heightListItem"], $_GET["lengthListItem"]);
        echo $me->report();
        }
            }
    
        
    

     
     // The code below creates the class
        class Section {
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
             
        }
        
        class RectangularBeam extends Section {
        
            // Creating a method (function tied to an object)
            public function report() {
              $area = $this->breadth * $this->height;
              return "The beam dimensions are:<br> " . "Breadth: ". $this->breadth . "m<br> ". "Height: " . $this->height . "m<br> " . "Length: ". $this->length. "m<br>". "Area: ". $area . " m2<br>". "Young Modulus: " .$this->YoungModulus . "GPa";
            }
          }
          
          class TriangularBeam extends Section{
            // Creating a method (function tied to an object)
            public function report() {
              $area =0.5 * $this->breadth * $this->height;
              return "The beam dimensions are:<br> " . "Breadth: ". $this->breadth . "m<br> ". "Height: " . $this->height . "m<br> " . "Length: ". $this->length. "m<br>". "Area: ". $area . " m2<br>". "Young Modulus: " .$this->YoungModulus . "GPa";
            }
          
          
          }
        ?>
 <div class="shapes"></div> <br/>
  </div>       

</body>
</html>