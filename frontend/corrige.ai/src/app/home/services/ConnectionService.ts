import type { ConnectionResponse, ConnectionRequest } from '../models'
import type { ApiService } from '@/shared/api'


export class ConnectionService {
  private apiService: ApiService

  constructor(apiService: ApiService) {
    this.apiService = apiService
  }

  async createConnection(connectionData: ConnectionRequest): Promise<ConnectionResponse> {
    const data = await this.apiService.post<ConnectionResponse>(`/api/connect`, connectionData)

    return data as ConnectionResponse
  }

  async disconnect(socketId: string): Promise<void> {
    await this.apiService.delete(`/api/connections/${socketId}`)
  }
}
