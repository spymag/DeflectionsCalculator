document.addEventListener('DOMContentLoaded', () => {
    const beamTypeSelect = document.getElementById('beam-type');
    const calculatorForm = document.getElementById('calculator-form');
    const resultsOutput = document.getElementById('results-output');
    const errorOutput = document.getElementById('error-output');
    const resetButton = document.getElementById('reset-button');

    const rectangularInputs = document.getElementById('rectangular-inputs');
    const triangularInputs = document.getElementById('triangular-inputs');
    const circularInputs = document.getElementById('circular-inputs');
    // commonInputs is not strictly needed as a variable if not directly manipulated beyond form.elements

    const allBeamInputDivs = [rectangularInputs, triangularInputs, circularInputs];
    const allInputFields = calculatorForm.querySelectorAll('input[type="number"]');

    function updateInputVisibility() {
        const selectedType = beamTypeSelect.value;
        allBeamInputDivs.forEach(div => div.style.display = 'none');
        // Disable 'required' attribute for inputs that are not visible
        allBeamInputDivs.forEach(div => {
            div.querySelectorAll('input[type="number"]').forEach(input => input.required = false);
        });


        if (selectedType === 'rectangular') {
            rectangularInputs.style.display = 'block';
            rectangularInputs.querySelectorAll('input[type="number"]').forEach(input => input.required = true);
        } else if (selectedType === 'triangular') {
            triangularInputs.style.display = 'block';
            triangularInputs.querySelectorAll('input[type="number"]').forEach(input => input.required = true);
        } else if (selectedType === 'circular') {
            circularInputs.style.display = 'block';
            circularInputs.querySelectorAll('input[type="number"]').forEach(input => input.required = true);
        }
        // Common inputs are always required
        document.getElementById('length').required = true;
        document.getElementById('load').required = true;
        document.getElementById('pointx').required = true;
    }

    function resetForm() {
        calculatorForm.reset(); // Resets form elements to their default values
        beamTypeSelect.value = 'rectangular'; // Explicitly set default for select
        updateInputVisibility();
        resultsOutput.innerHTML = '<p>Please enter beam parameters and click Calculate.</p>';
        errorOutput.innerHTML = '';
    }

    beamTypeSelect.addEventListener('change', updateInputVisibility);
    resetButton.addEventListener('click', resetForm);

    calculatorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        resultsOutput.innerHTML = '<p>Please enter beam parameters and click Calculate.</p>'; // Reset for new calculation
        errorOutput.innerHTML = ''; // Clear previous errors

        const beamType = beamTypeSelect.value;

        // Get and validate common inputs
        const length = parseFloat(document.getElementById('length').value);
        const load = parseFloat(document.getElementById('load').value);
        const pointx = parseFloat(document.getElementById('pointx').value);

        let errors = [];
        if (isNaN(length) || length <= 0) errors.push("Length (m) must be a positive number.");
        if (isNaN(load)) errors.push("Tip Load (kN) must be a number.");
        if (isNaN(pointx) || pointx < 0) errors.push("Point x (m) must be a non-negative number.");
        if (pointx > length && !isNaN(length)) errors.push("Point x (m) cannot be greater than the beam length (m).");

        let beamInstance;
        let specificInputsValid = true; // Flag for type-specific inputs

        // Type-specific input validation
        if (beamType === 'rectangular') {
            const breadth = parseFloat(document.getElementById('rect-breadth').value);
            const height = parseFloat(document.getElementById('rect-height').value);
            if (isNaN(breadth) || breadth <= 0) { errors.push("Rectangular Breadth (m) must be a positive number."); specificInputsValid = false; }
            if (isNaN(height) || height <= 0) { errors.push("Rectangular Height (m) must be a positive number."); specificInputsValid = false; }
            if (specificInputsValid && errors.length === 0) { // Only create instance if all inputs valid so far
                beamInstance = new RectangularBeam(breadth, height, length, load, pointx);
            }
        } else if (beamType === 'triangular') {
            const base = parseFloat(document.getElementById('tri-breadth').value);
            const height = parseFloat(document.getElementById('tri-height').value);
            if (isNaN(base) || base <= 0) { errors.push("Triangular Base (m) must be a positive number."); specificInputsValid = false; }
            if (isNaN(height) || height <= 0) { errors.push("Triangular Height (m) must be a positive number."); specificInputsValid = false; }
            if (specificInputsValid && errors.length === 0) {
                beamInstance = new TriangularBeam(base, height, length, load, pointx);
            }
        } else if (beamType === 'circular') {
            const radius = parseFloat(document.getElementById('circ-radius').value);
            if (isNaN(radius) || radius <= 0) { errors.push("Circular Radius (m) must be a positive number."); specificInputsValid = false; }
            if (specificInputsValid && errors.length === 0) {
                beamInstance = new CircularBeam(radius, length, load, pointx);
            }
        } else {
            errors.push("Invalid beam type selected."); // Should not happen with select element
        }

        if (errors.length > 0) {
            errorOutput.innerHTML = errors.join('<br>');
            return;
        }

        // This check is now redundant if beamInstance is only created when errors.length === 0 and specificInputsValid is true
        // if (!beamInstance) {
        //     errorOutput.innerHTML = "Could not create beam instance due to invalid inputs. Please check values.";
        //     return;
        // }
        
        try {
            const results = beamInstance.getResults();
            displayResults(results);
        } catch (e) {
            errorOutput.innerHTML = `An unexpected calculation error occurred: ${e.message || e}`;
        }
    });

    function displayResults(results) {
        // Ensure units are clear for all displayed values.
        let html = `<h3>Results for ${results.beamType} Beam:</h3>`;
        html += "<p>Inputs:</p><ul>";
        if (results.beamType === "Rectangular") {
        html += `<li>Breadth: ${results.breadth.toFixed(3)} m</li>`;
        html += `<li>Height: ${results.height.toFixed(3)} m</li>`;
        } else if (results.beamType === "Triangular") {
        html += `<li>Base: ${results.breadth.toFixed(3)} m</li>`;
        html += `<li>Height: ${results.height.toFixed(3)} m</li>`;
        } else if (results.beamType === "Circular") {
        html += `<li>Radius: ${results.radius.toFixed(3)} m</li>`;
        }
    html += `<li>Length: ${results.length.toFixed(3)} m</li>`;
    html += `<li>Tip Load: ${results.load.toFixed(2)} kN</li>`;
    html += `<li>Point x (for deflection): ${results.pointx.toFixed(3)} m</li>`;
        html += "</ul>";

        html += "<p>Calculations:</p><ul>";
    html += `<li>Area: ${results.area.toExponential(4)} m²</li>`; // Using toExponential for potentially very small/large area values
    html += `<li>Stiffness (E*A): ${results.stiffness.toExponential(4)} GPa·m²</li>`; // Clarified unit notation
    html += `<li>Moment of Inertia (Ixx): ${results.momentOfAreaXX.toExponential(4)} m⁴</li>`;

    // Deflection is calculated in meters in calculator.js, converted to mm here for display.
        if (typeof results.deflection === 'number' && !isNaN(results.deflection)) {
        html += `<li>Deflection at point x: ${(results.deflection * 1000).toExponential(4)} mm</li>`;
        } else {
        html += `<li>Deflection at point x: N/A (or not applicable)</li>`;
        }

    html += `<li>Volume: ${results.volume.toExponential(4)} m³</li>`;
        html += `<li>Mass: ${results.mass.toFixed(3)} kg</li>`;

        if (typeof results.firstEigenFrequency === 'number' && !isNaN(results.firstEigenFrequency)) {
            html += `<li>First Eigenfrequency: ${results.firstEigenFrequency.toFixed(3)} Hz</li>`;
        } else {
        html += `<li>First Eigenfrequency: N/A (or not applicable)</li>`;
        }
        html += "</ul>";

        resultsOutput.innerHTML = html;
    }

    // Initial setup
    updateInputVisibility(); // Set initial required attributes correctly
    resetForm(); // Call resetForm on load to set initial state and ensure visibility is correct.
});
