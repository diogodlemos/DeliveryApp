const { updateStatus } = require('../../database/services/saleService');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('changeStatus', async ({ id, status, role }) => {
    const arrayStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];
    const checkStatus = arrayStatus.includes(status);

    const order = await updateStatus(checkStatus, status, id, role);

    socket.emit('refreshStatus', order.status);
  });
});