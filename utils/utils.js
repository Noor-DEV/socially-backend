
const User = require('../models/User')

const formatOutPut = (data) => {
    if (Array.isArray(data)) {
      return data.map((entity) => {
        return {
          _id: entity._id,
          first_name: entity.first_name,
          last_name: entity.last_name,
          email: entity.email,
          picture_path: entity.picture_path,
          friends: entity.friends,
          location: entity.location,
          occupation: entity.occupation,
          viewed_profile: entity.viewed_profile,
          impressions: entity.impressions,
        };
      });
    }
    if (typeof data === "object") {
      return {
        _id: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        picture_path: data.picture_path,
        friends: data.friends,
        location: data.location,
        occupation: data.occupation,
        viewed_profile: data.viewed_profile,
        impressions: data.impressions,
      };
    }
    return data;
  };
const extractFriends = async (friendsIdList)=>{
  return  await Promise.all(await friendsIdList.map(async (the_friend_id)=>{
      try {      
        const the_friend = await User.findById(the_friend_id);
        return formatOutPut(the_friend);
      } catch (err) {
          return;
      }
    }));
  
}

module.exports = {
  extractFriends,formatOutPut
}