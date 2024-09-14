import mongoose, { Types } from "mongoose";

const pharmacistSchema = new mongoose.Schema({
    licence_number: {
        type: String,
        required: [true, 'Licence number is required'],
        unique: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minLength: [3, 'Username is too short'],
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long']
    },
    PK_pharmacy_id: {
        type: Types.ObjectId,
        ref: "Pharmacy",
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",  // Assuming you have a User model
        required: true
    }
}, { timestamps: true, versionKey: false });

/* Create an index for the `licence_number` and `email` fields to improve query performance.
 The index ensures that when queries involve searching for a pharmacist by `licence_number` or `email`,
 MongoDB can quickly locate the relevant document(s) without scanning the entire collection.
 The `1` signifies ascending order for the fields, which helps optimize the search process.
*/
pharmacistSchema.index({ licence_number: 1, email: 1 });


// Pre-save hook for password hashing
pharmacistSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // Hash password logic here
    }
    next();
});

// Method to compare passwords
pharmacistSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    // Implement password comparison logic
    return false;
};

export const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);

