async function getAvatarByUsername(username) {
  // 1. Cari User ID berdasarkan username
  const userResponse = await fetch(
    "https://users.roblox.com/v1/usernames/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: false
      })
    }
  );

  const userData = await userResponse.json();

  if (!userData.data || userData.data.length === 0) {
    return null;
  }

  const userId = userData.data[0].id;

  // 2. Ambil avatar berdasarkan User ID
  const avatarResponse = await fetch(
    `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=720x720&format=Png&isCircular=false`
  );

  const avatarData = await avatarResponse.json();

  if (!avatarData.data || avatarData.data.length === 0) {
    return null;
  }

  return {
    id: userId,
    displayName: userData.data[0].displayName,
    avatar: avatarData.data[0].imageUrl
  };
}

module.exports = {
  getAvatarByUsername,
};