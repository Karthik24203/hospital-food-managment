import {
  integer,
  pgTable,
  serial,
  varchar,
  unique,
  boolean,
} from "drizzle-orm/pg-core";

// Users Table
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  email: varchar("email").notNull().unique(),
  designation: varchar("designation").default(""),
});

export const Patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  patientName: varchar("patient_name").notNull(),
  diseases: varchar("diseases"), // Array of diseases
  allergies: varchar("allergies"), // Array of allergies
  roomNumber: varchar("room_number").notNull(),
  bedNumber: varchar("bed_number").notNull(),
  floorNumber: varchar("floor_number").notNull(),
  age: integer("age").notNull(),
  gender: varchar("gender").notNull(),
  contactInformation: varchar("contact_information").notNull(),
  emergencyContact: varchar("emergency_contact"),
});

export const Meals = pgTable("meals", {
  id: serial("id").primaryKey(), // Primary Key
  mealTime: varchar("meal_time").notNull(), // e.g., Breakfast, Lunch, Dinner
  mealName: varchar("meal_name").notNull(), // Name of the meal
  mealIngredients: varchar("meal_ingredients"), // List or description of ingredients
  cook: varchar("cook").notNull(),
  deliverer: varchar("deliverer").notNull(),
  cookStatus: varchar("cook_status").default("not-cooked"),
  deliveryStatus: varchar("deliveryStatus").default("not-delivered"),
  patientId: integer("patient_id")
    .notNull()
    .references(() => Patients.id), // Foreign Key referencing Patients table
});
