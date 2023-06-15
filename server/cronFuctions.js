
const { Timer } = require('./db/models');


const deleteTimerValue = async (timerId) => {
    await Timer.destroy({ where: { item_id: timerId } });
  };
  
module.exports = deleteTimerValue;