import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../data/users.json');

class User {
  constructor(id, fullName, email, password, createdAt) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt || new Date().toISOString();
  }

  // Ensure data directory exists
  static async ensureDataDir() {
    const dataDir = path.dirname(DB_PATH);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  // Read all users from file
  static async readUsers() {
    try {
      await this.ensureDataDir();
      const data = await fs.readFile(DB_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, return empty array
        return [];
      }
      throw error;
    }
  }

  // Write users to file
  static async writeUsers(users) {
    await this.ensureDataDir();
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
  }

  // Find user by email
  static async findByEmail(email) {
    const users = await this.readUsers();
    return users.find(user => user.email === email);
  }

  // Find user by id
  static async findById(id) {
    const users = await this.readUsers();
    return users.find(user => user.id === id);
  }

  // Create new user
  static async create(userData) {
    const users = await this.readUsers();
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const newUser = new User(
      this.generateId(),
      userData.fullName,
      userData.email,
      userData.password,
      new Date().toISOString()
    );

    users.push(newUser);
    await this.writeUsers(users);
    return newUser;
  }

  // Generate unique ID
  static generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Get user without password
  static sanitizeUser(user) {
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default User;
