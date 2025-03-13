import { InferSchemaType, model, Schema} from "mongoose";
import jwt from "jsonwebtoken";



const UserSchema = new Schema({
  username: { 
    type: String, 
    unique: true, 
    required: [true, "Username is required"],
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
  },
  password: { 
    type: String, 
    required: [true, "Password is required"],
    min: [8, "Password must be at least 8 characters"],
    max: [20, "Password must be at most 20 characters"],
    validate: {
      validator: function(value:string) {
        return /[A-Z]/.test(value) &&  
               /[a-z]/.test(value) &&  
               /[0-9]/.test(value) &&  
               /[\W_]/.test(value);    
      },
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
});


UserSchema.methods.getJWT = function () {
  return  jwt.sign({ userId: this._id },( process.env.JWT_SECRET || 'secret'), {
    expiresIn: "7d",
  });
};

type UserSchemaType = InferSchemaType<typeof UserSchema>;
interface IUser extends UserSchemaType{
  getJWT: () => string;
}

export const UserModel = model<IUser>("User", UserSchema);
