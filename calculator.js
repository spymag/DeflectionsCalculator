class Beam {
    constructor() {
        this.YoungModulus = 210; // GPa
        this.SteelDensity = 7850; // kg/m3
        // Other common properties can be initialized here if needed
    }
}

class RectangularBeam extends Beam {
    constructor(breadth, height, length, load, pointx) {
        super();
        this.breadth = breadth;
        this.height = height;
        this.length = length;
        this.load = load; // Assuming kN
        this.pointx = pointx; // Assuming m
    }

    getResults() {
        const area = this.breadth * this.height; // m^2
        const stiffness = area * this.YoungModulus; // GPa*m^2
        const momentOfAreaXX = (this.breadth * Math.pow(this.height, 3)) / 12; // m^4

        // Deflection calculation:
        // load (kN) * pointx^2 (m^2) * (3 * length (m) - pointx (m)) / (6 * E (GPa) * 10^9 * I (m^4))
        // To make units consistent for deflection (m):
        // load needs to be in N: this.load * 1000
        // YoungModulus needs to be in Pa: this.YoungModulus * 1e9
        // So, ( (this.load * 1000) * Math.pow(this.pointx, 2) * (3 * this.length - this.pointx) ) /
        //     (6 * (this.YoungModulus * 1e9) * momentOfAreaXX)
        // This simplifies to (this.load * Math.pow(this.pointx, 2) * (3 * this.length - this.pointx)) /
        //     (6 * this.YoungModulus * 1e6 * momentOfAreaXX) if load in kN, E in GPa.
        // The original PHP code was: ($load * pow($pointx,2) * (3*$length-$pointx)) / (6*$this->YoungModulus*pow(10,9)*$MomentOfAreaXX)
        // This implies load was in N, or there was a unit conversion missing if load was kN and E GPa.
        // Let's assume load is in kN as per original form and E in GPa.
        // The formula provided in the prompt for deflection: (load * Math.pow(pointx, 2) * (3 * length - pointx)) / (6 * YoungModulus * Math.pow(10, 9) * momentOfAreaXX)
        // This implies that YoungModulus (GPa) is multiplied by 10^9 to get Pa. If load is in kN, it should be multiplied by 1000 to get N.
        // So, ( (load * 1000) * pointx^2 * (3*length - pointx) ) / ( 6 * (YoungModulus * 1e9) * momentOfAreaXX)
        // = (load * pointx^2 * (3*length - pointx)) / ( 6 * YoungModulus * 1e6 * momentOfAreaXX)

        const deflection = (this.load * Math.pow(this.pointx, 2) * (3 * this.length - this.pointx)) /
                           (6 * this.YoungModulus * Math.pow(10, 6) * momentOfAreaXX); // Result in meters

        const volume = area * this.length; // m^3
        const mass = this.SteelDensity * volume; // kg

        // firstEigenFrequency
        // Original PHP: (pow(1.875,2)*sqrt(($this->YoungModulus*pow(10,9)*$MomentOfAreaXX)/($mass*pow($length,4))))/(2*pi())
        // This uses E in Pa.
        const firstEigenFrequency = (Math.pow(1.875, 2) * Math.sqrt((this.YoungModulus * Math.pow(10, 9) * momentOfAreaXX) / (mass * Math.pow(this.length, 4)))) / (2 * Math.PI); // Hz

        return {
            area: area,
            stiffness: stiffness,
            momentOfAreaXX: momentOfAreaXX,
            deflection: deflection,
            volume: volume,
            mass: mass,
            firstEigenFrequency: firstEigenFrequency,
            beamType: "Rectangular",
            breadth: this.breadth,
            height: this.height,
            length: this.length,
            load: this.load,
            pointx: this.pointx
        };
    }
}

class TriangularBeam extends Beam {
    constructor(breadth, height, length, load, pointx) { // Added load and pointx for consistency, though not used in current calcs
        super();
        this.breadth = breadth;
        this.height = height;
        this.length = length;
        this.load = load; // Store for potential future use
        this.pointx = pointx; // Store for potential future use
    }

    getResults() {
        const area = 0.5 * this.breadth * this.height; // m^2
        const stiffness = area * this.YoungModulus; // GPa*m^2
        // momentOfAreaXX for a triangle with base b and height h, about an axis through the centroid parallel to the base
        // I_centroidal = (b * h^3) / 36
        // This is typically needed for deflection calculations.
        const momentOfAreaXX = (this.breadth * Math.pow(this.height, 3)) / 36; // m^4

        // Deflection and other calculations are not defined for TriangularBeam in the original PHP
        // and not explicitly requested to be added beyond area and stiffness.
        // However, if we were to add them, they would follow similar patterns to RectangularBeam,
        // using the appropriate momentOfAreaXX.

        const volume = area * this.length; // m^3
        const mass = this.SteelDensity * volume; // kg

        // Placeholder for firstEigenFrequency if it were to be calculated
        // const firstEigenFrequency = "N/A for Triangular (not implemented)";

        return {
            area: area,
            stiffness: stiffness,
            momentOfAreaXX: momentOfAreaXX, // Added for completeness
            // deflection: "N/A", // Not calculated
            volume: volume, // Added for consistency
            mass: mass, // Added for consistency
            // firstEigenFrequency: firstEigenFrequency, // Not calculated
            beamType: "Triangular",
            breadth: this.breadth,
            height: this.height,
            length: this.length,
            load: this.load, // Included for display if needed
            pointx: this.pointx // Included for display if needed
        };
    }
}

class CircularBeam extends Beam {
    constructor(radius, length, load, pointx) { // Added load and pointx for consistency
        super();
        this.radius = radius;
        this.length = length;
        this.load = load; // Store for potential future use
        this.pointx = pointx; // Store for potential future use
    }

    getResults() {
        const area = Math.PI * Math.pow(this.radius, 2); // m^2 (Corrected formula)
        const stiffness = area * this.YoungModulus; // GPa*m^2
        const momentOfAreaXX = (Math.PI * Math.pow(this.radius, 4)) / 4; // m^4 (I for a circle)

        // Deflection calculation for a cantilever circular beam (similar to rectangular)
        // (load * pointx^2 * (3*length - pointx)) / (6 * E * I)
        // Convert units: load (kN to N), E (GPa to Pa)
        const deflection = (this.load * Math.pow(this.pointx, 2) * (3 * this.length - this.pointx)) /
                           (6 * this.YoungModulus * Math.pow(10, 6) * momentOfAreaXX); // Result in meters

        const volume = area * this.length; // m^3
        const mass = this.SteelDensity * volume; // kg

        // firstEigenFrequency for a cantilever circular beam
        // (beta_1^2 * sqrt(E*I / (rho * A * L^4))) / (2*PI)
        // where beta_1 for cantilever is approx 1.875
        // E should be in Pa, I in m^4, rho in kg/m^3, A in m^2, L in m
        const firstEigenFrequency = (Math.pow(1.875, 2) * Math.sqrt((this.YoungModulus * Math.pow(10, 9) * momentOfAreaXX) / (mass * Math.pow(this.length, 4)))) / (2 * Math.PI); // Hz

        return {
            area: area,
            stiffness: stiffness,
            momentOfAreaXX: momentOfAreaXX,
            deflection: deflection, // Added deflection
            volume: volume, // Added for consistency
            mass: mass, // Added for consistency
            firstEigenFrequency: firstEigenFrequency, // Added eigenfrequency
            beamType: "Circular",
            radius: this.radius,
            length: this.length,
            load: this.load, // Included for display if needed
            pointx: this.pointx // Included for display if needed
        };
    }
}
