import mongoose, { ConnectOptions, Error } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { env } from "@/config/env";

let mongoServer: MongoMemoryServer;

// database connection function (real or in memory)
const connectDB = async () => {
  const useMemory = env.USE_MEMORY_DB === "true";

  if (useMemory) {
    // using in-memory mongo for testing
    try {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();

      await mongoose.connect(uri);
      console.log("MongoDB in Memory connected for testing!");
    } catch (error) {
      console.error("Error starting MongoDB in memory:", error);
      process.exit(1);
    }
  } else {
    // using real mongo for production
    try {
      const MONGO_URI = env.MONGO_URI;

      if (!MONGO_URI) {
        // check if uri exists
        throw new Error("FATAL ERROR: MONGO_URI not found in .env file");
      }

      await mongoose.connect(MONGO_URI);

      console.log("MongoDB Atlas connected!");

      // event listing
      mongoose.connection.on("connected", () => {
        if (env.NODE_ENV === "development") {
          console.log("MongoDB database connection successfully established");
        }
      });

      mongoose.connection.on("reconnected", () => {
        if (env.NODE_ENV === "development") {
          console.log("Mongo connection reestablished");
        }
      });

      mongoose.connection.on("error", (error: Error) => {
        if (env.NODE_ENV === "development") {
          console.log("MongoDB connection error. Make sure MongoDB is running: ");
          console.log(`Mongo connection ERROR: ${error}`);
        }
      });

      mongoose.connection.on("disconnected", () => {
        if (env.NODE_ENV === "development") {
          console.log("MongoDB database connection is disconnected...");
          console.log("Trying to reconnect to Mongo...");
        }

        setTimeout(() => {
          mongoose.connect(MONGO_URI, {
            keepAlive: true,
            socketTimeoutMS: 3000,
            connectTimeoutMS: 3000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as ConnectOptions);
        }, 3000);
      });

      // close the connection safely
      process.on("SIGINT", async () => {
        try {
          if (mongoose.connection.readyState === 1) {
            // if the connection is open close it
            await mongoose.connection.close();
            if (env.NODE_ENV === "development") {
              console.log("MongoDB database connection was disconnected due to app closure...");
            }
          }
          process.exit(0);
        } catch (error) {
          console.error("Error closing connection to MongoDB: ", error);
          process.exit(1);
        }
      });
    } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
      process.exit(1);
    }
  }
};

// function to disconnect the database
export const disconnectDB = async () => {
  // disconnecting the MongoDB connection
  if (mongoose.connection.readyState === 1) {
    // only disconnect if connected
    await mongoose.disconnect();
  }

  // stopping the mongo server in memory if it is active
  if (mongoServer) {
    await mongoServer.stop();
    console.log("MongoDB in memory disconnected and server stopped!");
  }
};

export default connectDB;
