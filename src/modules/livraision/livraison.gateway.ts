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
  async handleStatusChange(@MessageBody() data: { id: string, status: Status }) {
    await this.livraisonService.updateStatus(data.id, data.status);
    const count = await this.livraisonService.countPendingDeliveries();
    this.server.emit('updatePendingCount', { count });
  }

  async emitPendingCount() {
    const count = await this.livraisonService.countPendingDeliveries();
    this.server.emit('updatePendingCount', { count });
  }
}
