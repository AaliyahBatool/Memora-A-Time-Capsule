import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  User  from "../models/user.js"; // Sequelize User model

// *Register Function*
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields.",
                success: false,
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({ username, email, password_hash: hashedPassword });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error.", success: false });
    }
};

// *Login Function*
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password.",
                success: false,
            });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password.",
                success: false,
            });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password.",
                success: false,
            });
        }

        // Generate JWT token
        const tokenData = { userId: user.id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Return user info (excluding password) and token
        return res.status(200).json({
            message: `Welcome back, ${user.username}!`,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error.", success: false });
    }
};
