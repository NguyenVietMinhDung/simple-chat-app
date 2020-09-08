const databaseConfig = {
  username: 'dungvmnguyen',
  password: 'caubehaudau67NTH',
  databaseName: 'simple_chat_app',
  getConnectionUrl() {
    return `mongodb+srv://${this.username}:${this.password}@cluster0.npv8s.mongodb.net/${this.databaseName}`;
  },
};

module.exports = {
  databaseConfig,
};
