import { prisma } from "@/config";

async function findMany() {
  return prisma.hotel.findMany();
}

async function findHotelById(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true
    }
  });
}

const hotelsRepository = {
  findMany,
  findHotelById
};

export default hotelsRepository;
