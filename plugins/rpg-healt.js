let handler = (m) => m;

handler.before = async function (m) {
  let user = db.data.users[m.sender];
  if (user.healt > 100) {
    user.healt = 100;
  }
  if (user.healt < 0) {
    user.healt = 0;
  }
};

module.exports = handler;
