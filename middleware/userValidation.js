

const validateUser = (req, res, next) => {
    const { name, email, age } = req.body;

    // name, email, age required
    if (!name || !email || age === undefined) {
        return res.status(400).json({
            message: "Name, email and age are required"
        });
    }

    // name validation
    if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({
            message: "Name must be at least 2 characters"
        });
    }

    // email validation
    if (typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email"
        });
    }

    // age validation
    if (
        typeof age !== "number" || !Number.isInteger(age) ||  age <= 0
    ) {
        return res.status(400).json({
            message: "Age must be a positive integer"
        });
    }

    // validation passed
    next();
};

module.exports = validateUser;