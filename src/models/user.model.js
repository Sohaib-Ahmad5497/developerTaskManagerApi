    import mongoose from "mongoose";

    const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email address format",
        },
        },
        password: String,
        role: { type: String, default: "developer" },
    },
    {
        timestamps: true,
    }
    );

    const User = mongoose.model("User", userSchema);
    export default User;
