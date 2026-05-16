import { PrismaClient } from "@prisma/client";
import logger from './utils/logger';
import net from 'net';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ['info', 'warn', 'error'] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export let prismaConnected = false;

export async function tryPrismaConnect(timeoutMs = 5000) {
  try {
    const timer = new Promise((_, reject) => setTimeout(() => reject(new Error('prisma_connect_timeout')), timeoutMs));
    await Promise.race([prisma.$connect(), timer]);
    prismaConnected = true;
    logger.info('Prisma connected');
    return true;
  } catch (err: any) {
    prismaConnected = false;
    logger.warn('Prisma connect failed', { error: err?.message || err });
    return false;
  }
}

export async function disconnectPrisma() {
  try {
    await prisma.$disconnect();
    prismaConnected = false;
    logger.info('Prisma disconnected');
  } catch (e: any) {
    logger.warn('Error disconnecting Prisma', { error: e?.message || e });
  }
}

export async function tcpCheck(host: string, port: number, timeout = 3000) {
  return new Promise<boolean>((resolve) => {
    const socket = new net.Socket();
    let done = false;
    const onDone = (ok: boolean) => {
      if (done) return;
      done = true;
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(timeout);
    socket.once('error', () => onDone(false));
    socket.once('timeout', () => onDone(false));
    socket.connect(port, host, () => onDone(true));
  });
}
