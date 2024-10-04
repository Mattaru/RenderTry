class Config  {
    constructor ( acceleration = 20, guessedNumber = 1, guessedName = "", maxIterations = 3, rotationSpeed = 1) {
        this.acceleration = acceleration;
        this.guessedNumber = guessedNumber;
        this.guessedName = guessedName;
        this.maxIterations = maxIterations;
        this.rotationSpeed = rotationSpeed;
    }
};


export {
    Config
}