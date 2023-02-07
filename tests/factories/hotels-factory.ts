import faker from "@faker-js/faker";

import { prisma } from "@/config";

export async function createHotel() {
  const hotel = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: "https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ"
    }
  });

  return hotel;
}

export async function createHotelWithRooms() {
  const hotel = await createHotel();
  const hotel2 = await createHotel();

  const rooms = await prisma.room.create({
    data: {
      name: "101",
      capacity: 2,
      hotelId: hotel.id
    }
  });

  await prisma.room.create({
    data: {
      name: "102",
      capacity: 2,
      hotelId: hotel2.id
    }
  });

  return {
    id: hotel.id,
    name: hotel.name,
    image: hotel.image,
    createdAt: hotel.createdAt.toISOString(),
    updatedAt: hotel.updatedAt.toISOString(),
    Rooms: [
      {
        id: rooms.id,
        name: rooms.name,
        capacity: rooms.capacity,
        hotelId: rooms.hotelId,
        createdAt: rooms.createdAt.toISOString(),
        updatedAt: rooms.updatedAt.toISOString(),
      }
    ]
  };
}
