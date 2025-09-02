const {mongoose, bcrypt} = require("../package");
const {
  safeSoftDeletePlugin,
  paginatePlugin,
  privateFieldsPlugin,
} = require("./plugins");
const refFields = require("./refFields/user.refFields");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, private: true },
    phone: {type: String, required: true},
    aadhaarNumber: {type: String, length: 12},
    panCardNumber: {type:String, length: 10},
    isEmailVerified: {type:Boolean, default:false},
}, { timestamps: true });

userSchema.plugin(safeSoftDeletePlugin, {
  deletedAtField: 'deletedAt',
  refFields,
})
userSchema.plugin(paginatePlugin);
userSchema.plugin(privateFieldsPlugin);

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('User', userSchema, "All Users");
