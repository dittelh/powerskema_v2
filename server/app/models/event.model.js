module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
      title: {
        type: Sequelize.STRING
      },
      allDay: {
        type: Sequelize.BOOLEAN
      },
      startTime: {
        type: Sequelize.STRING
      },
      endTime: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Event;
  };


