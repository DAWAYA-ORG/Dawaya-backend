import mongoose, { Types } from 'mongoose';

const inventorySchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  stock: {
    type: Boolean,
    required: true,
    default: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  medicine: {
    type: Types.ObjectId,
    ref: 'Medicine',
    required: true,
  },
  pharmacy: {
    type: Types.ObjectId,
    ref: 'Pharmacy',
    required: true,
  },
  pharmacist: {
    type: Types.ObjectId,
    ref: 'Pharmacist',
    required: true,
  },
});

inventorySchema.index({ medicine: 1 });

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
