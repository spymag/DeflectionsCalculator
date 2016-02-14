    <!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="stylesheet.css"/>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <script type="text/javascript" src="script.js"></script>
    </head>
<body>
		<div id="header">
			<p id="name">SpyMag</p>
            <img src=https://upload.wikimedia.org/wikipedia/en/4/41/Ninja_Tune_Logo.png alt="HTML5 Icon" width="50" height="50">
			<a href="mailto:mechoulas@gmail.com"><p id="email">mechoulas@gmail.com</p></a>
		</div>

<div class="form">


        <form action= "calculate.php" method="get">
            Enter breadth[m]:<input type="number" name="breadthListItem" placeholder="enter breadth"><br>
            Enter height[m]: <input type="number" name="heightListItem" placeholder="enter Height"><br>
            Enter length[m]: <input type="number" name="lengthListItem" placeholder="enter Length"><br>
            Enter tip Load[kN]: <input type="number" name="loadListItem" placeholder="enter Load"><br>
            Enter point x[m]: <input type="number" name="pointxListItem" placeholder="enter point x"/>
        
           <select name="action">
            <option>Rectangular</option>
            <option>Triangular</option>
        </select>
        
        <input type="submit" name="submit1" value="Calculate Now">
        
        </form><br>
        
        <form action= "calculate.php" method="get">
            Enter radius[m]: <input type="number" name="radiusListItem" placeholder="enter Radius"><br>
            Enter length[m]: <input type="number" name="lengthListItem" placeholder="enter Length"/>
        
           <select name="action">
            <option>Circular</option>
        </select>
        
        <input type="submit" name="submit2" value="Calculate Now">
        
        </form>
        
</div><br/>



  <button id="button1">Show me the Beam!</button>
  <form>
    <input type="number" value="4" name="test">
  </form
 <br/>


<?php
if(isset($_GET["submit1"]))
{
    if(! empty($_GET["breadthListItem"]) && ! empty($_GET["heightListItem"]) && ! empty($_GET["lengthListItem"])){


        $action = $_GET['action'];
        if($action=="Rectangular"){
            // Creating a new beam with varriables as given by the user
            $me = new RectangularBeam($_GET["breadthListItem"], $_GET["heightListItem"], $_GET["lengthListItem"],$_GET["loadListItem"],$_GET["pointxListItem"]); 
            // Printing out, what the report method returns
            echo $me->report();      
        } elseif ($action=="Triangular"){
            $me = new TriangularBeam($_GET["breadthListItem"], $_GET["heightListItem"], $_GET["lengthListItem"]);
            echo $me->report();} 
            
        
        
    } else
        {
        echo "check your rectangle inputs";
        }
            
}
elseif(isset($_GET["submit2"])){
    
    if(! empty($_GET["radiusListItem"] && ! empty($_GET["lengthListItem"])))
    {
        $me = new CircularBeam($_GET["radiusListItem"],$_GET["lengthListItem"]);
        echo $me->report(); 
    } else
        {
            echo "check your circular inputs";
        }
                                }
        
        


    
     class Beam{
            public $area;
            public $stiffness;
            public $length;
            public $YoungModulus = 210; //[GPa]
            public $MomentOfAreaXX;
            public $eigenFrequency;
            public $deflection;
            public $load;
            public $pointx;
            public $SteelDensity = 7850; // [kg/m3]
            public $volume;
            public $mass;
            public $firstEigenFrequency;
            
                    
     }
     
            
     // The code below creates the class
        class RectangularBeam extends Beam {
            // Creating some properties (variables tied to an object)
            public $breadth;
            public $height;
            
            // Assigning the values
            public function __construct($breadth, $height, $length, $load, $pointx) {
              $this->breadth = $breadth;
              $this->height = $height;
              $this->length = $length;
              $this->load = $load;
              $this->pointx = $pointx;
            }
             
                
                         // Creating a method (function tied to an object)
            public function report() {
              $area = $this->breadth * $this->height;
              $stiffness = $area * $this->YoungModulus;
              $MomentOfAreaXX = ($this->breadth*pow($this->height,3))/12;
              $deflection = $this->load*pow($this->pointx,2)*(3*$this->length-$this->pointx)/(6*$this->YoungModulus*pow(10,9)*$MomentOfAreaXX);
              $volume = $area * $this->length;
              $mass = $this->SteelDensity * $volume;
              $firstEigenFrequency  = (pow(1.875,2)*sqrt(($this->YoungModulus*$MomentOfAreaXX)/$mass*pow($this->length,4)))/2*pi();
              return "The beam is ". $_GET["action"].". The dimensions are:<br> " .
              "Breadth: ".$this->breadth . "m<br> ". "Height: " . $this->height . "m<br> " .
              "Length: ". $this->length. "m<br>". "Area: ". $area . " m2<br>".
              "Young Modulus: " .$this->YoungModulus . " GPa<br>".
              "Stiffness is: ".$stiffness." GPa*m2<br>".
              "Load at Tip is:". $this->load . " kN<br>".
              "Deflection at: ".$this->pointx. " m is: ".$deflection . " m<br>".
              "First Natural Frequency: ". $firstEigenFrequency. " Hz";
            }
        }
        
        
        
        class TriangularBeam extends Beam{
            public $breadth;
            public $height;
            
            // Assigning the values
            public function __construct($breadth, $height, $length) {
              $this->breadth = $breadth;
              $this->height = $height;
              $this->length = $length;
            }
            
            // Creating a method (function tied to an object)
            public function report() {
              $area =0.5 * $this->breadth * $this->height;
              $stiffness = $area* $this->YoungModulus;
              return "The beam is " .$_GET["action"] .". The dimensions are:<br> " .
              "Breadth: ". $this->breadth . "m<br> ".
              "Height: " . $this->height . "m<br> " . "Length: ". $this->length. "m<br>".
              "Area: ". $area . " m2<br>". "Young Modulus: " .$this->YoungModulus . "GPa<br>".
              "Stiffness is: ".$stiffness."GPa*m2";
            }
        }
        
        class CircularBeam extends Beam{
            public $radius;
            
            // Assigning the values
            public function __construct($radius,$length){
                $this->radius = $radius;
                $this->length = $length;
            }
            // Creating a method (function tied to an object)
            public function report() {
              $area =2*pi() * $this->radius;
              $stiffness = $area * $this->YoungModulus;
              return "The beam is ". $_GET["action"].". The dimensions are:<br> " .
              "Radius: ". $this->radius . "m<br> ".
              "Length: ". $this->length . "m<br>". "Area: ". $area . " m2<br>".
              "Young Modulus: " .$this->YoungModulus . "GPa<br>".
              "Stiffness is: ".$stiffness."GPa*m2";
            }

            
        }
            
             
          
          
        ?>
        

 <div class="shapes"></div> <br/>
  </div>       

        <div id="footer">
			<p>Rottredam, The Netherlands | Tel: (555) 555-5555</p>
		</div>
</body>
</html>