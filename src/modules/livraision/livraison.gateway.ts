import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LivraisonService } from './services/livraision.service';
import { Status } from 'src/enums/status.enum';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class LivraisonGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly livraisonService: LivraisonService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  @SubscribeMessage('statusChange')
  handleStatusChange(@MessageBody() data: { id: string, status: Status }) {
    console.log('Received statusChange event with data:', data);
    if (data && data.id) {
      this.server.emit('statusChange', data);
    } else {
      console.error('Invalid data received for statusChange event');
    }
  }

  @SubscribeMessage('addLivraison')
  async handleAddLivraison(@MessageBody() data: { id: string }) {
    console.log('Received addLivraison event with data:', data);
    if (data && data.id) {
      this.server.emit('addLivraison', data); // Broadcast the event with data
      await this.emitPendingCount(); // Emit the updated pending count
    } else {
      console.error('Invalid data received for addLivraison event');
    }
  }

  async emitPendingCount() {
    const count = await this.livraisonService.countPendingDeliveries();
    this.server.emit('updatePendingCount', { count });
  }
}
