const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'cardio', 'stretching'],
    required: true
  },
  sets: {
    type: Number,
    required: true,
    min: 1
  },
  reps: Number,
  weight: Number, // in kg
  duration: Number, // in seconds
  distance: Number, // in km
  restTime: Number, // in seconds
  notes: String,
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);