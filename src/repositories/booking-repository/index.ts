import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    }
  });
}

async function findRoomById(roomId: number) {
  return prisma.room.findUnique({
    where: {
      id: roomId
    }
  });
}

async function findRoomUsers(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId
    }
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId
    }
  });
}

const bookingRepository = {
  findBookingByUserId,
  findRoomById,
  findRoomUsers,
  createBooking,
  updateBooking
};

export default bookingRepository;
