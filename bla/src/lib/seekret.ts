import api from './auth';

export interface Participant {
  id?: number;
  name: string;
  email: string;
}

export interface Constraint {
  giverEmail: string;
  cannotReceiveEmail: string;
}

export interface Assignment {
  id: number;
  giver: Participant;
  receiver: Participant;
}

export interface Seekret {
  id: number;
  name: string;
  uniqueLink: string;
  createdAt: string;
  assignmentsGenerated: boolean;
  ownerName: string;
  participants: Participant[];
  constraints: Constraint[];
  assignments?: Assignment[];
}

export interface CreateSeekretRequest {
  name: string;
  participants: Participant[];
  constraints: Constraint[];
}

export interface  UpdateSeekretRequest {
  seekretRequest: CreateSeekretRequest;
  uniqueLink: string;
}

export const seekretService = {
  async createSeekret(data: CreateSeekretRequest): Promise<Seekret> {
    const response = await api.post('/seekrets', data);
    return response.data;
  },

  async getMySeekrets(): Promise<Seekret[]> {
    const response = await api.get('/seekrets/my');
    return response.data;
  },

  async getSeekretNameByLink(uniqueLink: string): Promise<String> {
    const response = await api.get(`/seekrets/view/${uniqueLink}/name`);
    return response.data;
  },

  async getSeekretByLink(uniqueLink: string): Promise<Seekret> {
    const response = await api.get(`/seekrets/view/${uniqueLink}`);
    return response.data;
  },

  async getAssignedParticipantName(uniqueLink: string, participantId: string): Promise<String> {
    const response = await api.get(`/seekrets/view/${uniqueLink}/participant/${participantId}`);
    return response.data;
  },

  async generateAssignments(uniqueLink: string): Promise<Seekret> {
    const response = await api.post(`/seekrets/generate/${uniqueLink}`);
    return response.data;
  },

  async updateSeekret(data: UpdateSeekretRequest): Promise<Seekret> {
    const response = await api.post('/seekrets/update', data);
    console.log(response)
    return response.data;
  },

  async deleteSeekret(uniqueLink: string): Promise<void> {
    await api.delete(`/seekrets/${uniqueLink}`);
  },
};
