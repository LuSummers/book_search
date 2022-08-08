const {User, Book} = require ("../models/")

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');
    
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },

    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
      
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
      },

      addBook: async (parent, args, context) => {
        if (context.user) {
          const savedBooks = await savedBooks.create({ ...args, username: context.user.username });
      
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: books._id } },
            { new: true }
          );
      
          return savedBooks;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
     
      addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate('friends');
      
          return updatedUser;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      }}}
  
  };
  
  module.exports = resolvers;